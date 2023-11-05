<template >
<div>


  <div class="editor">
    <div ref="toolbar" class="toolbar"></div>
    <div
      ref="editor"
      style="height: 500px; overflow-y: scroll"
      class="text"
    ></div>
    
  </div>
  <Preview2 :visible.sync="prevew_show" v-if="prevew_show" :data="info_"></Preview2>
</div>
</template>
<script>
import E from "wangeditor";
import { Preview } from "./preview";
import Preview2 from "./preview.vue";
const menuKeyVideo = "image2";
E.registerMenu(menuKeyVideo, Preview);
export default {
  name: "editoritem",
  components:{Preview2},
  data() {
    return {
      editor: null,
      info_: null,
      host: process.env.VUE_APP_IMAGE_HOST,
      url: "",
      prevew_show:false
    };
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    disable: {
      type: null,
      default: null,
    },
    isClear: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear();
        this.info_ = null;
      }
    },
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value);
      }
    },
  },
  mounted() {
    this.seteditor();
    this.editor.txt.html(this.value);
  },
  methods: {
    seteditor() {
      let _this = this;
      this.editor = new E(this.$refs.toolbar, this.$refs.editor);
      this.editor.customConfig = this.editor.customConfig
        ? this.editor.customConfig
        : this.editor.config;
      this.editor.customConfig.uploadImgShowBase64 = false; // base 64 存储图片
      this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 10; // 限制一次最多上传 10 张图片
      this.editor.customConfig.uploadImgTimeout = 5 * 60 * 1000; // 设置超时时间
      this.editor.customConfig.uploadImgServer =
        "/api/toolkit/uploader/uploadImg"; // 上传服务器地址
      this.editor.customConfig.uploadImgParams = {
        type: "richtext-file",
        sort: "item",
      };

      this.editor.customConfig.uploadImgHooks = {
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert: function (insertImgFn, result) {
          // result 即服务端返回的接口
          console.log("customInsert", _this.host + result.data.url);
          if (result.errno === 0) {
            insertImgFn(_this.host + result.data.url);
          } else {
            _this.$message({ type: "error", message: "图片上传失败" });
          }
          // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        },
        // 11
        fail(xhr, editor, resData) {
          console.log(xhr, editor, resData);
        },
      };
      // this.editor.customConfig.customUploadImg = async (files, insertImgFn) => {
      //自定义上传
      // for (let file of files) {
      //   let formdata = new FormData()
      //   formdata.append('files', file)
      //   var obj = {}
      //   obj.createPersonId = this.$userInfo.EmployeeID
      //   formdata.append(
      //     'fileRecordDto',
      //     new Blob([JSON.stringify(obj)], { type: 'application/json' })
      //   )
      //   this.$uplod.post('file/upload', formdata).then(res => {
      //     for (let index = 0; index < res.data.length; index++) {
      //       const element = res.data[index]
      //       insertImgFn(element.fileUrl) //上传成功后把图片插入编辑器里
      //     }
      //   })
      // }
      // }
      //

      // 配置菜单
      this.editor.customConfig.menus = [
        "undo", // 撤销
        "redo", // 重复
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "image2",
      ];
      this.editor.customConfig.insertKeys = {
        index: 10, // 插入的位置，基于当前的 toolbarKeys
        keys: "image2",
      };

      this.editor.customConfig.onchange = (html) => {
        if (this.editor.id == "preview") {
            this.prevew_show=  true;
            console.log
        } else {
         
          this.info_ = html;

          if (!this.disable) {
            this.$emit("change", this.info_); // 将内容同步到父组件中
          }
        }
        this.editor.id = 'editor99';
 
      };

      this.editor.create(); // 创建富文本编辑器
      if (this.disable) {
        this.editor.disable(); //只读
      } else {
        this.editor.enable();
      }
    },
  },
};
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}

.toolbar {
  border: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
}

.text {
  border: 1px solid #ccc;
  border-top: none;
  min-height: 500px;
}
.w-e-preview {
  width: 40px;
  height: 40px;
  background: url("./images/preview.png") no-repeat;
  background-size: 16px 16px;
  background-position: center center;
}
</style>
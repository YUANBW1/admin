 
 
import E from 'wangeditor'
const {$, BtnMenu }=E;
 
export class Preview extends BtnMenu {
	constructor(editor){
		const $elem = $(
			`<div class="w-e-menu" data-title="预览">
				<i class="w-e-preview">
				</i>
			</div>`
		)
		super($elem, editor)
	}
	// 菜单点击事件
	clickHandler(e){
		//编辑器事件派发
 
 
     this.editor.id  = 'preview'
	 this.editor.change.emit()
		 
	}
	tryChangeActive(){
		   
		this.active()
		   
	}
	 
 
}

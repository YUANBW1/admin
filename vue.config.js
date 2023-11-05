const TimeStamp = new Date().getTime()
module.exports = {
  
    //publicPath: process.env.ENV === 'development'?'':'_admin',
    outputDir:process.env.ENV === 'production'?'dist':'dist-pre',
    lintOnSave: false,
    productionSourceMap: false,
   
    publicPath:process.env.ENV === 'production'?'/admin':'/',
    pages:{
        index:{
          entry:'src/main.js',
          title:'V-POKER' //页面标题配置
        }
      },
      configureWebpack: {
        output: {
            filename: `js/[name]-${TimeStamp}.js`,
            chunkFilename: `js/[name]-${TimeStamp}.js`
        }   
      },
      devServer: {
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
    
      }
    
}
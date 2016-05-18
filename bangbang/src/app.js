
//设置项目ID
var projectid = process.env.APP_PROJECTID || 'tiger-app-fw' ;

// 运行框架
require('@tiger/bfw').run(projectid);

### 监控后台部署教程

node版本号： 10.6.0  (node安装教程自行搜索)

mysql版本号. 5.6.45  (mysql 安装教程自行搜索 [Linux安装教程](https://www.cnblogs.com/warm-stranger/p/10333348.html))

  1. 下载或者克隆代码到本地
  
  2. 在根目录下执行命令$: node config.js 等待配置完成，然后执行命令$: npm run start
  
  3. 访问链接地址： [http://localhost:8010/home.html](http://localhost:8010/home.html) 即可看到官网数据。
  
  那么如何展示自己的数据呢？
  
  4. 在项目根目录下，进入 config/db.js ，配置mysql数据库的连接配置 （mysql必须先安装好）
  
  5. 在项目根目录下，config.js文件中，进行如下配置：
  
          /**
           * 请求接口域名 webfunny-servers 的服务的部署域名
           * 本地请使用 "//localhost:8011"
           */
          const default_api_server_url = "//localhost:8011"

         /**
          * 静态资源域名 webfunny-admin 的部署域名
          * 本地请使用 "//localhost:8010"
          */
          const default_assets_url = "//localhost:8010"

  6. 配置完成后，再一次执行命令$: node config.js  等待完成后，在根目录下执行命令$: npm run start, 本地服务完成启动。
  
  访问链接地址： [http://localhost:8010/home.html](http://localhost:8010/home.html) 即可看到你自己mysql里边的数据了（如果你的探针已经在上传数据了）。

  ps: 如需启动生产服务，需安装PM2, 然后运行命令$: npm run prd, 即可启动生产服务。
  ps2: 数据库表都是程序自动创建的，但是数据库需要你手动创建

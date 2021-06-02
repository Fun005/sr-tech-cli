const path = require('path')
const glob = require('glob')
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const ImageminPlugin = require('imagemin-webpack-plugin').default
const pxtovw = require('postcss-px-to-viewport');

function resolve (dir) {
	return path.join(__dirname, dir);
}

function getEntry (globPath) {
	let entries = {},
		basename, tmp, pathname, appname;

	glob.sync(globPath).forEach(function (entry) {
		basename = path.basename(entry, path.extname(entry));
		// console.log(entry)
		tmp = entry.split('/').splice(-3);
		console.log(tmp)
		pathname = basename; // 正确输出js和html的路径

		// console.log(pathname)
		entries[pathname] = {
			entry: './src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.js',
			template: './src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
			filename: tmp[2]
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');

let cssH5Config = {}

if (process.env.npm_package_config_type === 'h5') {
	cssH5Config = {
		loaderOptions: {
			postcss: {
				//给postcss-loader传递选项
				plugins: [
					new pxtovw({
						unitToConvert: 'px', //需要转换的单位，默认为"px"；
						viewportWidth: 750, //设计稿的视口宽度
						unitPrecision: 5, //单位转换后保留的小数位数
						propList: ['*'], //要进行转换的属性列表,*表示匹配所有,!表示不转换
						viewportUnit: 'vw', //转换后的视口单位
						fontViewportUnit: 'vw', //转换后字体使用的视口单位
						minPixelValue: 1, //设置最小的转换数值
						mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
						replace: true, //是否直接更换属性值，而不添加备用属性
						exclude: [/node_modules/] //忽略某些文件夹下的文件
					})
				]
			}
		}
	}
}

module.exports = {
	productionSourceMap: false,
	publicPath: './',
	devServer: {
		allowedHosts: [
			'.mgtv.com'
		],
		host: 'test.mgtv.com',
		// https: true,
		// port: 443
	},
	pages,
	css: cssH5Config,
	chainWebpack: config => {
		// config
		// 	.plugin('webpack-bundle-analyzer')
		// 	.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
		config.resolve.alias
			.set('@', resolve('src'))
			.set('resource', resolve('src/assets'))
	},
	configureWebpack: config => {
		if (process.env.NODE_ENV !== 'development') {

			config.externals = {
				// axios: 'axios',
				lodash: '_'
			}
			config.performance = {
				hints: 'warning',
				// 入口起点的最大体积
				maxEntrypointSize: 50000000,
				// 生成文件的最大体积
				maxAssetSize: 30000000,
				// 只给出 js 文件的性能提示
				assetFilter: function (assetFilename) {
					return assetFilename.endsWith('.js')
				}
			}

			// 图片压缩
			// config.plugins.push(
			// 	new ImageminPlugin({
			// 		disable: process.env.NODE_ENV !== 'production', // Disable during development
			// 		pngquant: {
			// 			quality: '65-80'
			// 		}
			// 	})
			// )

			// gzip压缩
			const productionGzipExtensions = ['html', 'js', 'css']
			config.plugins.push(
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp(
						'\\.(' + productionGzipExtensions.join('|') + ')$'
					),
					threshold: 10240, // 只有大小大于该值的资源会被处理 10240
					minRatio: 1, // 只有压缩率小于这个值的资源才会被处理
					deleteOriginalAssets: false // 删除原文件
				}),
			)

		}
	},
}
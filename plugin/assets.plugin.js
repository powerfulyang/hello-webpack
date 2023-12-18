class AssetsListPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('AssetsListPlugin', (compilation, callback) => {
      // 创建一个存储资源的对象
      const assets = {};

      // 遍历所有编译过的资源文件
      for (const asset in compilation.assets) {
        assets[asset] = compilation.assets[asset].size();
      }

      // 将资源对象转换为 JSON 字符串
      const json = JSON.stringify(assets, null, 2);

      // 将这个 JSON 字符串作为一个新的文件资源插入到 webpack 构建中
      const outputFilename = this.options.filename || 'assets-list.json';
      compilation.assets[outputFilename] = {
        source: () => json,
        size: () => json.length
      };

      callback();
    });
  }
}

module.exports = AssetsListPlugin;

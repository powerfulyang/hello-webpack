/**
 *
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
function webpackLoader(content, map, meta) {
  // 可以通过 this.data 获取 pitch 函数中设置的数据
  // console.log(this.data)

  const callback = this.async();

  // 创建一个具有特定解析选项的解析函数
  const resolve = this.getResolve({
    // 只解析 JavaScript 文件
    extensions: ['.js'],
    // 使用 `package.json` 中的 `main` 字段作为入口点
    mainFields: ['main'],
  });

  resolve(this.context, '@ffmpeg/ffmpeg', (err, resolvedPath) => {
    if (err) {
      // 如果解析过程中出现错误，处理错误
      return callback(err);
    }

    // 在这里，resolvedPath 是解析后的绝对路径
    // 你可以根据需要对该路径进行操作
    // 例如，读取文件内容或者在返回的源代码中引用它

    // 简单地将解析后的路径添加到源代码末尾作为示例
    callback(null, `${content}\n// Resolved path: ${resolvedPath}`);
  });
}

module.exports = webpackLoader;


module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  // 这是 pitch 函数
  // remainingRequest - 剩余请求字符串，表示 pitch 函数之后的 loaders 和资源路径
  // precedingRequest - 在当前 loader 之前的 loaders 字符串
  // data - 一个可以在 pitch 和常规 loader 函数之间共享的对象



  // 你可以在这里执行一些操作，甚至返回一个结果来跳过剩余的 loaders

  const callback = this.async();

  setTimeout(() => {
    data.metadata = 'pitch';
    callback();
  }, 10);
};

/**
 *
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
function webpackLoader(content, map, meta) {
  // **多个输出**:
  //
  // + `this.callback`: 允许你返回多个结果，比如除了处理后的内容外，还可以返回一个 source map 或其他元数据。
  // + `return`：只能返回一个输出，即处理后的内容。
  this.callback(null, content, map, meta);
}

module.exports = webpackLoader;

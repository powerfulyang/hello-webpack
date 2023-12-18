class HelloWorldPlugin{
  apply(compiler) {
    compiler.hooks.done.tap('HelloWorldPlugin', (stats) => {
      console.log('Hello World!');
    });
  }
}

module.exports = HelloWorldPlugin;

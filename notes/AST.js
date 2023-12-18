const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');


function modifyWorker(code) {
    // 解析代码生成 AST
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['dynamicImport']
    });

    // 遍历 AST
    traverse(ast, {
        NewExpression(path) {
            if (path.node.callee.name === 'Worker') {
                // 获取第二个参数
                const secondArg = path.node.arguments[1];

                if (t.isObjectExpression(secondArg)) {
                    // 检查是否包含 type: "module"
                    const hasTypeModule = secondArg.properties.some(
                        prop => t.isObjectProperty(prop) &&
                            t.isIdentifier(prop.key, {name: 'type'}) &&
                            t.isStringLiteral(prop.value, {value: 'module'})
                    );

                    if (hasTypeModule) {
                        // 添加新属性 name: "coop"
                        secondArg.properties.push(t.objectProperty(t.identifier('name'), t.stringLiteral('coop.ffmpeg')));
                    }
                }
            }
        }
    });

    // 生成修改后的代码
    const output = generate(ast, {}, code);
    return output.code;
}

module.exports = {modifyWorker}

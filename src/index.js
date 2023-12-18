// Tree Shaking: https://webpack.js.org/guides/tree-shaking/
import {join} from 'lodash-es'

function _join() {
    return join(['Hello', 'webpack'], ' ')
}

_join()

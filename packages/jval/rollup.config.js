import path from 'path'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const input = path.resolve( __dirname, './src/index.ts' )
const outDir = path.resolve( __dirname, './dist' )

const PKG_NAME = 'jval'

function gen( params ) {
  const { fmt, forProd } = params

  return {
    input,
    output: {
      file: genName( params ),
      format: fmt,
      sourcemap: !!forProd,
    },
    plugins: [
      resolve( { extensions: [ '.ts' ] } ),
      // json(),
      babel( {
        babelHelpers: 'bundled',
        extensions: [ '.ts' ],
      } ),
      ...( forProd ? [ terser() ] : [] )
    ],
  }
}

function genName( { name, fmt, forProd } ) {
  const nameParts = [ name, fmt ]
  if ( typeof forProd === 'boolean' ) {
    nameParts.push( forProd ? 'production.min' : 'development' )
  }
  nameParts.push( 'js' )
  const outFile = nameParts.join( '.' )
  return path.resolve( outDir, outFile )
}

export default [
  gen( { name: PKG_NAME, fmt: 'cjs', forProd: false } ),
  gen( { name: PKG_NAME, fmt: 'cjs', forProd: true } ),
  gen( { name: 'index', fmt: 'esm' } ),
]

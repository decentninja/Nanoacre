// This is auto-generated from pathfinding.cpp, DO NOT EDIT.
// Generate by:
// $ emcc -O2 -s ASM_JS=1 pathfinding.cpp --pre-js pathfinding.pre.js -o pathfinding.em.js -s EXPORTED_FUNCTIONS="['_setup_pathfinding', '_clear_pathfinding', '_pathfind', '_free_path']"
// #
// ########## START AUTO-GENERATED CODE ##########
// Note: For maximum-speed code, see "Optimizing Code" on the Emscripten wiki, https://github.com/kripken/emscripten/wiki/Optimizing-Code
// Note: Some Emscripten settings may limit the speed of the generated code.
try {
  this['Module'] = Module;
} catch(e) {
  this['Module'] = Module = {};
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function(filename) { return Module['read'](filename, true) };
  Module['load'] = function(f) {
    globalEval(read(f));
  };
  if (!Module['arguments']) {
    Module['arguments'] = process['argv'].slice(2);
  }
}
if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  Module['read'] = read;
  Module['readBinary'] = function(f) {
    return read(f, 'binary');
  };
  if (!Module['arguments']) {
    if (typeof scriptArgs != 'undefined') {
      Module['arguments'] = scriptArgs;
    } else if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) {
  if (!Module['print']) {
    Module['print'] = function(x) {
      console.log(x);
    };
  }
  if (!Module['printErr']) {
    Module['printErr'] = function(x) {
      console.log(x);
    };
  }
}
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (!Module['arguments']) {
    if (typeof arguments != 'undefined') {
      Module['arguments'] = arguments;
    }
  }
}
if (ENVIRONMENT_IS_WORKER) {
  // We can do very little here...
  var TRY_USE_DUMP = false;
  if (!Module['print']) {
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  Module['load'] = importScripts;
}
if (!ENVIRONMENT_IS_WORKER && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_SHELL) {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
if (!Module['preRun']) Module['preRun'] = [];
if (!Module['postRun']) Module['postRun'] = [];
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      var logg = log2(quantum);
      return '((((' +target + ')+' + (quantum-1) + ')>>' + logg + ')<<' + logg + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (/^\[\d+\ x\ (.*)\]/.test(type)) return true; // [15 x ?] blocks. Like structs
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type, quantumSize) {
    if (Runtime.QUANTUM_SIZE == 1) return 1;
    var size = {
      '%i1': 1,
      '%i8': 1,
      '%i16': 2,
      '%i32': 4,
      '%i64': 8,
      "%float": 4,
      "%double": 8
    }['%'+type]; // add '%' since float and double confuse Closure compiler as keys, and also spidermonkey as a compiler will remove 's from '_i8' etc
    if (!size) {
      if (type.charAt(type.length-1) == '*') {
        size = Runtime.QUANTUM_SIZE; // A pointer
      } else if (type[0] == 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 == 0);
        size = bits/8;
      }
    }
    return size;
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (type == 'i64' || type == 'double' || vararg) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    type.flatIndexes = type.fields.map(function(field) {
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        size = Types.types[field].flatSize;
        alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else {
        throw 'Unclear type in struct: ' + field + ', in ' + type.name_ + ' :: ' + dump(Types.types[type.name_]);
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2 + 2*i;
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xff;
      if (needed) {
        buffer.push(code);
        needed--;
      }
      if (buffer.length == 0) {
        if (code < 128) return String.fromCharCode(code);
        buffer.push(code);
        if (code > 191 && code < 224) {
          needed = 1;
        } else {
          needed = 2;
        }
        return '';
      }
      if (needed > 0) return '';
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var ret;
      if (c1 > 191 && c1 < 224) {
        ret = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      } else {
        ret = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = ((((STACKTOP)+7)>>3)<<3); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = ((((STATICTOP)+7)>>3)<<3); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = ((((DYNAMICTOP)+7)>>3)<<3); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+(((low)>>>(0))))+((+(((high)>>>(0))))*(+(4294967296)))) : ((+(((low)>>>(0))))+((+(((high)|(0))))*(+(4294967296))))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var ABORT = false;
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function abort(text) {
  Module.print(text + ':\n' + (new Error).stack);
  ABORT = true;
  throw "Assertion: " + text;
}
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = globalScope['Module']['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length+1);
      writeStringToMemory(value, ret);
      return ret;
    } else if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,Math.min(Math.floor((value)/(+(4294967296))), (+(4294967295)))>>>0],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    HEAPU8.set(new Uint8Array(slab), ret);
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return ((x+4095)>>12)<<12;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk
function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value, or (2) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(!!Int32Array && !!Float64Array && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATINIT__ = []; // functions called during startup
var __ATMAIN__ = []; // functions called when main() is to be run
var __ATEXIT__ = []; // functions called during shutdown
var runtimeInitialized = false;
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math.imul) Math.imul = function(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyTracking = {};
var calledInit = false, calledRun = false;
var runDependencyWatcher = null;
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 6000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    } 
    // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
    if (!calledRun && shouldRunNow) run();
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
function addPreRun(func) {
  if (!Module['preRun']) Module['preRun'] = [];
  else if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
  Module['preRun'].push(func);
}
var awaitingMemoryInitializer = false;
function loadMemoryInitializer(filename) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
    runPostSets();
  }
  // always do this asynchronously, to keep shell and web as similar as possible
  addPreRun(function() {
    if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
      applyData(Module['readBinary'](filename));
    } else {
      Browser.asyncLoad(filename, function(data) {
        applyData(data);
      }, function(data) {
        throw 'could not load memory initializer ' + filename;
      });
    }
  });
  awaitingMemoryInitializer = false;
}
// === Body ===
STATIC_BASE = 8;
STATICTOP = STATIC_BASE + 13752;
var _stdout;
var _stdin;
var _stderr;
__ATINIT__ = __ATINIT__.concat([
  { func: function() { __GLOBAL__I_a() } }
]);
var ___fsmu8;
var ___dso_handle;
var __ZTVN10__cxxabiv120__si_class_type_infoE;
var __ZTVN10__cxxabiv117__class_type_infoE;
var __ZTISt9exception;
var _stdout = _stdout=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stdin = _stdin=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stderr = _stderr=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,128,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,144,47,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* memory initializer */ allocate([0,0,0,0,0,0,36,64,0,0,0,0,0,0,89,64,0,0,0,0,0,136,195,64,0,0,0,0,132,215,151,65,0,128,224,55,121,195,65,67,23,110,5,181,181,184,147,70,245,249,63,233,3,79,56,77,50,29,48,249,72,119,130,90,60,191,115,127,221,79,21,117,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,117,108,0,0,0,0,0,74,117,110,0,0,0,0,0,65,112,114,0,0,0,0,0,77,97,114,0,0,0,0,0,70,101,98,0,0,0,0,0,74,97,110,0,0,0,0,0,68,101,99,101,109,98,101,114,0,0,0,0,0,0,0,0,78,111,118,101,109,98,101,114,0,0,0,0,0,0,0,0,79,99,116,111,98,101,114,0,83,101,112,116,101,109,98,101,114,0,0,0,0,0,0,0,117,110,115,117,112,112,111,114,116,101,100,32,108,111,99,97,108,101,32,102,111,114,32,115,116,97,110,100,97,114,100,32,105,110,112,117,116,0,0,0,65,117,103,117,115,116,0,0,74,117,108,121,0,0,0,0,74,117,110,101,0,0,0,0,77,97,121,0,0,0,0,0,65,112,114,105,108,0,0,0,77,97,114,99,104,0,0,0,70,101,98,114,117,97,114,121,0,0,0,0,0,0,0,0,98,97,115,105,99,95,115,116,114,105,110,103,0,0,0,0,74,97,110,117,97,114,121,0,68,0,0,0,101,0,0,0,99,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,111,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,116,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,117,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,105,0,0,0,108,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,99,0,0,0,104,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,114,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,80,77,0,0,0,0,0,0,65,77,0,0,0,0,0,0,80,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,65,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,108,111,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,0,0,0,97,0,0,0,32,0,0,0,37,0,0,0,98,0,0,0,32,0,0,0,37,0,0,0,100,0,0,0,32,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,89,0,0,0,0,0,0,0,0,0,0,0,37,97,32,37,98,32,37,100,32,37,72,58,37,77,58,37,83,32,37,89,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,102,0,0,0,97,0,0,0,108,0,0,0,115,0,0,0,101,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,116,0,0,0,114,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,105,111,115,95,98,97,115,101,58,58,99,108,101,97,114,0,67,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,99,97,115,116,0,0,0,118,101,99,116,111,114,0,0,37,46,48,76,102,0,0,0,105,111,115,116,114,101,97,109,0,0,0,0,0,0,0,0,109,111,110,101,121,95,103,101,116,32,101,114,114,111,114,0,83,97,116,0,0,0,0,0,70,114,105,0,0,0,0,0,37,76,102,0,0,0,0,0,84,104,117,0,0,0,0,0,87,101,100,0,0,0,0,0,84,117,101,0,0,0,0,0,77,111,110,0,0,0,0,0,83,117,110,0,0,0,0,0,83,97,116,117,114,100,97,121,0,0,0,0,0,0,0,0,70,114,105,100,97,121,0,0,84,104,117,114,115,100,97,121,0,0,0,0,0,0,0,0,87,101,100,110,101,115,100,97,121,0,0,0,0,0,0,0,84,117,101,115,100,97,121,0,77,111,110,100,97,121,0,0,83,117,110,100,97,121,0,0,58,32,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,0,0,0,0,117,110,115,112,101,99,105,102,105,101,100,32,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,117,0,0,0,114,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,114,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,110,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,68,101,99,0,0,0,0,0,78,111,118,0,0,0,0,0,79,99,116,0,0,0,0,0,83,101,112,0,0,0,0,0,65,117,103,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,37,0,0,0,89,0,0,0,45,0,0,0,37,0,0,0,109,0,0,0,45,0,0,0,37,0,0,0,100,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,72,58,37,77,58,37,83,37,72,58,37,77,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,89,45,37,109,45,37,100,37,109,47,37,100,47,37,121,37,72,58,37,77,58,37,83,37,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,0,0,0,0,0,0,240,191,0,0,0,0,152,41,0,0,66,0,0,0,48,1,0,0,26,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,41,0,0,254,1,0,0,154,1,0,0,202,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,41,0,0,184,0,0,0,208,2,0,0,214,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,41,0,0,246,0,0,0,16,0,0,0,66,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,41,0,0,246,0,0,0,40,0,0,0,66,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,41,0,0,162,1,0,0,218,0,0,0,116,0,0,0,200,1,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,42,0,0,134,2,0,0,208,1,0,0,116,0,0,0,162,2,0,0,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,42,0,0,152,1,0,0,212,1,0,0,116,0,0,0,202,1,0,0,182,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,42,0,0,200,2,0,0,106,1,0,0,116,0,0,0,188,1,0,0,6,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,42,0,0,190,2,0,0,36,0,0,0,116,0,0,0,120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,43,0,0,150,1,0,0,32,1,0,0,116,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,43,0,0,84,0,0,0,34,1,0,0,116,0,0,0,104,2,0,0,20,0,0,0,214,1,0,0,28,0,0,0,198,0,0,0,106,2,0,0,224,0,0,0,248,255,255,255,48,43,0,0,112,0,0,0,44,0,0,0,176,0,0,0,72,0,0,0,8,0,0,0,162,0,0,0,136,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,43,0,0,174,2,0,0,116,2,0,0,116,0,0,0,108,0,0,0,124,0,0,0,138,2,0,0,118,1,0,0,160,0,0,0,14,0,0,0,86,2,0,0,248,255,255,255,88,43,0,0,96,1,0,0,40,2,0,0,88,2,0,0,124,2,0,0,54,1,0,0,236,0,0,0,14,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,43,0,0,208,0,0,0,218,1,0,0,116,0,0,0,254,0,0,0,222,0,0,0,114,0,0,0,98,1,0,0,172,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,43,0,0,150,0,0,0,170,0,0,0,116,0,0,0,230,0,0,0,206,1,0,0,156,0,0,0,194,1,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,43,0,0,178,2,0,0,2,0,0,0,116,0,0,0,130,1,0,0,194,2,0,0,22,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,43,0,0,110,0,0,0,82,2,0,0,116,0,0,0,114,2,0,0,206,0,0,0,180,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,43,0,0,98,2,0,0,44,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,43,0,0,62,0,0,0,104,1,0,0,214,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,43,0,0,12,0,0,0,168,1,0,0,116,0,0,0,12,2,0,0,82,0,0,0,76,0,0,0,80,0,0,0,74,0,0,0,90,0,0,0,88,0,0,0,148,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,44,0,0,252,0,0,0,38,0,0,0,116,0,0,0,248,1,0,0,252,1,0,0,242,1,0,0,250,1,0,0,240,1,0,0,246,1,0,0,244,1,0,0,170,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,44,0,0,86,0,0,0,46,0,0,0,116,0,0,0,50,2,0,0,48,2,0,0,38,2,0,0,42,2,0,0,204,1,0,0,46,2,0,0,36,2,0,0,56,2,0,0,54,2,0,0,52,2,0,0,82,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,44,0,0,128,0,0,0,4,0,0,0,116,0,0,0,170,2,0,0,160,2,0,0,154,2,0,0,156,2,0,0,132,2,0,0,158,2,0,0,152,2,0,0,158,1,0,0,166,2,0,0,164,2,0,0,44,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,44,0,0,196,0,0,0,238,0,0,0,116,0,0,0,78,1,0,0,238,1,0,0,36,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,44,0,0,60,0,0,0,174,1,0,0,116,0,0,0,232,1,0,0,76,2,0,0,42,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,44,0,0,126,2,0,0,90,1,0,0,116,0,0,0,234,1,0,0,134,0,0,0,230,1,0,0,94,0,0,0,52,1,0,0,106,0,0,0,124,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,44,0,0,182,1,0,0,154,0,0,0,116,0,0,0,52,0,0,0,28,1,0,0,164,0,0,0,58,2,0,0,20,2,0,0,190,1,0,0,16,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,44,0,0,182,1,0,0,94,1,0,0,116,0,0,0,192,2,0,0,136,0,0,0,68,0,0,0,196,2,0,0,242,0,0,0,244,0,0,0,104,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,44,0,0,182,1,0,0,132,1,0,0,116,0,0,0,66,1,0,0,70,1,0,0,4,2,0,0,190,0,0,0,120,1,0,0,142,0,0,0,68,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,45,0,0,182,1,0,0,70,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,45,0,0,144,0,0,0,138,1,0,0,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,45,0,0,182,1,0,0,212,0,0,0,116,0,0,0,110,1,0,0,182,0,0,0,64,1,0,0,186,2,0,0,186,0,0,0,8,2,0,0,222,1,0,0,56,0,0,0,118,0,0,0,92,2,0,0,16,1,0,0,188,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,45,0,0,206,2,0,0,78,0,0,0,116,0,0,0,22,0,0,0,50,0,0,0,84,1,0,0,84,2,0,0,138,0,0,0,88,1,0,0,156,1,0,0,146,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,45,0,0,174,0,0,0,108,2,0,0,142,1,0,0,14,2,0,0,56,1,0,0,78,2,0,0,68,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,45,0,0,182,1,0,0,220,0,0,0,116,0,0,0,66,1,0,0,70,1,0,0,4,2,0,0,190,0,0,0,120,1,0,0,142,0,0,0,68,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,45,0,0,182,1,0,0,168,2,0,0,116,0,0,0,66,1,0,0,70,1,0,0,4,2,0,0,190,0,0,0,120,1,0,0,142,0,0,0,68,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,45,0,0,74,1,0,0,144,2,0,0,192,0,0,0,128,1,0,0,248,0,0,0,198,1,0,0,224,1,0,0,30,2,0,0,62,2,0,0,146,0,0,0,130,0,0,0,122,0,0,0,202,2,0,0,216,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,45,0,0,18,0,0,0,50,1,0,0,220,1,0,0,128,2,0,0,122,2,0,0,38,1,0,0,0,1,0,0,210,1,0,0,80,1,0,0,32,0,0,0,58,0,0,0,146,2,0,0,60,1,0,0,152,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,240,45,0,0,102,0,0,0,72,2,0,0,252,255,255,255,252,255,255,255,240,45,0,0,114,1,0,0,72,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,8,46,0,0,100,2,0,0,148,2,0,0,252,255,255,255,252,255,255,255,8,46,0,0,30,1,0,0,10,2,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,32,46,0,0,226,0,0,0,210,2,0,0,248,255,255,255,248,255,255,255,32,46,0,0,184,1,0,0,142,2,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,56,46,0,0,26,1,0,0,34,2,0,0,248,255,255,255,248,255,255,255,56,46,0,0,100,1,0,0,126,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,46,0,0,24,2,0,0,186,1,0,0,214,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,46,0,0,180,2,0,0,120,2,0,0,34,0,0,0,128,1,0,0,248,0,0,0,198,1,0,0,20,1,0,0,30,2,0,0,62,2,0,0,146,0,0,0,130,0,0,0,122,0,0,0,202,2,0,0,150,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,46,0,0,134,1,0,0,180,1,0,0,40,1,0,0,128,2,0,0,122,2,0,0,38,1,0,0,226,1,0,0,210,1,0,0,80,1,0,0,32,0,0,0,58,0,0,0,146,2,0,0,60,1,0,0,172,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,46,0,0,110,2,0,0,112,1,0,0,116,0,0,0,92,1,0,0,94,2,0,0,116,1,0,0,188,2,0,0,54,0,0,0,10,1,0,0,8,1,0,0,210,0,0,0,86,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,46,0,0,22,1,0,0,140,0,0,0,116,0,0,0,74,2,0,0,10,0,0,0,28,2,0,0,112,2,0,0,130,2,0,0,232,0,0,0,80,2,0,0,176,1,0,0,132,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,46,0,0,118,2,0,0,46,1,0,0,116,0,0,0,92,0,0,0,42,1,0,0,148,1,0,0,136,1,0,0,140,2,0,0,178,1,0,0,2,2,0,0,196,1,0,0,24,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,47,0,0,204,0,0,0,166,1,0,0,116,0,0,0,32,2,0,0,60,2,0,0,4,1,0,0,90,2,0,0,240,0,0,0,194,0,0,0,144,1,0,0,70,2,0,0,64,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,47,0,0,228,0,0,0,178,0,0,0,96,0,0,0,128,1,0,0,248,0,0,0,198,1,0,0,224,1,0,0,30,2,0,0,62,2,0,0,102,1,0,0,192,1,0,0,166,0,0,0,202,2,0,0,216,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,47,0,0,26,0,0,0,102,2,0,0,236,1,0,0,128,2,0,0,122,2,0,0,38,1,0,0,0,1,0,0,210,1,0,0,80,1,0,0,18,1,0,0,198,2,0,0,30,0,0,0,60,1,0,0,152,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,47,0,0,184,2,0,0,0,2,0,0,158,0,0,0,126,1,0,0,200,0,0,0,64,0,0,0,96,2,0,0,12,1,0,0,0,0,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,83,116,56,98,97,100,95,99,97,115,116,0,0,0,0,0,83,116,49,51,114,117,110,116,105,109,101,95,101,114,114,111,114,0,0,0,0,0,0,0,83,116,49,50,108,101,110,103,116,104,95,101,114,114,111,114,0,0,0,0,0,0,0,0,83,116,49,49,108,111,103,105,99,95,101,114,114,111,114,0,78,83,116,51,95,95,49,57,116,105,109,101,95,98,97,115,101,69,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,55,102,97,105,108,117,114,101,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,119,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,99,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,119,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,99,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,115,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,105,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,102,97,99,101,116,69,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,95,95,105,109,112,69,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,99,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,99,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,57,95,95,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,69,0,0,0,78,83,116,51,95,95,49,49,55,95,95,119,105,100,101,110,95,102,114,111,109,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,49,54,95,95,110,97,114,114,111,119,95,116,111,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,112,117,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,103,101,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,51,109,101,115,115,97,103,101,115,95,98,97,115,101,69,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,50,115,121,115,116,101,109,95,101,114,114,111,114,69,0,0,78,83,116,51,95,95,49,49,50,99,111,100,101,99,118,116,95,98,97,115,101,69,0,0,78,83,116,51,95,95,49,49,50,95,95,100,111,95,109,101,115,115,97,103,101,69,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117].concat([110,99,116,73,119,76,98,49,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,49,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,99,116,121,112,101,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,116,105,109,101,95,112,117,116,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,119,69,69,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,99,69,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,0,0,0,0,248,29,0,0,0,0,0,0,8,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,30,0,0,216,41,0,0,0,0,0,0,0,0,0,0,88,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,30,0,0,208,29,0,0,128,30,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,152,46,0,0,0,0,0,0,208,29,0,0,200,30,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,160,46,0,0,0,0,0,0,208,29,0,0,16,31,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,168,46,0,0,0,0,0,0,208,29,0,0,88,31,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,176,46,0,0,0,0,0,0,0,0,0,0,160,31,0,0,224,43,0,0,0,0,0,0,0,0,0,0,208,31,0,0,224,43,0,0,0,0,0,0,208,29,0,0,0,32,0,0,0,0,0,0,1,0,0,0,216,45,0,0,0,0,0,0,208,29,0,0,24,32,0,0,0,0,0,0,1,0,0,0,216,45,0,0,0,0,0,0,208,29,0,0,48,32,0,0,0,0,0,0,1,0,0,0,224,45,0,0,0,0,0,0,208,29,0,0,72,32,0,0,0,0,0,0,1,0,0,0,224,45,0,0,0,0,0,0,208,29,0,0,96,32,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,72,47,0,0,0,8,0,0,208,29,0,0,168,32,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,72,47,0,0,0,8,0,0,208,29,0,0,240,32,0,0,0,0,0,0,3,0,0,0,24,45,0,0,2,0,0,0,232,41,0,0,2,0,0,0,120,45,0,0,0,8,0,0,208,29,0,0,56,33,0,0,0,0,0,0,3,0,0,0,24,45,0,0,2,0,0,0,232,41,0,0,2,0,0,0,128,45,0,0,0,8,0,0,0,0,0,0,128,33,0,0,24,45,0,0,0,0,0,0,0,0,0,0,152,33,0,0,24,45,0,0,0,0,0,0,208,29,0,0,176,33,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,232,45,0,0,2,0,0,0,208,29,0,0,200,33,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,232,45,0,0,2,0,0,0,0,0,0,0,224,33,0,0,0,0,0,0,248,33,0,0,80,46,0,0,0,0,0,0,208,29,0,0,24,34,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,144,42,0,0,0,0,0,0,208,29,0,0,96,34,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,168,42,0,0,0,0,0,0,208,29,0,0,168,34,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,192,42,0,0,0,0,0,0,208,29,0,0,240,34,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,216,42,0,0,0,0,0,0,0,0,0,0,56,35,0,0,24,45,0,0,0,0,0,0,0,0,0,0,80,35,0,0,24,45,0,0,0,0,0,0,208,29,0,0,104,35,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,96,46,0,0,2,0,0,0,208,29,0,0,144,35,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,96,46,0,0,2,0,0,0,208,29,0,0,184,35,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,96,46,0,0,2,0,0,0,208,29,0,0,224,35,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,96,46,0,0,2,0,0,0,0,0,0,0,8,36,0,0,208,45,0,0,0,0,0,0,0,0,0,0,32,36,0,0,24,45,0,0,0,0,0,0,208,29,0,0,56,36,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,64,47,0,0,2,0,0,0,208,29,0,0,80,36,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,64,47,0,0,2,0,0,0,0,0,0,0,104,36,0,0,0,0,0,0,144,36,0,0,0,0,0,0,184,36,0,0,104,46,0,0,0,0,0,0,0,0,0,0,216,36,0,0,248,44,0,0,0,0,0,0,0,0,0,0,0,37,0,0,248,44,0,0,0,0,0,0,0,0,0,0,40,37,0,0,0,0,0,0,96,37,0,0,0,0,0,0,152,37,0,0,0,0,0,0,184,37,0,0,0,0,0,0,216,37,0,0,0,0,0,0,248,37,0,0,0,0,0,0,24,38,0,0,208,29,0,0,48,38,0,0,0,0,0,0,1,0,0,0,112,42,0,0,3,244,255,255,208,29,0,0,96,38,0,0,0,0,0,0,1,0,0,0,128,42,0,0,3,244,255,255,208,29,0,0,144,38,0,0,0,0,0,0,1,0,0,0,112,42,0,0,3,244,255,255,208,29,0,0,192,38,0,0,0,0,0,0,1,0,0,0,128,42,0,0,3,244,255,255,0,0,0,0,240,38,0,0,184,41,0,0,0,0,0,0,0,0,0,0,8,39,0,0,0,0,0,0,32,39,0,0,200,45,0,0,0,0,0,0,0,0,0,0,56,39,0,0,184,45,0,0,0,0,0,0,0,0,0,0,88,39,0,0,192,45,0,0,0,0,0,0,0,0,0,0,120,39,0,0,0,0,0,0,152,39,0,0,0,0,0,0,184,39,0,0,0,0,0,0,216,39,0,0,208,29,0,0,248,39,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,56,47,0,0,2,0,0,0,208,29,0,0,24,40,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,56,47,0,0,2,0,0,0,208,29,0,0,56,40,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,56,47,0,0,2,0,0,0,208,29,0,0,88,40,0,0,0,0,0,0,2,0,0,0,24,45,0,0,2,0,0,0,56,47,0,0,2,0,0,0,0,0,0,0,120,40,0,0,0,0,0,0,144,40,0,0,0,0,0,0,168,40,0,0,0,0,0,0,192,40,0,0,184,45,0,0,0,0,0,0,0,0,0,0,216,40,0,0,192,45,0,0,0,0,0,0,0,0,0,0,240,40,0,0,144,47,0,0,0,0,0,0,0,0,0,0,24,41,0,0,144,47,0,0,0,0,0,0,0,0,0,0,64,41,0,0,160,47,0,0,0,0,0,0,0,0,0,0,104,41,0,0,144,41,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,0,0,0,0,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,65,66,67,68,69,70,120,88,43,45,112,80,105,73,110,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
, "i8", ALLOC_NONE, Runtime.GLOBAL_BASE)
function runPostSets() {
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(8))>>2)]=(696);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(12))>>2)]=(332);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(16))>>2)]=(158);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(20))>>2)]=(382);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(24))>>2)]=(200);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(28))>>2)]=(98);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(32))>>2)]=(234);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(36))>>2)]=(262);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(8))>>2)]=(696);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(12))>>2)]=(688);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(16))>>2)]=(158);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(20))>>2)]=(382);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(24))>>2)]=(200);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(28))>>2)]=(530);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(32))>>2)]=(258);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(36))>>2)]=(396);
HEAP32[((10640)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((10648)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((10656)>>2)]=__ZTISt9exception;
HEAP32[((10664)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((10672)>>2)]=__ZTISt9exception;
HEAP32[((10680)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((10688)>>2)]=__ZTISt9exception;
HEAP32[((10696)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((10712)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((10720)>>2)]=__ZTISt9exception;
HEAP32[((10728)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((10864)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((10880)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11136)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11152)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11232)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11240)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11384)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11400)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11544)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11560)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11640)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11648)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11656)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11672)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11688)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11704)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11712)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11720)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11728)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11736)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11744)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11752)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11856)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11872)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11880)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11896)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11912)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((11928)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11936)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11944)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((11952)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((12088)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((12096)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((12104)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((12112)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((12128)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((12144)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((12160)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((12176)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((12192)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
}
if (!awaitingMemoryInitializer) runPostSets();
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;
  function ___gxx_personality_v0() {
    }
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      function ExitStatus() {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status;
        Module.print('Exit Status: ' + status);
      };
      ExitStatus.prototype = new Error();
      ExitStatus.prototype.constructor = ExitStatus;
      exitRuntime();
      ABORT = true;
      throw new ExitStatus();
    }function _exit(status) {
      __exit(status);
    }function __ZSt9terminatev() {
      _exit(-1234);
    }
  function _llvm_umul_with_overflow_i32(x, y) {
      x = x>>>0;
      y = y>>>0;
      return ((asm.setTempRet0(x*y > 4294967295),(x*y)>>>0)|0);
    }
  function ___cxa_call_unexpected(exception) {
      Module.printErr('Unexpected exception thrown, this is not properly supported - aborting');
      ABORT = true;
      throw exception;
    }
  Module["_memmove"] = _memmove;var _llvm_memmove_p0i8_p0i8_i32=_memmove;
  var _sqrt=Math.sqrt;
  function _pthread_mutex_lock() {}
  function _pthread_mutex_unlock() {}
  function _pthread_cond_broadcast() {
      return 0;
    }
  function _pthread_cond_wait() {
      return 0;
    }
  function _atexit(func, arg) {
      __ATEXIT__.unshift({ func: func, arg: arg });
    }var ___cxa_atexit=_atexit;
  function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }
  function ___cxa_free_exception(ptr) {
      return _free(ptr);
    }
  function _llvm_eh_exception() {
      return HEAP32[((_llvm_eh_exception.buf)>>2)];
    }
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }
  function ___cxa_is_number_type(type) {
      var isNumber = false;
      try { if (type == __ZTIi) isNumber = true } catch(e){}
      try { if (type == __ZTIj) isNumber = true } catch(e){}
      try { if (type == __ZTIl) isNumber = true } catch(e){}
      try { if (type == __ZTIm) isNumber = true } catch(e){}
      try { if (type == __ZTIx) isNumber = true } catch(e){}
      try { if (type == __ZTIy) isNumber = true } catch(e){}
      try { if (type == __ZTIf) isNumber = true } catch(e){}
      try { if (type == __ZTId) isNumber = true } catch(e){}
      try { if (type == __ZTIe) isNumber = true } catch(e){}
      try { if (type == __ZTIc) isNumber = true } catch(e){}
      try { if (type == __ZTIa) isNumber = true } catch(e){}
      try { if (type == __ZTIh) isNumber = true } catch(e){}
      try { if (type == __ZTIs) isNumber = true } catch(e){}
      try { if (type == __ZTIt) isNumber = true } catch(e){}
      return isNumber;
    }function ___cxa_does_inherit(definiteType, possibilityType, possibility) {
      if (possibility == 0) return false;
      if (possibilityType == 0 || possibilityType == definiteType)
        return true;
      var possibility_type_info;
      if (___cxa_is_number_type(possibilityType)) {
        possibility_type_info = possibilityType;
      } else {
        var possibility_type_infoAddr = HEAP32[((possibilityType)>>2)] - 8;
        possibility_type_info = HEAP32[((possibility_type_infoAddr)>>2)];
      }
      switch (possibility_type_info) {
      case 0: // possibility is a pointer
        // See if definite type is a pointer
        var definite_type_infoAddr = HEAP32[((definiteType)>>2)] - 8;
        var definite_type_info = HEAP32[((definite_type_infoAddr)>>2)];
        if (definite_type_info == 0) {
          // Also a pointer; compare base types of pointers
          var defPointerBaseAddr = definiteType+8;
          var defPointerBaseType = HEAP32[((defPointerBaseAddr)>>2)];
          var possPointerBaseAddr = possibilityType+8;
          var possPointerBaseType = HEAP32[((possPointerBaseAddr)>>2)];
          return ___cxa_does_inherit(defPointerBaseType, possPointerBaseType, possibility);
        } else
          return false; // one pointer and one non-pointer
      case 1: // class with no base class
        return false;
      case 2: // class with base class
        var parentTypeAddr = possibilityType + 8;
        var parentType = HEAP32[((parentTypeAddr)>>2)];
        return ___cxa_does_inherit(definiteType, parentType, possibility);
      default:
        return false; // some unencountered type
      }
    }
  function ___resumeException(ptr) {
      if (HEAP32[((_llvm_eh_exception.buf)>>2)] == 0) HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr;
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = HEAP32[((_llvm_eh_exception.buf)>>2)];
      if (throwntype == -1) throwntype = HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)];
      var typeArray = Array.prototype.slice.call(arguments, 2);
      // If throwntype is a pointer, this means a pointer has been
      // thrown. When a pointer is thrown, actually what's thrown
      // is a pointer to the pointer. We'll dereference it.
      if (throwntype != 0 && !___cxa_is_number_type(throwntype)) {
        var throwntypeInfoAddr= HEAP32[((throwntype)>>2)] - 8;
        var throwntypeInfo= HEAP32[((throwntypeInfoAddr)>>2)];
        if (throwntypeInfo == 0)
          thrown = HEAP32[((thrown)>>2)];
      }
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var i = 0; i < typeArray.length; i++) {
        if (___cxa_does_inherit(typeArray[i], throwntype, thrown))
          return ((asm.setTempRet0(typeArray[i]),thrown)|0);
      }
      // Shouldn't happen unless we have bogus data in typeArray
      // or encounter a type for which emscripten doesn't have suitable
      // typeinfo defined. Best-efforts match just in case.
      return ((asm.setTempRet0(throwntype),thrown)|0);
    }function ___cxa_throw(ptr, type, destructor) {
      if (!___cxa_throw.initialized) {
        try {
          HEAP32[((__ZTVN10__cxxabiv119__pointer_type_infoE)>>2)]=0; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv117__class_type_infoE)>>2)]=1; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv120__si_class_type_infoE)>>2)]=2; // Workaround for libcxxabi integration bug
        } catch(e){}
        ___cxa_throw.initialized = true;
      }
      HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=type
      HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=destructor
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }
  function ___cxa_begin_catch(ptr) {
      __ZSt18uncaught_exceptionv.uncaught_exception--;
      return ptr;
    }
  function ___cxa_end_catch() {
      if (___cxa_end_catch.rethrown) {
        ___cxa_end_catch.rethrown = false;
        return;
      }
      // Clear state flag.
      asm.setThrew(0);
      // Clear type.
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=0
      // Call destructor if one is registered then clear it.
      var ptr = HEAP32[((_llvm_eh_exception.buf)>>2)];
      var destructor = HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)];
      if (destructor) {
        Runtime.dynCall('vi', destructor, [ptr]);
        HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=0
      }
      // Free ptr if it isn't null.
      if (ptr) {
        ___cxa_free_exception(ptr);
        HEAP32[((_llvm_eh_exception.buf)>>2)]=0
      }
    }
  Module["_strlen"] = _strlen;
  var ERRNO_CODES={E2BIG:7,EACCES:13,EADDRINUSE:98,EADDRNOTAVAIL:99,EAFNOSUPPORT:97,EAGAIN:11,EALREADY:114,EBADF:9,EBADMSG:74,EBUSY:16,ECANCELED:125,ECHILD:10,ECONNABORTED:103,ECONNREFUSED:111,ECONNRESET:104,EDEADLK:35,EDESTADDRREQ:89,EDOM:33,EDQUOT:122,EEXIST:17,EFAULT:14,EFBIG:27,EHOSTUNREACH:113,EIDRM:43,EILSEQ:84,EINPROGRESS:115,EINTR:4,EINVAL:22,EIO:5,EISCONN:106,EISDIR:21,ELOOP:40,EMFILE:24,EMLINK:31,EMSGSIZE:90,EMULTIHOP:72,ENAMETOOLONG:36,ENETDOWN:100,ENETRESET:102,ENETUNREACH:101,ENFILE:23,ENOBUFS:105,ENODATA:61,ENODEV:19,ENOENT:2,ENOEXEC:8,ENOLCK:37,ENOLINK:67,ENOMEM:12,ENOMSG:42,ENOPROTOOPT:92,ENOSPC:28,ENOSR:63,ENOSTR:60,ENOSYS:38,ENOTCONN:107,ENOTDIR:20,ENOTEMPTY:39,ENOTRECOVERABLE:131,ENOTSOCK:88,ENOTSUP:95,ENOTTY:25,ENXIO:6,EOPNOTSUPP:45,EOVERFLOW:75,EOWNERDEAD:130,EPERM:1,EPIPE:32,EPROTO:71,EPROTONOSUPPORT:93,EPROTOTYPE:91,ERANGE:34,EROFS:30,ESPIPE:29,ESRCH:3,ESTALE:116,ETIME:62,ETIMEDOUT:110,ETXTBSY:26,EWOULDBLOCK:11,EXDEV:18};
  function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      if (!___setErrNo.ret) ___setErrNo.ret = allocate([0], 'i32', ALLOC_NORMAL);
      HEAP32[((___setErrNo.ret)>>2)]=value
      return value;
    }
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  var __impure_ptr=allocate(1, "i32*", ALLOC_STATIC);var FS={currentPath:"/",nextInode:2,streams:[null],ignorePermissions:true,joinPath:function (parts, forceRelative) {
        var ret = parts[0];
        for (var i = 1; i < parts.length; i++) {
          if (ret[ret.length-1] != '/') ret += '/';
          ret += parts[i];
        }
        if (forceRelative && ret[0] == '/') ret = ret.substr(1);
        return ret;
      },absolutePath:function (relative, base) {
        if (typeof relative !== 'string') return null;
        if (base === undefined) base = FS.currentPath;
        if (relative && relative[0] == '/') base = '';
        var full = base + '/' + relative;
        var parts = full.split('/').reverse();
        var absolute = [''];
        while (parts.length) {
          var part = parts.pop();
          if (part == '' || part == '.') {
            // Nothing.
          } else if (part == '..') {
            if (absolute.length > 1) absolute.pop();
          } else {
            absolute.push(part);
          }
        }
        return absolute.length == 1 ? '/' : absolute.join('/');
      },analyzePath:function (path, dontResolveLastLink, linksVisited) {
        var ret = {
          isRoot: false,
          exists: false,
          error: 0,
          name: null,
          path: null,
          object: null,
          parentExists: false,
          parentPath: null,
          parentObject: null
        };
        path = FS.absolutePath(path);
        if (path == '/') {
          ret.isRoot = true;
          ret.exists = ret.parentExists = true;
          ret.name = '/';
          ret.path = ret.parentPath = '/';
          ret.object = ret.parentObject = FS.root;
        } else if (path !== null) {
          linksVisited = linksVisited || 0;
          path = path.slice(1).split('/');
          var current = FS.root;
          var traversed = [''];
          while (path.length) {
            if (path.length == 1 && current.isFolder) {
              ret.parentExists = true;
              ret.parentPath = traversed.length == 1 ? '/' : traversed.join('/');
              ret.parentObject = current;
              ret.name = path[0];
            }
            var target = path.shift();
            if (!current.isFolder) {
              ret.error = ERRNO_CODES.ENOTDIR;
              break;
            } else if (!current.read) {
              ret.error = ERRNO_CODES.EACCES;
              break;
            } else if (!current.contents.hasOwnProperty(target)) {
              ret.error = ERRNO_CODES.ENOENT;
              break;
            }
            current = current.contents[target];
            if (current.link && !(dontResolveLastLink && path.length == 0)) {
              if (linksVisited > 40) { // Usual Linux SYMLOOP_MAX.
                ret.error = ERRNO_CODES.ELOOP;
                break;
              }
              var link = FS.absolutePath(current.link, traversed.join('/'));
              ret = FS.analyzePath([link].concat(path).join('/'),
                                   dontResolveLastLink, linksVisited + 1);
              return ret;
            }
            traversed.push(target);
            if (path.length == 0) {
              ret.exists = true;
              ret.path = traversed.join('/');
              ret.object = current;
            }
          }
        }
        return ret;
      },findObject:function (path, dontResolveLastLink) {
        FS.ensureRoot();
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },createObject:function (parent, name, properties, canRead, canWrite) {
        if (!parent) parent = '/';
        if (typeof parent === 'string') parent = FS.findObject(parent);
        if (!parent) {
          ___setErrNo(ERRNO_CODES.EACCES);
          throw new Error('Parent path must exist.');
        }
        if (!parent.isFolder) {
          ___setErrNo(ERRNO_CODES.ENOTDIR);
          throw new Error('Parent must be a folder.');
        }
        if (!parent.write && !FS.ignorePermissions) {
          ___setErrNo(ERRNO_CODES.EACCES);
          throw new Error('Parent folder must be writeable.');
        }
        if (!name || name == '.' || name == '..') {
          ___setErrNo(ERRNO_CODES.ENOENT);
          throw new Error('Name must not be empty.');
        }
        if (parent.contents.hasOwnProperty(name)) {
          ___setErrNo(ERRNO_CODES.EEXIST);
          throw new Error("Can't overwrite object.");
        }
        parent.contents[name] = {
          read: canRead === undefined ? true : canRead,
          write: canWrite === undefined ? false : canWrite,
          timestamp: Date.now(),
          inodeNumber: FS.nextInode++
        };
        for (var key in properties) {
          if (properties.hasOwnProperty(key)) {
            parent.contents[name][key] = properties[key];
          }
        }
        return parent.contents[name];
      },createFolder:function (parent, name, canRead, canWrite) {
        var properties = {isFolder: true, isDevice: false, contents: {}};
        return FS.createObject(parent, name, properties, canRead, canWrite);
      },createPath:function (parent, path, canRead, canWrite) {
        var current = FS.findObject(parent);
        if (current === null) throw new Error('Invalid parent.');
        path = path.split('/').reverse();
        while (path.length) {
          var part = path.pop();
          if (!part) continue;
          if (!current.contents.hasOwnProperty(part)) {
            FS.createFolder(current, part, canRead, canWrite);
          }
          current = current.contents[part];
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        properties.isFolder = false;
        return FS.createObject(parent, name, properties, canRead, canWrite);
      },createDataFile:function (parent, name, data, canRead, canWrite) {
        if (typeof data === 'string') {
          var dataArray = new Array(data.length);
          for (var i = 0, len = data.length; i < len; ++i) dataArray[i] = data.charCodeAt(i);
          data = dataArray;
        }
        var properties = {
          isDevice: false,
          contents: data.subarray ? data.subarray(0) : data // as an optimization, create a new array wrapper (not buffer) here, to help JS engines understand this object
        };
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          var LazyUint8Array = function(chunkSize, length) {
            this.length = length;
            this.chunkSize = chunkSize;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % chunkSize;
            var chunkNum = Math.floor(idx / chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function(getter) {
            this.getter = getter;
          }
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var chunkSize = 1024*1024; // Chunk size in bytes
          if (!hasByteServing) chunkSize = datalength;
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = new LazyUint8Array(chunkSize, datalength);
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * lazyArray.chunkSize;
            var end = (chunkNum+1) * lazyArray.chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile) {
        Browser.init();
        var fullname = FS.joinPath([parent, name], true);
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },createLink:function (parent, name, target, canRead, canWrite) {
        var properties = {isDevice: false, link: target};
        return FS.createFile(parent, name, properties, canRead, canWrite);
      },createDevice:function (parent, name, input, output) {
        if (!(input || output)) {
          throw new Error('A device must have at least one callback defined.');
        }
        var ops = {isDevice: true, input: input, output: output};
        return FS.createFile(parent, name, ops, Boolean(input), Boolean(output));
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },ensureRoot:function () {
        if (FS.root) return;
        // The main file system tree. All the contents are inside this.
        FS.root = {
          read: true,
          write: true,
          isFolder: true,
          isDevice: false,
          timestamp: Date.now(),
          inodeNumber: 1,
          contents: {}
        };
      },init:function (input, output, error) {
        // Make sure we initialize only once.
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
        FS.ensureRoot();
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input = input || Module['stdin'];
        output = output || Module['stdout'];
        error = error || Module['stderr'];
        // Default handlers.
        var stdinOverridden = true, stdoutOverridden = true, stderrOverridden = true;
        if (!input) {
          stdinOverridden = false;
          input = function() {
            if (!input.cache || !input.cache.length) {
              var result;
              if (typeof window != 'undefined' &&
                  typeof window.prompt == 'function') {
                // Browser.
                result = window.prompt('Input: ');
                if (result === null) result = String.fromCharCode(0); // cancel ==> EOF
              } else if (typeof readline == 'function') {
                // Command line.
                result = readline();
              }
              if (!result) result = '';
              input.cache = intArrayFromString(result + '\n', true);
            }
            return input.cache.shift();
          };
        }
        var utf8 = new Runtime.UTF8Processor();
        function simpleOutput(val) {
          if (val === null || val === 10) {
            output.printer(output.buffer.join(''));
            output.buffer = [];
          } else {
            output.buffer.push(utf8.processCChar(val));
          }
        }
        if (!output) {
          stdoutOverridden = false;
          output = simpleOutput;
        }
        if (!output.printer) output.printer = Module['print'];
        if (!output.buffer) output.buffer = [];
        if (!error) {
          stderrOverridden = false;
          error = simpleOutput;
        }
        if (!error.printer) error.printer = Module['print'];
        if (!error.buffer) error.buffer = [];
        // Create the temporary folder, if not already created
        try {
          FS.createFolder('/', 'tmp', true, true);
        } catch(e) {}
        // Create the I/O devices.
        var devFolder = FS.createFolder('/', 'dev', true, true);
        var stdin = FS.createDevice(devFolder, 'stdin', input);
        var stdout = FS.createDevice(devFolder, 'stdout', null, output);
        var stderr = FS.createDevice(devFolder, 'stderr', null, error);
        FS.createDevice(devFolder, 'tty', input, output);
        // Create default streams.
        FS.streams[1] = {
          path: '/dev/stdin',
          object: stdin,
          position: 0,
          isRead: true,
          isWrite: false,
          isAppend: false,
          isTerminal: !stdinOverridden,
          error: false,
          eof: false,
          ungotten: []
        };
        FS.streams[2] = {
          path: '/dev/stdout',
          object: stdout,
          position: 0,
          isRead: false,
          isWrite: true,
          isAppend: false,
          isTerminal: !stdoutOverridden,
          error: false,
          eof: false,
          ungotten: []
        };
        FS.streams[3] = {
          path: '/dev/stderr',
          object: stderr,
          position: 0,
          isRead: false,
          isWrite: true,
          isAppend: false,
          isTerminal: !stderrOverridden,
          error: false,
          eof: false,
          ungotten: []
        };
        // TODO: put these low in memory like we used to assert on: assert(Math.max(_stdin, _stdout, _stderr) < 15000); // make sure these are low, we flatten arrays with these
        HEAP32[((_stdin)>>2)]=1;
        HEAP32[((_stdout)>>2)]=2;
        HEAP32[((_stderr)>>2)]=3;
        // Other system paths
        FS.createPath('/', 'dev/shm/tmp', true, true); // temp files
        // Newlib initialization
        for (var i = FS.streams.length; i < Math.max(_stdin, _stdout, _stderr) + 4; i++) {
          FS.streams[i] = null; // Make sure to keep FS.streams dense
        }
        FS.streams[_stdin] = FS.streams[1];
        FS.streams[_stdout] = FS.streams[2];
        FS.streams[_stderr] = FS.streams[3];
        allocate([ allocate(
          [0, 0, 0, 0, _stdin, 0, 0, 0, _stdout, 0, 0, 0, _stderr, 0, 0, 0],
          'void*', ALLOC_DYNAMIC) ], 'void*', ALLOC_NONE, __impure_ptr);
      },quit:function () {
        if (!FS.init.initialized) return;
        // Flush any partially-printed lines in stdout and stderr. Careful, they may have been closed
        if (FS.streams[2] && FS.streams[2].object.output.buffer.length > 0) FS.streams[2].object.output(10);
        if (FS.streams[3] && FS.streams[3].object.output.buffer.length > 0) FS.streams[3].object.output(10);
      },standardizePath:function (path) {
        if (path.substr(0, 2) == './') path = path.substr(2);
        return path;
      },deleteFile:function (path) {
        path = FS.analyzePath(path);
        if (!path.parentExists || !path.exists) {
          throw 'Invalid path ' + path;
        }
        delete path.parentObject.contents[path.name];
      }};
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.streams[fildes];
      if (!stream || stream.object.isDevice) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isWrite) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (stream.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else if (nbyte < 0 || offset < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var contents = stream.object.contents;
        while (contents.length < offset) contents.push(0);
        for (var i = 0; i < nbyte; i++) {
          contents[offset + i] = HEAPU8[(((buf)+(i))|0)];
        }
        stream.object.timestamp = Date.now();
        return i;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.streams[fildes];
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isWrite) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (nbyte < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        if (stream.object.isDevice) {
          if (stream.object.output) {
            for (var i = 0; i < nbyte; i++) {
              try {
                stream.object.output(HEAP8[(((buf)+(i))|0)]);
              } catch (e) {
                ___setErrNo(ERRNO_CODES.EIO);
                return -1;
              }
            }
            stream.object.timestamp = Date.now();
            return i;
          } else {
            ___setErrNo(ERRNO_CODES.ENXIO);
            return -1;
          }
        } else {
          var bytesWritten = _pwrite(fildes, buf, nbyte, stream.position);
          if (bytesWritten != -1) stream.position += bytesWritten;
          return bytesWritten;
        }
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        if (FS.streams[stream]) FS.streams[stream].error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      var flush = function(filedes) {
        // Right now we write all data directly, except for output devices.
        if (FS.streams[filedes] && FS.streams[filedes].object.output) {
          if (!FS.streams[filedes].isTerminal) { // don't flush terminals, it would cause a \n to also appear
            FS.streams[filedes].object.output(null);
          }
        }
      };
      try {
        if (stream === 0) {
          for (var i = 0; i < FS.streams.length; i++) if (FS.streams[i]) flush(i);
        } else {
          flush(stream);
        }
        return 0;
      } catch (e) {
        ___setErrNo(ERRNO_CODES.EIO);
        return -1;
      }
    }
  function _ungetc(c, stream) {
      // int ungetc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ungetc.html
      if (FS.streams[stream]) {
        c = unSign(c & 0xFF);
        FS.streams[stream].ungotten.push(c);
        return c;
      } else {
        return -1;
      }
    }
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.streams[fildes];
      if (!stream || stream.object.isDevice) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isRead) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (stream.object.isFolder) {
        ___setErrNo(ERRNO_CODES.EISDIR);
        return -1;
      } else if (nbyte < 0 || offset < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var bytesRead = 0;
        while (stream.ungotten.length && nbyte > 0) {
          HEAP8[((buf++)|0)]=stream.ungotten.pop()
          nbyte--;
          bytesRead++;
        }
        var contents = stream.object.contents;
        var size = Math.min(contents.length - offset, nbyte);
        if (contents.subarray) { // typed array
          HEAPU8.set(contents.subarray(offset, offset+size), buf);
        } else
        if (contents.slice) { // normal array
          for (var i = 0; i < size; i++) {
            HEAP8[(((buf)+(i))|0)]=contents[offset + i]
          }
        } else {
          for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
            HEAP8[(((buf)+(i))|0)]=contents.get(offset + i)
          }
        }
        bytesRead += size;
        return bytesRead;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.streams[fildes];
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      } else if (!stream.isRead) {
        ___setErrNo(ERRNO_CODES.EACCES);
        return -1;
      } else if (nbyte < 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return -1;
      } else {
        var bytesRead;
        if (stream.object.isDevice) {
          if (stream.object.input) {
            bytesRead = 0;
            while (stream.ungotten.length && nbyte > 0) {
              HEAP8[((buf++)|0)]=stream.ungotten.pop()
              nbyte--;
              bytesRead++;
            }
            for (var i = 0; i < nbyte; i++) {
              try {
                var result = stream.object.input();
              } catch (e) {
                ___setErrNo(ERRNO_CODES.EIO);
                return -1;
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              HEAP8[(((buf)+(i))|0)]=result
            }
            return bytesRead;
          } else {
            ___setErrNo(ERRNO_CODES.ENXIO);
            return -1;
          }
        } else {
          var ungotSize = stream.ungotten.length;
          bytesRead = _pread(fildes, buf, nbyte, stream.position);
          if (bytesRead != -1) {
            stream.position += (stream.ungotten.length - ungotSize) + bytesRead;
          }
          return bytesRead;
        }
      }
    }function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      if (!FS.streams[stream]) return -1;
      var streamObj = FS.streams[stream];
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _read(stream, _fgetc.ret, 1);
      if (ret == 0) {
        streamObj.eof = true;
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }var _getc=_fgetc;
  function __ZNSt9exceptionD2Ev(){}
  function ___errno_location() {
      if (!___setErrNo.ret) {
        ___setErrNo.ret = allocate([0], 'i32', ALLOC_NORMAL);
        HEAP32[((___setErrNo.ret)>>2)]=0
      }
      return ___setErrNo.ret;
    }var ___errno=___errno_location;
  Module["_strcpy"] = _strcpy;
  var ERRNO_MESSAGES={1:"Operation not permitted",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"Input/output error",6:"No such device or address",8:"Exec format error",9:"Bad file descriptor",10:"No child processes",11:"Resource temporarily unavailable",12:"Cannot allocate memory",13:"Permission denied",14:"Bad address",16:"Device or resource busy",17:"File exists",18:"Invalid cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Inappropriate ioctl for device",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read-only file system",31:"Too many links",32:"Broken pipe",33:"Numerical argument out of domain",34:"Numerical result out of range",35:"Resource deadlock avoided",36:"File name too long",37:"No locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many levels of symbolic links",42:"No message of desired type",43:"Identifier removed",45:"Op not supported on transport endpoint",60:"Device not a stream",61:"No data available",62:"Timer expired",63:"Out of streams resources",67:"Link has been severed",71:"Protocol error",72:"Multihop attempted",74:"Bad message",75:"Value too large for defined data type",84:"Invalid or incomplete multibyte or wide character",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Protocol not supported",95:"Operation not supported",97:"Address family not supported by protocol",98:"Address already in use",99:"Cannot assign requested address",100:"Network is down",101:"Network is unreachable",102:"Network dropped connection on reset",103:"Software caused connection abort",104:"Connection reset by peer",105:"No buffer space available",106:"Transport endpoint is already connected",107:"Transport endpoint is not connected",110:"Connection timed out",111:"Connection refused",113:"No route to host",114:"Operation already in progress",115:"Operation now in progress",116:"Stale NFS file handle",122:"Disk quota exceeded",125:"Operation canceled",130:"Owner died",131:"State not recoverable"};function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          for (var i = 0; i < msg.length; i++) {
            HEAP8[(((strerrbuf)+(i))|0)]=msg.charCodeAt(i)
          }
          HEAP8[(((strerrbuf)+(i))|0)]=0
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }
  function _abort() {
      ABORT = true;
      throw 'abort() at ' + (new Error().stack);
    }
  function ___cxa_rethrow() {
      ___cxa_end_catch.rethrown = true;
      throw HEAP32[((_llvm_eh_exception.buf)>>2)] + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";;
    }
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
          // Handle precision.
          var precisionSet = false;
          if (next == 46) {
            var precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          } else {
            var precision = 6; // Standard default.
          }
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = flagAlternative ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
              // Add sign if needed
              if (flagAlwaysSigned) {
                if (currArg < 0) {
                  prefix = '-' + prefix;
                } else {
                  prefix = '+' + prefix;
                }
              }
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
                // Add sign.
                if (flagAlwaysSigned && currArg >= 0) {
                  argText = '+' + argText;
                }
              }
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }
  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 8: return PAGE_SIZE;
        case 54:
        case 56:
        case 21:
        case 61:
        case 63:
        case 22:
        case 67:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 69:
        case 28:
        case 101:
        case 70:
        case 71:
        case 29:
        case 30:
        case 199:
        case 75:
        case 76:
        case 32:
        case 43:
        case 44:
        case 80:
        case 46:
        case 47:
        case 45:
        case 48:
        case 49:
        case 42:
        case 82:
        case 33:
        case 7:
        case 108:
        case 109:
        case 107:
        case 112:
        case 119:
        case 121:
          return 200809;
        case 13:
        case 104:
        case 94:
        case 95:
        case 34:
        case 35:
        case 77:
        case 81:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 94:
        case 95:
        case 110:
        case 111:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 120:
        case 40:
        case 16:
        case 79:
        case 19:
          return -1;
        case 92:
        case 93:
        case 5:
        case 72:
        case 6:
        case 74:
        case 92:
        case 93:
        case 96:
        case 97:
        case 98:
        case 99:
        case 102:
        case 103:
        case 105:
          return 1;
        case 38:
        case 66:
        case 50:
        case 51:
        case 4:
          return 1024;
        case 15:
        case 64:
        case 41:
          return 32;
        case 55:
        case 37:
        case 17:
          return 2147483647;
        case 18:
        case 1:
          return 47839;
        case 59:
        case 57:
          return 99;
        case 68:
        case 58:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 14: return 32768;
        case 73: return 32767;
        case 39: return 16384;
        case 60: return 1000;
        case 106: return 700;
        case 52: return 256;
        case 62: return 255;
        case 2: return 100;
        case 65: return 64;
        case 36: return 20;
        case 100: return 16;
        case 20: return 6;
        case 53: return 4;
        case 10: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function _isxdigit(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 102) ||
             (chr >= 65 && chr <= 70);
    }var _isxdigit_l=_isxdigit;
  function _isdigit(chr) {
      return chr >= 48 && chr <= 57;
    }var _isdigit_l=_isdigit;
  function __isFloat(text) {
      return !!(/^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?$/.exec(text));
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[' '] = 1;
        __scanString.whiteSpace['\t'] = 1;
        __scanString.whiteSpace['\n'] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
        // TODO: Support strings like "%5c" etc.
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'c') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          fields++;
          next = get();
          HEAP8[(argPtr)]=next
          formatIndex += 2;
          continue;
        }
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if(format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' || type == 'E') {
            var last = 0;
            next = get();
            while (next > 0) {
              buffer.push(String.fromCharCode(next));
              if (__isFloat(buffer.join(''))) {
                last = buffer.length;
              }
              next = get();
            }
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   (type === 'x' && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if(longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,Math.min(Math.floor((parseInt(text, 10))/(+(4294967296))), (+(4294967295)))>>>0],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16)
              break;
            case 'f':
            case 'e':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text)
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text)
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j]
              }
              break;
          }
          fields++;
        } else if (format[formatIndex] in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      var get = function() { return HEAP8[(((s)+(index++))|0)]; };
      var unget = function() { index--; };
      return __scanString(format, get, unget, varargs);
    }
  function __Z7catopenPKci() { throw 'catopen not implemented' }
  function __Z7catgetsP8_nl_catdiiPKc() { throw 'catgets not implemented' }
  function __Z8catcloseP8_nl_catd() { throw 'catclose not implemented' }
  function _newlocale(mask, locale, base) {
      return 0;
    }
  function _freelocale(locale) {}
  function ___ctype_b_loc() {
      // http://refspecs.freestandards.org/LSB_3.0.0/LSB-Core-generic/LSB-Core-generic/baselib---ctype-b-loc.html
      var me = ___ctype_b_loc;
      if (!me.ret) {
        var values = [
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,8195,8194,8194,8194,8194,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,24577,49156,49156,49156,
          49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,55304,55304,55304,55304,55304,55304,55304,55304,
          55304,55304,49156,49156,49156,49156,49156,49156,49156,54536,54536,54536,54536,54536,54536,50440,50440,50440,50440,50440,
          50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,49156,49156,49156,49156,49156,
          49156,54792,54792,54792,54792,54792,54792,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,
          50696,50696,50696,50696,50696,50696,50696,49156,49156,49156,49156,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ];
        var i16size = 2;
        var arr = _malloc(values.length * i16size);
        for (var i = 0; i < values.length; i++) {
          HEAP16[(((arr)+(i * i16size))>>1)]=values[i]
        }
        me.ret = allocate([arr + 128 * i16size], 'i16*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function ___ctype_tolower_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-tolower-loc.html
      var me = ___ctype_tolower_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,91,92,93,94,95,96,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,
          134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,
          164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,
          194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,
          224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,
          254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i]
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function ___ctype_toupper_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-toupper-loc.html
      var me = ___ctype_toupper_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,
          73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
          81,82,83,84,85,86,87,88,89,90,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,
          145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,
          175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,
          205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,
          235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i]
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function _strftime(s, maxsize, format, timeptr) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
      // TODO: Implement.
      return 0;
    }var _strftime_l=_strftime;
  function _isspace(chr) {
      return chr in { 32: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 };
    }
  function __parseInt64(str, endptr, base, min, max, unsign) {
      var start = str;
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
      // Check for a plus/minus sign.
      if (HEAP8[(str)] == 45) {
        str++;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
      // Find base.
      var ok = false;
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            str++;
            ok = true; // we saw an initial zero, perhaps the entire thing is just "0"
          }
        }
      }
      if (!finalBase) finalBase = 10;
      // Get digits.
      var chr;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          str++;
          ok = true;
        }
      }
      if (!ok) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return ((asm.setTempRet0(0),0)|0);
      }
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str
      }
      try {
        i64Math.fromString(Pointer_stringify(start, str - start), finalBase, min, max, unsign);
      } catch(e) {
        ___setErrNo(ERRNO_CODES.ERANGE); // not quite correct
      }
      return ((asm.setTempRet0(((HEAP32[(((tempDoublePtr)+(4))>>2)])|0)),((HEAP32[((tempDoublePtr)>>2)])|0))|0);
    }function _strtoull(str, endptr, base) {
      return __parseInt64(str, endptr, base, 0, '18446744073709551615', true);  // ULONG_MAX.
    }var _strtoull_l=_strtoull;
  function _strtoll(str, endptr, base) {
      return __parseInt64(str, endptr, base, '-9223372036854775808', '9223372036854775807');  // LLONG_MIN, LLONG_MAX.
    }var _strtoll_l=_strtoll;
  function _uselocale(locale) {
      return 0;
    }
  function ___locale_mb_cur_max() { throw '__locale_mb_cur_max not implemented' }
  var _llvm_va_start=undefined;
  function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }function _asprintf(s, format, varargs) {
      return _sprintf(-s, format, varargs);
    }function _vasprintf(s, format, va_arg) {
      return _asprintf(s, format, HEAP32[((va_arg)>>2)]);
    }
  function _llvm_va_end() {}
  function _vsnprintf(s, n, format, va_arg) {
      return _snprintf(s, n, format, HEAP32[((va_arg)>>2)]);
    }
  function _vsprintf(s, format, va_arg) {
      return _sprintf(s, format, HEAP32[((va_arg)>>2)]);
    }
  function _vsscanf(s, format, va_arg) {
      return _sscanf(s, format, HEAP32[((va_arg)>>2)]);
    }
  var _llvm_memset_p0i8_i64=_memset;
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }
  function _llvm_lifetime_start() {}
  function _llvm_lifetime_end() {}
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (Browser.initted) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : console.log("warning: cannot create object URLs");
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        function getMimetype(name) {
          return {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'bmp': 'image/bmp',
            'ogg': 'audio/ogg',
            'wav': 'audio/wav',
            'mp3': 'audio/mpeg'
          }[name.substr(name.lastIndexOf('.')+1)];
        }
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
        var imagePlugin = {};
        imagePlugin['canHandle'] = function(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/.exec(name);
        };
        imagePlugin['handle'] = function(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            setTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'];
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule) {
        var ctx;
        try {
          if (useWebGL) {
            ctx = canvas.getContext('experimental-webgl', {
              alpha: false
            });
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas - ' + e);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        this.lockPointer = lockPointer;
        this.resizeCanvas = resizeCanvas;
        if (typeof this.lockPointer === 'undefined') this.lockPointer = true;
        if (typeof this.resizeCanvas === 'undefined') this.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!this.fullScreenHandlersInstalled) {
          this.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen(); 
      },requestAnimationFrame:function (func) {
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                         window['mozRequestAnimationFrame'] ||
                                         window['webkitRequestAnimationFrame'] ||
                                         window['msRequestAnimationFrame'] ||
                                         window['oRequestAnimationFrame'] ||
                                         window['setTimeout'];
        }
        window.requestAnimationFrame(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        Browser.updateResizeListeners();
      }};
_llvm_eh_exception.buf = allocate(12, "void*", ALLOC_STATIC);
__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function(func) { Browser.requestAnimationFrame(func) };
  Module["pauseMainLoop"] = function() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function() { Browser.mainLoop.resume() };
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
staticSealed = true; // seal the static portion of memory
STACK_MAX = STACK_BASE + 5242880;
DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);
assert(DYNAMIC_BASE < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_DYNAMIC);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);
var Math_min = Math.min;
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiii(index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viii(index,a1,a2,a3) {
  try {
    Module.dynCall_viii(index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module.dynCall_viiiii(index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_vi(index,a1) {
  try {
    Module.dynCall_vi(index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_vii(index,a1,a2) {
  try {
    Module.dynCall_vii(index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    Module.dynCall_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_ii(index,a1) {
  try {
    return Module.dynCall_ii(index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiiif(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module.dynCall_viiiiif(index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module.dynCall_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    Module.dynCall_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_v(index) {
  try {
    Module.dynCall_v(index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    return Module.dynCall_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module.dynCall_iiiii(index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiiiif(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module.dynCall_viiiiiif(index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module.dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module.dynCall_iii(index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module.dynCall_iiiiii(index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module.dynCall_viiii(index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm.setThrew(1, 0);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env._stdin|0;var p=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var q=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var r=env._stderr|0;var s=env.___fsmu8|0;var t=env._stdout|0;var u=env.__ZTISt9exception|0;var v=env.___dso_handle|0;var w=+env.NaN;var x=+env.Infinity;var y=0;var z=0;var A=0;var B=0;var C=0,D=0,E=0,F=0,G=0.0,H=0,I=0,J=0,K=0.0;var L=0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=0;var S=0;var T=0;var U=0;var V=global.Math.floor;var W=global.Math.abs;var X=global.Math.sqrt;var Y=global.Math.pow;var Z=global.Math.cos;var _=global.Math.sin;var $=global.Math.tan;var aa=global.Math.acos;var ab=global.Math.asin;var ac=global.Math.atan;var ad=global.Math.atan2;var ae=global.Math.exp;var af=global.Math.log;var ag=global.Math.ceil;var ah=global.Math.imul;var ai=env.abort;var aj=env.assert;var ak=env.asmPrintInt;var al=env.asmPrintFloat;var am=env.copyTempDouble;var an=env.copyTempFloat;var ao=env.min;var ap=env.invoke_iiii;var aq=env.invoke_viii;var ar=env.invoke_viiiii;var as=env.invoke_vi;var at=env.invoke_vii;var au=env.invoke_viiiiiiiii;var av=env.invoke_ii;var aw=env.invoke_viiiiif;var ax=env.invoke_viiiiiii;var ay=env.invoke_viiiiiiii;var az=env.invoke_v;var aA=env.invoke_iiiiiiiii;var aB=env.invoke_iiiii;var aC=env.invoke_viiiiiif;var aD=env.invoke_viiiiii;var aE=env.invoke_iii;var aF=env.invoke_iiiiii;var aG=env.invoke_viiii;var aH=env._llvm_va_end;var aI=env._vsnprintf;var aJ=env._vsscanf;var aK=env._sscanf;var aL=env._snprintf;var aM=env.___locale_mb_cur_max;var aN=env._fgetc;var aO=env.___cxa_throw;var aP=env._strerror;var aQ=env._pthread_mutex_lock;var aR=env._atexit;var aS=env._abort;var aT=env._llvm_eh_exception;var aU=env.___cxa_free_exception;var aV=env._isdigit;var aW=env._pread;var aX=env._fflush;var aY=env.__Z8catcloseP8_nl_catd;var aZ=env._sysconf;var a_=env._llvm_lifetime_start;var a$=env.___setErrNo;var a0=env._fwrite;var a1=env.__Z7catgetsP8_nl_catdiiPKc;var a2=env._sqrt;var a3=env._isxdigit;var a4=env._write;var a5=env.__scanString;var a6=env._llvm_umul_with_overflow_i32;var a7=env._exit;var a8=env._sprintf;var a9=env._llvm_lifetime_end;var ba=env._asprintf;var bb=env.___ctype_b_loc;var bc=env.___cxa_find_matching_catch;var bd=env._freelocale;var be=env.__Z7catopenPKci;var bf=env.___cxa_allocate_exception;var bg=env._isspace;var bh=env._strtoll;var bi=env._strtoull;var bj=env._sbrk;var bk=env._vasprintf;var bl=env._read;var bm=env.__formatString;var bn=env.__reallyNegative;var bo=env._time;var bp=env.___cxa_is_number_type;var bq=env._pthread_cond_broadcast;var br=env.___cxa_does_inherit;var bs=env.___ctype_toupper_loc;var bt=env.__ZSt9terminatev;var bu=env.___ctype_tolower_loc;var bv=env._pthread_mutex_unlock;var bw=env.__parseInt64;var bx=env.__ZSt18uncaught_exceptionv;var by=env._pwrite;var bz=env.__isFloat;var bA=env.__ZNSt9exceptionD2Ev;var bB=env.___cxa_call_unexpected;var bC=env._strerror_r;var bD=env._newlocale;var bE=env.___cxa_begin_catch;var bF=env.___errno_location;var bG=env.___gxx_personality_v0;var bH=env._pthread_cond_wait;var bI=env.___cxa_rethrow;var bJ=env._uselocale;var bK=env.___resumeException;var bL=env._ungetc;var bM=env.__exit;var bN=env._vsprintf;var bO=env._strftime;var bP=env.___cxa_end_catch;
// EMSCRIPTEN_START_FUNCS
function b6(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+7>>3<<3;return b|0}function b7(){return i|0}function b8(a){a=a|0;i=a}function b9(a,b){a=a|0;b=b|0;if((y|0)==0){y=a;z=b}}function ca(a){a=a|0;L=a}function cb(a){a=a|0;M=a}function cc(a){a=a|0;N=a}function cd(a){a=a|0;O=a}function ce(a){a=a|0;P=a}function cf(a){a=a|0;Q=a}function cg(a){a=a|0;R=a}function ch(a){a=a|0;S=a}function ci(a){a=a|0;T=a}function cj(a){a=a|0;U=a}function ck(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,M=0,N=0,O=0,P=0;if((a|0)==(b|0)){h=1;return h|0}i=(f|0)==(d|0)&(g|0)==(e|0);j=f-d|0;k=g-e|0;l=k;m=(k|0)<0?-1:0;k=j;n=(j|0)<0?-1:0;j=a;L4:while(1){a=c[j>>2]|0;do{if((a|0)<(d|0)){if((c[j+8>>2]|0)<=(d|0)){break}if((c[j+4>>2]|0)>=(e|0)){break}if((c[j+20>>2]|0)>(e|0)){h=0;o=24;break L4}}}while(0);do{if((a|0)<(f|0)){if((c[j+8>>2]|0)<=(f|0)){break}if((c[j+4>>2]|0)>=(g|0)){break}if((c[j+20>>2]|0)>(g|0)){h=0;o=25;break L4}}}while(0);a=j;p=c[a>>2]|0;q=c[a+4>>2]|0;a=j+24|0;r=c[a>>2]|0;s=c[a+4>>2]|0;do{if(!((r|0)==(p|0)&(s|0)==(q|0)|i)){a=r-p|0;t=s-q|0;u=a;v=(a|0)<0?-1:0;a=j2(u,v,l,m)|0;w=L;x=t;y=(t|0)<0?-1:0;t=j2(x,y,k,n)|0;z=L;A=jV(a,w,t,z)|0;B=L;if((a|0)==(t|0)&(w|0)==(z|0)){break}z=d-p|0;w=e-q|0;t=w;a=(w|0)<0?-1:0;w=j2(t,a,u,v)|0;v=L;u=z;C=(z|0)<0?-1:0;z=j2(x,y,u,C)|0;y=jV(w,v,z,L)|0;z=L;v=j2(t,a,k,n)|0;a=L;t=j2(u,C,l,m)|0;C=jV(v,a,t,L)|0;t=L;a=0;if((B|0)<(a|0)|(B|0)==(a|0)&A>>>0<0>>>0){a=jV(0,0,A,B)|0;v=L;u=jV(0,0,y,z)|0;w=L;x=jV(0,0,C,t)|0;D=L;E=x;F=w;G=u;H=v;I=a}else{D=t;E=C;F=z;G=y;H=B;I=A}A=jV(0,0,G,F)|0;B=L;y=-1;z=-1;C=jV(0,0,E,D)|0;t=L;if(((H|0)>(t|0)|(H|0)==(t|0)&I>>>0>C>>>0)&(((H|0)<=(B|0)&((H|0)<(B|0)|I>>>0<=A>>>0)|((F|0)>(y|0)|(F|0)==(y|0)&G>>>0>-1>>>0)|((D|0)>(z|0)|(D|0)==(z|0)&E>>>0>-1>>>0))^1)){h=0;o=26;break L4}}}while(0);q=j+8|0;p=c[q>>2]|0;s=c[q+4>>2]|0;q=j+16|0;r=c[q>>2]|0;z=c[q+4>>2]|0;do{if(!((r|0)==(p|0)&(z|0)==(s|0)|i)){q=r-p|0;y=z-s|0;A=q;B=(q|0)<0?-1:0;q=j2(A,B,l,m)|0;C=L;t=y;a=(y|0)<0?-1:0;y=j2(t,a,k,n)|0;v=L;u=jV(q,C,y,v)|0;w=L;if((q|0)==(y|0)&(C|0)==(v|0)){break}v=d-p|0;C=e-s|0;y=C;q=(C|0)<0?-1:0;C=j2(y,q,A,B)|0;B=L;A=v;x=(v|0)<0?-1:0;v=j2(t,a,A,x)|0;a=jV(C,B,v,L)|0;v=L;B=j2(y,q,k,n)|0;q=L;y=j2(A,x,l,m)|0;x=jV(B,q,y,L)|0;y=L;q=0;if((w|0)<(q|0)|(w|0)==(q|0)&u>>>0<0>>>0){q=jV(0,0,u,w)|0;B=L;A=jV(0,0,a,v)|0;C=L;t=jV(0,0,x,y)|0;J=L;K=t;M=C;N=A;O=B;P=q}else{J=y;K=x;M=v;N=a;O=w;P=u}u=jV(0,0,N,M)|0;w=L;a=-1;v=-1;x=jV(0,0,K,J)|0;y=L;if(((O|0)>(y|0)|(O|0)==(y|0)&P>>>0>x>>>0)&(((O|0)<=(w|0)&((O|0)<(w|0)|P>>>0<=u>>>0)|((M|0)>(a|0)|(M|0)==(a|0)&N>>>0>-1>>>0)|((J|0)>(v|0)|(J|0)==(v|0)&K>>>0>-1>>>0))^1)){h=0;o=27;break L4}}}while(0);s=j+32|0;if((s|0)==(b|0)){h=1;o=28;break}else{j=s}}if((o|0)==24){return h|0}else if((o|0)==25){return h|0}else if((o|0)==26){return h|0}else if((o|0)==27){return h|0}else if((o|0)==28){return h|0}return 0}function cl(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0;f=i;i=i+48|0;g=f|0;h=f+32|0;j=jG(36)|0;k=j;jP(j|0,0,36);l=(a|0)>0;L37:do{if(l){m=j+16|0;n=j+20|0;o=j+12|0;p=1;q=0;r=0;s=0;L39:while(1){t=c[b+(q<<2)>>2]|0;u=q+2|0;v=c[b+((q|1)<<2)>>2]|0;do{if((r|0)==(s|0)){w=c[o>>2]|0;x=w;y=r-x>>3;z=y+1|0;if(z>>>0>536870911){break L39}A=s-x|0;do{if(A>>3>>>0>268435454){B=536870911;C=41}else{D=A>>2;E=D>>>0<z>>>0?z:D;if((E|0)==0){F=0;G=0;break}else{B=E;C=41;break}}}while(0);if((C|0)==41){C=0;F=jG(B<<3)|0;G=B}A=F+(y<<3)|0;if((A|0)!=0){E=A;c[E>>2]=0|t;c[E+4>>2]=v|0}E=F+(z<<3)|0;A=r-x|0;D=F+(y-(A>>3)<<3)|0;H=w;jQ(D|0,H|0,A);c[o>>2]=D;c[m>>2]=E;c[n>>2]=F+(G<<3)|0;if((w|0)==0){I=E;break}jJ(H);I=E}else{if((r|0)==0){J=r}else{E=r;c[E>>2]=0|t;c[E+4>>2]=v|0;J=c[m>>2]|0}E=J+8|0;c[m>>2]=E;I=E}}while(0);if((p|0)>=(a|0)){break L37}p=p+1|0;q=u;r=I;s=c[n>>2]|0}hu(0);return 0}}while(0);L61:do{if((d|0)>0){I=j+4|0;J=j+8|0;G=j;F=g;B=1;b=0;n=c[I>>2]|0;L63:while(1){s=b|2;r=c[e+((b|1)<<2)>>2]|0;c[g>>2]=c[e+(b<<2)>>2]|0;c[g+4>>2]=r;r=c[e+((b|3)<<2)>>2]|0;c[g+8>>2]=c[e+(s<<2)>>2]|0;c[g+12>>2]=r;r=c[e+(s+3<<2)>>2]|0;c[g+16>>2]=c[e+(s+2<<2)>>2]|0;c[g+20>>2]=r;r=c[e+((b|7)<<2)>>2]|0;c[g+24>>2]=c[e+((b|6)<<2)>>2]|0;c[g+28>>2]=r;r=b+8|0;do{if((n|0)==(c[J>>2]|0)){s=c[G>>2]|0;q=n-s|0;p=q>>5;m=p+1|0;if(m>>>0>134217727){break L63}do{if(p>>>0>67108862){K=134217727;C=56}else{o=q>>4;v=o>>>0<m>>>0?m:o;if((v|0)==0){L=0;M=0;break}else{K=v;C=56;break}}}while(0);if((C|0)==56){C=0;L=jG(K<<5)|0;M=K}w=L+(p<<5)|0;if((w|0)!=0){jQ(w|0,F|0,32)}w=L+(m<<5)|0;y=s;jQ(L|0,y|0,q);c[G>>2]=L;c[I>>2]=w;c[J>>2]=L+(M<<5)|0;if((s|0)==0){N=w;break}jJ(y);N=w}else{if((n|0)==0){O=0}else{jQ(n|0,F|0,32);O=c[I>>2]|0}w=O+32|0;c[I>>2]=w;N=w}}while(0);if((B|0)>=(d|0)){break L61}B=B+1|0;b=r;n=N}hu(0);return 0}}while(0);N=j+24|0;d=N;O=h|0;c[O>>2]=0;M=h+4|0;c[M>>2]=0;L=h+8|0;c[L>>2]=0;do{if((a|0)!=0){if((a|0)<0){hu(0);return 0}K=((a-1|0)>>>5)+1|0;g=jG(K<<2)|0;e=g;c[O>>2]=e;c[L>>2]=K;c[M>>2]=a;K=a>>>5;jP(g|0,0,K<<2|0);g=K<<5;if((g|0)==(a|0)){break}n=e+(K<<2)|0;c[n>>2]=c[n>>2]&(-1>>>(((32-a|0)+g|0)>>>0)^-1)}}while(0);cm(d,a,h);h=c[O>>2]|0;if((h|0)!=0){jJ(h)}if(!l){i=f;return k|0}l=c[N>>2]|0;N=j+12|0;h=j;O=j+4|0;j=0;while(1){d=l+(j*12&-1)|0;M=j>>>5;L=(c[d>>2]|0)+(M<<2)|0;g=1<<(j&31);c[L>>2]=c[L>>2]|g;L=j+1|0;n=(L|0)<(a|0);if(!n){C=86;break}K=c[N>>2]|0;e=K+(j<<3)|0;b=c[h>>2]|0;B=c[O>>2]|0;I=g^-1;F=L;while(1){J=K+(F<<3)|0;G=ck(b,B,c[e>>2]|0,c[e+4>>2]|0,c[J>>2]|0,c[J+4>>2]|0)|0;J=(c[d>>2]|0)+(F>>>5<<2)|0;u=1<<(F&31);w=(c[l+(F*12&-1)>>2]|0)+(M<<2)|0;y=c[w>>2]|0;x=G?y|g:y&I;c[w>>2]=x;if((x&g|0)==0){P=c[J>>2]&(u^-1)}else{P=c[J>>2]|u}c[J>>2]=P;J=F+1|0;if((J|0)<(a|0)){F=J}else{break}}if(n){j=L}else{C=85;break}}if((C|0)==85){i=f;return k|0}else if((C|0)==86){i=f;return k|0}return 0}function cm(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=a+8|0;f=c[e>>2]|0;g=a|0;h=c[g>>2]|0;i=h;if(((f-i|0)/12&-1)>>>0>=b>>>0){j=a+4|0;k=((c[j>>2]|0)-i|0)/12&-1;i=k>>>0<b>>>0;l=i?k:b;L115:do{if((l|0)!=0){m=l;n=h;while(1){ct(n,d);o=m-1|0;if((o|0)==0){break L115}else{m=o;n=n+12|0}}}}while(0);if(!i){i=(c[g>>2]|0)+(b*12&-1)|0;l=c[j>>2]|0;if((i|0)==(l|0)){return}else{p=l}while(1){l=p-12|0;c[j>>2]=l;n=c[l>>2]|0;if((n|0)==0){q=l}else{jJ(n);q=c[j>>2]|0}if((i|0)==(q|0)){break}else{p=q}}return}q=d+4|0;p=d|0;i=b-k|0;k=c[j>>2]|0;L130:while(1){do{if((k|0)!=0){n=k|0;c[n>>2]=0;l=k+4|0;c[l>>2]=0;m=k+8|0;c[m>>2]=0;o=c[q>>2]|0;if((o|0)==0){break}if((o|0)<0){r=95;break L130}s=((o-1|0)>>>5)+1|0;o=jG(s<<2)|0;t=o;c[n>>2]=t;c[l>>2]=0;c[m>>2]=s;s=c[p>>2]|0;m=c[q>>2]|0;n=m>>>5;u=n<<5;v=u|m&31;c[l>>2]=v;if((v|0)<=0){break}jR(o|0,s|0,n<<2|0);o=v-u|0;u=t+(n<<2)|0;if((o|0)<=0){break}t=-1>>>((32-o|0)>>>0);c[u>>2]=c[u>>2]&(t^-1)|c[s+(n<<2)>>2]&t}}while(0);t=(c[j>>2]|0)+12|0;c[j>>2]=t;n=i-1|0;if((n|0)==0){r=127;break}else{i=n;k=t}}if((r|0)==127){return}else if((r|0)==95){hu(0)}}if((h|0)==0){w=f}else{f=a+4|0;k=c[f>>2]|0;if((h|0)==(k|0)){x=h}else{i=k;while(1){k=i-12|0;c[f>>2]=k;j=c[k>>2]|0;if((j|0)==0){y=k}else{jJ(j);y=c[f>>2]|0}if((h|0)==(y|0)){break}else{i=y}}x=c[g>>2]|0}jJ(x);c[e>>2]=0;c[f>>2]=0;c[g>>2]=0;w=0}if(b>>>0>357913941){hu(0)}f=(w|0)/12&-1;do{if(f>>>0>178956969){z=357913941}else{w=f<<1;x=w>>>0<b>>>0?b:w;if(x>>>0<=357913941){z=x;break}hu(0)}}while(0);f=jG(z*12&-1)|0;x=a+4|0;c[x>>2]=f;c[g>>2]=f;c[e>>2]=f+(z*12&-1)|0;z=d+4|0;e=d|0;d=b;b=f;L161:while(1){do{if((b|0)!=0){f=b|0;c[f>>2]=0;g=b+4|0;c[g>>2]=0;a=b+8|0;c[a>>2]=0;w=c[z>>2]|0;if((w|0)==0){break}if((w|0)<0){r=120;break L161}y=((w-1|0)>>>5)+1|0;w=jG(y<<2)|0;i=w;c[f>>2]=i;c[g>>2]=0;c[a>>2]=y;y=c[e>>2]|0;a=c[z>>2]|0;f=a>>>5;h=f<<5;j=h|a&31;c[g>>2]=j;if((j|0)<=0){break}jR(w|0,y|0,f<<2|0);w=j-h|0;h=i+(f<<2)|0;if((w|0)<=0){break}i=-1>>>((32-w|0)>>>0);c[h>>2]=c[h>>2]&(i^-1)|c[y+(f<<2)>>2]&i}}while(0);i=(c[x>>2]|0)+12|0;c[x>>2]=i;f=d-1|0;if((f|0)==0){r=126;break}else{d=f;b=i}}if((r|0)==126){return}else if((r|0)==120){hu(0)}}function cn(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if((a|0)==0){return}b=a+24|0;d=c[b>>2]|0;if((d|0)!=0){e=a+28|0;f=c[e>>2]|0;if((d|0)==(f|0)){g=d}else{h=f;while(1){f=h-12|0;c[e>>2]=f;i=c[f>>2]|0;if((i|0)==0){j=f}else{jJ(i);j=c[e>>2]|0}if((d|0)==(j|0)){break}else{h=j}}g=c[b>>2]|0}jJ(g)}g=c[a+12>>2]|0;b=g;if((g|0)!=0){j=a+16|0;h=c[j>>2]|0;if((g|0)!=(h|0)){c[j>>2]=h+((((h-8|0)+(-b|0)|0)>>>3^-1)<<3)|0}jJ(g)}g=c[a>>2]|0;b=g;if((g|0)!=0){h=a+4|0;j=c[h>>2]|0;if((g|0)!=(j|0)){c[h>>2]=j+((((j-32|0)+(-b|0)|0)>>>5^-1)<<5)|0}jJ(g)}jJ(a);return}function co(a,b,d,e,f,g,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0.0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0.0,as=0,at=0,au=0.0,av=0.0,aw=0.0,ax=0.0,ay=0,az=0.0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0;k=i;i=i+192|0;l=k|0;m=k+16|0;n=k+24|0;o=k+40|0;p=k+56|0;q=k+72|0;r=k+88|0;s=k+112|0;t=k+136|0;u=k+160|0;v=k+176|0;w=q|0;c[w>>2]=0;x=q+4|0;c[x>>2]=0;y=q+8|0;c[y>>2]=0;z=c[a+12>>2]|0;A=c[a+16>>2]|0;if((z|0)==(A|0)){B=0;C=0;D=0}else{E=r+8|0;F=r+12|0;G=r+16|0;H=r;I=z;z=0;J=0;while(1){K=I;M=c[K>>2]|0;N=c[K+4>>2]|0;c[E>>2]=0;c[F>>2]=0;c[G>>2]=0;c[H>>2]=M;c[H+4>>2]=N;if((z|0)==(J|0)){cr(q,r)}else{if((z|0)!=0){K=z;c[K>>2]=M;c[K+4>>2]=N;c[z+8>>2]=0;c[z+12>>2]=0;c[z+16>>2]=0}c[x>>2]=(c[x>>2]|0)+20|0}N=c[E>>2]|0;K=N;if((N|0)!=0){M=c[F>>2]|0;if((N|0)!=(M|0)){c[F>>2]=M+((((M-16|0)+(-K|0)|0)>>>4^-1)<<4)|0}jJ(N)}N=I+8|0;O=c[x>>2]|0;if((N|0)==(A|0)){break}I=N;z=O;J=c[y>>2]|0}B=O;C=c[w>>2]|0;D=c[y>>2]|0}c[s>>2]=b;c[s+4>>2]=d;d=s+8|0;c[d>>2]=0;b=s+12|0;c[b>>2]=0;c[s+16>>2]=0;c[t>>2]=e;c[t+4>>2]=f;f=t+8|0;c[f>>2]=0;e=t+12|0;c[e>>2]=0;c[t+16>>2]=0;O=(B-C|0)/20&-1;C=O+1|0;if((B|0)==(D|0)){cr(q,s);P=c[x>>2]|0}else{if((B|0)!=0){D=s;s=B;J=c[D+4>>2]|0;c[s>>2]=c[D>>2]|0;c[s+4>>2]=J;c[B+8>>2]=0;c[B+12>>2]=0;c[B+16>>2]=0}B=(c[x>>2]|0)+20|0;c[x>>2]=B;P=B}if((P|0)==(c[y>>2]|0)){cr(q,t);Q=c[x>>2]|0}else{L234:do{if((P|0)!=0){q=t;y=P;B=c[q+4>>2]|0;c[y>>2]=c[q>>2]|0;c[y+4>>2]=B;B=P+8|0;c[B>>2]=0;y=P+12|0;c[y>>2]=0;q=P+16|0;c[q>>2]=0;J=c[e>>2]|0;s=c[f>>2]|0;D=J-s|0;z=D>>4;if((z|0)==0){break}if(z>>>0>268435455){hu(0);return 0}I=jG(D)|0;c[y>>2]=I;c[B>>2]=I;c[q>>2]=I+(z<<4)|0;if((s|0)==(J|0)){break}else{R=s;S=I}while(1){if((S|0)==0){T=0}else{c[S>>2]=c[R>>2]|0;h[S+8>>3]=+h[R+8>>3];T=c[y>>2]|0}I=T+16|0;c[y>>2]=I;s=R+16|0;if((s|0)==(J|0)){break L234}else{R=s;S=I}}}}while(0);S=(c[x>>2]|0)+20|0;c[x>>2]=S;Q=S}S=c[w>>2]|0;L249:do{if((Q-S|0)>0){R=a+24|0;T=u|0;P=u+8|0;t=a|0;J=a+4|0;y=0;I=Q;s=S;while(1){L253:do{if((I-s|0)>0){if((y|0)<(O|0)){U=0;V=s}else{z=0;q=s;while(1){B=q+(y*20&-1)|0;D=c[B>>2]|0;A=q+(z*20&-1)|0;F=c[A>>2]|0;do{if(ck(c[t>>2]|0,c[J>>2]|0,D,c[B+4>>2]|0,F,c[A+4>>2]|0)|0){E=c[q+(y*20&-1)+4>>2]|0;r=c[q+(z*20&-1)+4>>2]|0;H=D-F|0;G=ah(H,H);H=E-r|0;r=jU(ah(H,H),0,G,0)|0;W=+X(+(+(r>>>0)+ +(L|0)*4294967296.0));c[T>>2]=z;h[P>>3]=W;r=q+(y*20&-1)+12|0;G=c[r>>2]|0;if((G|0)==(c[q+(y*20&-1)+16>>2]|0)){cq(q+(y*20&-1)+8|0,u);break}if((G|0)==0){Y=0}else{c[G>>2]=z;h[G+8>>3]=W;Y=c[r>>2]|0}c[r>>2]=Y+16|0}}while(0);F=z+1|0;D=c[x>>2]|0;A=c[w>>2]|0;if((F|0)<((D-A|0)/20&-1|0)){z=F;q=A}else{Z=D;_=A;break L253}}}while(1){do{if((U|0)<(O|0)){if((c[(c[(c[R>>2]|0)+(y*12&-1)>>2]|0)+(U>>>5<<2)>>2]&1<<(U&31)|0)==0){break}$=c[V+(y*20&-1)>>2]|0;aa=c[V+(U*20&-1)>>2]|0;ab=200;break}else{q=V+(y*20&-1)|0;z=c[q>>2]|0;A=V+(U*20&-1)|0;D=c[A>>2]|0;if(ck(c[t>>2]|0,c[J>>2]|0,z,c[q+4>>2]|0,D,c[A+4>>2]|0)|0){$=z;aa=D;ab=200;break}else{break}}}while(0);do{if((ab|0)==200){ab=0;D=c[V+(y*20&-1)+4>>2]|0;z=c[V+(U*20&-1)+4>>2]|0;A=$-aa|0;q=ah(A,A);A=D-z|0;z=jU(ah(A,A),0,q,0)|0;W=+X(+(+(z>>>0)+ +(L|0)*4294967296.0));c[T>>2]=U;h[P>>3]=W;z=V+(y*20&-1)+12|0;q=c[z>>2]|0;if((q|0)==(c[V+(y*20&-1)+16>>2]|0)){cq(V+(y*20&-1)+8|0,u);break}if((q|0)==0){ac=0}else{c[q>>2]=U;h[q+8>>3]=W;ac=c[z>>2]|0}c[z>>2]=ac+16|0}}while(0);z=U+1|0;q=c[x>>2]|0;A=c[w>>2]|0;if((z|0)<((q-A|0)/20&-1|0)){U=z;V=A}else{Z=q;_=A;break L253}}}else{Z=I;_=s}}while(0);A=y+1|0;if((A|0)<((Z-_|0)/20&-1|0)){y=A;I=Z;s=_}else{ad=Z;ae=_;break L249}}}else{ad=Q;ae=S}}while(0);S=l;l=o;Q=p;c[m>>2]=C;_=n|0;c[_>>2]=0;Z=n+4|0;c[Z>>2]=0;V=n+8|0;c[V>>2]=0;c[o>>2]=O;c[o+4>>2]=-1;h[o+8>>3]=0.0;U=(ad-ae|0)/20&-1;do{if((ad|0)==(ae|0)){af=0;ag=n|0;ab=232;break}else{if(U>>>0>268435455){hu(0);return 0}ac=jG(U<<4)|0;u=U;aa=ac;while(1){if((aa|0)==0){ai=0}else{$=aa;c[$>>2]=c[1236]|0;c[$+4>>2]=c[1237]|0;c[$+8>>2]=c[1238]|0;c[$+12>>2]=c[1239]|0;ai=aa}$=u-1|0;if(($|0)==0){break}else{u=$;aa=ai+16|0}}aa=c[Z>>2]|0;u=n|0;if((aa|0)==(c[V>>2]|0)){af=ac;ag=u;ab=232;break}if((aa|0)==0){aj=0}else{$=aa;c[$>>2]=c[l>>2]|0;c[$+4>>2]=c[l+4>>2]|0;c[$+8>>2]=c[l+8>>2]|0;c[$+12>>2]=c[l+12>>2]|0;aj=c[Z>>2]|0}$=aj+16|0;c[Z>>2]=$;ak=$;al=ac;am=u;break}}while(0);if((ab|0)==232){cv(ag,o);ak=c[Z>>2]|0;al=af;am=ag}ag=c[_>>2]|0;af=ak-ag|0;do{if((af|0)>16){o=((af>>4)-2|0)/2&-1;aj=ak-16|0;W=+h[ak-16+8>>3];if(+h[ag+(o<<4)+8>>3]<=W){an=ag;ao=ak;break}l=aj;n=c[l>>2]|0;ai=c[l+4>>2]|0;l=o;o=aj;while(1){ap=ag+(l<<4)|0;aj=o;U=ap;c[aj>>2]=c[U>>2]|0;c[aj+4>>2]=c[U+4>>2]|0;c[aj+8>>2]=c[U+8>>2]|0;c[aj+12>>2]=c[U+12>>2]|0;if((l|0)==0){aq=0;break}U=(l-1|0)/2&-1;if(+h[ag+(U<<4)+8>>3]>W){l=U;o=ap}else{aq=l;break}}l=ap;c[l>>2]=n;c[l+4>>2]=ai;h[ag+(aq<<4)+8>>3]=W;an=c[_>>2]|0;ao=c[Z>>2]|0}else{an=ag;ao=ak}}while(0);L314:do{if((an|0)!=(ao|0)){ak=p|0;ag=p+4|0;aq=p+8|0;ap=an;af=ao;while(1){l=c[ap>>2]|0;o=c[ap+4>>2]|0;ac=ap+8|0;ar=+h[ac>>3];U=af-ap|0;do{if((U|0)>16){aj=ap;c[S>>2]=c[aj>>2]|0;c[S+4>>2]=c[aj+4>>2]|0;c[S+8>>2]=c[aj+8>>2]|0;c[S+12>>2]=c[aj+12>>2]|0;ae=af-16|0;c[aj>>2]=c[ae>>2]|0;c[aj+4>>2]=c[ae+4>>2]|0;c[aj+8>>2]=c[ae+8>>2]|0;c[aj+12>>2]=c[ae+12>>2]|0;c[ae>>2]=c[S>>2]|0;c[ae+4>>2]=c[S+4>>2]|0;c[ae+8>>2]=c[S+8>>2]|0;c[ae+12>>2]=c[S+12>>2]|0;ae=(U>>4)-1|0;if((ae|0)<=1){break}do{if((ae|0)==2){ab=246}else{if(+h[ap+40>>3]>+h[ap+24>>3]){ab=246;break}else{as=2;at=ap+32|0;break}}}while(0);if((ab|0)==246){ab=0;as=1;at=ap+16|0}au=+h[ac>>3];if(au<=+h[at+8>>3]){break}aj=ap;ad=c[aj>>2]|0;u=c[aj+4>>2]|0;aj=as;$=at;aa=ap;while(1){Y=aa;a=$;c[Y>>2]=c[a>>2]|0;c[Y+4>>2]=c[a+4>>2]|0;c[Y+8>>2]=c[a+8>>2]|0;c[Y+12>>2]=c[a+12>>2]|0;a=aj<<1;Y=a+2|0;if((Y|0)>(ae|0)){break}s=a|1;do{if((Y|0)==(ae|0)){av=+h[ap+(s<<4)+8>>3];ab=253;break}else{aw=+h[ap+(Y<<4)+8>>3];ax=+h[ap+(s<<4)+8>>3];if(aw>ax){av=ax;ab=253;break}else{ay=Y;az=aw;break}}}while(0);if((ab|0)==253){ab=0;ay=s;az=av}if(au>az){aj=ay;aa=$;$=ap+(ay<<4)|0}else{break}}aa=$;c[aa>>2]=ad;c[aa+4>>2]=u;h[$+8>>3]=au}}while(0);ac=(c[Z>>2]|0)-16|0;c[Z>>2]=ac;U=al+(l<<4)|0;L338:do{if((c[U>>2]|0)==-1){c[U>>2]=l;c[al+(l<<4)+4>>2]=o;h[al+(l<<4)+8>>3]=ar;aa=c[w>>2]|0;aj=c[aa+(l*20&-1)+8>>2]|0;ae=c[aa+(l*20&-1)+12>>2]|0;if((aj|0)==(ae|0)){aA=ac;break}else{aB=aj;aC=ac}while(1){aw=+h[aB+8>>3];c[ak>>2]=c[aB>>2]|0;c[ag>>2]=l;h[aq>>3]=ar+aw;if((aC|0)==(c[V>>2]|0)){cv(am,p);aD=c[Z>>2]|0}else{if((aC|0)==0){aE=0}else{aj=aC;c[aj>>2]=c[Q>>2]|0;c[aj+4>>2]=c[Q+4>>2]|0;c[aj+8>>2]=c[Q+8>>2]|0;c[aj+12>>2]=c[Q+12>>2]|0;aE=c[Z>>2]|0}aj=aE+16|0;c[Z>>2]=aj;aD=aj}aj=c[_>>2]|0;aa=aD-aj|0;do{if((aa|0)>16){Y=((aa>>4)-2|0)/2&-1;a=aD-16|0;aw=+h[aD-16+8>>3];if(+h[aj+(Y<<4)+8>>3]<=aw){aF=aD;break}I=a;y=c[I>>2]|0;P=c[I+4>>2]|0;I=Y;Y=a;while(1){aG=aj+(I<<4)|0;a=Y;T=aG;c[a>>2]=c[T>>2]|0;c[a+4>>2]=c[T+4>>2]|0;c[a+8>>2]=c[T+8>>2]|0;c[a+12>>2]=c[T+12>>2]|0;if((I|0)==0){aH=0;break}T=(I-1|0)/2&-1;if(+h[aj+(T<<4)+8>>3]>aw){I=T;Y=aG}else{aH=I;break}}I=aG;c[I>>2]=y;c[I+4>>2]=P;h[aj+(aH<<4)+8>>3]=aw;aF=c[Z>>2]|0}else{aF=aD}}while(0);aj=aB+16|0;if((aj|0)==(ae|0)){aA=aF;break L338}else{aB=aj;aC=aF}}}else{aA=ac}}while(0);ac=c[_>>2]|0;if((ac|0)==(aA|0)){break L314}else{ap=ac;af=aA}}}}while(0);aA=v|0;c[aA>>2]=0;aF=v+4|0;c[aF>>2]=0;aC=v+8|0;c[aC>>2]=0;L360:do{if((c[al+(C<<4)>>2]|0)!=-1){aB=C;aD=0;aH=0;while(1){if((aD|0)==(aH|0)){cu(v,m);aI=c[m>>2]|0}else{if((aD|0)==0){aJ=0}else{c[aD>>2]=aB;aJ=c[aF>>2]|0}c[aF>>2]=aJ+4|0;aI=aB}aG=c[al+(aI<<4)+4>>2]|0;c[m>>2]=aG;if((aG|0)==(O|0)){break}aB=aG;aD=c[aF>>2]|0;aH=c[aC>>2]|0}aH=c[aA>>2]|0;aD=c[aF>>2]|0;if((aH|0)==(aD|0)){break}aB=aD-4|0;if(aH>>>0<aB>>>0){aK=aH;aL=aB}else{break}while(1){aB=c[aK>>2]|0;c[aK>>2]=c[aL>>2]|0;c[aL>>2]=aB;aB=aK+4|0;aH=aL-4|0;if(aB>>>0<aH>>>0){aK=aB;aL=aH}else{break L360}}}}while(0);if((al|0)!=0){jJ(al)}al=c[_>>2]|0;_=al;if((al|0)!=0){aL=c[Z>>2]|0;if((al|0)!=(aL|0)){c[Z>>2]=aL+((((aL-16|0)+(-_|0)|0)>>>4^-1)<<4)|0}jJ(al)}al=c[aA>>2]|0;_=c[aF>>2]|0;do{if((al|0)==(_|0)){aM=0;aN=al}else{aL=_-al|0;c[g>>2]=aL>>2;Z=a6(aL>>1|0,4)|0;aL=jH(L?-1:Z)|0;c[j>>2]=aL;Z=c[aA>>2]|0;aK=c[aF>>2]|0;if((Z|0)==(aK|0)){aM=1;aN=Z;break}else{aO=Z;aP=0;aQ=aL}while(1){aL=c[aO>>2]|0;c[aQ+(aP<<2)>>2]=c[(c[w>>2]|0)+(aL*20&-1)>>2]|0;c[(c[j>>2]|0)+((aP|1)<<2)>>2]=c[(c[w>>2]|0)+(aL*20&-1)+4>>2]|0;aL=aO+4|0;if((aL|0)==(aK|0)){break}aO=aL;aP=aP+2|0;aQ=c[j>>2]|0}aM=1;aN=c[aA>>2]|0}}while(0);aA=aN;if((aN|0)!=0){j=c[aF>>2]|0;if((aN|0)!=(j|0)){c[aF>>2]=j+((((j-4|0)+(-aA|0)|0)>>>2^-1)<<2)|0}jJ(aN)}aN=c[f>>2]|0;f=aN;if((aN|0)!=0){aA=c[e>>2]|0;if((aN|0)!=(aA|0)){c[e>>2]=aA+((((aA-16|0)+(-f|0)|0)>>>4^-1)<<4)|0}jJ(aN)}aN=c[d>>2]|0;d=aN;if((aN|0)!=0){f=c[b>>2]|0;if((aN|0)!=(f|0)){c[b>>2]=f+((((f-16|0)+(-d|0)|0)>>>4^-1)<<4)|0}jJ(aN)}aN=c[w>>2]|0;if((aN|0)==0){i=k;return aM|0}d=c[x>>2]|0;if((aN|0)==(d|0)){aR=aN}else{f=d;while(1){d=f-20|0;c[x>>2]=d;b=c[f-20+8>>2]|0;aA=b;if((b|0)==0){aS=d}else{d=f-20+12|0;e=c[d>>2]|0;if((b|0)!=(e|0)){c[d>>2]=e+((((e-16|0)+(-aA|0)|0)>>>4^-1)<<4)|0}jJ(b);aS=c[x>>2]|0}if((aN|0)==(aS|0)){break}else{f=aS}}aR=c[w>>2]|0}jJ(aR);i=k;return aM|0}function cp(a){a=a|0;if((a|0)==0){return}jK(a);return}function cq(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=(c[d>>2]|0)-f>>4;i=g+1|0;if(i>>>0>268435455){hu(0)}j=a+8|0;a=(c[j>>2]|0)-f|0;do{if(a>>4>>>0>134217726){k=268435455;l=366}else{f=a>>3;m=f>>>0<i>>>0?i:f;if((m|0)==0){n=0;o=0;break}else{k=m;l=366;break}}}while(0);if((l|0)==366){n=jG(k<<4)|0;o=k}k=n+(g<<4)|0;l=n+(o<<4)|0;if((k|0)!=0){c[k>>2]=c[b>>2]|0;h[n+(g<<4)+8>>3]=+h[b+8>>3]}b=n+(i<<4)|0;i=c[e>>2]|0;o=c[d>>2]|0;if((o|0)==(i|0)){p=i;q=k}else{a=(g-1|0)-(((o-16|0)+(-i|0)|0)>>>4)|0;g=o;o=k;while(1){k=o-16|0;m=g-16|0;if((k|0)!=0){c[k>>2]=c[m>>2]|0;h[o-16+8>>3]=+h[g-16+8>>3]}if((m|0)==(i|0)){break}else{g=m;o=k}}p=c[e>>2]|0;q=n+(a<<4)|0}c[e>>2]=q;c[d>>2]=b;c[j>>2]=l;if((p|0)==0){return}jJ(p);return}function cr(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=((c[d>>2]|0)-f|0)/20&-1;h=g+1|0;if(h>>>0>214748364){hu(0)}i=a+8|0;a=((c[i>>2]|0)-f|0)/20&-1;do{if(a>>>0>107374181){j=214748364;k=384}else{f=a<<1;l=f>>>0<h>>>0?h:f;if((l|0)==0){m=0;n=0;break}else{j=l;k=384;break}}}while(0);if((k|0)==384){m=jG(j*20&-1)|0;n=j}j=m+(g*20&-1)|0;k=m+(n*20&-1)|0;if((j|0)!=0){n=b;a=j;l=c[n+4>>2]|0;c[a>>2]=c[n>>2]|0;c[a+4>>2]=l;cs(m+(g*20&-1)+8|0,b+8|0)}b=m+(h*20&-1)|0;h=c[e>>2]|0;m=c[d>>2]|0;L469:do{if((m|0)==(h|0)){c[e>>2]=j;c[d>>2]=b;c[i>>2]=k;o=h}else{g=m;l=j;while(1){p=l-20|0;a=g-20|0;if((p|0)!=0){n=a;f=p;q=c[n+4>>2]|0;c[f>>2]=c[n>>2]|0;c[f+4>>2]=q;cs(l-20+8|0,g-20+8|0)}if((a|0)==(h|0)){break}else{g=a;l=p}}l=c[e>>2]|0;g=c[d>>2]|0;c[e>>2]=p;c[d>>2]=b;c[i>>2]=k;if((l|0)==(g|0)){o=l;break}else{r=g}while(1){g=r-20|0;a=c[r-20+8>>2]|0;q=a;if((a|0)!=0){f=r-20+12|0;n=c[f>>2]|0;if((a|0)!=(n|0)){c[f>>2]=n+((((n-16|0)+(-q|0)|0)>>>4^-1)<<4)|0}jJ(a)}if((l|0)==(g|0)){o=l;break L469}else{r=g}}}}while(0);if((o|0)==0){return}jJ(o);return}function cs(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,k=0,l=0,m=0;d=a|0;c[d>>2]=0;e=a+4|0;c[e>>2]=0;f=a+8|0;c[f>>2]=0;a=b+4|0;g=b|0;b=(c[a>>2]|0)-(c[g>>2]|0)|0;i=b>>4;if((i|0)==0){return}if(i>>>0>268435455){hu(0)}j=jG(b)|0;c[e>>2]=j;c[d>>2]=j;c[f>>2]=j+(i<<4)|0;i=c[g>>2]|0;g=c[a>>2]|0;if((i|0)==(g|0)){return}else{k=i;l=j}while(1){if((l|0)==0){m=0}else{c[l>>2]=c[k>>2]|0;h[l+8>>3]=+h[k+8>>3];m=c[e>>2]|0}j=m+16|0;c[e>>2]=j;i=k+16|0;if((i|0)==(g|0)){break}else{k=i;l=j}}return}function ct(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;if((a|0)==(b|0)){return a|0}d=b+4|0;e=c[d>>2]|0;if((e|0)==0){f=0}else{g=a+8|0;h=a|0;i=c[h>>2]|0;do{if(e>>>0>c[g>>2]<<5>>>0){if((i|0)==0){j=e}else{jJ(i);c[h>>2]=0;c[g>>2]=0;c[a+4>>2]=0;j=c[d>>2]|0}if((j|0)<0){hu(0);return 0}else{k=((j-1|0)>>>5)+1|0;l=jG(k<<2)|0;c[h>>2]=l;c[a+4>>2]=0;c[g>>2]=k;m=c[d>>2]|0;n=l;break}}else{m=e;n=i}}while(0);jR(n|0,c[b>>2]|0,((m-1|0)>>>5<<2)+4|0);f=c[d>>2]|0}c[a+4>>2]=f;return a|0}function cu(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=(c[d>>2]|0)-f>>2;h=g+1|0;if(h>>>0>1073741823){hu(0)}i=a+8|0;a=(c[i>>2]|0)-f|0;do{if(a>>2>>>0>536870910){j=1073741823;k=448}else{f=a>>1;l=f>>>0<h>>>0?h:f;if((l|0)==0){m=0;n=0;break}else{j=l;k=448;break}}}while(0);if((k|0)==448){m=jG(j<<2)|0;n=j}j=m+(g<<2)|0;if((j|0)!=0){c[j>>2]=c[b>>2]|0}b=c[e>>2]|0;j=(c[d>>2]|0)-b|0;k=m+(g-(j>>2)<<2)|0;g=b;jQ(k|0,g|0,j);c[e>>2]=k;c[d>>2]=m+(h<<2)|0;c[i>>2]=m+(n<<2)|0;if((b|0)==0){return}jJ(g);return}function cv(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=(c[d>>2]|0)-f>>4;h=g+1|0;if(h>>>0>268435455){hu(0)}i=a+8|0;a=(c[i>>2]|0)-f|0;do{if(a>>4>>>0>134217726){j=268435455;k=460}else{f=a>>3;l=f>>>0<h>>>0?h:f;if((l|0)==0){m=0;n=0;break}else{j=l;k=460;break}}}while(0);if((k|0)==460){m=jG(j<<4)|0;n=j}j=m+(g<<4)|0;if((j|0)!=0){k=j;j=b;c[k>>2]=c[j>>2]|0;c[k+4>>2]=c[j+4>>2]|0;c[k+8>>2]=c[j+8>>2]|0;c[k+12>>2]=c[j+12>>2]|0}j=c[e>>2]|0;k=(c[d>>2]|0)-j|0;b=m+(g-(k>>4)<<4)|0;g=j;jQ(b|0,g|0,k);c[e>>2]=b;c[d>>2]=m+(h<<4)|0;c[i>>2]=m+(n<<4)|0;if((j|0)==0){return}jJ(g);return}function cw(a){a=a|0;var b=0;c[a>>2]=6720;b=c[a+4>>2]|0;a=b+4|0;if(((J=c[a>>2]|0,c[a>>2]=J+ -1,J)|0)!=0){return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cx(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=6720;b=c[a+4>>2]|0;d=b+4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){e=a;jJ(e);return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jJ(e);return}function cy(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=b4[c[(c[a>>2]|0)+20>>2]&1023](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((a0(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=483;break}if((l|0)==2){m=-1;n=485;break}else if((l|0)!=1){n=481;break}}if((n|0)==481){m=((aX(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}else if((n|0)==483){i=b;return m|0}else if((n|0)==485){i=b;return m|0}return 0}function cz(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,p=0,q=0,s=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;c8(12456,c[o>>2]|0,12528);c[3348]=7012;c[3350]=7032;c[3349]=0;c[3356]=12456;c[3354]=0;c[3355]=0;c[3351]=4098;c[3353]=0;c[3352]=6;jP(13432,0,40);if(a[13616]|0){d=c[986]|0}else{if(a[13624]|0){e=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;e=4248}c[992]=e;b=e+4|0;J=c[b>>2]|0,c[b>>2]=J+1,J;c[986]=3968;a[13616]=1;d=3968}b=c[d>>2]|0;c[3357]=b;d=b+4|0;J=c[d>>2]|0,c[d>>2]=J+1,J;c[3368]=0;c[3369]=-1;cP(12360,c[t>>2]|0,12536);c[3282]=6916;c[3283]=6936;c[3289]=12360;c[3287]=0;c[3288]=0;c[3284]=4098;c[3286]=0;c[3285]=6;jP(13164,0,40);if(a[13616]|0){f=c[986]|0}else{if(a[13624]|0){g=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;g=4248}c[992]=g;d=g+4|0;J=c[d>>2]|0,c[d>>2]=J+1,J;c[986]=3968;a[13616]=1;f=3968}d=c[f>>2]|0;c[3290]=d;f=d+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;c[3301]=0;c[3302]=-1;cP(12408,c[r>>2]|0,12544);c[3326]=6916;c[3327]=6936;c[3333]=12408;c[3331]=0;c[3332]=0;c[3328]=4098;c[3330]=0;c[3329]=6;jP(13340,0,40);if(a[13616]|0){h=c[986]|0}else{if(a[13624]|0){i=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;i=4248}c[992]=i;f=i+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;c[986]=3968;a[13616]=1;h=3968}f=c[h>>2]|0;c[3334]=f;h=f+4|0;J=c[h>>2]|0,c[h>>2]=J+1,J;c[3345]=0;c[3346]=-1;h=c[13304+((c[(c[3326]|0)-12>>2]|0)+24|0)>>2]|0;c[3304]=6916;c[3305]=6936;c[3311]=h;c[3309]=(h|0)==0&1;c[3310]=0;c[3306]=4098;c[3308]=0;c[3307]=6;jP(13252,0,40);if(a[13616]|0){j=c[986]|0}else{if(a[13624]|0){k=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;k=4248}c[992]=k;h=k+4|0;J=c[h>>2]|0,c[h>>2]=J+1,J;c[986]=3968;a[13616]=1;j=3968}h=c[j>>2]|0;c[3312]=h;j=h+4|0;J=c[j>>2]|0,c[j>>2]=J+1,J;c[3323]=0;c[3324]=-1;c[13392+((c[(c[3348]|0)-12>>2]|0)+72|0)>>2]=13128;j=13304+((c[(c[3326]|0)-12>>2]|0)+4|0)|0;c[j>>2]=c[j>>2]|8192;c[13304+((c[(c[3326]|0)-12>>2]|0)+72|0)>>2]=13128;cN(12304,c[o>>2]|0,12552);c[3260]=6964;c[3262]=6984;c[3261]=0;c[3268]=12304;c[3266]=0;c[3267]=0;c[3263]=4098;c[3265]=0;c[3264]=6;jP(13080,0,40);if(a[13616]|0){l=c[986]|0}else{if(a[13624]|0){m=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;m=4248}c[992]=m;j=m+4|0;J=c[j>>2]|0,c[j>>2]=J+1,J;c[986]=3968;a[13616]=1;l=3968}j=c[l>>2]|0;c[3269]=j;l=j+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;c[3280]=0;c[3281]=-1;cB(12208,c[t>>2]|0,12560);c[3190]=6868;c[3191]=6888;c[3197]=12208;c[3195]=0;c[3196]=0;c[3192]=4098;c[3194]=0;c[3193]=6;jP(12796,0,40);if(a[13616]|0){n=c[986]|0}else{if(a[13624]|0){p=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;p=4248}c[992]=p;l=p+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;c[986]=3968;a[13616]=1;n=3968}l=c[n>>2]|0;c[3198]=l;n=l+4|0;J=c[n>>2]|0,c[n>>2]=J+1,J;c[3209]=0;c[3210]=-1;cB(12256,c[r>>2]|0,12568);c[3234]=6868;c[3235]=6888;c[3241]=12256;c[3239]=0;c[3240]=0;c[3236]=4098;c[3238]=0;c[3237]=6;jP(12972,0,40);if(a[13616]|0){q=c[986]|0}else{if(a[13624]|0){s=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;s=4248}c[992]=s;n=s+4|0;J=c[n>>2]|0,c[n>>2]=J+1,J;c[986]=3968;a[13616]=1;q=3968}n=c[q>>2]|0;c[3242]=n;q=n+4|0;J=c[q>>2]|0,c[q>>2]=J+1,J;c[3253]=0;c[3254]=-1;q=c[12936+((c[(c[3234]|0)-12>>2]|0)+24|0)>>2]|0;c[3212]=6868;c[3213]=6888;c[3219]=q;c[3217]=(q|0)==0&1;c[3218]=0;c[3214]=4098;c[3216]=0;c[3215]=6;jP(12884,0,40);if(a[13616]|0){u=c[986]|0;v=u|0;w=c[v>>2]|0;x=w;c[3220]=x;y=w+4|0;z=(J=c[y>>2]|0,c[y>>2]=J+1,J);c[3231]=0;c[3232]=-1;A=c[3260]|0;B=A-12|0;C=B;D=c[C>>2]|0;E=D+72|0;F=E+13040|0;G=F;c[G>>2]=12760;H=c[3234]|0;I=H-12|0;K=I;L=c[K>>2]|0;M=L+4|0;N=M+12936|0;O=N;P=c[O>>2]|0;Q=P|8192;c[O>>2]=Q;R=c[3234]|0;S=R-12|0;T=S;U=c[T>>2]|0;V=U+72|0;W=V+12936|0;X=W;c[X>>2]=12760;return}if(a[13624]|0){Y=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;Y=4248}c[992]=Y;q=Y+4|0;J=c[q>>2]|0,c[q>>2]=J+1,J;c[986]=3968;a[13616]=1;u=3968;v=u|0;w=c[v>>2]|0;x=w;c[3220]=x;y=w+4|0;z=(J=c[y>>2]|0,c[y>>2]=J+1,J);c[3231]=0;c[3232]=-1;A=c[3260]|0;B=A-12|0;C=B;D=c[C>>2]|0;E=D+72|0;F=E+13040|0;G=F;c[G>>2]=12760;H=c[3234]|0;I=H-12|0;K=I;L=c[K>>2]|0;M=L+4|0;N=M+12936|0;O=N;P=c[O>>2]|0;Q=P|8192;c[O>>2]=Q;R=c[3234]|0;S=R-12|0;T=S;U=c[T>>2]|0;V=U+72|0;W=V+12936|0;X=W;c[X>>2]=12760;return}function cA(a){a=a|0;ei(13128);ei(13216);ej(12760);ej(12848);return}function cB(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;i=i+16|0;g=f|0;h=b|0;c[h>>2]=6720;if(a[13616]|0){j=c[986]|0}else{if(a[13624]|0){k=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;k=4248}c[992]=k;l=k+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;c[986]=3968;a[13616]=1;j=3968}l=b+4|0;k=c[j>>2]|0;c[l>>2]=k;j=k+4|0;J=c[j>>2]|0,c[j>>2]=J+1,J;jP(b+8|0,0,24);c[h>>2]=7088;c[b+32>>2]=d;d=b+36|0;h=c[l>>2]|0;l=h+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;if((c[3180]|0)!=-1){c[g>>2]=12720;c[g+4>>2]=24;c[g+8>>2]=0;dh(12720,g,250)}g=(c[3181]|0)-1|0;j=c[h+8>>2]|0;do{if((c[h+12>>2]|0)-j>>2>>>0>g>>>0){k=c[j+(g<<2)>>2]|0;if((k|0)==0){break}m=k;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=bW[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}bT[c[(c[h>>2]|0)+8>>2]&1023](h|0);c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=bW[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}}while(0);f=bf(4)|0;c[f>>2]=5e3;aO(f|0,10664,510)}function cC(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+16|0;f=e|0;bW[c[(c[b>>2]|0)+24>>2]&1023](b);g=c[d>>2]|0;if((c[3180]|0)!=-1){c[f>>2]=12720;c[f+4>>2]=24;c[f+8>>2]=0;dh(12720,f,250)}f=(c[3181]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}else{h=g;c[b+36>>2]=h;a[b+44|0]=bW[c[(c[g>>2]|0)+28>>2]&1023](h)&1;i=e;return}}function cD(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;if(!k){l=g+4|0;m=b+24|0;n=b+20|0;c[n>>2]=g;o=b+28|0;c[o>>2]=l;c[g>>2]=d;c[m>>2]=l;L689:do{if((a[b+44|0]&1)<<24>>24==0){p=f|0;c[h>>2]=p;q=b+36|0;r=b+40|0;s=f+8|0;t=f;u=b+32|0;v=g;w=l;while(1){x=c[q>>2]|0;y=b$[c[(c[x>>2]|0)+12>>2]&1023](x,c[r>>2]|0,v,w,j,p,s,h)|0;z=c[n>>2]|0;if((c[j>>2]|0)==(z|0)){A=-1;B=610;break}if((y|0)==3){B=597;break}if(y>>>0>=2){A=-1;B=606;break}x=(c[h>>2]|0)-t|0;if((a0(p|0,1,x|0,c[u>>2]|0)|0)!=(x|0)){A=-1;B=605;break}if((y|0)!=1){break L689}y=c[j>>2]|0;x=c[m>>2]|0;c[n>>2]=y;c[o>>2]=x;C=y+(x-y>>2<<2)|0;c[m>>2]=C;v=y;w=C}if((B|0)==610){i=e;return A|0}else if((B|0)==597){if((a0(z|0,1,1,c[u>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}else if((B|0)==605){i=e;return A|0}else if((B|0)==606){i=e;return A|0}}else{if((a0(g|0,4,1,c[b+32>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}}while(0);c[m>>2]=0;c[n>>2]=0;c[o>>2]=0}A=k?0:d;i=e;return A|0}function cE(a){a=a|0;var b=0;c[a>>2]=6720;b=c[a+4>>2]|0;a=b+4|0;if(((J=c[a>>2]|0,c[a>>2]=J+ -1,J)|0)!=0){return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cF(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=6720;b=c[a+4>>2]|0;d=b+4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){e=a;jJ(e);return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jJ(e);return}function cG(a){a=a|0;return cJ(a,0)|0}function cH(a){a=a|0;return cJ(a,1)|0}function cI(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;if((d|0)==-1){j=-1;i=e;return j|0}c[h>>2]=d;k=c[b+36>>2]|0;l=f|0;m=b$[c[(c[k>>2]|0)+12>>2]&1023](k,c[b+40>>2]|0,h,h+4|0,e+24|0,l,f+8|0,g)|0;if((m|0)==2|(m|0)==1){j=-1;i=e;return j|0}else if((m|0)==3){a[l]=d&255;c[g>>2]=f+1|0}f=b+32|0;while(1){b=c[g>>2]|0;if(b>>>0<=l>>>0){j=d;n=633;break}m=b-1|0;c[g>>2]=m;if((bL(a[m]|0|0,c[f>>2]|0)|0)==-1){j=-1;n=631;break}}if((n|0)==631){i=e;return j|0}else if((n|0)==633){i=e;return j|0}return 0}function cJ(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=c[b+44>>2]|0;l=(k|0)>1?k:1;L736:do{if((l|0)>0){k=b+32|0;m=0;while(1){n=aN(c[k>>2]|0)|0;if((n|0)==-1){o=-1;break}a[f+m|0]=n&255;n=m+1|0;if((n|0)<(l|0)){m=n}else{break L736}}i=e;return o|0}}while(0);L743:do{if((a[b+48|0]&1)<<24>>24==0){m=b+40|0;k=b+36|0;n=f|0;p=g+4|0;q=b+32|0;r=l;while(1){s=c[m>>2]|0;t=s;u=c[t>>2]|0;v=c[t+4>>2]|0;t=c[k>>2]|0;w=f+r|0;x=b$[c[(c[t>>2]|0)+16>>2]&1023](t,s,n,w,h,g,p,j)|0;if((x|0)==3){y=644;break}else if((x|0)==2){o=-1;y=652;break}else if((x|0)!=1){z=r;break L743}x=c[m>>2]|0;c[x>>2]=u;c[x+4>>2]=v;if((r|0)==8){o=-1;y=656;break}v=aN(c[q>>2]|0)|0;if((v|0)==-1){o=-1;y=654;break}a[w]=v&255;r=r+1|0}if((y|0)==644){c[g>>2]=a[n]|0;z=r;break}else if((y|0)==656){i=e;return o|0}else if((y|0)==652){i=e;return o|0}else if((y|0)==654){i=e;return o|0}}else{c[g>>2]=a[f|0]|0;z=l}}while(0);L757:do{if(!d){l=b+32|0;y=z;while(1){if((y|0)<=0){break L757}j=y-1|0;if((bL(a[f+j|0]|0|0,c[l>>2]|0)|0)==-1){o=-1;break}else{y=j}}i=e;return o|0}}while(0);o=c[g>>2]|0;i=e;return o|0}function cK(a){a=a|0;var b=0;c[a>>2]=6792;b=c[a+4>>2]|0;a=b+4|0;if(((J=c[a>>2]|0,c[a>>2]=J+ -1,J)|0)!=0){return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cL(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=6792;b=c[a+4>>2]|0;d=b+4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){e=a;jJ(e);return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jJ(e);return}function cM(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=b4[c[(c[a>>2]|0)+20>>2]&1023](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((a0(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=674;break}if((l|0)==2){m=-1;n=675;break}else if((l|0)!=1){n=671;break}}if((n|0)==671){m=((aX(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}else if((n|0)==675){i=b;return m|0}else if((n|0)==674){i=b;return m|0}return 0}function cN(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+16|0;g=f|0;h=b|0;c[h>>2]=6720;if(a[13616]|0){j=c[986]|0}else{if(a[13624]|0){k=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;k=4248}c[992]=k;l=k+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;c[986]=3968;a[13616]=1;j=3968}l=b+4|0;k=c[j>>2]|0;c[l>>2]=k;j=k+4|0;J=c[j>>2]|0,c[j>>2]=J+1,J;jP(b+8|0,0,24);c[h>>2]=7488;c[b+32>>2]=d;c[b+40>>2]=e;e=c[l>>2]|0;l=e+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;if((c[3180]|0)!=-1){c[g>>2]=12720;c[g+4>>2]=24;c[g+8>>2]=0;dh(12720,g,250)}g=(c[3181]|0)-1|0;d=c[e+8>>2]|0;do{if((c[e+12>>2]|0)-d>>2>>>0>g>>>0){h=c[d+(g<<2)>>2]|0;if((h|0)==0){break}j=h;k=b+36|0;c[k>>2]=j;m=b+44|0;c[m>>2]=bW[c[(c[h>>2]|0)+24>>2]&1023](j)|0;j=c[k>>2]|0;a[b+48|0]=bW[c[(c[j>>2]|0)+28>>2]&1023](j)&1;if((c[m>>2]|0)<=8){if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){i=f;return}bT[c[(c[e>>2]|0)+8>>2]&1023](e|0);i=f;return}m=bf(8)|0;c[m>>2]=5032;j=m+4|0;if((j|0)!=0){k=jH(50)|0;c[k+4>>2]=37;c[k>>2]=37;h=k+12|0;c[j>>2]=h;c[k+8>>2]=0;jQ(h|0,224,38)}aO(m|0,10680,184)}}while(0);f=bf(4)|0;c[f>>2]=5e3;aO(f|0,10664,510)}function cO(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+16|0;f=e|0;g=c[d>>2]|0;if((c[3180]|0)!=-1){c[f>>2]=12720;c[f+4>>2]=24;c[f+8>>2]=0;dh(12720,f,250)}f=(c[3181]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}h=g;j=b+36|0;c[j>>2]=h;f=b+44|0;c[f>>2]=bW[c[(c[g>>2]|0)+24>>2]&1023](h)|0;h=c[j>>2]|0;a[b+48|0]=bW[c[(c[h>>2]|0)+28>>2]&1023](h)&1;if((c[f>>2]|0)>8){gY(224)}else{i=e;return}}function cP(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;i=i+16|0;g=f|0;h=b|0;c[h>>2]=6792;if(a[13616]|0){j=c[986]|0}else{if(a[13624]|0){k=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;k=4248}c[992]=k;l=k+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;c[986]=3968;a[13616]=1;j=3968}l=b+4|0;k=c[j>>2]|0;c[l>>2]=k;j=k+4|0;J=c[j>>2]|0,c[j>>2]=J+1,J;jP(b+8|0,0,24);c[h>>2]=7160;c[b+32>>2]=d;d=b+36|0;h=c[l>>2]|0;l=h+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;if((c[3182]|0)!=-1){c[g>>2]=12728;c[g+4>>2]=24;c[g+8>>2]=0;dh(12728,g,250)}g=(c[3183]|0)-1|0;j=c[h+8>>2]|0;do{if((c[h+12>>2]|0)-j>>2>>>0>g>>>0){k=c[j+(g<<2)>>2]|0;if((k|0)==0){break}m=k;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=bW[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}bT[c[(c[h>>2]|0)+8>>2]&1023](h|0);c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=bW[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}}while(0);f=bf(4)|0;c[f>>2]=5e3;aO(f|0,10664,510)}function cQ(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+16|0;f=e|0;bW[c[(c[b>>2]|0)+24>>2]&1023](b);g=c[d>>2]|0;if((c[3182]|0)!=-1){c[f>>2]=12728;c[f+4>>2]=24;c[f+8>>2]=0;dh(12728,f,250)}f=(c[3183]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}else{h=g;c[b+36>>2]=h;a[b+44|0]=bW[c[(c[g>>2]|0)+28>>2]&1023](h)&1;i=e;return}}function cR(a){a=a|0;return c[a+4>>2]|0}function cS(a){a=a|0;return c[a+4>>2]|0}function cT(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;return}function cU(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;if((c[b+4>>2]|0)!=(a|0)){e=0;return e|0}e=(c[b>>2]|0)==(d|0);return e|0}function cV(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;if(!k){l=g+1|0;m=b+24|0;n=b+20|0;c[n>>2]=g;o=b+28|0;c[o>>2]=l;a[g]=d&255;c[m>>2]=l;L870:do{if((a[b+44|0]&1)<<24>>24==0){p=f|0;c[h>>2]=p;q=b+36|0;r=b+40|0;s=f+8|0;t=f;u=b+32|0;v=g;w=l;while(1){x=c[q>>2]|0;y=b$[c[(c[x>>2]|0)+12>>2]&1023](x,c[r>>2]|0,v,w,j,p,s,h)|0;z=c[n>>2]|0;if((c[j>>2]|0)==(z|0)){A=-1;B=777;break}if((y|0)==3){B=764;break}if(y>>>0>=2){A=-1;B=776;break}x=(c[h>>2]|0)-t|0;if((a0(p|0,1,x|0,c[u>>2]|0)|0)!=(x|0)){A=-1;B=772;break}if((y|0)!=1){break L870}y=c[j>>2]|0;x=c[m>>2]|0;c[n>>2]=y;c[o>>2]=x;C=y+(x-y|0)|0;c[m>>2]=C;v=y;w=C}if((B|0)==764){if((a0(z|0,1,1,c[u>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}else if((B|0)==772){i=e;return A|0}else if((B|0)==777){i=e;return A|0}else if((B|0)==776){i=e;return A|0}}else{if((a0(g|0,1,1,c[b+32>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}}while(0);c[m>>2]=0;c[n>>2]=0;c[o>>2]=0}A=k?0:d;i=e;return A|0}function cW(a){a=a|0;var b=0;c[a>>2]=6792;b=c[a+4>>2]|0;a=b+4|0;if(((J=c[a>>2]|0,c[a>>2]=J+ -1,J)|0)!=0){return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cX(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=6792;b=c[a+4>>2]|0;d=b+4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){e=a;jJ(e);return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jJ(e);return}function cY(a){a=a|0;return c$(a,0)|0}function cZ(a){a=a|0;return c$(a,1)|0}function c_(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;if((d|0)==-1){j=-1;i=e;return j|0}k=d&255;a[h]=k;l=c[b+36>>2]|0;m=f|0;n=b$[c[(c[l>>2]|0)+12>>2]&1023](l,c[b+40>>2]|0,h,h+1|0,e+24|0,m,f+8|0,g)|0;if((n|0)==3){a[m]=k;c[g>>2]=f+1|0}else if((n|0)==2|(n|0)==1){j=-1;i=e;return j|0}n=b+32|0;while(1){b=c[g>>2]|0;if(b>>>0<=m>>>0){j=d;o=799;break}f=b-1|0;c[g>>2]=f;if((bL(a[f]|0|0,c[n>>2]|0)|0)==-1){j=-1;o=797;break}}if((o|0)==797){i=e;return j|0}else if((o|0)==799){i=e;return j|0}return 0}function c$(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;f=i;i=i+32|0;g=f|0;h=f+8|0;j=f+16|0;k=f+24|0;l=c[b+44>>2]|0;m=(l|0)>1?l:1;L917:do{if((m|0)>0){l=b+32|0;n=0;while(1){o=aN(c[l>>2]|0)|0;if((o|0)==-1){p=-1;break}a[g+n|0]=o&255;o=n+1|0;if((o|0)<(m|0)){n=o}else{break L917}}i=f;return p|0}}while(0);L924:do{if((a[b+48|0]&1)<<24>>24==0){n=b+40|0;l=b+36|0;o=g|0;q=h+1|0;r=b+32|0;s=m;while(1){t=c[n>>2]|0;u=t;v=c[u>>2]|0;w=c[u+4>>2]|0;u=c[l>>2]|0;x=g+s|0;y=b$[c[(c[u>>2]|0)+16>>2]&1023](u,t,o,x,j,h,q,k)|0;if((y|0)==3){z=811;break}else if((y|0)==2){p=-1;z=824;break}else if((y|0)!=1){A=s;break L924}y=c[n>>2]|0;c[y>>2]=v;c[y+4>>2]=w;if((s|0)==8){p=-1;z=823;break}w=aN(c[r>>2]|0)|0;if((w|0)==-1){p=-1;z=822;break}a[x]=w&255;s=s+1|0}if((z|0)==811){a[h]=a[o]|0;A=s;break}else if((z|0)==822){i=f;return p|0}else if((z|0)==823){i=f;return p|0}else if((z|0)==824){i=f;return p|0}}else{a[h]=a[g|0]|0;A=m}}while(0);L938:do{if(!e){m=b+32|0;z=A;while(1){if((z|0)<=0){break L938}k=z-1|0;if((bL(d[g+k|0]|0|0,c[m>>2]|0)|0)==-1){p=-1;break}else{z=k}}i=f;return p|0}}while(0);p=d[h]|0;i=f;return p|0}function c0(){cz(0);aR(364,13480,v|0);return}function c1(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5096;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jK(e)}}while(0);jJ(a);return}function c2(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5096;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jK(d);e=a|0;return}function c3(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5032;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jK(e)}}while(0);jJ(a);return}function c4(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5032;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jK(d);e=a|0;return}function c5(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5096;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jK(e)}}while(0);jJ(a);return}function c6(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;bR[c[(c[a>>2]|0)+12>>2]&1023](f,a,b);if((c[f+4>>2]|0)!=(c[d+4>>2]|0)){g=0;i=e;return g|0}g=(c[f>>2]|0)==(c[d>>2]|0);i=e;return g|0}function c7(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;h=f;j=i;i=i+12|0;i=i+7>>3<<3;k=e|0;l=c[k>>2]|0;do{if((l|0)!=0){m=d[h]|0;if((m&1|0)==0){n=m>>>1}else{n=c[f+4>>2]|0}if((n|0)==0){o=l}else{de(f,1536,2);o=c[k>>2]|0}m=c[e+4>>2]|0;bR[c[(c[m>>2]|0)+24>>2]&1023](j,m,o);m=j;p=a[m]|0;if((p&1)<<24>>24==0){q=j+1|0}else{q=c[j+8>>2]|0}r=p&255;if((r&1|0)==0){s=r>>>1}else{s=c[j+4>>2]|0}de(f,q,s);if((a[m]&1)<<24>>24==0){break}jJ(c[j+8>>2]|0)}}while(0);j=b;c[j>>2]=c[h>>2]|0;c[j+4>>2]=c[h+4>>2]|0;c[j+8>>2]=c[h+8>>2]|0;jP(h|0,0,12);i=g;return}function c8(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+16|0;g=f|0;h=b|0;c[h>>2]=6792;if(a[13616]|0){j=c[986]|0}else{if(a[13624]|0){k=c[c[988]>>2]|0}else{hv(4248,1);c[990]=4248;c[988]=3960;a[13624]=1;k=4248}c[992]=k;l=k+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;c[986]=3968;a[13616]=1;j=3968}l=b+4|0;k=c[j>>2]|0;c[l>>2]=k;j=k+4|0;J=c[j>>2]|0,c[j>>2]=J+1,J;jP(b+8|0,0,24);c[h>>2]=7560;c[b+32>>2]=d;c[b+40>>2]=e;e=c[l>>2]|0;l=e+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;if((c[3182]|0)!=-1){c[g>>2]=12728;c[g+4>>2]=24;c[g+8>>2]=0;dh(12728,g,250)}g=(c[3183]|0)-1|0;d=c[e+8>>2]|0;do{if((c[e+12>>2]|0)-d>>2>>>0>g>>>0){h=c[d+(g<<2)>>2]|0;if((h|0)==0){break}j=h;k=b+36|0;c[k>>2]=j;m=b+44|0;c[m>>2]=bW[c[(c[h>>2]|0)+24>>2]&1023](j)|0;j=c[k>>2]|0;a[b+48|0]=bW[c[(c[j>>2]|0)+28>>2]&1023](j)&1;if((c[m>>2]|0)<=8){if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){i=f;return}bT[c[(c[e>>2]|0)+8>>2]&1023](e|0);i=f;return}m=bf(8)|0;c[m>>2]=5032;j=m+4|0;if((j|0)!=0){k=jH(50)|0;c[k+4>>2]=37;c[k>>2]=37;h=k+12|0;c[j>>2]=h;c[k+8>>2]=0;jQ(h|0,224,38)}aO(m|0,10680,184)}}while(0);f=bf(4)|0;c[f>>2]=5e3;aO(f|0,10664,510)}function c9(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+16|0;f=e|0;g=c[d>>2]|0;if((c[3182]|0)!=-1){c[f>>2]=12728;c[f+4>>2]=24;c[f+8>>2]=0;dh(12728,f,250)}f=(c[3183]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bf(4)|0;j=h;c[j>>2]=5e3;aO(h|0,10664,510)}h=g;j=b+36|0;c[j>>2]=h;f=b+44|0;c[f>>2]=bW[c[(c[g>>2]|0)+24>>2]&1023](h)|0;h=c[j>>2]|0;a[b+48|0]=bW[c[(c[h>>2]|0)+28>>2]&1023](h)&1;if((c[f>>2]|0)>8){gY(224)}else{i=e;return}}function da(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5032;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jK(e)}}while(0);jJ(a);return}function db(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5032;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jK(d);e=a|0;return}function dc(b){b=b|0;if((a[b]&1)<<24>>24==0){return}jJ(c[b+8>>2]|0);return}function dd(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=jS(d|0)|0;f=b;g=b;h=a[g]|0;if((h&1)<<24>>24==0){i=10;j=h}else{h=c[b>>2]|0;i=(h&-2)-1|0;j=h&255}if(i>>>0<e>>>0){h=j&255;if((h&1|0)==0){k=h>>>1}else{k=c[b+4>>2]|0}dk(b,i,e-i|0,k,0,k,e,d);return b|0}if((j&1)<<24>>24==0){l=f+1|0}else{l=c[b+8>>2]|0}jR(l|0,d|0,e|0);a[l+e|0]=0;if((a[g]&1)<<24>>24==0){a[g]=e<<1&255;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function de(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)<<24>>24==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}if((h-j|0)>>>0<e>>>0){dk(b,h,(e-h|0)+j|0,j,j,0,e,d);return b|0}if((e|0)==0){return b|0}if((i&1)<<24>>24==0){k=b+1|0}else{k=c[b+8>>2]|0}jQ(k+j|0,d|0,e);d=j+e|0;if((a[f]&1)<<24>>24==0){a[f]=d<<1&255}else{c[b+4>>2]=d}a[k+d|0]=0;return b|0}function df(b){b=b|0;if((a[b]&1)<<24>>24==0){return}jJ(c[b+8>>2]|0);return}function dg(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;f=i;i=i+32|0;g=d;d=i;i=i+8|0;c[d>>2]=c[g>>2]|0;c[d+4>>2]=c[g+4>>2]|0;g=f|0;h=f+16|0;j=jS(e|0)|0;if((j|0)==-1){di(0)}if(j>>>0<11){a[h]=j<<1&255;k=h+1|0}else{l=j+16&-16;m=jG(l)|0;c[h+8>>2]=m;c[h>>2]=l|1;c[h+4>>2]=j;k=m}jQ(k|0,e|0,j);a[k+j|0]=0;c7(g,d,h);j=b|0;c[j>>2]=5032;k=b+4|0;e=g;if((k|0)!=0){if((a[e]&1)<<24>>24==0){n=g+1|0}else{n=c[g+8>>2]|0}m=jS(n|0)|0;l=jH(m+13|0)|0;c[l+4>>2]=m;c[l>>2]=m;m=l+12|0;c[k>>2]=m;c[l+8>>2]=0;jT(m|0,n|0)}if((a[e]&1)<<24>>24!=0){jJ(c[g+8>>2]|0)}if((a[h]&1)<<24>>24==0){c[j>>2]=7056;o=b+8|0;p=d;q=o;r=p|0;s=c[r>>2]|0;t=p+4|0;u=c[t>>2]|0;v=q|0;c[v>>2]=s;w=q+4|0;c[w>>2]=u;i=f;return}jJ(c[h+8>>2]|0);c[j>>2]=7056;o=b+8|0;p=d;q=o;r=p|0;s=c[r>>2]|0;t=p+4|0;u=c[t>>2]|0;v=q|0;c[v>>2]=s;w=q+4|0;c[w>>2]=u;i=f;return}function dh(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e;L1140:do{if((c[a>>2]|0)==1){while(1){bH(12520,12512);if((c[a>>2]|0)!=1){break L1140}}}}while(0);if((c[a>>2]|0)!=0){f;return}c[a>>2]=1;g;bT[d&1023](b);h;c[a>>2]=-1;i;bq(12520);return}function di(a){a=a|0;var b=0,d=0,e=0;a=bf(8)|0;c[a>>2]=5096;b=a+4|0;if((b|0)!=0){d=jH(25)|0;c[d+4>>2]=12;c[d>>2]=12;e=d+12|0;c[b>>2]=e;c[d+8>>2]=0;jQ(e|0,328,13)}c[a>>2]=5064;aO(a|0,10696,246)}function dj(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;if((d|0)==-1){di(0)}e=b;f=b;g=a[f]|0;if((g&1)<<24>>24==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}g=j>>>0>d>>>0?j:d;if(g>>>0<11){k=11}else{k=g+16&-16}g=k-1|0;if((g|0)==(h|0)){return}if((g|0)==10){l=e+1|0;m=c[b+8>>2]|0;n=1;o=0;p=i}else{if(g>>>0>h>>>0){q=jG(k)|0}else{q=jG(k)|0}h=a[f]|0;g=h&1;if(g<<24>>24==0){r=e+1|0}else{r=c[b+8>>2]|0}l=q;m=r;n=g<<24>>24!=0;o=1;p=h}h=p&255;if((h&1|0)==0){s=h>>>1}else{s=c[b+4>>2]|0}jQ(l|0,m|0,s+1|0);if(n){jJ(m)}if(o){c[b>>2]=k|1;c[b+4>>2]=j;c[b+8>>2]=l;return}else{a[f]=j<<1&255;return}}function dk(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((-3-d|0)>>>0<e>>>0){di(0)}if((a[b]&1)<<24>>24==0){k=b+1|0}else{k=c[b+8>>2]|0}do{if(d>>>0<2147483631){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<11){o=11;break}o=n+16&-16}else{o=-2}}while(0);e=jG(o)|0;if((g|0)!=0){jQ(e|0,k|0,g)}if((i|0)!=0){jQ(e+g|0,j|0,i)}j=f-h|0;if((j|0)!=(g|0)){jQ(e+(i+g|0)|0,k+(h+g|0)|0,j-g|0)}if((d|0)==10){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}jJ(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}function dl(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((-3-d|0)>>>0<e>>>0){di(0)}if((a[b]&1)<<24>>24==0){j=b+1|0}else{j=c[b+8>>2]|0}do{if(d>>>0<2147483631){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<11){n=11;break}n=m+16&-16}else{n=-2}}while(0);e=jG(n)|0;if((g|0)!=0){jQ(e|0,j|0,g)}m=f-h|0;if((m|0)!=(g|0)){jQ(e+(i+g|0)|0,j+(h+g|0)|0,m-g|0)}if((d|0)==10){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}jJ(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function dm(a,b){a=a|0;b=b|0;return}function dn(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function dp(a){a=a|0;return 0}function dq(a){a=a|0;return 0}function dr(a){a=a|0;return-1|0}function ds(a,b){a=a|0;b=b|0;return-1|0}function dt(a,b){a=a|0;b=b|0;return-1|0}function du(a,b){a=a|0;b=b|0;return}function dv(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function dw(a){a=a|0;return 0}function dx(a){a=a|0;return 0}function dy(a){a=a|0;return-1|0}function dz(a,b){a=a|0;b=b|0;return-1|0}function dA(a,b){a=a|0;b=b|0;return-1|0}function dB(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function dC(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2]|0;c[d+4>>2]=c[b+4>>2]|0;c[d+8>>2]=c[b+8>>2]|0;c[d+12>>2]=c[b+12>>2]|0;b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function dD(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function dE(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2]|0;c[d+4>>2]=c[b+4>>2]|0;c[d+8>>2]=c[b+8>>2]|0;c[d+12>>2]=c[b+12>>2]|0;b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function dF(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;f=b;g=a[f]|0;if((g&1)<<24>>24==0){h=1;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}if(h>>>0<e>>>0){g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}dT(b,h,e-h|0,j,0,j,e,d);return b|0}if((i&1)<<24>>24==0){k=b+4|0}else{k=c[b+8>>2]|0}i=(e|0)==0;L1280:do{if(k-d>>2>>>0<e>>>0){if(i){break}else{l=e}while(1){j=l-1|0;c[k+(j<<2)>>2]=c[d+(j<<2)>>2]|0;if((j|0)==0){break L1280}else{l=j}}}else{if(i){break}else{m=d;n=e;o=k}while(1){j=n-1|0;c[o>>2]=c[m>>2]|0;if((j|0)==0){break L1280}else{m=m+4|0;n=j;o=o+4|0}}}}while(0);c[k+(e<<2)>>2]=0;if((a[f]&1)<<24>>24==0){a[f]=e<<1&255;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function dG(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=6792;b=c[a+4>>2]|0;d=b+4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){e=a;jJ(e);return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jJ(e);return}function dH(a){a=a|0;var b=0;c[a>>2]=6792;b=c[a+4>>2]|0;a=b+4|0;if(((J=c[a>>2]|0,c[a>>2]=J+ -1,J)|0)!=0){return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function dI(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;f=b;if((e|0)<=0){g=0;return g|0}h=b+12|0;i=b+16|0;j=d;d=0;while(1){k=c[h>>2]|0;if(k>>>0<(c[i>>2]|0)>>>0){c[h>>2]=k+1|0;l=a[k]|0}else{k=bW[c[(c[f>>2]|0)+40>>2]&1023](b)|0;if((k|0)==-1){g=d;m=1153;break}l=k&255}a[j]=l;k=d+1|0;if((k|0)<(e|0)){j=j+1|0;d=k}else{g=k;m=1152;break}}if((m|0)==1152){return g|0}else if((m|0)==1153){return g|0}return 0}function dJ(a){a=a|0;var b=0,e=0;if((bW[c[(c[a>>2]|0)+36>>2]&1023](a)|0)==-1){b=-1;return b|0}e=a+12|0;a=c[e>>2]|0;c[e>>2]=a+1|0;b=d[a]|0;return b|0}function dK(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=b;if((f|0)<=0){h=0;return h|0}i=b+24|0;j=b+28|0;k=0;l=e;while(1){e=c[i>>2]|0;if(e>>>0<(c[j>>2]|0)>>>0){m=a[l]|0;c[i>>2]=e+1|0;a[e]=m}else{if((b3[c[(c[g>>2]|0)+52>>2]&1023](b,d[l]|0)|0)==-1){h=k;n=1166;break}}m=k+1|0;if((m|0)<(f|0)){k=m;l=l+1|0}else{h=m;n=1168;break}}if((n|0)==1168){return h|0}else if((n|0)==1166){return h|0}return 0}function dL(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=6720;b=c[a+4>>2]|0;d=b+4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){e=a;jJ(e);return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jJ(e);return}function dM(a){a=a|0;var b=0;c[a>>2]=6720;b=c[a+4>>2]|0;a=b+4|0;if(((J=c[a>>2]|0,c[a>>2]=J+ -1,J)|0)!=0){return}bT[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function dN(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+12|0;h=a+16|0;i=b;b=0;while(1){j=c[g>>2]|0;if(j>>>0<(c[h>>2]|0)>>>0){c[g>>2]=j+4|0;k=c[j>>2]|0}else{j=bW[c[(c[e>>2]|0)+40>>2]&1023](a)|0;if((j|0)==-1){f=b;l=1187;break}else{k=j}}c[i>>2]=k;j=b+1|0;if((j|0)<(d|0)){i=i+4|0;b=j}else{f=j;l=1186;break}}if((l|0)==1187){return f|0}else if((l|0)==1186){return f|0}return 0}function dO(a){a=a|0;var b=0,d=0;if((bW[c[(c[a>>2]|0)+36>>2]&1023](a)|0)==-1){b=-1;return b|0}d=a+12|0;a=c[d>>2]|0;c[d>>2]=a+4|0;b=c[a>>2]|0;return b|0}function dP(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+24|0;h=a+28|0;i=0;j=b;while(1){b=c[g>>2]|0;if(b>>>0<(c[h>>2]|0)>>>0){k=c[j>>2]|0;c[g>>2]=b+4|0;c[b>>2]=k}else{if((b3[c[(c[e>>2]|0)+52>>2]&1023](a,c[j>>2]|0)|0)==-1){f=i;l=1203;break}}k=i+1|0;if((k|0)<(d|0)){i=k;j=j+4|0}else{f=k;l=1202;break}}if((l|0)==1203){return f|0}else if((l|0)==1202){return f|0}return 0}function dQ(a){a=a|0;dV(a+8|0);jJ(a);return}function dR(a){a=a|0;dV(a+8|0);return}function dS(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(d>>>0>1073741822){di(0)}e=b;f=a[e]|0;if((f&1)<<24>>24==0){g=1;h=f}else{f=c[b>>2]|0;g=(f&-2)-1|0;h=f&255}f=h&255;if((f&1|0)==0){i=f>>>1}else{i=c[b+4>>2]|0}f=i>>>0>d>>>0?i:d;if(f>>>0<2){j=2}else{j=f+4&-4}f=j-1|0;if((f|0)==(g|0)){return}if((f|0)==1){k=b+4|0;l=c[b+8>>2]|0;m=1;n=0;o=h}else{h=j<<2;if(f>>>0>g>>>0){p=jG(h)|0}else{p=jG(h)|0}h=a[e]|0;g=h&1;if(g<<24>>24==0){q=b+4|0}else{q=c[b+8>>2]|0}k=p;l=q;m=g<<24>>24!=0;n=1;o=h}h=o&255;if((h&1|0)==0){r=h>>>1}else{r=c[b+4>>2]|0}h=r+1|0;L1411:do{if((h|0)!=0){r=l;o=h;g=k;while(1){q=o-1|0;c[g>>2]=c[r>>2]|0;if((q|0)==0){break L1411}else{r=r+4|0;o=q;g=g+4|0}}}}while(0);if(m){jJ(l)}if(n){c[b>>2]=j|1;c[b+4>>2]=i;c[b+8>>2]=k;return}else{a[e]=i<<1&255;return}}function dT(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;if((1073741821-d|0)>>>0<e>>>0){di(0)}if((a[b]&1)<<24>>24==0){k=b+4|0}else{k=c[b+8>>2]|0}do{if(d>>>0<536870895){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<2){o=2;break}o=n+4&-4}else{o=1073741822}}while(0);e=jG(o<<2)|0;L1435:do{if((g|0)!=0){n=k;l=g;m=e;while(1){p=l-1|0;c[m>>2]=c[n>>2]|0;if((p|0)==0){break L1435}else{n=n+4|0;l=p;m=m+4|0}}}}while(0);L1439:do{if((i|0)!=0){m=j;l=i;n=e+(g<<2)|0;while(1){p=l-1|0;c[n>>2]=c[m>>2]|0;if((p|0)==0){break L1439}else{m=m+4|0;l=p;n=n+4|0}}}}while(0);j=f-h|0;L1444:do{if((j|0)!=(g|0)){f=k+(h+g<<2)|0;n=j-g|0;l=e+(i+g<<2)|0;while(1){m=n-1|0;c[l>>2]=c[f>>2]|0;if((m|0)==0){break L1444}else{f=f+4|0;n=m;l=l+4|0}}}}while(0);if((d|0)==1){q=b+8|0;c[q>>2]=e;r=o|1;s=b|0;c[s>>2]=r;t=j+i|0;u=b+4|0;c[u>>2]=t;v=e+(t<<2)|0;c[v>>2]=0;return}jJ(k);q=b+8|0;c[q>>2]=e;r=o|1;s=b|0;c[s>>2]=r;t=j+i|0;u=b+4|0;c[u>>2]=t;v=e+(t<<2)|0;c[v>>2]=0;return}function dU(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if((1073741821-d|0)>>>0<e>>>0){di(0)}if((a[b]&1)<<24>>24==0){j=b+4|0}else{j=c[b+8>>2]|0}do{if(d>>>0<536870895){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<2){n=2;break}n=m+4&-4}else{n=1073741822}}while(0);e=jG(n<<2)|0;L1465:do{if((g|0)!=0){m=j;k=g;l=e;while(1){o=k-1|0;c[l>>2]=c[m>>2]|0;if((o|0)==0){break L1465}else{m=m+4|0;k=o;l=l+4|0}}}}while(0);l=f-h|0;L1469:do{if((l|0)!=(g|0)){f=j+(h+g<<2)|0;k=l-g|0;m=e+(i+g<<2)|0;while(1){o=k-1|0;c[m>>2]=c[f>>2]|0;if((o|0)==0){break L1469}else{f=f+4|0;k=o;m=m+4|0}}}}while(0);if((d|0)==1){p=b+8|0;c[p>>2]=e;q=n|1;r=b|0;c[r>>2]=q;return}jJ(j);p=b+8|0;c[p>>2]=e;q=n|1;r=b|0;c[r>>2]=q;return}function dV(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;c[a>>2]=5720;b=c[a+40>>2]|0;L1479:do{if((b|0)!=0){d=a+32|0;e=a+36|0;f=b;while(1){g=f-1|0;bR[c[(c[d>>2]|0)+(g<<2)>>2]&1023](0,a,c[(c[e>>2]|0)+(g<<2)>>2]|0);if((g|0)==0){break L1479}else{f=g}}}}while(0);b=c[a+28>>2]|0;f=b+4|0;if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[b>>2]|0)+8>>2]&1023](b)}jB(c[a+32>>2]|0);jB(c[a+36>>2]|0);jB(c[a+48>>2]|0);jB(c[a+60>>2]|0);return}function dW(a){a=a|0;return 1360}function dX(a){a=a|0;return}function dY(a){a=a|0;return}function dZ(a){a=a|0;return}function d_(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L1493:do{if((e|0)==(f|0)){g=c}else{b=c;h=e;while(1){if((b|0)==(d|0)){i=-1;j=1298;break}k=a[b]|0;l=a[h]|0;if(k<<24>>24<l<<24>>24){i=-1;j=1301;break}if(l<<24>>24<k<<24>>24){i=1;j=1299;break}k=b+1|0;l=h+1|0;if((l|0)==(f|0)){g=k;break L1493}else{b=k;h=l}}if((j|0)==1301){return i|0}else if((j|0)==1299){return i|0}else if((j|0)==1298){return i|0}}}while(0);i=(g|0)!=(d|0)&1;return i|0}function d$(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dV(b+(d+8|0)|0);jJ(b+d|0);return}function d0(a){a=a|0;dV(a+((c[(c[a>>2]|0)-12>>2]|0)+8|0)|0);return}function d1(a){a=a|0;dV(a+8|0);jJ(a);return}function d2(a){a=a|0;dV(a+8|0);return}function d3(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dV(b+(d+8|0)|0);jJ(b+d|0);return}function d4(a){a=a|0;dV(a+((c[(c[a>>2]|0)-12>>2]|0)+8|0)|0);return}function d5(a){a=a|0;dV(a+4|0);jJ(a);return}function d6(a){a=a|0;dV(a+4|0);return}function d7(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dV(b+(d+4|0)|0);jJ(b+d|0);return}function d8(a){a=a|0;dV(a+((c[(c[a>>2]|0)-12>>2]|0)+4|0)|0);return}function d9(a){a=a|0;dV(a+4|0);jJ(a);return}function ea(a){a=a|0;dV(a+4|0);return}function eb(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dV(b+(d+4|0)|0);jJ(b+d|0);return}function ec(a){a=a|0;dV(a+((c[(c[a>>2]|0)-12>>2]|0)+4|0)|0);return}function ed(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5032;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jK(e)}}while(0);jJ(a);return}function ee(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5032;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jK(d);e=a|0;return}function ef(a){a=a|0;dV(a);jJ(a);return}function eg(a){a=a|0;jJ(a);return}function eh(a){a=a|0;jJ(a);return}function ei(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;i=i+16|0;e=d|0;f=d+8|0;g=b;h=c[(c[g>>2]|0)-12>>2]|0;j=b;if((c[j+(h+24|0)>>2]|0)==0){i=d;return b|0}k=f|0;a[k]=0;c[f+4>>2]=b;do{if((c[j+(h+16|0)>>2]|0)==0){l=c[j+(h+72|0)>>2]|0;if((l|0)!=0){ei(l)}a[k]=1;l=c[j+((c[(c[g>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((bW[c[(c[l>>2]|0)+24>>2]&1023](l)|0)!=-1){break}l=c[(c[g>>2]|0)-12>>2]|0;m=j+(l+16|0)|0;n=c[m>>2]|1;c[m>>2]=n;if((n&c[j+(l+20|0)>>2]|0)==0){break}l=bf(16)|0;if(!(a[13640]|0)){c[996]=6560;a[13640]=1}n=jW(3984,0,32)|0;m=L;c[e>>2]=n&0|1;c[e+4>>2]=m&-1|0;dg(l,e,1304);c[l>>2]=5744;aO(l|0,11240,62);return 0}}while(0);ek(f);i=d;return b|0}function ej(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;i=i+16|0;e=d|0;f=d+8|0;g=b;h=c[(c[g>>2]|0)-12>>2]|0;j=b;if((c[j+(h+24|0)>>2]|0)==0){i=d;return b|0}k=f|0;a[k]=0;c[f+4>>2]=b;do{if((c[j+(h+16|0)>>2]|0)==0){l=c[j+(h+72|0)>>2]|0;if((l|0)!=0){ej(l)}a[k]=1;l=c[j+((c[(c[g>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((bW[c[(c[l>>2]|0)+24>>2]&1023](l)|0)!=-1){break}l=c[(c[g>>2]|0)-12>>2]|0;m=j+(l+16|0)|0;n=c[m>>2]|1;c[m>>2]=n;if((n&c[j+(l+20|0)>>2]|0)==0){break}l=bf(16)|0;if(!(a[13640]|0)){c[996]=6560;a[13640]=1}n=jW(3984,0,32)|0;m=L;c[e>>2]=n&0|1;c[e+4>>2]=m&-1|0;dg(l,e,1304);c[l>>2]=5744;aO(l|0,11240,62);return 0}}while(0);el(f);i=d;return b|0}function ek(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d|0;f=b+4|0;b=c[f>>2]|0;g=c[(c[b>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24|0)>>2]|0)==0){i=d;return}if((c[h+(g+16|0)>>2]|0)!=0){i=d;return}if((c[h+(g+4|0)>>2]&8192|0)==0){i=d;return}if(bx()|0){i=d;return}g=c[f>>2]|0;h=c[g+((c[(c[g>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((bW[c[(c[h>>2]|0)+24>>2]&1023](h)|0)!=-1){i=d;return}h=c[f>>2]|0;f=c[(c[h>>2]|0)-12>>2]|0;g=h;h=g+(f+16|0)|0;b=c[h>>2]|1;c[h>>2]=b;if((b&c[g+(f+20|0)>>2]|0)==0){i=d;return}d=bf(16)|0;if(!(a[13640]|0)){c[996]=6560;a[13640]=1}f=jW(3984,0,32)|0;g=L;c[e>>2]=f&0|1;c[e+4>>2]=g&-1|0;dg(d,e,1304);c[d>>2]=5744;aO(d|0,11240,62)}function el(b){b=b|0;var d=0,e=0,f=0,g=0,h=0;d=i;i=i+8|0;e=d|0;f=b+4|0;b=c[f>>2]|0;g=c[(c[b>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24|0)>>2]|0)==0){i=d;return}if((c[h+(g+16|0)>>2]|0)!=0){i=d;return}if((c[h+(g+4|0)>>2]&8192|0)==0){i=d;return}if(bx()|0){i=d;return}g=c[f>>2]|0;h=c[g+((c[(c[g>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((bW[c[(c[h>>2]|0)+24>>2]&1023](h)|0)!=-1){i=d;return}h=c[f>>2]|0;f=c[(c[h>>2]|0)-12>>2]|0;g=h;h=g+(f+16|0)|0;b=c[h>>2]|1;c[h>>2]=b;if((b&c[g+(f+20|0)>>2]|0)==0){i=d;return}d=bf(16)|0;if(!(a[13640]|0)){c[996]=6560;a[13640]=1}f=jW(3984,0,32)|0;g=L;c[e>>2]=f&0|1;c[e+4>>2]=g&-1|0;dg(d,e,1304);c[d>>2]=5744;aO(d|0,11240,62)}function em(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)==1){d=jG(48)|0;c[b+8>>2]=d;c[b>>2]=49;c[b+4>>2]=35;jQ(d|0,1608,35);a[d+35|0]=0;return}d=aP(e|0)|0;e=jS(d|0)|0;if((e|0)==-1){di(0)}if(e>>>0<11){a[b]=e<<1&255;f=b+1|0}else{g=e+16&-16;h=jG(g)|0;c[b+8>>2]=h;c[b>>2]=g|1;c[b+4>>2]=e;f=h}jQ(f|0,d|0,e);a[f+e|0]=0;return}function en(a){a=a|0;return}function eo(a){a=a|0;return}function ep(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;if((c|0)==(d|0)){e=0;return e|0}else{f=c;g=0}while(1){c=(a[f]|0)+(g<<4)|0;b=c&-268435456;h=(b>>>24|b)^c;c=f+1|0;if((c|0)==(d|0)){e=h;break}else{f=c;g=h}}return e|0}function eq(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L1645:do{if((e|0)==(f|0)){g=b}else{a=b;h=e;while(1){if((a|0)==(d|0)){i=-1;j=1456;break}k=c[a>>2]|0;l=c[h>>2]|0;if((k|0)<(l|0)){i=-1;j=1455;break}if((l|0)<(k|0)){i=1;j=1458;break}k=a+4|0;l=h+4|0;if((l|0)==(f|0)){g=k;break L1645}else{a=k;h=l}}if((j|0)==1456){return i|0}else if((j|0)==1455){return i|0}else if((j|0)==1458){return i|0}}}while(0);i=(g|0)!=(d|0)&1;return i|0}function er(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;if((b|0)==(d|0)){e=0;return e|0}else{f=b;g=0}while(1){b=(c[f>>2]|0)+(g<<4)|0;a=b&-268435456;h=(a>>>24|a)^b;b=f+4|0;if((b|0)==(d|0)){e=h;break}else{f=b;g=h}}return e|0}function es(a){a=a|0;jJ(a);return}function et(a){a=a|0;jJ(a);return}function eu(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;if((g|0)==-1){di(0)}if(g>>>0<11){a[b]=g<<1&255;h=b+1|0}else{i=g+16&-16;j=jG(i)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=g;h=j}if((e|0)==(f|0)){k=h;a[k]=0;return}j=f+(-d|0)|0;d=h;g=e;while(1){a[d]=a[g]|0;e=g+1|0;if((e|0)==(f|0)){break}else{d=d+1|0;g=e}}k=h+j|0;a[k]=0;return}function ev(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;h=g>>2;if(h>>>0>1073741822){di(0)}if(h>>>0<2){a[b]=g>>>1&255;i=b+4|0}else{g=h+4&-4;j=jG(g<<2)|0;c[b+8>>2]=j;c[b>>2]=g|1;c[b+4>>2]=h;i=j}if((e|0)==(f|0)){k=i;c[k>>2]=0;return}j=((f-4|0)+(-d|0)|0)>>>2;d=i;h=e;while(1){c[d>>2]=c[h>>2]|0;e=h+4|0;if((e|0)==(f|0)){break}else{d=d+4|0;h=e}}k=i+(j+1<<2)|0;c[k>>2]=0;return}function ew(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;k=i;i=i+96|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=k|0;m=k+16|0;n=k+32|0;o=k+40|0;p=k+48|0;q=k+56|0;r=k+64|0;s=k+88|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;t=c[(c[d>>2]|0)+16>>2]|0;u=e|0;c[p>>2]=c[u>>2]|0;c[q>>2]=c[f>>2]|0;bY[t&1023](o,d,p,q,g,h,n);q=c[o>>2]|0;c[u>>2]=q;u=c[n>>2]|0;if((u|0)==0){a[j]=0}else if((u|0)==1){a[j]=1}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}q=g+28|0;g=c[q>>2]|0;u=g+4|0;J=c[u>>2]|0,c[u>>2]=J+1,J;if((c[3258]|0)!=-1){c[m>>2]=13032;c[m+4>>2]=24;c[m+8>>2]=0;dh(13032,m,250)}m=(c[3259]|0)-1|0;n=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-n>>2>>>0>m>>>0){o=c[n+(m<<2)>>2]|0;if((o|0)==0){break}p=o;if(((J=c[u>>2]|0,c[u>>2]=J+ -1,J)|0)==0){bT[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[q>>2]|0;d=o+4|0;J=c[d>>2]|0,c[d>>2]=J+1,J;if((c[3162]|0)!=-1){c[l>>2]=12648;c[l+4>>2]=24;c[l+8>>2]=0;dh(12648,l,250)}t=(c[3163]|0)-1|0;v=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-v>>2>>>0>t>>>0){w=c[v+(t<<2)>>2]|0;if((w|0)==0){break}x=w;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)==0){bT[c[(c[o>>2]|0)+8>>2]&1023](o)}y=r|0;z=w;bU[c[(c[z>>2]|0)+24>>2]&1023](y,x);bU[c[(c[z>>2]|0)+28>>2]&1023](r+12|0,x);c[s>>2]=c[f>>2]|0;a[j]=(ey(e,s,y,r+24|0,p,h,1)|0)==(y|0)&1;c[b>>2]=c[e>>2]|0;if((a[r+12|0]&1)<<24>>24!=0){jJ(c[r+20>>2]|0)}if((a[r]&1)<<24>>24==0){i=k;return}jJ(c[r+8>>2]|0);i=k;return}}while(0);p=bf(4)|0;c[p>>2]=5e3;aO(p|0,10664,510)}}while(0);k=bf(4)|0;c[k>>2]=5e3;aO(k|0,10664,510)}function ex(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+280|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=e+96|0;q=e+104|0;r=e+264|0;s=e+272|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l|0;eE(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L1743:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1553}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L1743}}if((bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1553;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L1743}}}}while(0);if((y|0)==1553){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=bW[c[(c[v>>2]|0)+36>>2]&1023](v)&255}else{F=a[D]|0}if((ez(F,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;bW[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);c[k>>2]=eB(h,c[p>>2]|0,j,u)|0;eA(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L1788:do{if(C){y=1585}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1585;break L1788}}while(0);if(l^(B|0)==0){break}else{y=1587;break}}}while(0);do{if((y|0)==1585){if(l){y=1587;break}else{break}}}while(0);if((y|0)==1587){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function ey(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;l=i;i=i+104|0;m=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[m>>2]|0;m=(g-f|0)/12&-1;n=l|0;do{if(m>>>0>100){o=jA(m)|0;if((o|0)!=0){p=o;q=o;break}o=bf(4)|0;c[o>>2]=4968;aO(o|0,10648,66);return 0}else{p=n;q=0}}while(0);n=(f|0)==(g|0);L1810:do{if(n){r=m;s=0}else{o=m;t=0;u=p;v=f;while(1){w=d[v]|0;if((w&1|0)==0){x=w>>>1}else{x=c[v+4>>2]|0}if((x|0)==0){a[u]=2;y=t+1|0;z=o-1|0}else{a[u]=1;y=t;z=o}w=v+12|0;if((w|0)==(g|0)){r=z;s=y;break L1810}else{o=z;t=y;u=u+1|0;v=w}}}}while(0);y=b|0;b=e|0;e=h;z=0;x=s;s=r;while(1){r=c[y>>2]|0;do{if((r|0)==0){A=0}else{if((c[r+12>>2]|0)!=(c[r+16>>2]|0)){A=r;break}if((bW[c[(c[r>>2]|0)+36>>2]&1023](r)|0)==-1){c[y>>2]=0;A=0;break}else{A=c[y>>2]|0;break}}}while(0);r=(A|0)==0;m=c[b>>2]|0;if((m|0)==0){B=A;C=0}else{do{if((c[m+12>>2]|0)==(c[m+16>>2]|0)){if((bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){D=m;break}c[b>>2]=0;D=0}else{D=m}}while(0);B=c[y>>2]|0;C=D}E=(C|0)==0;if(!((r^E)&(s|0)!=0)){break}m=c[B+12>>2]|0;if((m|0)==(c[B+16>>2]|0)){F=bW[c[(c[B>>2]|0)+36>>2]&1023](B)&255}else{F=a[m]|0}if(k){G=F}else{G=b3[c[(c[e>>2]|0)+12>>2]&1023](h,F)|0}L1849:do{if(n){H=x;I=s}else{m=z+1|0;v=s;u=x;t=p;o=0;w=f;while(1){do{if((a[t]|0)==1){J=w;if((a[J]&1)<<24>>24==0){K=w+1|0}else{K=c[w+8>>2]|0}L=a[K+z|0]|0;if(k){M=L}else{M=b3[c[(c[e>>2]|0)+12>>2]&1023](h,L)|0}if(G<<24>>24!=M<<24>>24){a[t]=0;N=o;O=u;P=v-1|0;break}L=d[J]|0;if((L&1|0)==0){Q=L>>>1}else{Q=c[w+4>>2]|0}if((Q|0)!=(m|0)){N=1;O=u;P=v;break}a[t]=2;N=1;O=u+1|0;P=v-1|0}else{N=o;O=u;P=v}}while(0);L=w+12|0;if((L|0)==(g|0)){break}v=P;u=O;t=t+1|0;o=N;w=L}if(!N){H=O;I=P;break}w=c[y>>2]|0;o=w+12|0;t=c[o>>2]|0;if((t|0)==(c[w+16>>2]|0)){u=c[(c[w>>2]|0)+40>>2]|0;bW[u&1023](w)}else{c[o>>2]=t+1|0}if((O+P|0)>>>0<2|n){H=O;I=P;break}t=z+1|0;o=O;w=p;u=f;while(1){do{if((a[w]|0)==2){v=d[u]|0;if((v&1|0)==0){R=v>>>1}else{R=c[u+4>>2]|0}if((R|0)==(t|0)){S=o;break}a[w]=0;S=o-1|0}else{S=o}}while(0);v=u+12|0;if((v|0)==(g|0)){H=S;I=P;break L1849}else{o=S;w=w+1|0;u=v}}}}while(0);z=z+1|0;x=H;s=I}do{if((B|0)==0){T=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){T=B;break}if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[y>>2]=0;T=0;break}else{T=c[y>>2]|0;break}}}while(0);y=(T|0)==0;do{if(E){U=1674}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){if(y){break}else{U=1676;break}}if((bW[c[(c[C>>2]|0)+36>>2]&1023](C)|0)==-1){c[b>>2]=0;U=1674;break}else{if(y^(C|0)==0){break}else{U=1676;break}}}}while(0);do{if((U|0)==1674){if(y){U=1676;break}else{break}}}while(0);if((U|0)==1676){c[j>>2]=c[j>>2]|2}L1913:do{if(n){U=1681}else{y=f;C=p;while(1){if((a[C]|0)==2){V=y;break L1913}b=y+12|0;if((b|0)==(g|0)){U=1681;break L1913}y=b;C=C+1|0}}}while(0);if((U|0)==1681){c[j>>2]=c[j>>2]|4;V=g}if((q|0)==0){i=l;return V|0}jB(q);i=l;return V|0}function ez(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(a[m+24|0]|0)==b<<24>>24;if(!p){if((a[m+25|0]|0)!=b<<24>>24){break}}c[g>>2]=f+1|0;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&b<<24>>24==i<<24>>24){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4|0;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+26|0;i=m;while(1){if((i|0)==(k|0)){s=k;break}if((a[i]|0)==b<<24>>24){s=i;break}else{i=i+1|0}}i=s-m|0;if((i|0)>23){q=-1;return q|0}do{if((e|0)==8|(e|0)==10){if((i|0)<(e|0)){break}else{q=-1}return q|0}else if((e|0)==16){if((i|0)<22){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if((a[n-1|0]|0)!=48){q=-1;return q|0}c[h>>2]=0;m=a[i+13488|0]|0;s=c[g>>2]|0;c[g>>2]=s+1|0;a[s]=m;q=0;return q|0}}while(0);if((n-f|0)<39){f=a[i+13488|0]|0;c[g>>2]=n+1|0;a[n]=f}c[h>>2]=(c[h>>2]|0)+1|0;q=0;return q|0}function eA(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;g=b;h=b;i=a[h]|0;j=i&255;if((j&1|0)==0){k=j>>>1}else{k=c[b+4>>2]|0}if((k|0)==0){return}do{if((d|0)==(e|0)){l=i}else{k=e-4|0;if(k>>>0>d>>>0){m=d;n=k}else{l=i;break}while(1){k=c[m>>2]|0;c[m>>2]=c[n>>2]|0;c[n>>2]=k;k=m+4|0;j=n-4|0;if(k>>>0<j>>>0){m=k;n=j}else{break}}l=a[h]|0}}while(0);if((l&1)<<24>>24==0){o=g+1|0}else{o=c[b+8>>2]|0}g=l&255;if((g&1|0)==0){p=g>>>1}else{p=c[b+4>>2]|0}b=e-4|0;e=a[o]|0;g=e<<24>>24;l=e<<24>>24<1|e<<24>>24==127;L1993:do{if(b>>>0>d>>>0){e=o+p|0;h=o;n=d;m=g;i=l;while(1){if(!i){if((m|0)!=(c[n>>2]|0)){break}}j=(e-h|0)>1?h+1|0:h;k=n+4|0;q=a[j]|0;r=q<<24>>24;s=q<<24>>24<1|q<<24>>24==127;if(k>>>0<b>>>0){h=j;n=k;m=r;i=s}else{t=r;u=s;break L1993}}c[f>>2]=4;return}else{t=g;u=l}}while(0);if(u){return}u=c[b>>2]|0;if(!(t>>>0<u>>>0|(u|0)==0)){return}c[f>>2]=4;return}function eB(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}k=c[bF()>>2]|0;c[bF()>>2]=0;if(a[13632]|0){l=c[994]|0}else{m=bD(1,1320,0)|0;c[994]=m;a[13632]=1;l=m}m=bh(b|0,h|0,f|0,l|0)|0;l=L;f=c[bF()>>2]|0;if((f|0)==0){c[bF()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=-1;h=0;if((f|0)==34|((l|0)<(d|0)|(l|0)==(d|0)&m>>>0<-2147483648>>>0)|((l|0)>(h|0)|(l|0)==(h|0)&m>>>0>2147483647>>>0)){c[e>>2]=4;e=0;j=(l|0)>(e|0)|(l|0)==(e|0)&m>>>0>0>>>0?2147483647:-2147483648;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function eC(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+280|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=e+96|0;q=e+104|0;r=e+264|0;s=e+272|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==64){u=8}else if((t|0)==8){u=16}else{u=10}t=l|0;eE(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2037:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1785}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2037}}if((bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1785;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2037}}}}while(0);if((y|0)==1785){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=bW[c[(c[v>>2]|0)+36>>2]&1023](v)&255}else{F=a[D]|0}if((ez(F,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;bW[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);s=eD(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=L;eA(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2082:do{if(C){y=1817}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1817;break L2082}}while(0);if(l^(B|0)==0){break}else{y=1819;break}}}while(0);do{if((y|0)==1817){if(l){y=1819;break}else{break}}}while(0);if((y|0)==1819){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function eD(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0;i=g;return(L=j,k)|0}l=c[bF()>>2]|0;c[bF()>>2]=0;if(a[13632]|0){m=c[994]|0}else{n=bD(1,1320,0)|0;c[994]=n;a[13632]=1;m=n}n=bh(b|0,h|0,f|0,m|0)|0;m=L;f=c[bF()>>2]|0;if((f|0)==0){c[bF()>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;i=g;return(L=j,k)|0}if((f|0)!=34){j=m;k=n;i=g;return(L=j,k)|0}c[e>>2]=4;e=0;f=(m|0)>(e|0)|(m|0)==(e|0)&n>>>0>0>>>0;j=f?2147483647:-2147483648;k=f?-1:0;i=g;return(L=j,k)|0}function eE(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;g=i;i=i+32|0;h=g|0;j=g+16|0;k=c[d+28>>2]|0;d=k+4|0;J=c[d>>2]|0,c[d>>2]=J+1,J;if((c[3258]|0)!=-1){c[j>>2]=13032;c[j+4>>2]=24;c[j+8>>2]=0;dh(13032,j,250)}j=(c[3259]|0)-1|0;l=k+12|0;m=k+8|0;n=c[m>>2]|0;do{if((c[l>>2]|0)-n>>2>>>0>j>>>0){o=c[n+(j<<2)>>2]|0;if((o|0)==0){break}b0[c[(c[o>>2]|0)+32>>2]&1023](o,13488,13514,e);if((c[3162]|0)!=-1){c[h>>2]=12648;c[h+4>>2]=24;c[h+8>>2]=0;dh(12648,h,250)}o=(c[3163]|0)-1|0;p=c[m>>2]|0;do{if((c[l>>2]|0)-p>>2>>>0>o>>>0){q=c[p+(o<<2)>>2]|0;if((q|0)==0){break}r=q;a[f]=bW[c[(c[q>>2]|0)+16>>2]&1023](r)|0;bU[c[(c[q>>2]|0)+20>>2]&1023](b,r);if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){i=g;return}bT[c[(c[k>>2]|0)+8>>2]&1023](k);i=g;return}}while(0);o=bf(4)|0;c[o>>2]=5e3;aO(o|0,10664,510)}}while(0);g=bf(4)|0;c[g>>2]=5e3;aO(g|0,10664,510)}function eF(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;f=i;i=i+280|0;m=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;i=i+7>>3<<3;c[h>>2]=c[m>>2]|0;m=f|0;n=f+32|0;o=f+40|0;p=f+56|0;q=f+96|0;r=f+104|0;s=f+264|0;t=f+272|0;u=c[j+4>>2]&74;if((u|0)==64){v=8}else if((u|0)==8){v=16}else if((u|0)==0){v=0}else{v=10}u=m|0;eE(o,j,u,n);j=p|0;jP(j|0,0,40);c[q>>2]=j;p=r|0;c[s>>2]=p;c[t>>2]=0;m=g|0;g=h|0;h=a[n]|0;n=c[m>>2]|0;L2148:while(1){do{if((n|0)==0){w=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){w=n;break}if((bW[c[(c[n>>2]|0)+36>>2]&1023](n)|0)!=-1){w=n;break}c[m>>2]=0;w=0}}while(0);x=(w|0)==0;y=c[g>>2]|0;do{if((y|0)==0){z=1880}else{if((c[y+12>>2]|0)!=(c[y+16>>2]|0)){if(x){A=y;B=0;break}else{C=y;D=0;break L2148}}if((bW[c[(c[y>>2]|0)+36>>2]&1023](y)|0)==-1){c[g>>2]=0;z=1880;break}else{E=(y|0)==0;if(x^E){A=y;B=E;break}else{C=y;D=E;break L2148}}}}while(0);if((z|0)==1880){z=0;if(x){C=0;D=1;break}else{A=0;B=1}}y=w+12|0;E=c[y>>2]|0;F=w+16|0;if((E|0)==(c[F>>2]|0)){G=bW[c[(c[w>>2]|0)+36>>2]&1023](w)&255}else{G=a[E]|0}if((ez(G,v,j,q,t,h,o,p,s,u)|0)!=0){C=A;D=B;break}E=c[y>>2]|0;if((E|0)==(c[F>>2]|0)){F=c[(c[w>>2]|0)+40>>2]|0;bW[F&1023](w);n=w;continue}else{c[y>>2]=E+1|0;n=w;continue}}n=o;B=d[n]|0;if((B&1|0)==0){H=B>>>1}else{H=c[o+4>>2]|0}do{if((H|0)!=0){B=c[s>>2]|0;if((B-r|0)>=160){break}A=c[t>>2]|0;c[s>>2]=B+4|0;c[B>>2]=A}}while(0);b[l>>1]=eG(j,c[q>>2]|0,k,v)|0;eA(o,p,c[s>>2]|0,k);do{if(x){I=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){I=w;break}if((bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0)!=-1){I=w;break}c[m>>2]=0;I=0}}while(0);m=(I|0)==0;L2193:do{if(D){z=1912}else{do{if((c[C+12>>2]|0)==(c[C+16>>2]|0)){if((bW[c[(c[C>>2]|0)+36>>2]&1023](C)|0)!=-1){break}c[g>>2]=0;z=1912;break L2193}}while(0);if(m^(C|0)==0){break}else{z=1914;break}}}while(0);do{if((z|0)==1912){if(m){z=1914;break}else{break}}}while(0);if((z|0)==1914){c[k>>2]=c[k>>2]|2}c[e>>2]=I;if((a[n]&1)<<24>>24==0){i=f;return}jJ(c[o+8>>2]|0);i=f;return}function eG(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=c[bF()>>2]|0;c[bF()>>2]=0;if(a[13632]|0){l=c[994]|0}else{m=bD(1,1320,0)|0;c[994]=m;a[13632]=1;l=m}m=bi(b|0,h|0,f|0,l|0)|0;l=L;f=c[bF()>>2]|0;if((f|0)==0){c[bF()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((f|0)==34|(l>>>0>d>>>0|l>>>0==d>>>0&m>>>0>65535>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m&65535;i=g;return j|0}return 0}function eH(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+280|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=e+96|0;q=e+104|0;r=e+264|0;s=e+272|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==64){u=8}else if((t|0)==8){u=16}else{u=10}t=l|0;eE(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2240:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1956}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2240}}if((bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1956;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2240}}}}while(0);if((y|0)==1956){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=bW[c[(c[v>>2]|0)+36>>2]&1023](v)&255}else{F=a[D]|0}if((ez(F,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;bW[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);c[k>>2]=eI(h,c[p>>2]|0,j,u)|0;eA(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2285:do{if(C){y=1988}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1988;break L2285}}while(0);if(l^(B|0)==0){break}else{y=1990;break}}}while(0);do{if((y|0)==1988){if(l){y=1990;break}else{break}}}while(0);if((y|0)==1990){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function eI(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=c[bF()>>2]|0;c[bF()>>2]=0;if(a[13632]|0){l=c[994]|0}else{m=bD(1,1320,0)|0;c[994]=m;a[13632]=1;l=m}m=bi(b|0,h|0,f|0,l|0)|0;l=L;f=c[bF()>>2]|0;if((f|0)==0){c[bF()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((f|0)==34|(l>>>0>d>>>0|l>>>0==d>>>0&m>>>0>-1>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function eJ(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+280|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=e+96|0;q=e+104|0;r=e+264|0;s=e+272|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l|0;eE(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2332:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=2032}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2332}}if((bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=2032;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2332}}}}while(0);if((y|0)==2032){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=bW[c[(c[v>>2]|0)+36>>2]&1023](v)&255}else{F=a[D]|0}if((ez(F,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;bW[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);c[k>>2]=eK(h,c[p>>2]|0,j,u)|0;eA(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2377:do{if(C){y=2064}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=2064;break L2377}}while(0);if(l^(B|0)==0){break}else{y=2066;break}}}while(0);do{if((y|0)==2064){if(l){y=2066;break}else{break}}}while(0);if((y|0)==2066){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function eK(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+8|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if((a[b]|0)==45){c[e>>2]=4;j=0;i=g;return j|0}k=c[bF()>>2]|0;c[bF()>>2]=0;if(a[13632]|0){l=c[994]|0}else{m=bD(1,1320,0)|0;c[994]=m;a[13632]=1;l=m}m=bi(b|0,h|0,f|0,l|0)|0;l=L;f=c[bF()>>2]|0;if((f|0)==0){c[bF()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((f|0)==34|(l>>>0>d>>>0|l>>>0==d>>>0&m>>>0>-1>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=m;i=g;return j|0}return 0}function eL(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+280|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=e+96|0;q=e+104|0;r=e+264|0;s=e+272|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==64){u=8}else if((t|0)==8){u=16}else{u=10}t=l|0;eE(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2424:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=2108}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2424}}if((bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=2108;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2424}}}}while(0);if((y|0)==2108){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=bW[c[(c[v>>2]|0)+36>>2]&1023](v)&255}else{F=a[D]|0}if((ez(F,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;bW[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);s=eM(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=L;eA(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2469:do{if(C){y=2140}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=2140;break L2469}}while(0);if(l^(B|0)==0){break}else{y=2142;break}}}while(0);do{if((y|0)==2140){if(l){y=2142;break}else{break}}}while(0);if((y|0)==2142){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function eM(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=i;i=i+8|0;h=g|0;do{if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0}else{if((a[b]|0)==45){c[e>>2]=4;j=0;k=0;break}l=c[bF()>>2]|0;c[bF()>>2]=0;if(a[13632]|0){m=c[994]|0}else{n=bD(1,1320,0)|0;c[994]=n;a[13632]=1;m=n}n=bi(b|0,h|0,f|0,m|0)|0;o=L;p=c[bF()>>2]|0;if((p|0)==0){c[bF()>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;break}if((p|0)!=34){j=o;k=n;break}c[e>>2]=4;j=-1;k=-1}}while(0);i=g;return(L=j,k)|0}function eN(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0;p=c[h>>2]|0;q=g;if((p-q|0)>38){r=-1;return r|0}if(b<<24>>24==i<<24>>24){if((a[e]&1)<<24>>24==0){r=-1;return r|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1|0;a[i]=46;i=d[k]|0;if((i&1|0)==0){s=i>>>1}else{s=c[k+4>>2]|0}if((s|0)==0){r=0;return r|0}s=c[m>>2]|0;if((s-l|0)>=160){r=0;return r|0}i=c[n>>2]|0;c[m>>2]=s+4|0;c[s>>2]=i;r=0;return r|0}do{if(b<<24>>24==j<<24>>24){i=d[k]|0;if((i&1|0)==0){t=i>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}if((a[e]&1)<<24>>24==0){r=-1;return r|0}i=c[m>>2]|0;if((i-l|0)>=160){r=0;return r|0}s=c[n>>2]|0;c[m>>2]=i+4|0;c[i>>2]=s;c[n>>2]=0;r=0;return r|0}}while(0);t=o+32|0;j=o;while(1){if((j|0)==(t|0)){u=t;break}if((a[j]|0)==b<<24>>24){u=j;break}else{j=j+1|0}}j=u-o|0;if((j|0)>31){r=-1;return r|0}o=a[j+13488|0]|0;do{if((j|0)==25|(j|0)==24){do{if((p|0)!=(g|0)){if((a[p-1|0]&95|0)==(a[f]&127|0)){break}else{r=-1}return r|0}}while(0);c[h>>2]=p+1|0;a[p]=o;r=0;return r|0}else if((j|0)==22|(j|0)==23){a[f]=80}else{u=a[f]|0;if((o&95|0)!=(u<<24>>24|0)){break}a[f]=u|-128;if((a[e]&1)<<24>>24==0){break}a[e]=0;u=d[k]|0;if((u&1|0)==0){v=u>>>1}else{v=c[k+4>>2]|0}if((v|0)==0){break}u=c[m>>2]|0;if((u-l|0)>=160){break}b=c[n>>2]|0;c[m>>2]=u+4|0;c[u>>2]=b}}while(0);m=c[h>>2]|0;if((m-q|0)<(((a[f]|0)<0?39:29)|0)){c[h>>2]=m+1|0;a[m]=o}if((j|0)>21){r=0;return r|0}c[n>>2]=(c[n>>2]|0)+1|0;r=0;return r|0}function eO(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0.0,M=0.0,N=0;e=i;i=i+312|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;i=i+7>>3<<3;c[h>>2]=c[m>>2]|0;m=e|0;n=e+40|0;o=e+48|0;p=e+56|0;q=e+112|0;r=e+120|0;s=e+280|0;t=e+288|0;u=e+296|0;v=e+304|0;w=e+8|0;eP(p,j,w,n,o);j=e+72|0;jP(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=h|0;h=a[n]|0;n=a[o]|0;o=c[y>>2]|0;L2573:while(1){do{if((o|0)==0){z=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){z=o;break}if((bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);A=(z|0)==0;B=c[f>>2]|0;do{if((B|0)==0){C=2226}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){if(A){D=B;E=0;break}else{F=B;G=0;break L2573}}if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[f>>2]=0;C=2226;break}else{H=(B|0)==0;if(A^H){D=B;E=H;break}else{F=B;G=H;break L2573}}}}while(0);if((C|0)==2226){C=0;if(A){F=0;G=1;break}else{D=0;E=1}}B=z+12|0;H=c[B>>2]|0;I=z+16|0;if((H|0)==(c[I>>2]|0)){J=bW[c[(c[z>>2]|0)+36>>2]&1023](z)&255}else{J=a[H]|0}if((eN(J,u,v,j,q,h,n,p,x,s,t,w)|0)!=0){F=D;G=E;break}H=c[B>>2]|0;if((H|0)==(c[I>>2]|0)){I=c[(c[z>>2]|0)+40>>2]|0;bW[I&1023](z);o=z;continue}else{c[B>>2]=H+1|0;o=z;continue}}o=p;E=d[o]|0;if((E&1|0)==0){K=E>>>1}else{K=c[p+4>>2]|0}do{if((K|0)!=0){if((a[u]&1)<<24>>24==0){break}E=c[s>>2]|0;if((E-r|0)>=160){break}D=c[t>>2]|0;c[s>>2]=E+4|0;c[E>>2]=D}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;L=0.0}else{if(!(a[13632]|0)){c[994]=bD(1,1320,0)|0;a[13632]=1}M=+jN(j,m);if((c[m>>2]|0)==(t|0)){L=M;break}else{c[k>>2]=4;L=0.0;break}}}while(0);g[l>>2]=L;eA(p,x,c[s>>2]|0,k);do{if(A){N=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){N=z;break}if((bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0)!=-1){N=z;break}c[y>>2]=0;N=0}}while(0);y=(N|0)==0;L2629:do{if(G){C=2266}else{do{if((c[F+12>>2]|0)==(c[F+16>>2]|0)){if((bW[c[(c[F>>2]|0)+36>>2]&1023](F)|0)!=-1){break}c[f>>2]=0;C=2266;break L2629}}while(0);if(y^(F|0)==0){break}else{C=2268;break}}}while(0);do{if((C|0)==2266){if(y){C=2268;break}else{break}}}while(0);if((C|0)==2268){c[k>>2]=c[k>>2]|2}c[b>>2]=N;if((a[o]&1)<<24>>24==0){i=e;return}jJ(c[p+8>>2]|0);i=e;return}function eP(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;h=i;i=i+32|0;j=h|0;k=h+16|0;l=c[d+28>>2]|0;d=l+4|0;J=c[d>>2]|0,c[d>>2]=J+1,J;if((c[3258]|0)!=-1){c[k>>2]=13032;c[k+4>>2]=24;c[k+8>>2]=0;dh(13032,k,250)}k=(c[3259]|0)-1|0;m=l+12|0;n=l+8|0;o=c[n>>2]|0;do{if((c[m>>2]|0)-o>>2>>>0>k>>>0){p=c[o+(k<<2)>>2]|0;if((p|0)==0){break}b0[c[(c[p>>2]|0)+32>>2]&1023](p,13488,13520,e);if((c[3162]|0)!=-1){c[j>>2]=12648;c[j+4>>2]=24;c[j+8>>2]=0;dh(12648,j,250)}p=(c[3163]|0)-1|0;q=c[n>>2]|0;do{if((c[m>>2]|0)-q>>2>>>0>p>>>0){r=c[q+(p<<2)>>2]|0;if((r|0)==0){break}s=r;t=r;a[f]=bW[c[(c[t>>2]|0)+12>>2]&1023](s)|0;a[g]=bW[c[(c[t>>2]|0)+16>>2]&1023](s)|0;bU[c[(c[r>>2]|0)+20>>2]&1023](b,s);if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)!=0){i=h;return}bT[c[(c[l>>2]|0)+8>>2]&1023](l);i=h;return}}while(0);p=bf(4)|0;c[p>>2]=5e3;aO(p|0,10664,510)}}while(0);h=bf(4)|0;c[h>>2]=5e3;aO(h|0,10664,510)}function eQ(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0.0,M=0.0,N=0;e=i;i=i+312|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[m>>2]|0;m=e|0;n=e+40|0;o=e+48|0;p=e+56|0;q=e+112|0;r=e+120|0;s=e+280|0;t=e+288|0;u=e+296|0;v=e+304|0;w=e+8|0;eP(p,j,w,n,o);j=e+72|0;jP(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=g|0;g=a[n]|0;n=a[o]|0;o=c[y>>2]|0;L2671:while(1){do{if((o|0)==0){z=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){z=o;break}if((bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);A=(z|0)==0;B=c[f>>2]|0;do{if((B|0)==0){C=2310}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){if(A){D=B;E=0;break}else{F=B;G=0;break L2671}}if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[f>>2]=0;C=2310;break}else{H=(B|0)==0;if(A^H){D=B;E=H;break}else{F=B;G=H;break L2671}}}}while(0);if((C|0)==2310){C=0;if(A){F=0;G=1;break}else{D=0;E=1}}B=z+12|0;H=c[B>>2]|0;I=z+16|0;if((H|0)==(c[I>>2]|0)){J=bW[c[(c[z>>2]|0)+36>>2]&1023](z)&255}else{J=a[H]|0}if((eN(J,u,v,j,q,g,n,p,x,s,t,w)|0)!=0){F=D;G=E;break}H=c[B>>2]|0;if((H|0)==(c[I>>2]|0)){I=c[(c[z>>2]|0)+40>>2]|0;bW[I&1023](z);o=z;continue}else{c[B>>2]=H+1|0;o=z;continue}}o=p;E=d[o]|0;if((E&1|0)==0){K=E>>>1}else{K=c[p+4>>2]|0}do{if((K|0)!=0){if((a[u]&1)<<24>>24==0){break}E=c[s>>2]|0;if((E-r|0)>=160){break}D=c[t>>2]|0;c[s>>2]=E+4|0;c[E>>2]=D}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;L=0.0}else{if(!(a[13632]|0)){c[994]=bD(1,1320,0)|0;a[13632]=1}M=+jN(j,m);if((c[m>>2]|0)==(t|0)){L=M;break}c[k>>2]=4;L=0.0}}while(0);h[l>>3]=L;eA(p,x,c[s>>2]|0,k);do{if(A){N=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){N=z;break}if((bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0)!=-1){N=z;break}c[y>>2]=0;N=0}}while(0);y=(N|0)==0;L2725:do{if(G){C=2349}else{do{if((c[F+12>>2]|0)==(c[F+16>>2]|0)){if((bW[c[(c[F>>2]|0)+36>>2]&1023](F)|0)!=-1){break}c[f>>2]=0;C=2349;break L2725}}while(0);if(y^(F|0)==0){break}else{C=2351;break}}}while(0);do{if((C|0)==2349){if(y){C=2351;break}else{break}}}while(0);if((C|0)==2351){c[k>>2]=c[k>>2]|2}c[b>>2]=N;if((a[o]&1)<<24>>24==0){i=e;return}jJ(c[p+8>>2]|0);i=e;return}function eR(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0.0,M=0.0,N=0;e=i;i=i+312|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[m>>2]|0;m=e|0;n=e+40|0;o=e+48|0;p=e+56|0;q=e+112|0;r=e+120|0;s=e+280|0;t=e+288|0;u=e+296|0;v=e+304|0;w=e+8|0;eP(p,j,w,n,o);j=e+72|0;jP(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=g|0;g=a[n]|0;n=a[o]|0;o=c[y>>2]|0;L2742:while(1){do{if((o|0)==0){z=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){z=o;break}if((bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);A=(z|0)==0;B=c[f>>2]|0;do{if((B|0)==0){C=2369}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){if(A){D=B;E=0;break}else{F=B;G=0;break L2742}}if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[f>>2]=0;C=2369;break}else{H=(B|0)==0;if(A^H){D=B;E=H;break}else{F=B;G=H;break L2742}}}}while(0);if((C|0)==2369){C=0;if(A){F=0;G=1;break}else{D=0;E=1}}B=z+12|0;H=c[B>>2]|0;I=z+16|0;if((H|0)==(c[I>>2]|0)){J=bW[c[(c[z>>2]|0)+36>>2]&1023](z)&255}else{J=a[H]|0}if((eN(J,u,v,j,q,g,n,p,x,s,t,w)|0)!=0){F=D;G=E;break}H=c[B>>2]|0;if((H|0)==(c[I>>2]|0)){I=c[(c[z>>2]|0)+40>>2]|0;bW[I&1023](z);o=z;continue}else{c[B>>2]=H+1|0;o=z;continue}}o=p;E=d[o]|0;if((E&1|0)==0){K=E>>>1}else{K=c[p+4>>2]|0}do{if((K|0)!=0){if((a[u]&1)<<24>>24==0){break}E=c[s>>2]|0;if((E-r|0)>=160){break}D=c[t>>2]|0;c[s>>2]=E+4|0;c[E>>2]=D}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;L=0.0}else{if(!(a[13632]|0)){c[994]=bD(1,1320,0)|0;a[13632]=1}M=+jN(j,m);if((c[m>>2]|0)==(t|0)){L=M;break}c[k>>2]=4;L=0.0}}while(0);h[l>>3]=L;eA(p,x,c[s>>2]|0,k);do{if(A){N=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){N=z;break}if((bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0)!=-1){N=z;break}c[y>>2]=0;N=0}}while(0);y=(N|0)==0;L2796:do{if(G){C=2408}else{do{if((c[F+12>>2]|0)==(c[F+16>>2]|0)){if((bW[c[(c[F>>2]|0)+36>>2]&1023](F)|0)!=-1){break}c[f>>2]=0;C=2408;break L2796}}while(0);if(y^(F|0)==0){break}else{C=2410;break}}}while(0);do{if((C|0)==2408){if(y){C=2410;break}else{break}}}while(0);if((C|0)==2410){c[k>>2]=c[k>>2]|2}c[b>>2]=N;if((a[o]&1)<<24>>24==0){i=e;return}jJ(c[p+8>>2]|0);i=e;return}function eS(a){a=a|0;return}function eT(a){a=a|0;jJ(a);return}function eU(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0;d=i;i=i+64|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[k>>2]|0;k=d|0;l=d+16|0;m=d+48|0;n=m;o=i;i=i+40|0;p=i;i=i+4|0;i=i+7>>3<<3;q=i;i=i+160|0;r=i;i=i+4|0;i=i+7>>3<<3;s=i;i=i+4|0;i=i+7>>3<<3;jP(n|0,0,12);t=c[g+28>>2]|0;g=t+4|0;J=c[g>>2]|0,c[g>>2]=J+1,J;if((c[3258]|0)!=-1){c[k>>2]=13032;c[k+4>>2]=24;c[k+8>>2]=0;dh(13032,k,250)}k=(c[3259]|0)-1|0;u=c[t+8>>2]|0;do{if((c[t+12>>2]|0)-u>>2>>>0>k>>>0){v=c[u+(k<<2)>>2]|0;if((v|0)==0){break}w=l|0;b0[c[(c[v>>2]|0)+32>>2]&1023](v,13488,13514,w);if(((J=c[g>>2]|0,c[g>>2]=J+ -1,J)|0)==0){bT[c[(c[t>>2]|0)+8>>2]&1023](t)}v=o|0;jP(v|0,0,40);c[p>>2]=v;x=q|0;c[r>>2]=x;c[s>>2]=0;y=e|0;z=f|0;A=c[y>>2]|0;L2825:while(1){do{if((A|0)==0){B=0}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){B=A;break}if((bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0)!=-1){B=A;break}c[y>>2]=0;B=0}}while(0);D=(B|0)==0;E=c[z>>2]|0;do{if((E|0)==0){F=2439}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){if(D){G=E;H=0;break}else{I=E;K=0;break L2825}}if((bW[c[(c[E>>2]|0)+36>>2]&1023](E)|0)==-1){c[z>>2]=0;F=2439;break}else{L=(E|0)==0;if(D^L){G=E;H=L;break}else{I=E;K=L;break L2825}}}}while(0);if((F|0)==2439){F=0;if(D){I=0;K=1;break}else{G=0;H=1}}E=B+12|0;L=c[E>>2]|0;M=B+16|0;if((L|0)==(c[M>>2]|0)){N=bW[c[(c[B>>2]|0)+36>>2]&1023](B)&255}else{N=a[L]|0}if((ez(N,16,v,p,s,0,m,x,r,w)|0)!=0){I=G;K=H;break}L=c[E>>2]|0;if((L|0)==(c[M>>2]|0)){M=c[(c[B>>2]|0)+40>>2]|0;bW[M&1023](B);A=B;continue}else{c[E>>2]=L+1|0;A=B;continue}}a[o+39|0]=0;if(a[13632]|0){O=c[994]|0}else{A=bD(1,1320,0)|0;c[994]=A;a[13632]=1;O=A}if((eV(v,O,1296,(C=i,i=i+8|0,c[C>>2]=j,C)|0)|0)!=1){c[h>>2]=4}do{if(D){P=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){P=B;break}if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){P=B;break}c[y>>2]=0;P=0}}while(0);y=(P|0)==0;L2870:do{if(K){F=2471}else{do{if((c[I+12>>2]|0)==(c[I+16>>2]|0)){if((bW[c[(c[I>>2]|0)+36>>2]&1023](I)|0)!=-1){break}c[z>>2]=0;F=2471;break L2870}}while(0);if(y^(I|0)==0){break}else{F=2473;break}}}while(0);do{if((F|0)==2471){if(y){F=2473;break}else{break}}}while(0);if((F|0)==2473){c[h>>2]=c[h>>2]|2}c[b>>2]=P;if((a[n]&1)<<24>>24==0){i=d;return}jJ(c[m+8>>2]|0);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function eV(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=bJ(b|0)|0;b=aJ(a|0,d|0,g|0)|0;if((h|0)==0){i=f;return b|0}bJ(h|0);i=f;return b|0}function eW(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;k=i;i=i+96|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=k|0;m=k+16|0;n=k+32|0;o=k+40|0;p=k+48|0;q=k+56|0;r=k+64|0;s=k+88|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;t=c[(c[d>>2]|0)+16>>2]|0;u=e|0;c[p>>2]=c[u>>2]|0;c[q>>2]=c[f>>2]|0;bY[t&1023](o,d,p,q,g,h,n);q=c[o>>2]|0;c[u>>2]=q;u=c[n>>2]|0;if((u|0)==0){a[j]=0}else if((u|0)==1){a[j]=1}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}q=g+28|0;g=c[q>>2]|0;u=g+4|0;J=c[u>>2]|0,c[u>>2]=J+1,J;if((c[3256]|0)!=-1){c[m>>2]=13024;c[m+4>>2]=24;c[m+8>>2]=0;dh(13024,m,250)}m=(c[3257]|0)-1|0;n=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-n>>2>>>0>m>>>0){o=c[n+(m<<2)>>2]|0;if((o|0)==0){break}p=o;if(((J=c[u>>2]|0,c[u>>2]=J+ -1,J)|0)==0){bT[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[q>>2]|0;d=o+4|0;J=c[d>>2]|0,c[d>>2]=J+1,J;if((c[3160]|0)!=-1){c[l>>2]=12640;c[l+4>>2]=24;c[l+8>>2]=0;dh(12640,l,250)}t=(c[3161]|0)-1|0;v=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-v>>2>>>0>t>>>0){w=c[v+(t<<2)>>2]|0;if((w|0)==0){break}x=w;if(((J=c[d>>2]|0,c[d>>2]=J+ -1,J)|0)==0){bT[c[(c[o>>2]|0)+8>>2]&1023](o)}y=r|0;z=w;bU[c[(c[z>>2]|0)+24>>2]&1023](y,x);bU[c[(c[z>>2]|0)+28>>2]&1023](r+12|0,x);c[s>>2]=c[f>>2]|0;a[j]=(eY(e,s,y,r+24|0,p,h,1)|0)==(y|0)&1;c[b>>2]=c[e>>2]|0;if((a[r+12|0]&1)<<24>>24!=0){jJ(c[r+20>>2]|0)}if((a[r]&1)<<24>>24==0){i=k;return}jJ(c[r+8>>2]|0);i=k;return}}while(0);p=bf(4)|0;c[p>>2]=5e3;aO(p|0,10664,510)}}while(0);k=bf(4)|0;c[k>>2]=5e3;aO(k|0,10664,510)}function eX(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+352|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=e+168|0;q=e+176|0;r=e+336|0;s=e+344|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l|0;e$(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L2941:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2552}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2552;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L2941}}}}while(0);if((z|0)==2552){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((eZ(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;bW[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);c[k>>2]=eB(h,c[p>>2]|0,j,u)|0;eA(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2585}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){L=bW[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{L=c[v>>2]|0}if((L|0)==-1){c[f>>2]=0;z=2585;break}else{if(l^(E|0)==0){break}else{z=2587;break}}}}while(0);do{if((z|0)==2585){if(l){z=2587;break}else{break}}}while(0);if((z|0)==2587){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function eY(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;l=i;i=i+104|0;m=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[m>>2]|0;m=(g-f|0)/12&-1;n=l|0;do{if(m>>>0>100){o=jA(m)|0;if((o|0)!=0){p=o;q=o;break}o=bf(4)|0;c[o>>2]=4968;aO(o|0,10648,66);return 0}else{p=n;q=0}}while(0);n=(f|0)==(g|0);L3013:do{if(n){r=m;s=0}else{o=m;t=0;u=p;v=f;while(1){w=d[v]|0;if((w&1|0)==0){x=w>>>1}else{x=c[v+4>>2]|0}if((x|0)==0){a[u]=2;y=t+1|0;z=o-1|0}else{a[u]=1;y=t;z=o}w=v+12|0;if((w|0)==(g|0)){r=z;s=y;break L3013}else{o=z;t=y;u=u+1|0;v=w}}}}while(0);y=b|0;b=e|0;e=h;z=0;x=s;s=r;while(1){r=c[y>>2]|0;do{if((r|0)==0){A=0}else{m=c[r+12>>2]|0;if((m|0)==(c[r+16>>2]|0)){B=bW[c[(c[r>>2]|0)+36>>2]&1023](r)|0}else{B=c[m>>2]|0}if((B|0)==-1){c[y>>2]=0;A=0;break}else{A=c[y>>2]|0;break}}}while(0);r=(A|0)==0;m=c[b>>2]|0;if((m|0)==0){C=A;D=0}else{v=c[m+12>>2]|0;if((v|0)==(c[m+16>>2]|0)){E=bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{E=c[v>>2]|0}if((E|0)==-1){c[b>>2]=0;F=0}else{F=m}C=c[y>>2]|0;D=F}G=(D|0)==0;if(!((r^G)&(s|0)!=0)){break}r=c[C+12>>2]|0;if((r|0)==(c[C+16>>2]|0)){H=bW[c[(c[C>>2]|0)+36>>2]&1023](C)|0}else{H=c[r>>2]|0}if(k){I=H}else{I=b3[c[(c[e>>2]|0)+28>>2]&1023](h,H)|0}L3055:do{if(n){J=x;K=s}else{r=z+1|0;m=s;v=x;u=p;t=0;o=f;while(1){do{if((a[u]|0)==1){w=o;if((a[w]&1)<<24>>24==0){L=o+4|0}else{L=c[o+8>>2]|0}M=c[L+(z<<2)>>2]|0;if(k){N=M}else{N=b3[c[(c[e>>2]|0)+28>>2]&1023](h,M)|0}if((I|0)!=(N|0)){a[u]=0;O=t;P=v;Q=m-1|0;break}M=d[w]|0;if((M&1|0)==0){R=M>>>1}else{R=c[o+4>>2]|0}if((R|0)!=(r|0)){O=1;P=v;Q=m;break}a[u]=2;O=1;P=v+1|0;Q=m-1|0}else{O=t;P=v;Q=m}}while(0);M=o+12|0;if((M|0)==(g|0)){break}m=Q;v=P;u=u+1|0;t=O;o=M}if(!O){J=P;K=Q;break}o=c[y>>2]|0;t=o+12|0;u=c[t>>2]|0;if((u|0)==(c[o+16>>2]|0)){v=c[(c[o>>2]|0)+40>>2]|0;bW[v&1023](o)}else{c[t>>2]=u+4|0}if((P+Q|0)>>>0<2|n){J=P;K=Q;break}u=z+1|0;t=P;o=p;v=f;while(1){do{if((a[o]|0)==2){m=d[v]|0;if((m&1|0)==0){S=m>>>1}else{S=c[v+4>>2]|0}if((S|0)==(u|0)){T=t;break}a[o]=0;T=t-1|0}else{T=t}}while(0);m=v+12|0;if((m|0)==(g|0)){J=T;K=Q;break L3055}else{t=T;o=o+1|0;v=m}}}}while(0);z=z+1|0;x=J;s=K}do{if((C|0)==0){U=1}else{K=c[C+12>>2]|0;if((K|0)==(c[C+16>>2]|0)){V=bW[c[(c[C>>2]|0)+36>>2]&1023](C)|0}else{V=c[K>>2]|0}if((V|0)==-1){c[y>>2]=0;U=1;break}else{U=(c[y>>2]|0)==0;break}}}while(0);do{if(G){W=2676}else{y=c[D+12>>2]|0;if((y|0)==(c[D+16>>2]|0)){X=bW[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{X=c[y>>2]|0}if((X|0)==-1){c[b>>2]=0;W=2676;break}else{if(U^(D|0)==0){break}else{W=2678;break}}}}while(0);do{if((W|0)==2676){if(U){W=2678;break}else{break}}}while(0);if((W|0)==2678){c[j>>2]=c[j>>2]|2}L3121:do{if(n){W=2683}else{U=f;D=p;while(1){if((a[D]|0)==2){Y=U;break L3121}b=U+12|0;if((b|0)==(g|0)){W=2683;break L3121}U=b;D=D+1|0}}}while(0);if((W|0)==2683){c[j>>2]=c[j>>2]|4;Y=g}if((q|0)==0){i=l;return Y|0}jB(q);i=l;return Y|0}function eZ(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(c[m+96>>2]|0)==(b|0);if(!p){if((c[m+100>>2]|0)!=(b|0)){break}}c[g>>2]=f+1|0;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&(b|0)==(i|0)){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4|0;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+104|0;i=m;while(1){if((i|0)==(k|0)){s=k;break}if((c[i>>2]|0)==(b|0)){s=i;break}else{i=i+4|0}}i=s-m|0;m=i>>2;if((i|0)>92){q=-1;return q|0}do{if((e|0)==16){if((i|0)<88){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if((a[n-1|0]|0)!=48){q=-1;return q|0}c[h>>2]=0;s=a[m+13488|0]|0;b=c[g>>2]|0;c[g>>2]=b+1|0;a[b]=s;q=0;return q|0}else if((e|0)==8|(e|0)==10){if((m|0)<(e|0)){break}else{q=-1}return q|0}}while(0);if((n-f|0)<39){f=a[m+13488|0]|0;c[g>>2]=n+1|0;a[n]=f}c[h>>2]=(c[h>>2]|0)+1|0;q=0;return q|0}function e_(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,M=0;e=i;i=i+352|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=e+168|0;q=e+176|0;r=e+336|0;s=e+344|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==0){u=0}else if((t|0)==8){u=16}else{u=10}t=l|0;e$(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3185:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2742}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2742;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3185}}}}while(0);if((z|0)==2742){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((eZ(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;bW[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);s=eD(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=L;eA(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2775}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){M=bW[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{M=c[v>>2]|0}if((M|0)==-1){c[f>>2]=0;z=2775;break}else{if(l^(E|0)==0){break}else{z=2777;break}}}}while(0);do{if((z|0)==2775){if(l){z=2777;break}else{break}}}while(0);if((z|0)==2777){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function e$(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;i=i+32|0;g=f|0;h=f+16|0;j=c[b+28>>2]|0;b=j+4|0;J=c[b>>2]|0,c[b>>2]=J+1,J;if((c[3256]|0)!=-1){c[h>>2]=13024;c[h+4>>2]=24;c[h+8>>2]=0;dh(13024,h,250)}h=(c[3257]|0)-1|0;k=j+12|0;l=j+8|0;m=c[l>>2]|0;do{if((c[k>>2]|0)-m>>2>>>0>h>>>0){n=c[m+(h<<2)>>2]|0;if((n|0)==0){break}b0[c[(c[n>>2]|0)+48>>2]&1023](n,13488,13514,d);if((c[3160]|0)!=-1){c[g>>2]=12640;c[g+4>>2]=24;c[g+8>>2]=0;dh(12640,g,250)}n=(c[3161]|0)-1|0;o=c[l>>2]|0;do{if((c[k>>2]|0)-o>>2>>>0>n>>>0){p=c[o+(n<<2)>>2]|0;if((p|0)==0){break}q=p;c[e>>2]=bW[c[(c[p>>2]|0)+16>>2]&1023](q)|0;bU[c[(c[p>>2]|0)+20>>2]&1023](a,q);if(((J=c[b>>2]|0,c[b>>2]=J+ -1,J)|0)!=0){i=f;return}bT[c[(c[j>>2]|0)+8>>2]&1023](j);i=f;return}}while(0);n=bf(4)|0;c[n>>2]=5e3;aO(n|0,10664,510)}}while(0);f=bf(4)|0;c[f>>2]=5e3;aO(f|0,10664,510)}function e0(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;f=i;i=i+352|0;m=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;i=i+7>>3<<3;c[h>>2]=c[m>>2]|0;m=f|0;n=f+104|0;o=f+112|0;p=f+128|0;q=f+168|0;r=f+176|0;s=f+336|0;t=f+344|0;u=c[j+4>>2]&74;if((u|0)==64){v=8}else if((u|0)==0){v=0}else if((u|0)==8){v=16}else{v=10}u=m|0;e$(o,j,u,n);j=p|0;jP(j|0,0,40);c[q>>2]=j;p=r|0;c[s>>2]=p;c[t>>2]=0;m=g|0;g=h|0;h=c[n>>2]|0;n=c[m>>2]|0;L3281:while(1){do{if((n|0)==0){w=0}else{x=c[n+12>>2]|0;if((x|0)==(c[n+16>>2]|0)){y=bW[c[(c[n>>2]|0)+36>>2]&1023](n)|0}else{y=c[x>>2]|0}if((y|0)!=-1){w=n;break}c[m>>2]=0;w=0}}while(0);z=(w|0)==0;x=c[g>>2]|0;do{if((x|0)==0){A=2823}else{B=c[x+12>>2]|0;if((B|0)==(c[x+16>>2]|0)){C=bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0}else{C=c[B>>2]|0}if((C|0)==-1){c[g>>2]=0;A=2823;break}else{B=(x|0)==0;if(z^B){D=x;E=B;break}else{F=x;G=B;break L3281}}}}while(0);if((A|0)==2823){A=0;if(z){F=0;G=1;break}else{D=0;E=1}}x=w+12|0;B=c[x>>2]|0;H=w+16|0;if((B|0)==(c[H>>2]|0)){I=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{I=c[B>>2]|0}if((eZ(I,v,j,q,t,h,o,p,s,u)|0)!=0){F=D;G=E;break}B=c[x>>2]|0;if((B|0)==(c[H>>2]|0)){H=c[(c[w>>2]|0)+40>>2]|0;bW[H&1023](w);n=w;continue}else{c[x>>2]=B+4|0;n=w;continue}}n=o;E=d[n]|0;if((E&1|0)==0){J=E>>>1}else{J=c[o+4>>2]|0}do{if((J|0)!=0){E=c[s>>2]|0;if((E-r|0)>=160){break}D=c[t>>2]|0;c[s>>2]=E+4|0;c[E>>2]=D}}while(0);b[l>>1]=eG(j,c[q>>2]|0,k,v)|0;eA(o,p,c[s>>2]|0,k);do{if(z){K=0}else{s=c[w+12>>2]|0;if((s|0)==(c[w+16>>2]|0)){L=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{L=c[s>>2]|0}if((L|0)!=-1){K=w;break}c[m>>2]=0;K=0}}while(0);m=(K|0)==0;do{if(G){A=2856}else{w=c[F+12>>2]|0;if((w|0)==(c[F+16>>2]|0)){M=bW[c[(c[F>>2]|0)+36>>2]&1023](F)|0}else{M=c[w>>2]|0}if((M|0)==-1){c[g>>2]=0;A=2856;break}else{if(m^(F|0)==0){break}else{A=2858;break}}}}while(0);do{if((A|0)==2856){if(m){A=2858;break}else{break}}}while(0);if((A|0)==2858){c[k>>2]=c[k>>2]|2}c[e>>2]=K;if((a[n]&1)<<24>>24==0){i=f;return}jJ(c[o+8>>2]|0);i=f;return}function e1(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+352|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=e+168|0;q=e+176|0;r=e+336|0;s=e+344|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==0){u=0}else if((t|0)==8){u=16}else{u=10}t=l|0;e$(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3353:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2881}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2881;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3353}}}}while(0);if((z|0)==2881){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((eZ(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;bW[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);c[k>>2]=eI(h,c[p>>2]|0,j,u)|0;eA(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2914}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){L=bW[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{L=c[v>>2]|0}if((L|0)==-1){c[f>>2]=0;z=2914;break}else{if(l^(E|0)==0){break}else{z=2916;break}}}}while(0);do{if((z|0)==2914){if(l){z=2916;break}else{break}}}while(0);if((z|0)==2916){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function e2(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+352|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=e+168|0;q=e+176|0;r=e+336|0;s=e+344|0;t=c[h+4>>2]&74;if((t|0)==8){u=16}else if((t|0)==64){u=8}else if((t|0)==0){u=0}else{u=10}t=l|0;e$(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3425:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2939}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2939;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3425}}}}while(0);if((z|0)==2939){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((eZ(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;bW[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);c[k>>2]=eK(h,c[p>>2]|0,j,u)|0;eA(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2972}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){L=bW[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{L=c[v>>2]|0}if((L|0)==-1){c[f>>2]=0;z=2972;break}else{if(l^(E|0)==0){break}else{z=2974;break}}}}while(0);do{if((z|0)==2972){if(l){z=2974;break}else{break}}}while(0);if((z|0)==2974){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function e3(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,M=0;e=i;i=i+352|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=e+168|0;q=e+176|0;r=e+336|0;s=e+344|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==8){u=16}else if((t|0)==0){u=0}else{u=10}t=l|0;e$(n,h,t,m);h=o|0;jP(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3497:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=bW[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2997}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=bW[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2997;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3497}}}}while(0);if((z|0)==2997){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((eZ(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;bW[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);s=eM(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=L;eA(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=bW[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=3030}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){M=bW[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{M=c[v>>2]|0}if((M|0)==-1){c[f>>2]=0;z=3030;break}else{if(l^(E|0)==0){break}else{z=3032;break}}}}while(0);do{if((z|0)==3030){if(l){z=3032;break}else{break}}}while(0);if((z|0)==3032){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jJ(c[n+8>>2]|0);i=e;return}function e4(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0;p=c[h>>2]|0;q=g;if((p-q|0)>38){r=-1;return r|0}if((b|0)==(i|0)){if((a[e]&1)<<24>>24==0){r=-1;return r|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1|0;a[i]=46;i=d[k]|0;if((i&1|0)==0){s=i>>>1}else{s=c[k+4>>2]|0}if((s|0)==0){r=0;return r|0}s=c[m>>2]|0;if((s-l|0)>=160){r=0;return r|0}i=c[n>>2]|0;c[m>>2]=s+4|0;c[s>>2]=i;r=0;return r|0}do{if((b|0)==(j|0)){i=d[k]|0;if((i&1|0)==0){t=i>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}if((a[e]&1)<<24>>24==0){r=-1;return r|0}i=c[m>>2]|0;if((i-l|0)>=160){r=0;return r|0}s=c[n>>2]|0;c[m>>2]=i+4|0;c[i>>2]=s;c[n>>2]=0;r=0;return r|0}}while(0);t=o+128|0;j=o;while(1){if((j|0)==(t|0)){u=t;break}if((c[j>>2]|0)==(b|0)){u=j;break}else{j=j+4|0}}j=u-o|0;o=j>>2;if((j|0)>124){r=-1;return r|0}u=a[o+13488|0]|0;do{if((o|0)==22|(o|0)==23){a[f]=80}else if((o|0)==25|(o|0)==24){do{if((p|0)!=(g|0)){if((a[p-1|0]&95|0)==(a[f]&127|0)){break}else{r=-1}return r|0}}while(0);c[h>>2]=p+1|0;a[p]=u;r=0;return r|0}else{b=a[f]|0;if((u&95|0)!=(b<<24>>24|0)){break}a[f]=b|-128;if((a[e]&1)<<24>>24==0){break}a[e]=0;b=d[k]|0;if((b&1|0)==0){v=b>>>1}else{v=c[k+4>>2]|0}if((v|0)==0){break}b=c[m>>2]|0;if((b-l|0)>=160){break}t=c[n>>2]|0;c[m>>2]=b+4|0;c[b>>2]=t}}while(0);m=c[h>>2]|0;if((m-q|0)<(((a[f]|0)<0?39:29)|0)){c[h>>2]=m+1|0;a[m]=u}if((j|0)>84){r=0;return r|0}c[n>>2]=(c[n>>2]|0)+1|0;r=0;return r|0}function e5(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0.0,P=0,Q=0,R=0;e=i;i=i+408|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;i=i+7>>3<<3;c[h>>2]=c[m>>2]|0;m=e|0;n=e+136|0;o=e+144|0;p=e+152|0;q=e+208|0;r=e+216|0;s=e+376|0;t=e+384|0;u=e+392|0;v=e+400|0;w=e+8|0;e6(p,j,w,n,o);j=e+168|0;jP(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=h|0;h=c[n>>2]|0;n=c[o>>2]|0;o=c[y>>2]|0;L3632:while(1){do{if((o|0)==0){z=0}else{A=c[o+12>>2]|0;if((A|0)==(c[o+16>>2]|0)){B=bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0}else{B=c[A>>2]|0}if((B|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);C=(z|0)==0;A=c[f>>2]|0;do{if((A|0)==0){D=3103}else{E=c[A+12>>2]|0;if((E|0)==(c[A+16>>2]|0)){F=bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{F=c[E>>2]|0}if((F|0)==-1){c[f>>2]=0;D=3103;break}else{E=(A|0)==0;if(C^E){G=A;H=E;break}else{I=A;J=E;break L3632}}}}while(0);if((D|0)==3103){D=0;if(C){I=0;J=1;break}else{G=0;H=1}}A=z+12|0;E=c[A>>2]|0;K=z+16|0;if((E|0)==(c[K>>2]|0)){L=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{L=c[E>>2]|0}if((e4(L,u,v,j,q,h,n,p,x,s,t,w)|0)!=0){I=G;J=H;break}E=c[A>>2]|0;if((E|0)==(c[K>>2]|0)){K=c[(c[z>>2]|0)+40>>2]|0;bW[K&1023](z);o=z;continue}else{c[A>>2]=E+4|0;o=z;continue}}o=p;H=d[o]|0;if((H&1|0)==0){M=H>>>1}else{M=c[p+4>>2]|0}do{if((M|0)!=0){if((a[u]&1)<<24>>24==0){break}H=c[s>>2]|0;if((H-r|0)>=160){break}G=c[t>>2]|0;c[s>>2]=H+4|0;c[H>>2]=G}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;N=0.0}else{if(!(a[13632]|0)){c[994]=bD(1,1320,0)|0;a[13632]=1}O=+jN(j,m);if((c[m>>2]|0)==(t|0)){N=O;break}else{c[k>>2]=4;N=0.0;break}}}while(0);g[l>>2]=N;eA(p,x,c[s>>2]|0,k);do{if(C){P=0}else{s=c[z+12>>2]|0;if((s|0)==(c[z+16>>2]|0)){Q=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{Q=c[s>>2]|0}if((Q|0)!=-1){P=z;break}c[y>>2]=0;P=0}}while(0);y=(P|0)==0;do{if(J){D=3144}else{z=c[I+12>>2]|0;if((z|0)==(c[I+16>>2]|0)){R=bW[c[(c[I>>2]|0)+36>>2]&1023](I)|0}else{R=c[z>>2]|0}if((R|0)==-1){c[f>>2]=0;D=3144;break}else{if(y^(I|0)==0){break}else{D=3146;break}}}}while(0);do{if((D|0)==3144){if(y){D=3146;break}else{break}}}while(0);if((D|0)==3146){c[k>>2]=c[k>>2]|2}c[b>>2]=P;if((a[o]&1)<<24>>24==0){i=e;return}jJ(c[p+8>>2]|0);i=e;return}function e6(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;i=i+32|0;h=g|0;j=g+16|0;k=c[b+28>>2]|0;b=k+4|0;J=c[b>>2]|0,c[b>>2]=J+1,J;if((c[3256]|0)!=-1){c[j>>2]=13024;c[j+4>>2]=24;c[j+8>>2]=0;dh(13024,j,250)}j=(c[3257]|0)-1|0;l=k+12|0;m=k+8|0;n=c[m>>2]|0;do{if((c[l>>2]|0)-n>>2>>>0>j>>>0){o=c[n+(j<<2)>>2]|0;if((o|0)==0){break}b0[c[(c[o>>2]|0)+48>>2]&1023](o,13488,13520,d);if((c[3160]|0)!=-1){c[h>>2]=12640;c[h+4>>2]=24;c[h+8>>2]=0;dh(12640,h,250)}o=(c[3161]|0)-1|0;p=c[m>>2]|0;do{if((c[l>>2]|0)-p>>2>>>0>o>>>0){q=c[p+(o<<2)>>2]|0;if((q|0)==0){break}r=q;s=q;c[e>>2]=bW[c[(c[s>>2]|0)+12>>2]&1023](r)|0;c[f>>2]=bW[c[(c[s>>2]|0)+16>>2]&1023](r)|0;bU[c[(c[q>>2]|0)+20>>2]&1023](a,r);if(((J=c[b>>2]|0,c[b>>2]=J+ -1,J)|0)!=0){i=g;return}bT[c[(c[k>>2]|0)+8>>2]&1023](k);i=g;return}}while(0);o=bf(4)|0;c[o>>2]=5e3;aO(o|0,10664,510)}}while(0);g=bf(4)|0;c[g>>2]=5e3;aO(g|0,10664,510)}function e7(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0.0,P=0,Q=0,R=0;e=i;i=i+408|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[m>>2]|0;m=e|0;n=e+136|0;o=e+144|0;p=e+152|0;q=e+208|0;r=e+216|0;s=e+376|0;t=e+384|0;u=e+392|0;v=e+400|0;w=e+8|0;e6(p,j,w,n,o);j=e+168|0;jP(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=g|0;g=c[n>>2]|0;n=c[o>>2]|0;o=c[y>>2]|0;L3735:while(1){do{if((o|0)==0){z=0}else{A=c[o+12>>2]|0;if((A|0)==(c[o+16>>2]|0)){B=bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0}else{B=c[A>>2]|0}if((B|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);C=(z|0)==0;A=c[f>>2]|0;do{if((A|0)==0){D=3189}else{E=c[A+12>>2]|0;if((E|0)==(c[A+16>>2]|0)){F=bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{F=c[E>>2]|0}if((F|0)==-1){c[f>>2]=0;D=3189;break}else{E=(A|0)==0;if(C^E){G=A;H=E;break}else{I=A;J=E;break L3735}}}}while(0);if((D|0)==3189){D=0;if(C){I=0;J=1;break}else{G=0;H=1}}A=z+12|0;E=c[A>>2]|0;K=z+16|0;if((E|0)==(c[K>>2]|0)){L=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{L=c[E>>2]|0}if((e4(L,u,v,j,q,g,n,p,x,s,t,w)|0)!=0){I=G;J=H;break}E=c[A>>2]|0;if((E|0)==(c[K>>2]|0)){K=c[(c[z>>2]|0)+40>>2]|0;bW[K&1023](z);o=z;continue}else{c[A>>2]=E+4|0;o=z;continue}}o=p;H=d[o]|0;if((H&1|0)==0){M=H>>>1}else{M=c[p+4>>2]|0}do{if((M|0)!=0){if((a[u]&1)<<24>>24==0){break}H=c[s>>2]|0;if((H-r|0)>=160){break}G=c[t>>2]|0;c[s>>2]=H+4|0;c[H>>2]=G}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;N=0.0}else{if(!(a[13632]|0)){c[994]=bD(1,1320,0)|0;a[13632]=1}O=+jN(j,m);if((c[m>>2]|0)==(t|0)){N=O;break}c[k>>2]=4;N=0.0}}while(0);h[l>>3]=N;eA(p,x,c[s>>2]|0,k);do{if(C){P=0}else{s=c[z+12>>2]|0;if((s|0)==(c[z+16>>2]|0)){Q=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{Q=c[s>>2]|0}if((Q|0)!=-1){P=z;break}c[y>>2]=0;P=0}}while(0);y=(P|0)==0;do{if(J){D=3229}else{z=c[I+12>>2]|0;if((z|0)==(c[I+16>>2]|0)){R=bW[c[(c[I>>2]|0)+36>>2]&1023](I)|0}else{R=c[z>>2]|0}if((R|0)==-1){c[f>>2]=0;D=3229;break}else{if(y^(I|0)==0){break}else{D=3231;break}}}}while(0);do{if((D|0)==3229){if(y){D=3231;break}else{break}}}while(0);if((D|0)==3231){c[k>>2]=c[k>>2]|2}c[b>>2]=P;if((a[o]&1)<<24>>24==0){i=e;return}jJ(c[p+8>>2]|0);i=e;return}function e8(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0.0,P=0,Q=0,R=0;e=i;i=i+408|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[m>>2]|0;m=e|0;n=e+136|0;o=e+144|0;p=e+152|0;q=e+208|0;r=e+216|0;s=e+376|0;t=e+384|0;u=e+392|0;v=e+400|0;w=e+8|0;e6(p,j,w,n,o);j=e+168|0;jP(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=g|0;g=c[n>>2]|0;n=c[o>>2]|0;o=c[y>>2]|0;L3811:while(1){do{if((o|0)==0){z=0}else{A=c[o+12>>2]|0;if((A|0)==(c[o+16>>2]|0)){B=bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0}else{B=c[A>>2]|0}if((B|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);C=(z|0)==0;A=c[f>>2]|0;do{if((A|0)==0){D=3250}else{E=c[A+12>>2]|0;if((E|0)==(c[A+16>>2]|0)){F=bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{F=c[E>>2]|0}if((F|0)==-1){c[f>>2]=0;D=3250;break}else{E=(A|0)==0;if(C^E){G=A;H=E;break}else{I=A;J=E;break L3811}}}}while(0);if((D|0)==3250){D=0;if(C){I=0;J=1;break}else{G=0;H=1}}A=z+12|0;E=c[A>>2]|0;K=z+16|0;if((E|0)==(c[K>>2]|0)){L=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{L=c[E>>2]|0}if((e4(L,u,v,j,q,g,n,p,x,s,t,w)|0)!=0){I=G;J=H;break}E=c[A>>2]|0;if((E|0)==(c[K>>2]|0)){K=c[(c[z>>2]|0)+40>>2]|0;bW[K&1023](z);o=z;continue}else{c[A>>2]=E+4|0;o=z;continue}}o=p;H=d[o]|0;if((H&1|0)==0){M=H>>>1}else{M=c[p+4>>2]|0}do{if((M|0)!=0){if((a[u]&1)<<24>>24==0){break}H=c[s>>2]|0;if((H-r|0)>=160){break}G=c[t>>2]|0;c[s>>2]=H+4|0;c[H>>2]=G}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;N=0.0}else{if(!(a[13632]|0)){c[994]=bD(1,1320,0)|0;a[13632]=1}O=+jN(j,m);if((c[m>>2]|0)==(t|0)){N=O;break}c[k>>2]=4;N=0.0}}while(0);h[l>>3]=N;eA(p,x,c[s>>2]|0,k);do{if(C){P=0}else{s=c[z+12>>2]|0;if((s|0)==(c[z+16>>2]|0)){Q=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{Q=c[s>>2]|0}if((Q|0)!=-1){P=z;break}c[y>>2]=0;P=0}}while(0);y=(P|0)==0;do{if(J){D=3290}else{z=c[I+12>>2]|0;if((z|0)==(c[I+16>>2]|0)){R=bW[c[(c[I>>2]|0)+36>>2]&1023](I)|0}else{R=c[z>>2]|0}if((R|0)==-1){c[f>>2]=0;D=3290;break}else{if(y^(I|0)==0){break}else{D=3292;break}}}}while(0);do{if((D|0)==3290){if(y){D=3292;break}else{break}}}while(0);if((D|0)==3292){c[k>>2]=c[k>>2]|2}c[b>>2]=P;if((a[o]&1)<<24>>24==0){i=e;return}jJ(c[p+8>>2]|0);i=e;return}function e9(a){a=a|0;return}function fa(a){a=a|0;jJ(a);return}function fb(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+80|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+24|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+72|0;q=j|0;a[q]=a[4752]|0;a[q+1|0]=a[4753|0]|0;a[q+2|0]=a[4754|0]|0;a[q+3|0]=a[4755|0]|0;a[q+4|0]=a[4756|0]|0;a[q+5|0]=a[4757|0]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=k|0;if(a[13632]|0){w=c[994]|0}else{v=bD(1,1320,0)|0;c[994]=v;a[13632]=1;w=v}v=fe(u,w,q,(C=i,i=i+8|0,c[C>>2]=h,C)|0)|0;h=k+v|0;q=c[s>>2]&176;do{if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=k+1|0;break}if(!((v|0)>1&s<<24>>24==48)){y=3319;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=3319;break}x=k+2|0;break}else if((q|0)==32){x=h}else{y=3319}}while(0);if((y|0)==3319){x=u}y=l|0;l=o|0;q=c[f+28>>2]|0;c[l>>2]=q;k=q+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fi(u,x,h,y,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;ff(b,p,y,D,E,f,g);i=d;return}bT[c[(c[o>>2]|0)+8>>2]&1023](o|0);z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;ff(b,p,y,D,E,f,g);i=d;return}function fc(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;d=i;i=i+136|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[k>>2]|0;k=d|0;l=d+16|0;m=d+120|0;n=m;o=i;i=i+40|0;p=i;i=i+4|0;i=i+7>>3<<3;q=i;i=i+160|0;r=i;i=i+4|0;i=i+7>>3<<3;s=i;i=i+4|0;i=i+7>>3<<3;jP(n|0,0,12);t=c[g+28>>2]|0;g=t+4|0;J=c[g>>2]|0,c[g>>2]=J+1,J;if((c[3256]|0)!=-1){c[k>>2]=13024;c[k+4>>2]=24;c[k+8>>2]=0;dh(13024,k,250)}k=(c[3257]|0)-1|0;u=c[t+8>>2]|0;do{if((c[t+12>>2]|0)-u>>2>>>0>k>>>0){v=c[u+(k<<2)>>2]|0;if((v|0)==0){break}w=l|0;b0[c[(c[v>>2]|0)+48>>2]&1023](v,13488,13514,w);if(((J=c[g>>2]|0,c[g>>2]=J+ -1,J)|0)==0){bT[c[(c[t>>2]|0)+8>>2]&1023](t)}v=o|0;jP(v|0,0,40);c[p>>2]=v;x=q|0;c[r>>2]=x;c[s>>2]=0;y=e|0;z=f|0;A=c[y>>2]|0;L3933:while(1){do{if((A|0)==0){B=0}else{D=c[A+12>>2]|0;if((D|0)==(c[A+16>>2]|0)){E=bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{E=c[D>>2]|0}if((E|0)!=-1){B=A;break}c[y>>2]=0;B=0}}while(0);F=(B|0)==0;D=c[z>>2]|0;do{if((D|0)==0){G=3351}else{H=c[D+12>>2]|0;if((H|0)==(c[D+16>>2]|0)){I=bW[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{I=c[H>>2]|0}if((I|0)==-1){c[z>>2]=0;G=3351;break}else{H=(D|0)==0;if(F^H){K=D;L=H;break}else{M=D;N=H;break L3933}}}}while(0);if((G|0)==3351){G=0;if(F){M=0;N=1;break}else{K=0;L=1}}D=B+12|0;H=c[D>>2]|0;O=B+16|0;if((H|0)==(c[O>>2]|0)){P=bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{P=c[H>>2]|0}if((eZ(P,16,v,p,s,0,m,x,r,w)|0)!=0){M=K;N=L;break}H=c[D>>2]|0;if((H|0)==(c[O>>2]|0)){O=c[(c[B>>2]|0)+40>>2]|0;bW[O&1023](B);A=B;continue}else{c[D>>2]=H+4|0;A=B;continue}}a[o+39|0]=0;if(a[13632]|0){Q=c[994]|0}else{A=bD(1,1320,0)|0;c[994]=A;a[13632]=1;Q=A}if((eV(v,Q,1296,(C=i,i=i+8|0,c[C>>2]=j,C)|0)|0)!=1){c[h>>2]=4}do{if(F){R=0}else{A=c[B+12>>2]|0;if((A|0)==(c[B+16>>2]|0)){S=bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{S=c[A>>2]|0}if((S|0)!=-1){R=B;break}c[y>>2]=0;R=0}}while(0);y=(R|0)==0;do{if(N){G=3384}else{v=c[M+12>>2]|0;if((v|0)==(c[M+16>>2]|0)){T=bW[c[(c[M>>2]|0)+36>>2]&1023](M)|0}else{T=c[v>>2]|0}if((T|0)==-1){c[z>>2]=0;G=3384;break}else{if(y^(M|0)==0){break}else{G=3386;break}}}}while(0);do{if((G|0)==3384){if(y){G=3386;break}else{break}}}while(0);if((G|0)==3386){c[h>>2]=c[h>>2]|2}c[b>>2]=R;if((a[n]&1)<<24>>24==0){i=d;return}jJ(c[m+8>>2]|0);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function fd(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;j=i;i=i+40|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+16|0;m=j+24|0;if((c[f+4>>2]&1|0)==0){n=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2]|0;b2[n&1023](b,d,l,f,g,h&1);i=j;return}g=c[f+28>>2]|0;f=g+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3162]|0)!=-1){c[k>>2]=12648;c[k+4>>2]=24;c[k+8>>2]=0;dh(12648,k,250)}k=(c[3163]|0)-1|0;l=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-l>>2>>>0>k>>>0){d=c[l+(k<<2)>>2]|0;if((d|0)==0){break}n=d;if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[d>>2]|0;if(h){bU[c[o+24>>2]&1023](m,n)}else{bU[c[o+28>>2]&1023](m,n)}n=m;o=m;d=a[o]|0;if((d&1)<<24>>24==0){p=n+1|0;q=p;r=p;s=m+8|0}else{p=m+8|0;q=c[p>>2]|0;r=n+1|0;s=p}p=e|0;n=m+4|0;t=q;u=d;while(1){v=(u&1)<<24>>24==0;if(v){w=r}else{w=c[s>>2]|0}d=u&255;if((t|0)==(w+((d&1|0)==0?d>>>1:c[n>>2]|0)|0)){break}d=a[t]|0;x=c[p>>2]|0;do{if((x|0)!=0){y=x+24|0;z=c[y>>2]|0;if((z|0)!=(c[x+28>>2]|0)){c[y>>2]=z+1|0;a[z]=d;break}if((b3[c[(c[x>>2]|0)+52>>2]&1023](x,d&255)|0)!=-1){break}c[p>>2]=0}}while(0);t=t+1|0;u=a[o]|0}c[b>>2]=c[p>>2]|0;if(v){i=j;return}jJ(c[s>>2]|0);i=j;return}}while(0);j=bf(4)|0;c[j>>2]=5e3;aO(j|0,10664,510)}function fe(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=bJ(b|0)|0;b=bN(a|0,d|0,g|0)|0;if((h|0)==0){i=f;return b|0}bJ(h|0);i=f;return b|0}function ff(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;k=i;i=i+16|0;l=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[l>>2]|0;l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g|0;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;do{if((h|0)>0){if((bQ[c[(c[d>>2]|0)+48>>2]&1023](d,e,h)|0)==(h|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){if(q>>>0<11){h=q<<1&255;e=l;a[e]=h;r=l+1|0;s=h;t=e}else{e=q+16&-16;h=jG(e)|0;c[l+8>>2]=h;g=e|1;c[l>>2]=g;c[l+4>>2]=q;r=h;s=g&255;t=l}jP(r|0,j|0,q|0);a[r+q|0]=0;if((s&1)<<24>>24==0){u=l+1|0}else{u=c[l+8>>2]|0}if((bQ[c[(c[d>>2]|0)+48>>2]&1023](d,u,q)|0)==(q|0)){if((a[t]&1)<<24>>24==0){break}jJ(c[l+8>>2]|0);break}c[m>>2]=0;c[b>>2]=0;if((a[t]&1)<<24>>24==0){i=k;return}jJ(c[l+8>>2]|0);i=k;return}}while(0);l=n-o|0;do{if((l|0)>0){if((bQ[c[(c[d>>2]|0)+48>>2]&1023](d,f,l)|0)==(l|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function fg(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+112|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+80|0;o=d+88|0;p=d+96|0;q=d+104|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=l|0;if(a[13632]|0){w=c[994]|0}else{v=bD(1,1320,0)|0;c[994]=v;a[13632]=1;w=v}v=fe(u,w,r,(C=i,i=i+16|0,c[C>>2]=h,c[C+8>>2]=j,C)|0)|0;j=l+v|0;h=c[s>>2]&176;do{if((h|0)==32){x=j}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){y=3490;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=3490;break}x=l+2|0;break}else{y=3490}}while(0);if((y|0)==3490){x=u}y=m|0;m=p|0;l=c[f+28>>2]|0;c[m>>2]=l;v=l+4|0;J=c[v>>2]|0,c[v>>2]=J+1,J;fi(u,x,j,y,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;ff(b,q,y,D,E,f,g);i=d;return}bT[c[(c[p>>2]|0)+8>>2]&1023](p|0);z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;ff(b,q,y,D,E,f,g);i=d;return}function fh(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+80|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+24|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+72|0;q=j|0;a[q]=a[4752]|0;a[q+1|0]=a[4753|0]|0;a[q+2|0]=a[4754|0]|0;a[q+3|0]=a[4755|0]|0;a[q+4|0]=a[4756|0]|0;a[q+5|0]=a[4757|0]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=k|0;if(a[13632]|0){w=c[994]|0}else{t=bD(1,1320,0)|0;c[994]=t;a[13632]=1;w=t}t=fe(u,w,q,(C=i,i=i+8|0,c[C>>2]=h,C)|0)|0;h=k+t|0;q=c[s>>2]&176;do{if((q|0)==32){x=h}else if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){y=3519;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=3519;break}x=k+2|0;break}else{y=3519}}while(0);if((y|0)==3519){x=u}y=l|0;l=o|0;k=c[f+28>>2]|0;c[l>>2]=k;t=k+4|0;J=c[t>>2]|0,c[t>>2]=J+1,J;fi(u,x,h,y,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;ff(b,p,y,D,E,f,g);i=d;return}bT[c[(c[o>>2]|0)+8>>2]&1023](o|0);z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;ff(b,p,y,D,E,f,g);i=d;return}function fi(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3258]|0)!=-1){c[n>>2]=13032;c[n+4>>2]=24;c[n+8>>2]=0;dh(13032,n,250)}n=(c[3259]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}r=k;s=c[p>>2]|0;if((c[3162]|0)!=-1){c[m>>2]=12648;c[m+4>>2]=24;c[m+8>>2]=0;dh(12648,m,250)}m=(c[3163]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}t=s;bU[c[(c[s>>2]|0)+20>>2]&1023](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}L4176:do{if((v|0)==0){p=c[(c[k>>2]|0)+32>>2]|0;b0[p&1023](r,b,f,g);c[j>>2]=g+(f-b|0)|0}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=b3[c[(c[k>>2]|0)+28>>2]&1023](r,p)|0;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=n;w=b+1|0}else{w=b}do{if((f-w|0)>1){if((a[w]|0)!=48){x=w;break}n=w+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){x=w;break}p=k;q=b3[c[(c[p>>2]|0)+28>>2]&1023](r,48)|0;y=c[j>>2]|0;c[j>>2]=y+1|0;a[y]=q;q=b3[c[(c[p>>2]|0)+28>>2]&1023](r,a[n]|0)|0;n=c[j>>2]|0;c[j>>2]=n+1|0;a[n]=q;x=w+2|0}else{x=w}}while(0);L4189:do{if((x|0)!=(f|0)){q=f-1|0;if(x>>>0<q>>>0){z=x;A=q}else{break}while(1){q=a[z]|0;a[z]=a[A]|0;a[A]=q;q=z+1|0;n=A-1|0;if(q>>>0<n>>>0){z=q;A=n}else{break L4189}}}}while(0);n=bW[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L4195:do{if(x>>>0<f>>>0){q=u+1|0;p=k;y=o+4|0;B=o+8|0;C=0;D=0;E=x;while(1){F=(a[m]&1)<<24>>24==0;do{if((a[(F?q:c[B>>2]|0)+D|0]|0)==0){G=D;H=C}else{if((C|0)!=(a[(F?q:c[B>>2]|0)+D|0]|0|0)){G=D;H=C;break}I=c[j>>2]|0;c[j>>2]=I+1|0;a[I]=n;I=d[m]|0;G=(D>>>0<(((I&1|0)==0?I>>>1:c[y>>2]|0)-1|0)>>>0&1)+D|0;H=0}}while(0);F=b3[c[(c[p>>2]|0)+28>>2]&1023](r,a[E]|0)|0;I=c[j>>2]|0;c[j>>2]=I+1|0;a[I]=F;F=E+1|0;if(F>>>0<f>>>0){C=H+1|0;D=G;E=F}else{break L4195}}}}while(0);n=g+(x-b|0)|0;E=c[j>>2]|0;if((n|0)==(E|0)){break}D=E-1|0;if(n>>>0<D>>>0){J=n;K=D}else{break}while(1){D=a[J]|0;a[J]=a[K]|0;a[K]=D;D=J+1|0;n=K-1|0;if(D>>>0<n>>>0){J=D;K=n}else{break L4176}}}}while(0);if((e|0)==(f|0)){L=c[j>>2]|0}else{L=g+(e-b|0)|0}c[h>>2]=L;if((a[m]&1)<<24>>24==0){i=l;return}jJ(c[o+8>>2]|0);i=l;return}function fj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+112|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+80|0;o=d+88|0;p=d+96|0;q=d+104|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=l|0;if(a[13632]|0){w=c[994]|0}else{t=bD(1,1320,0)|0;c[994]=t;a[13632]=1;w=t}t=fe(u,w,r,(C=i,i=i+16|0,c[C>>2]=h,c[C+8>>2]=j,C)|0)|0;j=l+t|0;h=c[s>>2]&176;do{if((h|0)==32){x=j}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){y=3604;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=3604;break}x=l+2|0;break}else{y=3604}}while(0);if((y|0)==3604){x=u}y=m|0;m=p|0;l=c[f+28>>2]|0;c[m>>2]=l;t=l+4|0;J=c[t>>2]|0,c[t>>2]=J+1,J;fi(u,x,j,y,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;ff(b,q,y,D,E,f,g);i=d;return}bT[c[(c[p>>2]|0)+8>>2]&1023](p|0);z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;ff(b,q,y,D,E,f,g);i=d;return}function fk(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0;d=i;i=i+152|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+112|0;p=d+120|0;q=d+128|0;r=d+136|0;s=d+144|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){if((k&1|0)==0){a[x]=97;y=0;break}else{a[x]=65;y=0;break}}else{a[x]=46;v=x+2|0;a[x+1|0]=42;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;if(a[13632]|0){z=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;z=l}if(y){A=fl(k,30,z,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{A=fl(k,30,z,t,(C=i,i=i+8|0,h[C>>3]=j,C)|0)|0}do{if((A|0)>29){z=a[13632]|0;if(y){if(z){B=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;B=l}D=fm(m,B,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{if(z){E=c[994]|0}else{z=bD(1,1320,0)|0;c[994]=z;a[13632]=1;E=z}D=fm(m,E,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}z=c[m>>2]|0;if((z|0)!=0){F=D;G=z;H=z;break}z=bf(4)|0;c[z>>2]=4968;aO(z|0,10648,66)}else{F=A;G=0;H=c[m>>2]|0}}while(0);A=H+F|0;D=c[u>>2]&176;do{if((D|0)==16){u=a[H]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){I=H+1|0;break}if(!((F|0)>1&u<<24>>24==48)){K=3661;break}u=a[H+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){K=3661;break}I=H+2|0;break}else if((D|0)==32){I=A}else{K=3661}}while(0);if((K|0)==3661){I=H}do{if((H|0)==(k|0)){L=n|0;M=0;N=k}else{K=jA(F<<1)|0;if((K|0)!=0){L=K;M=K;N=c[m>>2]|0;break}K=bf(4)|0;c[K>>2]=4968;aO(K|0,10648,66)}}while(0);m=q|0;F=c[f+28>>2]|0;c[m>>2]=F;k=F+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fn(N,I,A,L,o,p,q);q=c[m>>2]|0;m=q+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)==0){bT[c[(c[q>>2]|0)+8>>2]&1023](q|0)}q=e|0;c[s>>2]=c[q>>2]|0;ff(r,s,L,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((M|0)!=0){jB(M)}if((G|0)==0){i=d;return}jB(G);i=d;return}function fl(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;i=i+16|0;h=g|0;j=h;c[j>>2]=f;c[j+4>>2]=0;j=bJ(d|0)|0;d=aI(a|0,b|0,e|0,h|0)|0;if((j|0)==0){i=g;return d|0}bJ(j|0);i=g;return d|0}function fm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=bJ(b|0)|0;b=bk(a|0,d|0,g|0)|0;if((h|0)==0){i=f;return b|0}bJ(h|0);i=f;return b|0}function fn(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3258]|0)!=-1){c[n>>2]=13032;c[n+4>>2]=24;c[n+8>>2]=0;dh(13032,n,250)}n=(c[3259]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}r=k;s=c[p>>2]|0;if((c[3162]|0)!=-1){c[m>>2]=12648;c[m+4>>2]=24;c[m+8>>2]=0;dh(12648,m,250)}m=(c[3163]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}t=s;bU[c[(c[s>>2]|0)+20>>2]&1023](o,t);c[j>>2]=g;u=a[b]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=b3[c[(c[k>>2]|0)+28>>2]&1023](r,u)|0;u=c[j>>2]|0;c[j>>2]=u+1|0;a[u]=m;v=b+1|0}else{v=b}m=f;L23:do{if((m-v|0)>1){if((a[v]|0)!=48){w=v;x=36;break}u=v+1|0;p=a[u]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=v;x=36;break}p=k;n=b3[c[(c[p>>2]|0)+28>>2]&1023](r,48)|0;q=c[j>>2]|0;c[j>>2]=q+1|0;a[q]=n;n=v+2|0;q=b3[c[(c[p>>2]|0)+28>>2]&1023](r,a[u]|0)|0;u=c[j>>2]|0;c[j>>2]=u+1|0;a[u]=q;q=n;while(1){if(q>>>0>=f>>>0){y=q;z=n;break L23}u=a[q]|0;if(a[13632]|0){A=c[994]|0}else{p=bD(1,1320,0)|0;c[994]=p;a[13632]=1;A=p}if((a3(u<<24>>24|0,A|0)|0)==0){y=q;z=n;break L23}else{q=q+1|0}}}else{w=v;x=36}}while(0);L38:do{if((x|0)==36){while(1){x=0;if(w>>>0>=f>>>0){y=w;z=v;break L38}A=a[w]|0;if(a[13632]|0){B=c[994]|0}else{q=bD(1,1320,0)|0;c[994]=q;a[13632]=1;B=q}if((aV(A<<24>>24|0,B|0)|0)==0){y=w;z=v;break L38}else{w=w+1|0;x=36}}}}while(0);x=o;w=o;v=d[w]|0;if((v&1|0)==0){C=v>>>1}else{C=c[o+4>>2]|0}L53:do{if((C|0)==0){v=c[j>>2]|0;B=c[(c[k>>2]|0)+32>>2]|0;b0[B&1023](r,z,y,v);c[j>>2]=(c[j>>2]|0)+(y-z|0)|0}else{L57:do{if((z|0)!=(y|0)){v=y-1|0;if(z>>>0<v>>>0){D=z;E=v}else{break}while(1){v=a[D]|0;a[D]=a[E]|0;a[E]=v;v=D+1|0;B=E-1|0;if(v>>>0<B>>>0){D=v;E=B}else{break L57}}}}while(0);B=bW[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L63:do{if(z>>>0<y>>>0){v=x+1|0;A=o+4|0;q=o+8|0;n=k;u=0;p=0;F=z;while(1){G=(a[w]&1)<<24>>24==0;do{if((a[(G?v:c[q>>2]|0)+p|0]|0)>0){if((u|0)!=(a[(G?v:c[q>>2]|0)+p|0]|0|0)){H=p;I=u;break}J=c[j>>2]|0;c[j>>2]=J+1|0;a[J]=B;J=d[w]|0;H=(p>>>0<(((J&1|0)==0?J>>>1:c[A>>2]|0)-1|0)>>>0&1)+p|0;I=0}else{H=p;I=u}}while(0);G=b3[c[(c[n>>2]|0)+28>>2]&1023](r,a[F]|0)|0;J=c[j>>2]|0;c[j>>2]=J+1|0;a[J]=G;G=F+1|0;if(G>>>0<y>>>0){u=I+1|0;p=H;F=G}else{break L63}}}}while(0);B=g+(z-b|0)|0;F=c[j>>2]|0;if((B|0)==(F|0)){break}p=F-1|0;if(B>>>0<p>>>0){K=B;L=p}else{break}while(1){p=a[K]|0;a[K]=a[L]|0;a[L]=p;p=K+1|0;B=L-1|0;if(p>>>0<B>>>0){K=p;L=B}else{break L53}}}}while(0);L77:do{if(y>>>0<f>>>0){L=k;K=y;while(1){z=a[K]|0;if(z<<24>>24==46){break}H=b3[c[(c[L>>2]|0)+28>>2]&1023](r,z)|0;z=c[j>>2]|0;c[j>>2]=z+1|0;a[z]=H;H=K+1|0;if(H>>>0<f>>>0){K=H}else{M=H;break L77}}L=bW[c[(c[s>>2]|0)+12>>2]&1023](t)|0;H=c[j>>2]|0;c[j>>2]=H+1|0;a[H]=L;M=K+1|0}else{M=y}}while(0);b0[c[(c[k>>2]|0)+32>>2]&1023](r,M,f,c[j>>2]|0);r=(c[j>>2]|0)+(m-M|0)|0;c[j>>2]=r;if((e|0)==(f|0)){N=r}else{N=g+(e-b|0)|0}c[h>>2]=N;if((a[w]&1)<<24>>24==0){i=l;return}jJ(c[o+8>>2]|0);i=l;return}function fo(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0;d=i;i=i+152|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+112|0;p=d+120|0;q=d+128|0;r=d+136|0;s=d+144|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){a[x]=76;v=x+1|0;if((k&1|0)==0){a[v]=97;y=0;break}else{a[v]=65;y=0;break}}else{a[x]=46;a[x+1|0]=42;a[x+2|0]=76;v=x+3|0;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;if(a[13632]|0){z=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;z=l}if(y){A=fl(k,30,z,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{A=fl(k,30,z,t,(C=i,i=i+8|0,h[C>>3]=j,C)|0)|0}do{if((A|0)>29){z=a[13632]|0;if(y){if(z){B=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;B=l}D=fm(m,B,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{if(z){E=c[994]|0}else{z=bD(1,1320,0)|0;c[994]=z;a[13632]=1;E=z}D=fm(m,E,t,(C=i,i=i+8|0,h[C>>3]=j,C)|0)|0}z=c[m>>2]|0;if((z|0)!=0){F=D;G=z;H=z;break}z=bf(4)|0;c[z>>2]=4968;aO(z|0,10648,66)}else{F=A;G=0;H=c[m>>2]|0}}while(0);A=H+F|0;D=c[u>>2]&176;do{if((D|0)==16){u=a[H]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){I=H+1|0;break}if(!((F|0)>1&u<<24>>24==48)){K=129;break}u=a[H+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){K=129;break}I=H+2|0;break}else if((D|0)==32){I=A}else{K=129}}while(0);if((K|0)==129){I=H}do{if((H|0)==(k|0)){L=n|0;M=0;N=k}else{K=jA(F<<1)|0;if((K|0)!=0){L=K;M=K;N=c[m>>2]|0;break}K=bf(4)|0;c[K>>2]=4968;aO(K|0,10648,66)}}while(0);m=q|0;F=c[f+28>>2]|0;c[m>>2]=F;k=F+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fn(N,I,A,L,o,p,q);q=c[m>>2]|0;m=q+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)==0){bT[c[(c[q>>2]|0)+8>>2]&1023](q|0)}q=e|0;c[s>>2]=c[q>>2]|0;ff(r,s,L,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((M|0)!=0){jB(M)}if((G|0)==0){i=d;return}jB(G);i=d;return}function fp(a){a=a|0;return}function fq(a){a=a|0;jJ(a);return}function fr(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+144|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+24|0;m=d+112|0;n=d+120|0;o=d+128|0;p=d+136|0;q=j|0;a[q]=a[4752]|0;a[q+1|0]=a[4753|0]|0;a[q+2|0]=a[4754|0]|0;a[q+3|0]=a[4755|0]|0;a[q+4|0]=a[4756|0]|0;a[q+5|0]=a[4757|0]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=k|0;if(a[13632]|0){w=c[994]|0}else{t=bD(1,1320,0)|0;c[994]=t;a[13632]=1;w=t}t=fe(u,w,q,(C=i,i=i+8|0,c[C>>2]=h,C)|0)|0;h=k+t|0;q=c[s>>2]&176;do{if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){y=175;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=175;break}x=k+2|0;break}else if((q|0)==32){x=h}else{y=175}}while(0);if((y|0)==175){x=u}y=l|0;l=o|0;q=c[f+28>>2]|0;c[l>>2]=q;k=q+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fw(u,x,h,y,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;fx(b,p,y,D,E,f,g);i=d;return}bT[c[(c[o>>2]|0)+8>>2]&1023](o|0);z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;fx(b,p,y,D,E,f,g);i=d;return}function fs(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;d=i;i=i+96|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=d|0;k=d+24|0;l=d+48|0;m=d+88|0;n=d+16|0;a[n]=a[4760]|0;a[n+1|0]=a[4761|0]|0;a[n+2|0]=a[4762|0]|0;a[n+3|0]=a[4763|0]|0;a[n+4|0]=a[4764|0]|0;a[n+5|0]=a[4765|0]|0;o=k|0;if(a[13632]|0){p=c[994]|0}else{q=bD(1,1320,0)|0;c[994]=q;a[13632]=1;p=q}q=fe(o,p,n,(C=i,i=i+8|0,c[C>>2]=h,C)|0)|0;h=k+q|0;n=c[f+4>>2]&176;do{if((n|0)==16){p=a[o]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){r=k+1|0;break}if(!((q|0)>1&p<<24>>24==48)){s=194;break}p=a[k+1|0]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){s=194;break}r=k+2|0;break}else if((n|0)==32){r=h}else{s=194}}while(0);if((s|0)==194){r=o}s=c[f+28>>2]|0;n=s+4|0;J=c[n>>2]|0,c[n>>2]=J+1,J;if((c[3258]|0)!=-1){c[j>>2]=13032;c[j+4>>2]=24;c[j+8>>2]=0;dh(13032,j,250)}j=(c[3259]|0)-1|0;p=c[s+8>>2]|0;do{if((c[s+12>>2]|0)-p>>2>>>0>j>>>0){t=c[p+(j<<2)>>2]|0;if((t|0)==0){break}if(((J=c[n>>2]|0,c[n>>2]=J+ -1,J)|0)==0){bT[c[(c[s>>2]|0)+8>>2]&1023](s)}u=l|0;b0[c[(c[t>>2]|0)+32>>2]&1023](t,o,h,u);t=l+q|0;if((r|0)==(h|0)){v=t;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;ff(b,m,u,v,t,f,g);i=d;return}v=l+(r-k|0)|0;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;ff(b,m,u,v,t,f,g);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function ft(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;j=i;i=i+40|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+16|0;m=j+24|0;if((c[f+4>>2]&1|0)==0){n=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2]|0;b2[n&1023](b,d,l,f,g,h&1);i=j;return}g=c[f+28>>2]|0;f=g+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3160]|0)!=-1){c[k>>2]=12640;c[k+4>>2]=24;c[k+8>>2]=0;dh(12640,k,250)}k=(c[3161]|0)-1|0;l=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-l>>2>>>0>k>>>0){d=c[l+(k<<2)>>2]|0;if((d|0)==0){break}n=d;if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[d>>2]|0;if(h){bU[c[o+24>>2]&1023](m,n)}else{bU[c[o+28>>2]&1023](m,n)}n=m;o=a[n]|0;if((o&1)<<24>>24==0){d=m+4|0;p=d;q=d;r=m+8|0}else{d=m+8|0;p=c[d>>2]|0;q=m+4|0;r=d}d=e|0;s=p;t=o;while(1){u=(t&1)<<24>>24==0;if(u){v=q}else{v=c[r>>2]|0}o=t&255;if((o&1|0)==0){w=o>>>1}else{w=c[q>>2]|0}if((s|0)==(v+(w<<2)|0)){break}o=c[s>>2]|0;x=c[d>>2]|0;do{if((x|0)!=0){y=x+24|0;z=c[y>>2]|0;if((z|0)==(c[x+28>>2]|0)){A=b3[c[(c[x>>2]|0)+52>>2]&1023](x,o)|0}else{c[y>>2]=z+4|0;c[z>>2]=o;A=o}if((A|0)!=-1){break}c[d>>2]=0}}while(0);s=s+4|0;t=a[n]|0}c[b>>2]=c[d>>2]|0;if(u){i=j;return}jJ(c[r>>2]|0);i=j;return}}while(0);j=bf(4)|0;c[j>>2]=5e3;aO(j|0,10664,510)}function fu(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+232|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+200|0;o=d+208|0;p=d+216|0;q=d+224|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=l|0;if(a[13632]|0){w=c[994]|0}else{t=bD(1,1320,0)|0;c[994]=t;a[13632]=1;w=t}t=fe(u,w,r,(C=i,i=i+16|0,c[C>>2]=h,c[C+8>>2]=j,C)|0)|0;j=l+t|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){y=271;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=271;break}x=l+2|0;break}else if((h|0)==32){x=j}else{y=271}}while(0);if((y|0)==271){x=u}y=m|0;m=p|0;h=c[f+28>>2]|0;c[m>>2]=h;l=h+4|0;J=c[l>>2]|0,c[l>>2]=J+1,J;fw(u,x,j,y,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;fx(b,q,y,D,E,f,g);i=d;return}bT[c[(c[p>>2]|0)+8>>2]&1023](p|0);z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;fx(b,q,y,D,E,f,g);i=d;return}function fv(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+144|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+24|0;m=d+112|0;n=d+120|0;o=d+128|0;p=d+136|0;q=j|0;a[q]=a[4752]|0;a[q+1|0]=a[4753|0]|0;a[q+2|0]=a[4754|0]|0;a[q+3|0]=a[4755|0]|0;a[q+4|0]=a[4756|0]|0;a[q+5|0]=a[4757|0]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=k|0;if(a[13632]|0){w=c[994]|0}else{t=bD(1,1320,0)|0;c[994]=t;a[13632]=1;w=t}t=fe(u,w,q,(C=i,i=i+8|0,c[C>>2]=h,C)|0)|0;h=k+t|0;q=c[s>>2]&176;do{if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){y=300;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=300;break}x=k+2|0;break}else if((q|0)==32){x=h}else{y=300}}while(0);if((y|0)==300){x=u}y=l|0;l=o|0;q=c[f+28>>2]|0;c[l>>2]=q;k=q+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fw(u,x,h,y,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;fx(b,p,y,D,E,f,g);i=d;return}bT[c[(c[o>>2]|0)+8>>2]&1023](o|0);z=e|0;A=c[z>>2]|0;B=p|0;c[B>>2]=A;D=c[m>>2]|0;E=c[n>>2]|0;fx(b,p,y,D,E,f,g);i=d;return}function fw(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3256]|0)!=-1){c[n>>2]=13024;c[n+4>>2]=24;c[n+8>>2]=0;dh(13024,n,250)}n=(c[3257]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}r=k;s=c[p>>2]|0;if((c[3160]|0)!=-1){c[m>>2]=12640;c[m+4>>2]=24;c[m+8>>2]=0;dh(12640,m,250)}m=(c[3161]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}t=s;bU[c[(c[s>>2]|0)+20>>2]&1023](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}L382:do{if((v|0)==0){p=c[(c[k>>2]|0)+48>>2]|0;b0[p&1023](r,b,f,g);c[j>>2]=g+(f-b<<2)|0}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=b3[c[(c[k>>2]|0)+44>>2]&1023](r,p)|0;p=c[j>>2]|0;c[j>>2]=p+4|0;c[p>>2]=n;w=b+1|0}else{w=b}do{if((f-w|0)>1){if((a[w]|0)!=48){x=w;break}n=w+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){x=w;break}p=k;q=b3[c[(c[p>>2]|0)+44>>2]&1023](r,48)|0;y=c[j>>2]|0;c[j>>2]=y+4|0;c[y>>2]=q;q=b3[c[(c[p>>2]|0)+44>>2]&1023](r,a[n]|0)|0;n=c[j>>2]|0;c[j>>2]=n+4|0;c[n>>2]=q;x=w+2|0}else{x=w}}while(0);L397:do{if((x|0)!=(f|0)){q=f-1|0;if(x>>>0<q>>>0){z=x;A=q}else{break}while(1){q=a[z]|0;a[z]=a[A]|0;a[A]=q;q=z+1|0;n=A-1|0;if(q>>>0<n>>>0){z=q;A=n}else{break L397}}}}while(0);n=bW[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L403:do{if(x>>>0<f>>>0){q=u+1|0;p=k;y=o+4|0;B=o+8|0;C=0;D=0;E=x;while(1){F=(a[m]&1)<<24>>24==0;do{if((a[(F?q:c[B>>2]|0)+D|0]|0)==0){G=D;H=C}else{if((C|0)!=(a[(F?q:c[B>>2]|0)+D|0]|0|0)){G=D;H=C;break}I=c[j>>2]|0;c[j>>2]=I+4|0;c[I>>2]=n;I=d[m]|0;G=(D>>>0<(((I&1|0)==0?I>>>1:c[y>>2]|0)-1|0)>>>0&1)+D|0;H=0}}while(0);F=b3[c[(c[p>>2]|0)+44>>2]&1023](r,a[E]|0)|0;I=c[j>>2]|0;c[j>>2]=I+4|0;c[I>>2]=F;F=E+1|0;if(F>>>0<f>>>0){C=H+1|0;D=G;E=F}else{break L403}}}}while(0);n=g+(x-b<<2)|0;E=c[j>>2]|0;if((n|0)==(E|0)){break}D=E-4|0;if(n>>>0<D>>>0){J=n;K=D}else{break}while(1){D=c[J>>2]|0;c[J>>2]=c[K>>2]|0;c[K>>2]=D;D=J+4|0;n=K-4|0;if(D>>>0<n>>>0){J=D;K=n}else{break L382}}}}while(0);if((e|0)==(f|0)){L=c[j>>2]|0}else{L=g+(e-b<<2)|0}c[h>>2]=L;if((a[m]&1)<<24>>24==0){i=l;return}jJ(c[o+8>>2]|0);i=l;return}function fx(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;k=i;i=i+16|0;l=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[l>>2]|0;l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g>>2;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;g=h>>2;do{if((h|0)>0){if((bQ[c[(c[d>>2]|0)+48>>2]&1023](d,e,g)|0)==(g|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){if(q>>>0>1073741822){di(0)}if(q>>>0<2){a[l]=q<<1&255;r=1;s=l+4|0}else{g=q+4&-4;e=jG(g<<2)|0;c[l+8>>2]=e;c[l>>2]=g|1;c[l+4>>2]=q;r=q;s=e}e=r;g=s;while(1){h=e-1|0;c[g>>2]=j;if((h|0)==0){break}else{e=h;g=g+4|0}}c[s+(q<<2)>>2]=0;g=c[m>>2]|0;e=l;if((a[e]&1)<<24>>24==0){t=l+4|0}else{t=c[l+8>>2]|0}if((bQ[c[(c[g>>2]|0)+48>>2]&1023](g,t,q)|0)==(q|0)){if((a[e]&1)<<24>>24==0){u=g;break}jJ(c[l+8>>2]|0);u=g;break}c[m>>2]=0;c[b>>2]=0;if((a[e]&1)<<24>>24==0){i=k;return}jJ(c[l+8>>2]|0);i=k;return}else{u=d}}while(0);d=n-o|0;o=d>>2;do{if((d|0)>0){if((bQ[c[(c[u>>2]|0)+48>>2]&1023](u,f,o)|0)==(o|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=u;i=k;return}function fy(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0;d=i;i=i+240|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+208|0;o=d+216|0;p=d+224|0;q=d+232|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=l|0;if(a[13632]|0){w=c[994]|0}else{t=bD(1,1320,0)|0;c[994]=t;a[13632]=1;w=t}t=fe(u,w,r,(C=i,i=i+16|0,c[C>>2]=h,c[C+8>>2]=j,C)|0)|0;j=l+t|0;h=c[s>>2]&176;do{if((h|0)==32){x=j}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){x=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){y=421;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){y=421;break}x=l+2|0;break}else{y=421}}while(0);if((y|0)==421){x=u}y=m|0;m=p|0;l=c[f+28>>2]|0;c[m>>2]=l;t=l+4|0;J=c[t>>2]|0,c[t>>2]=J+1,J;fw(u,x,j,y,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)!=0){z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;fx(b,q,y,D,E,f,g);i=d;return}bT[c[(c[p>>2]|0)+8>>2]&1023](p|0);z=e|0;A=c[z>>2]|0;B=q|0;c[B>>2]=A;D=c[n>>2]|0;E=c[o>>2]|0;fx(b,q,y,D,E,f,g);i=d;return}function fz(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0;d=i;i=i+320|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+280|0;p=d+288|0;q=d+296|0;r=d+304|0;s=d+312|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){if((k&1|0)==0){a[x]=97;y=0;break}else{a[x]=65;y=0;break}}else{a[x]=46;v=x+2|0;a[x+1|0]=42;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;if(a[13632]|0){z=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;z=l}if(y){A=fl(k,30,z,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{A=fl(k,30,z,t,(C=i,i=i+8|0,h[C>>3]=j,C)|0)|0}do{if((A|0)>29){z=a[13632]|0;if(y){if(z){B=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;B=l}D=fm(m,B,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{if(z){E=c[994]|0}else{z=bD(1,1320,0)|0;c[994]=z;a[13632]=1;E=z}D=fm(m,E,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}z=c[m>>2]|0;if((z|0)!=0){F=D;G=z;H=z;break}z=bf(4)|0;c[z>>2]=4968;aO(z|0,10648,66)}else{F=A;G=0;H=c[m>>2]|0}}while(0);A=H+F|0;D=c[u>>2]&176;do{if((D|0)==32){I=A}else if((D|0)==16){u=a[H]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){I=H+1|0;break}if(!((F|0)>1&u<<24>>24==48)){K=478;break}u=a[H+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){K=478;break}I=H+2|0;break}else{K=478}}while(0);if((K|0)==478){I=H}do{if((H|0)==(k|0)){L=n|0;M=0;N=k}else{K=jA(F<<3)|0;D=K;if((K|0)!=0){L=D;M=D;N=c[m>>2]|0;break}D=bf(4)|0;c[D>>2]=4968;aO(D|0,10648,66)}}while(0);m=q|0;F=c[f+28>>2]|0;c[m>>2]=F;k=F+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fA(N,I,A,L,o,p,q);q=c[m>>2]|0;m=q+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)==0){bT[c[(c[q>>2]|0)+8>>2]&1023](q|0)}q=e|0;c[s>>2]=c[q>>2]|0;fx(r,s,L,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((M|0)!=0){jB(M)}if((G|0)==0){i=d;return}jB(G);i=d;return}function fA(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[3256]|0)!=-1){c[n>>2]=13024;c[n+4>>2]=24;c[n+8>>2]=0;dh(13024,n,250)}n=(c[3257]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bf(4)|0;s=r;c[s>>2]=5e3;aO(r|0,10664,510)}r=k;s=c[p>>2]|0;if((c[3160]|0)!=-1){c[m>>2]=12640;c[m+4>>2]=24;c[m+8>>2]=0;dh(12640,m,250)}m=(c[3161]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bf(4)|0;u=t;c[u>>2]=5e3;aO(t|0,10664,510)}t=s;bU[c[(c[s>>2]|0)+20>>2]&1023](o,t);c[j>>2]=g;u=a[b]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=b3[c[(c[k>>2]|0)+44>>2]&1023](r,u)|0;u=c[j>>2]|0;c[j>>2]=u+4|0;c[u>>2]=m;v=b+1|0}else{v=b}m=f;L608:do{if((m-v|0)>1){if((a[v]|0)!=48){w=v;x=538;break}u=v+1|0;p=a[u]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=v;x=538;break}p=k;n=b3[c[(c[p>>2]|0)+44>>2]&1023](r,48)|0;q=c[j>>2]|0;c[j>>2]=q+4|0;c[q>>2]=n;n=v+2|0;q=b3[c[(c[p>>2]|0)+44>>2]&1023](r,a[u]|0)|0;u=c[j>>2]|0;c[j>>2]=u+4|0;c[u>>2]=q;q=n;while(1){if(q>>>0>=f>>>0){y=q;z=n;break L608}u=a[q]|0;if(a[13632]|0){A=c[994]|0}else{p=bD(1,1320,0)|0;c[994]=p;a[13632]=1;A=p}if((a3(u<<24>>24|0,A|0)|0)==0){y=q;z=n;break L608}else{q=q+1|0}}}else{w=v;x=538}}while(0);L623:do{if((x|0)==538){while(1){x=0;if(w>>>0>=f>>>0){y=w;z=v;break L623}A=a[w]|0;if(a[13632]|0){B=c[994]|0}else{q=bD(1,1320,0)|0;c[994]=q;a[13632]=1;B=q}if((aV(A<<24>>24|0,B|0)|0)==0){y=w;z=v;break L623}else{w=w+1|0;x=538}}}}while(0);x=o;w=o;v=d[w]|0;if((v&1|0)==0){C=v>>>1}else{C=c[o+4>>2]|0}L638:do{if((C|0)==0){v=c[j>>2]|0;B=c[(c[k>>2]|0)+48>>2]|0;b0[B&1023](r,z,y,v);c[j>>2]=(c[j>>2]|0)+(y-z<<2)|0}else{L642:do{if((z|0)!=(y|0)){v=y-1|0;if(z>>>0<v>>>0){D=z;E=v}else{break}while(1){v=a[D]|0;a[D]=a[E]|0;a[E]=v;v=D+1|0;B=E-1|0;if(v>>>0<B>>>0){D=v;E=B}else{break L642}}}}while(0);B=bW[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L648:do{if(z>>>0<y>>>0){v=x+1|0;A=o+4|0;q=o+8|0;n=k;u=0;p=0;F=z;while(1){G=(a[w]&1)<<24>>24==0;do{if((a[(G?v:c[q>>2]|0)+p|0]|0)>0){if((u|0)!=(a[(G?v:c[q>>2]|0)+p|0]|0|0)){H=p;I=u;break}J=c[j>>2]|0;c[j>>2]=J+4|0;c[J>>2]=B;J=d[w]|0;H=(p>>>0<(((J&1|0)==0?J>>>1:c[A>>2]|0)-1|0)>>>0&1)+p|0;I=0}else{H=p;I=u}}while(0);G=b3[c[(c[n>>2]|0)+44>>2]&1023](r,a[F]|0)|0;J=c[j>>2]|0;c[j>>2]=J+4|0;c[J>>2]=G;G=F+1|0;if(G>>>0<y>>>0){u=I+1|0;p=H;F=G}else{break L648}}}}while(0);B=g+(z-b<<2)|0;F=c[j>>2]|0;if((B|0)==(F|0)){break}p=F-4|0;if(B>>>0<p>>>0){K=B;L=p}else{break}while(1){p=c[K>>2]|0;c[K>>2]=c[L>>2]|0;c[L>>2]=p;p=K+4|0;B=L-4|0;if(p>>>0<B>>>0){K=p;L=B}else{break L638}}}}while(0);L662:do{if(y>>>0<f>>>0){L=k;K=y;while(1){z=a[K]|0;if(z<<24>>24==46){break}H=b3[c[(c[L>>2]|0)+44>>2]&1023](r,z)|0;z=c[j>>2]|0;c[j>>2]=z+4|0;c[z>>2]=H;H=K+1|0;if(H>>>0<f>>>0){K=H}else{M=H;break L662}}L=bW[c[(c[s>>2]|0)+12>>2]&1023](t)|0;H=c[j>>2]|0;c[j>>2]=H+4|0;c[H>>2]=L;M=K+1|0}else{M=y}}while(0);b0[c[(c[k>>2]|0)+48>>2]&1023](r,M,f,c[j>>2]|0);r=(c[j>>2]|0)+(m-M<<2)|0;c[j>>2]=r;if((e|0)==(f|0)){N=r}else{N=g+(e-b<<2)|0}c[h>>2]=N;if((a[w]&1)<<24>>24==0){i=l;return}jJ(c[o+8>>2]|0);i=l;return}function fB(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0;d=i;i=i+320|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+280|0;p=d+288|0;q=d+296|0;r=d+304|0;s=d+312|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){a[x]=76;v=x+1|0;if((k&1|0)==0){a[v]=97;y=0;break}else{a[v]=65;y=0;break}}else{a[x]=46;a[x+1|0]=42;a[x+2|0]=76;v=x+3|0;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;if(a[13632]|0){z=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;z=l}if(y){A=fl(k,30,z,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{A=fl(k,30,z,t,(C=i,i=i+8|0,h[C>>3]=j,C)|0)|0}do{if((A|0)>29){z=a[13632]|0;if(y){if(z){B=c[994]|0}else{l=bD(1,1320,0)|0;c[994]=l;a[13632]=1;B=l}D=fm(m,B,t,(C=i,i=i+16|0,c[C>>2]=c[f+8>>2]|0,h[C+8>>3]=j,C)|0)|0}else{if(z){E=c[994]|0}else{z=bD(1,1320,0)|0;c[994]=z;a[13632]=1;E=z}D=fm(m,E,t,(C=i,i=i+8|0,h[C>>3]=j,C)|0)|0}z=c[m>>2]|0;if((z|0)!=0){F=D;G=z;H=z;break}z=bf(4)|0;c[z>>2]=4968;aO(z|0,10648,66)}else{F=A;G=0;H=c[m>>2]|0}}while(0);A=H+F|0;D=c[u>>2]&176;do{if((D|0)==32){I=A}else if((D|0)==16){u=a[H]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){I=H+1|0;break}if(!((F|0)>1&u<<24>>24==48)){K=631;break}u=a[H+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){K=631;break}I=H+2|0;break}else{K=631}}while(0);if((K|0)==631){I=H}do{if((H|0)==(k|0)){L=n|0;M=0;N=k}else{K=jA(F<<3)|0;D=K;if((K|0)!=0){L=D;M=D;N=c[m>>2]|0;break}D=bf(4)|0;c[D>>2]=4968;aO(D|0,10648,66)}}while(0);m=q|0;F=c[f+28>>2]|0;c[m>>2]=F;k=F+4|0;J=c[k>>2]|0,c[k>>2]=J+1,J;fA(N,I,A,L,o,p,q);q=c[m>>2]|0;m=q+4|0;if(((J=c[m>>2]|0,c[m>>2]=J+ -1,J)|0)==0){bT[c[(c[q>>2]|0)+8>>2]&1023](q|0)}q=e|0;c[s>>2]=c[q>>2]|0;fx(r,s,L,c[o>>2]|0,c[p>>2]|0,f,g);g=c[r>>2]|0;c[q>>2]=g;c[b>>2]=g;if((M|0)!=0){jB(M)}if((G|0)==0){i=d;return}jB(G);i=d;return}function fC(a){a=a|0;return}function fD(a){a=a|0;return 2}function fE(a){a=a|0;jJ(a);return}function fF(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+8|0;c[k>>2]=c[d>>2]|0;c[l>>2]=c[e>>2]|0;fI(a,b,k,l,f,g,h,4744,4752);i=j;return}function fG(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=k|0;m=k+8|0;n=d+8|0;o=bW[c[(c[n>>2]|0)+20>>2]&1023](n)|0;c[l>>2]=c[e>>2]|0;c[m>>2]=c[f>>2]|0;f=o;e=a[o]|0;if((e&1)<<24>>24==0){p=f+1|0;q=f+1|0}else{f=c[o+8>>2]|0;p=f;q=f}f=e&255;if((f&1|0)==0){r=f>>>1}else{r=c[o+4>>2]|0}fI(b,d,l,m,g,h,j,q,p+r|0);i=k;return}function fH(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;d=i;i=i+208|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=d|0;k=d+24|0;l=d+48|0;m=d+200|0;n=d+16|0;a[n]=a[4760]|0;a[n+1|0]=a[4761|0]|0;a[n+2|0]=a[4762|0]|0;a[n+3|0]=a[4763|0]|0;a[n+4|0]=a[4764|0]|0;a[n+5|0]=a[4765|0]|0;o=k|0;if(a[13632]|0){p=c[994]|0}else{q=bD(1,1320,0)|0;c[994]=q;a[13632]=1;p=q}q=fe(o,p,n,(C=i,i=i+8|0,c[C>>2]=h,C)|0)|0;h=k+q|0;n=c[f+4>>2]&176;do{if((n|0)==32){r=h}else if((n|0)==16){p=a[o]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){r=k+1|0;break}if(!((q|0)>1&p<<24>>24==48)){s=676;break}p=a[k+1|0]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){s=676;break}r=k+2|0;break}else{s=676}}while(0);if((s|0)==676){r=o}s=c[f+28>>2]|0;n=s+4|0;J=c[n>>2]|0,c[n>>2]=J+1,J;if((c[3256]|0)!=-1){c[j>>2]=13024;c[j+4>>2]=24;c[j+8>>2]=0;dh(13024,j,250)}j=(c[3257]|0)-1|0;p=c[s+8>>2]|0;do{if((c[s+12>>2]|0)-p>>2>>>0>j>>>0){t=c[p+(j<<2)>>2]|0;if((t|0)==0){break}if(((J=c[n>>2]|0,c[n>>2]=J+ -1,J)|0)==0){bT[c[(c[s>>2]|0)+8>>2]&1023](s)}u=l|0;b0[c[(c[t>>2]|0)+48>>2]&1023](t,o,h,u);t=l+(q<<2)|0;if((r|0)==(h|0)){v=t;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;fx(b,m,u,v,t,f,g);i=d;return}v=l+(r-k<<2)|0;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;fx(b,m,u,v,t,f,g);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function fI(d,e,f,g,h,j,k,l,m){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0;n=i;i=i+40|0;o=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[o>>2]|0;o=g;g=i;i=i+4|0;i=i+7>>3<<3;c[g>>2]=c[o>>2]|0;o=n|0;p=n+16|0;q=n+24|0;r=n+32|0;s=c[h+28>>2]|0;t=s+4|0;J=c[t>>2]|0,c[t>>2]=J+1,J;if((c[3258]|0)!=-1){c[o>>2]=13032;c[o+4>>2]=24;c[o+8>>2]=0;dh(13032,o,250)}o=(c[3259]|0)-1|0;u=c[s+8>>2]|0;do{if((c[s+12>>2]|0)-u>>2>>>0>o>>>0){v=c[u+(o<<2)>>2]|0;if((v|0)==0){break}w=v;if(((J=c[t>>2]|0,c[t>>2]=J+ -1,J)|0)==0){bT[c[(c[s>>2]|0)+8>>2]&1023](s)}c[j>>2]=0;x=f|0;L816:do{if((l|0)==(m|0)){y=763}else{z=g|0;A=v;B=v+8|0;C=v;D=e;E=q|0;F=r|0;G=p|0;H=l;I=0;L818:while(1){K=I;while(1){if((K|0)!=0){y=763;break L816}L=c[x>>2]|0;do{if((L|0)==0){M=0}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){M=L;break}if((bW[c[(c[L>>2]|0)+36>>2]&1023](L)|0)!=-1){M=L;break}c[x>>2]=0;M=0}}while(0);L=(M|0)==0;N=c[z>>2]|0;L828:do{if((N|0)==0){y=714}else{do{if((c[N+12>>2]|0)==(c[N+16>>2]|0)){if((bW[c[(c[N>>2]|0)+36>>2]&1023](N)|0)!=-1){break}c[z>>2]=0;y=714;break L828}}while(0);if(L){O=N;break}else{y=715;break L818}}}while(0);if((y|0)==714){y=0;if(L){y=715;break L818}else{O=0}}if(bQ[c[(c[A>>2]|0)+36>>2]&1023](w,a[H]|0,0)<<24>>24==37){y=720;break}N=a[H]|0;if(N<<24>>24>-1){P=c[B>>2]|0;if((b[P+(N<<24>>24<<1)>>1]&8192)<<16>>16!=0){Q=H;y=731;break}}R=M+12|0;N=c[R>>2]|0;S=M+16|0;if((N|0)==(c[S>>2]|0)){T=bW[c[(c[M>>2]|0)+36>>2]&1023](M)&255}else{T=a[N]|0}N=b3[c[(c[C>>2]|0)+12>>2]&1023](w,T)|0;if(N<<24>>24==b3[c[(c[C>>2]|0)+12>>2]&1023](w,a[H]|0)<<24>>24){y=758;break}c[j>>2]=4;K=4}L846:do{if((y|0)==720){y=0;K=H+1|0;if((K|0)==(m|0)){y=721;break L818}N=bQ[c[(c[A>>2]|0)+36>>2]&1023](w,a[K]|0,0)|0;if((N<<24>>24|0)==69|(N<<24>>24|0)==48){U=H+2|0;if((U|0)==(m|0)){y=724;break L818}V=N;W=bQ[c[(c[A>>2]|0)+36>>2]&1023](w,a[U]|0,0)|0;X=U}else{V=0;W=N;X=K}K=c[(c[D>>2]|0)+36>>2]|0;c[E>>2]=M;c[F>>2]=O;bV[K&1023](p,e,q,r,h,j,k,W,V);c[x>>2]=c[G>>2]|0;Y=X+1|0}else if((y|0)==731){while(1){y=0;K=Q+1|0;if((K|0)==(m|0)){Z=m;break}N=a[K]|0;if(N<<24>>24<=-1){Z=K;break}if((b[P+(N<<24>>24<<1)>>1]&8192)<<16>>16==0){Z=K;break}else{Q=K;y=731}}L=M;K=O;while(1){do{if((L|0)==0){_=0}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){_=L;break}if((bW[c[(c[L>>2]|0)+36>>2]&1023](L)|0)!=-1){_=L;break}c[x>>2]=0;_=0}}while(0);N=(_|0)==0;do{if((K|0)==0){y=744}else{if((c[K+12>>2]|0)!=(c[K+16>>2]|0)){if(N){$=K;break}else{Y=Z;break L846}}if((bW[c[(c[K>>2]|0)+36>>2]&1023](K)|0)==-1){c[z>>2]=0;y=744;break}else{if(N^(K|0)==0){$=K;break}else{Y=Z;break L846}}}}while(0);if((y|0)==744){y=0;if(N){Y=Z;break L846}else{$=0}}U=_+12|0;aa=c[U>>2]|0;ab=_+16|0;if((aa|0)==(c[ab>>2]|0)){ac=bW[c[(c[_>>2]|0)+36>>2]&1023](_)&255}else{ac=a[aa]|0}if(ac<<24>>24<=-1){Y=Z;break L846}if((b[(c[B>>2]|0)+(ac<<24>>24<<1)>>1]&8192)<<16>>16==0){Y=Z;break L846}aa=c[U>>2]|0;if((aa|0)==(c[ab>>2]|0)){ab=c[(c[_>>2]|0)+40>>2]|0;bW[ab&1023](_);L=_;K=$;continue}else{c[U>>2]=aa+1|0;L=_;K=$;continue}}}else if((y|0)==758){y=0;K=c[R>>2]|0;if((K|0)==(c[S>>2]|0)){L=c[(c[M>>2]|0)+40>>2]|0;bW[L&1023](M)}else{c[R>>2]=K+1|0}Y=H+1|0}}while(0);if((Y|0)==(m|0)){y=763;break L816}H=Y;I=c[j>>2]|0}if((y|0)==715){c[j>>2]=4;ad=M;break}else if((y|0)==721){c[j>>2]=4;ad=M;break}else if((y|0)==724){c[j>>2]=4;ad=M;break}}}while(0);if((y|0)==763){ad=c[x>>2]|0}w=f|0;do{if((ad|0)!=0){if((c[ad+12>>2]|0)!=(c[ad+16>>2]|0)){break}if((bW[c[(c[ad>>2]|0)+36>>2]&1023](ad)|0)!=-1){break}c[w>>2]=0}}while(0);x=c[w>>2]|0;v=(x|0)==0;I=g|0;H=c[I>>2]|0;L904:do{if((H|0)==0){y=773}else{do{if((c[H+12>>2]|0)==(c[H+16>>2]|0)){if((bW[c[(c[H>>2]|0)+36>>2]&1023](H)|0)!=-1){break}c[I>>2]=0;y=773;break L904}}while(0);if(!v){break}ae=d|0;c[ae>>2]=x;i=n;return}}while(0);do{if((y|0)==773){if(v){break}ae=d|0;c[ae>>2]=x;i=n;return}}while(0);c[j>>2]=c[j>>2]|2;ae=d|0;c[ae>>2]=x;i=n;return}}while(0);n=bf(4)|0;c[n>>2]=5e3;aO(n|0,10664,510)}function fJ(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+24|0;k=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+8|0;m=c[f+28>>2]|0;f=m+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3258]|0)!=-1){c[l>>2]=13032;c[l+4>>2]=24;c[l+8>>2]=0;dh(13032,l,250)}l=(c[3259]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=bW[c[c[q>>2]>>2]&1023](q)|0;c[k>>2]=p;p=(ey(d,k,r,r+168|0,o,g,0)|0)-r|0;if((p|0)>=168){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+24>>2]=((p|0)/12&-1|0)%7;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bf(4)|0;c[j>>2]=5e3;aO(j|0,10664,510)}function fK(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+24|0;k=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+8|0;m=c[f+28>>2]|0;f=m+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3258]|0)!=-1){c[l>>2]=13032;c[l+4>>2]=24;c[l+8>>2]=0;dh(13032,l,250)}l=(c[3259]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=bW[c[(c[q>>2]|0)+4>>2]&1023](q)|0;c[k>>2]=p;p=(ey(d,k,r,r+288|0,o,g,0)|0)-r|0;if((p|0)>=288){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+16>>2]=((p|0)/12&-1|0)%12;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bf(4)|0;c[j>>2]=5e3;aO(j|0,10664,510)}function fL(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;i=i+24|0;j=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[j>>2]|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=b|0;k=b+8|0;l=c[f+28>>2]|0;f=l+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3258]|0)!=-1){c[k>>2]=13032;c[k+4>>2]=24;c[k+8>>2]=0;dh(13032,k,250)}k=(c[3259]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[l>>2]|0)+8>>2]&1023](l)}c[j>>2]=c[e>>2]|0;o=fQ(d,j,g,n,4)|0;if((c[g>>2]&4|0)!=0){p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}if((o|0)<69){s=o+2e3|0}else{s=(o-69|0)>>>0<31?o+1900|0:o}c[h+20>>2]=s-1900|0;p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}}while(0);b=bf(4)|0;c[b>>2]=5e3;aO(b|0,10664,510)}function fM(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0;l=i;i=i+320|0;m=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[m>>2]|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=l|0;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;z=l+112|0;A=l+120|0;B=l+128|0;C=l+136|0;D=l+144|0;E=l+152|0;F=l+160|0;G=l+168|0;H=l+176|0;I=l+184|0;K=l+192|0;L=l+200|0;M=l+208|0;N=l+216|0;O=l+224|0;P=l+232|0;Q=l+240|0;R=l+248|0;S=l+256|0;T=l+264|0;U=l+272|0;V=l+280|0;W=l+288|0;X=l+296|0;Y=l+304|0;Z=l+312|0;c[h>>2]=0;_=c[g+28>>2]|0;$=_+4|0;J=c[$>>2]|0,c[$>>2]=J+1,J;if((c[3258]|0)!=-1){c[y>>2]=13032;c[y+4>>2]=24;c[y+8>>2]=0;dh(13032,y,250)}y=(c[3259]|0)-1|0;aa=c[_+8>>2]|0;do{if((c[_+12>>2]|0)-aa>>2>>>0>y>>>0){ab=c[aa+(y<<2)>>2]|0;if((ab|0)==0){break}ac=ab;if(((J=c[$>>2]|0,c[$>>2]=J+ -1,J)|0)==0){bT[c[(c[_>>2]|0)+8>>2]&1023](_)}ab=k<<24>>24;L980:do{if((ab|0)==121){c[n>>2]=c[f>>2]|0;ad=fQ(e,n,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}if((ad|0)<69){ae=ad+2e3|0}else{ae=(ad-69|0)>>>0<31?ad+1900|0:ad}c[j+20>>2]=ae-1900|0}else if((ab|0)==97|(ab|0)==65){ad=c[f>>2]|0;af=d+8|0;ag=bW[c[c[af>>2]>>2]&1023](af)|0;c[x>>2]=ad;ad=(ey(e,x,ag,ag+168|0,ac,h,0)|0)-ag|0;if((ad|0)>=168){break}c[j+24>>2]=((ad|0)/12&-1|0)%7}else if((ab|0)==68){ad=e|0;c[D>>2]=c[ad>>2]|0;c[E>>2]=c[f>>2]|0;fI(C,d,D,E,g,h,j,4736,4744);c[ad>>2]=c[C>>2]|0}else if((ab|0)==70){ad=e|0;c[G>>2]=c[ad>>2]|0;c[H>>2]=c[f>>2]|0;fI(F,d,G,H,g,h,j,4728,4736);c[ad>>2]=c[F>>2]|0}else if((ab|0)==83){c[p>>2]=c[f>>2]|0;ad=fQ(e,p,h,ac,2)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ad|0)<61){c[j>>2]=ad;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==84){ag=e|0;c[S>>2]=c[ag>>2]|0;c[T>>2]=c[f>>2]|0;fI(R,d,S,T,g,h,j,4696,4704);c[ag>>2]=c[R>>2]|0}else if((ab|0)==119){c[o>>2]=c[f>>2]|0;ag=fQ(e,o,h,ac,1)|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ag|0)<7){c[j+24>>2]=ag;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==72){c[u>>2]=c[f>>2]|0;ad=fQ(e,u,h,ac,2)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ad|0)<24){c[j+8>>2]=ad;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==99){ag=d+8|0;ad=bW[c[(c[ag>>2]|0)+12>>2]&1023](ag)|0;ag=e|0;c[A>>2]=c[ag>>2]|0;c[B>>2]=c[f>>2]|0;af=ad;ah=a[ad]|0;if((ah&1)<<24>>24==0){ai=af+1|0;aj=af+1|0}else{af=c[ad+8>>2]|0;ai=af;aj=af}af=ah&255;if((af&1|0)==0){ak=af>>>1}else{ak=c[ad+4>>2]|0}fI(z,d,A,B,g,h,j,aj,ai+ak|0);c[ag>>2]=c[z>>2]|0}else if((ab|0)==120){ag=c[(c[d>>2]|0)+20>>2]|0;c[U>>2]=c[e>>2]|0;c[V>>2]=c[f>>2]|0;bY[ag&1023](b,d,U,V,g,h,j);i=l;return}else if((ab|0)==88){ag=d+8|0;ad=bW[c[(c[ag>>2]|0)+24>>2]&1023](ag)|0;ag=e|0;c[X>>2]=c[ag>>2]|0;c[Y>>2]=c[f>>2]|0;af=ad;ah=a[ad]|0;if((ah&1)<<24>>24==0){al=af+1|0;am=af+1|0}else{af=c[ad+8>>2]|0;al=af;am=af}af=ah&255;if((af&1|0)==0){an=af>>>1}else{an=c[ad+4>>2]|0}fI(W,d,X,Y,g,h,j,am,al+an|0);c[ag>>2]=c[W>>2]|0}else if((ab|0)==109){c[r>>2]=c[f>>2]|0;ag=(fQ(e,r,h,ac,2)|0)-1|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ag|0)<12){c[j+16>>2]=ag;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==77){c[q>>2]=c[f>>2]|0;ad=fQ(e,q,h,ac,2)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ad|0)<60){c[j+4>>2]=ad;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==100|(ab|0)==101){ag=j+12|0;c[v>>2]=c[f>>2]|0;ad=fQ(e,v,h,ac,2)|0;af=c[h>>2]|0;do{if((af&4|0)==0){if((ad-1|0)>>>0>=31){break}c[ag>>2]=ad;break L980}}while(0);c[h>>2]=af|4}else if((ab|0)==110|(ab|0)==116){c[I>>2]=c[f>>2]|0;fN(0,e,I,h,ac)}else if((ab|0)==112){c[K>>2]=c[f>>2]|0;fO(d,j+8|0,e,K,h,ac)}else if((ab|0)==114){ad=e|0;c[M>>2]=c[ad>>2]|0;c[N>>2]=c[f>>2]|0;fI(L,d,M,N,g,h,j,4712,4723);c[ad>>2]=c[L>>2]|0}else if((ab|0)==82){ad=e|0;c[P>>2]=c[ad>>2]|0;c[Q>>2]=c[f>>2]|0;fI(O,d,P,Q,g,h,j,4704,4709);c[ad>>2]=c[O>>2]|0}else if((ab|0)==106){c[s>>2]=c[f>>2]|0;ad=fQ(e,s,h,ac,3)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ad|0)<366){c[j+28>>2]=ad;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==89){c[m>>2]=c[f>>2]|0;ag=fQ(e,m,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}c[j+20>>2]=ag-1900|0}else if((ab|0)==37){c[Z>>2]=c[f>>2]|0;fP(0,e,Z,h,ac)}else if((ab|0)==73){ag=j+8|0;c[t>>2]=c[f>>2]|0;ad=fQ(e,t,h,ac,2)|0;ah=c[h>>2]|0;do{if((ah&4|0)==0){if((ad-1|0)>>>0>=12){break}c[ag>>2]=ad;break L980}}while(0);c[h>>2]=ah|4}else if((ab|0)==98|(ab|0)==66|(ab|0)==104){ad=c[f>>2]|0;ag=d+8|0;af=bW[c[(c[ag>>2]|0)+4>>2]&1023](ag)|0;c[w>>2]=ad;ad=(ey(e,w,af,af+288|0,ac,h,0)|0)-af|0;if((ad|0)>=288){break}c[j+16>>2]=((ad|0)/12&-1|0)%12}else{c[h>>2]=c[h>>2]|4}}while(0);c[b>>2]=c[e>>2]|0;i=l;return}}while(0);l=bf(4)|0;c[l>>2]=5e3;aO(l|0,10664,510)}function fN(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;d=i;j=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[j>>2]|0;j=e|0;e=f|0;f=h+8|0;L1061:while(1){h=c[j>>2]|0;do{if((h|0)==0){k=0}else{if((c[h+12>>2]|0)!=(c[h+16>>2]|0)){k=h;break}if((bW[c[(c[h>>2]|0)+36>>2]&1023](h)|0)==-1){c[j>>2]=0;k=0;break}else{k=c[j>>2]|0;break}}}while(0);h=(k|0)==0;l=c[e>>2]|0;L1070:do{if((l|0)==0){m=918}else{do{if((c[l+12>>2]|0)==(c[l+16>>2]|0)){if((bW[c[(c[l>>2]|0)+36>>2]&1023](l)|0)!=-1){break}c[e>>2]=0;m=918;break L1070}}while(0);if(h){n=l;o=0;break}else{p=l;q=0;break L1061}}}while(0);if((m|0)==918){m=0;if(h){p=0;q=1;break}else{n=0;o=1}}l=c[j>>2]|0;r=c[l+12>>2]|0;if((r|0)==(c[l+16>>2]|0)){s=bW[c[(c[l>>2]|0)+36>>2]&1023](l)&255}else{s=a[r]|0}if(s<<24>>24<=-1){p=n;q=o;break}if((b[(c[f>>2]|0)+(s<<24>>24<<1)>>1]&8192)<<16>>16==0){p=n;q=o;break}r=c[j>>2]|0;l=r+12|0;t=c[l>>2]|0;if((t|0)==(c[r+16>>2]|0)){u=c[(c[r>>2]|0)+40>>2]|0;bW[u&1023](r);continue}else{c[l>>2]=t+1|0;continue}}o=c[j>>2]|0;do{if((o|0)==0){v=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){v=o;break}if((bW[c[(c[o>>2]|0)+36>>2]&1023](o)|0)==-1){c[j>>2]=0;v=0;break}else{v=c[j>>2]|0;break}}}while(0);j=(v|0)==0;do{if(q){m=937}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){if(!(j^(p|0)==0)){break}i=d;return}if((bW[c[(c[p>>2]|0)+36>>2]&1023](p)|0)==-1){c[e>>2]=0;m=937;break}if(!j){break}i=d;return}}while(0);do{if((m|0)==937){if(j){break}i=d;return}}while(0);c[g>>2]=c[g>>2]|2;i=d;return}function fO(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+8|0;k=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[k>>2]|0;k=j|0;l=a+8|0;a=bW[c[(c[l>>2]|0)+8>>2]&1023](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2]|0;f=ey(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12|0;i=j;return}function fP(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;b=i;h=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[h>>2]|0;h=d|0;d=c[h>>2]|0;do{if((d|0)==0){j=0}else{if((c[d+12>>2]|0)!=(c[d+16>>2]|0)){j=d;break}if((bW[c[(c[d>>2]|0)+36>>2]&1023](d)|0)==-1){c[h>>2]=0;j=0;break}else{j=c[h>>2]|0;break}}}while(0);d=(j|0)==0;j=e|0;e=c[j>>2]|0;L1144:do{if((e|0)==0){k=975}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((bW[c[(c[e>>2]|0)+36>>2]&1023](e)|0)!=-1){break}c[j>>2]=0;k=975;break L1144}}while(0);if(d){l=e;m=0;break}else{k=976;break}}}while(0);do{if((k|0)==975){if(d){k=976;break}else{l=0;m=1;break}}}while(0);if((k|0)==976){c[f>>2]=c[f>>2]|6;i=b;return}d=c[h>>2]|0;e=c[d+12>>2]|0;if((e|0)==(c[d+16>>2]|0)){n=bW[c[(c[d>>2]|0)+36>>2]&1023](d)&255}else{n=a[e]|0}if(bQ[c[(c[g>>2]|0)+36>>2]&1023](g,n,0)<<24>>24!=37){c[f>>2]=c[f>>2]|4;i=b;return}n=c[h>>2]|0;g=n+12|0;e=c[g>>2]|0;if((e|0)==(c[n+16>>2]|0)){d=c[(c[n>>2]|0)+40>>2]|0;bW[d&1023](n)}else{c[g>>2]=e+1|0}e=c[h>>2]|0;do{if((e|0)==0){o=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){o=e;break}if((bW[c[(c[e>>2]|0)+36>>2]&1023](e)|0)==-1){c[h>>2]=0;o=0;break}else{o=c[h>>2]|0;break}}}while(0);h=(o|0)==0;do{if(m){k=995}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){if(!(h^(l|0)==0)){break}i=b;return}if((bW[c[(c[l>>2]|0)+36>>2]&1023](l)|0)==-1){c[j>>2]=0;k=995;break}if(!h){break}i=b;return}}while(0);do{if((k|0)==995){if(h){break}i=b;return}}while(0);c[f>>2]=c[f>>2]|2;i=b;return}function fQ(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;j=i;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=0}else{if((c[d+12>>2]|0)!=(c[d+16>>2]|0)){l=d;break}if((bW[c[(c[d>>2]|0)+36>>2]&1023](d)|0)==-1){c[k>>2]=0;l=0;break}else{l=c[k>>2]|0;break}}}while(0);d=(l|0)==0;l=e|0;e=c[l>>2]|0;L1198:do{if((e|0)==0){m=1015}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((bW[c[(c[e>>2]|0)+36>>2]&1023](e)|0)!=-1){break}c[l>>2]=0;m=1015;break L1198}}while(0);if(d){n=e;break}else{m=1016;break}}}while(0);do{if((m|0)==1015){if(d){m=1016;break}else{n=0;break}}}while(0);if((m|0)==1016){c[f>>2]=c[f>>2]|6;o=0;i=j;return o|0}d=c[k>>2]|0;e=c[d+12>>2]|0;if((e|0)==(c[d+16>>2]|0)){p=bW[c[(c[d>>2]|0)+36>>2]&1023](d)&255}else{p=a[e]|0}do{if(p<<24>>24>-1){e=g+8|0;if((b[(c[e>>2]|0)+(p<<24>>24<<1)>>1]&2048)<<16>>16==0){break}d=g;q=bQ[c[(c[d>>2]|0)+36>>2]&1023](g,p,0)<<24>>24;r=c[k>>2]|0;s=r+12|0;t=c[s>>2]|0;do{if((t|0)==(c[r+16>>2]|0)){u=c[(c[r>>2]|0)+40>>2]|0;bW[u&1023](r);v=q;w=h;x=n;break}else{c[s>>2]=t+1|0;v=q;w=h;x=n;break}}while(0);while(1){y=v-48|0;q=w-1|0;t=c[k>>2]|0;do{if((t|0)==0){z=0}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){z=t;break}if((bW[c[(c[t>>2]|0)+36>>2]&1023](t)|0)==-1){c[k>>2]=0;z=0;break}else{z=c[k>>2]|0;break}}}while(0);t=(z|0)==0;if((x|0)==0){A=z;B=0}else{do{if((c[x+12>>2]|0)==(c[x+16>>2]|0)){if((bW[c[(c[x>>2]|0)+36>>2]&1023](x)|0)!=-1){C=x;break}c[l>>2]=0;C=0}else{C=x}}while(0);A=c[k>>2]|0;B=C}D=(B|0)==0;if(!((t^D)&(q|0)>0)){m=1045;break}s=c[A+12>>2]|0;if((s|0)==(c[A+16>>2]|0)){E=bW[c[(c[A>>2]|0)+36>>2]&1023](A)&255}else{E=a[s]|0}if(E<<24>>24<=-1){o=y;m=1063;break}if((b[(c[e>>2]|0)+(E<<24>>24<<1)>>1]&2048)<<16>>16==0){o=y;m=1064;break}s=(bQ[c[(c[d>>2]|0)+36>>2]&1023](g,E,0)<<24>>24)+(y*10&-1)|0;r=c[k>>2]|0;u=r+12|0;F=c[u>>2]|0;if((F|0)==(c[r+16>>2]|0)){G=c[(c[r>>2]|0)+40>>2]|0;bW[G&1023](r);v=s;w=q;x=B;continue}else{c[u>>2]=F+1|0;v=s;w=q;x=B;continue}}if((m|0)==1045){do{if((A|0)==0){H=0}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){H=A;break}if((bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0)==-1){c[k>>2]=0;H=0;break}else{H=c[k>>2]|0;break}}}while(0);d=(H|0)==0;L1255:do{if(D){m=1055}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((bW[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[l>>2]=0;m=1055;break L1255}}while(0);if(d){o=y}else{break}i=j;return o|0}}while(0);do{if((m|0)==1055){if(d){break}else{o=y}i=j;return o|0}}while(0);c[f>>2]=c[f>>2]|2;o=y;i=j;return o|0}else if((m|0)==1064){i=j;return o|0}else if((m|0)==1063){i=j;return o|0}}}while(0);c[f>>2]=c[f>>2]|4;o=0;i=j;return o|0}function fR(a){a=a|0;return}function fS(a){a=a|0;return 2}function fT(a){a=a|0;jJ(a);return}function fU(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+8|0;c[k>>2]=c[d>>2]|0;c[l>>2]=c[e>>2]|0;fW(a,b,k,l,f,g,h,4664,4696);i=j;return}function fV(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=k|0;m=k+8|0;n=d+8|0;o=bW[c[(c[n>>2]|0)+20>>2]&1023](n)|0;c[l>>2]=c[e>>2]|0;c[m>>2]=c[f>>2]|0;f=a[o]|0;if((f&1)<<24>>24==0){p=o+4|0;q=o+4|0}else{e=c[o+8>>2]|0;p=e;q=e}e=f&255;if((e&1|0)==0){r=e>>>1}else{r=c[o+4>>2]|0}fW(b,d,l,m,g,h,j,q,p+(r<<2)|0);i=k;return}function fW(a,b,d,e,f,g,h,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0;l=i;i=i+40|0;m=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[m>>2]|0;m=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[m>>2]|0;m=l|0;n=l+16|0;o=l+24|0;p=l+32|0;q=c[f+28>>2]|0;r=q+4|0;J=c[r>>2]|0,c[r>>2]=J+1,J;if((c[3256]|0)!=-1){c[m>>2]=13024;c[m+4>>2]=24;c[m+8>>2]=0;dh(13024,m,250)}m=(c[3257]|0)-1|0;s=c[q+8>>2]|0;do{if((c[q+12>>2]|0)-s>>2>>>0>m>>>0){t=c[s+(m<<2)>>2]|0;if((t|0)==0){break}u=t;if(((J=c[r>>2]|0,c[r>>2]=J+ -1,J)|0)==0){bT[c[(c[q>>2]|0)+8>>2]&1023](q)}c[g>>2]=0;v=d|0;L1294:do{if((j|0)==(k|0)){w=1150}else{x=e|0;y=t;z=t;A=t;B=b;C=o|0;D=p|0;E=n|0;F=j;G=0;L1296:while(1){H=G;while(1){if((H|0)!=0){w=1150;break L1294}I=c[v>>2]|0;do{if((I|0)==0){K=0}else{L=c[I+12>>2]|0;if((L|0)==(c[I+16>>2]|0)){M=bW[c[(c[I>>2]|0)+36>>2]&1023](I)|0}else{M=c[L>>2]|0}if((M|0)!=-1){K=I;break}c[v>>2]=0;K=0}}while(0);I=(K|0)==0;L=c[x>>2]|0;do{if((L|0)==0){w=1100}else{N=c[L+12>>2]|0;if((N|0)==(c[L+16>>2]|0)){O=bW[c[(c[L>>2]|0)+36>>2]&1023](L)|0}else{O=c[N>>2]|0}if((O|0)==-1){c[x>>2]=0;w=1100;break}else{if(I^(L|0)==0){P=L;break}else{w=1102;break L1296}}}}while(0);if((w|0)==1100){w=0;if(I){w=1102;break L1296}else{P=0}}if(bQ[c[(c[y>>2]|0)+52>>2]&1023](u,c[F>>2]|0,0)<<24>>24==37){w=1107;break}if(bQ[c[(c[z>>2]|0)+12>>2]&1023](u,8192,c[F>>2]|0)|0){Q=F;w=1117;break}R=K+12|0;L=c[R>>2]|0;S=K+16|0;if((L|0)==(c[S>>2]|0)){T=bW[c[(c[K>>2]|0)+36>>2]&1023](K)|0}else{T=c[L>>2]|0}L=b3[c[(c[A>>2]|0)+28>>2]&1023](u,T)|0;if((L|0)==(b3[c[(c[A>>2]|0)+28>>2]&1023](u,c[F>>2]|0)|0)){w=1145;break}c[g>>2]=4;H=4}L1328:do{if((w|0)==1145){w=0;H=c[R>>2]|0;if((H|0)==(c[S>>2]|0)){L=c[(c[K>>2]|0)+40>>2]|0;bW[L&1023](K)}else{c[R>>2]=H+4|0}U=F+4|0}else if((w|0)==1107){w=0;H=F+4|0;if((H|0)==(k|0)){w=1108;break L1296}L=bQ[c[(c[y>>2]|0)+52>>2]&1023](u,c[H>>2]|0,0)|0;if((L<<24>>24|0)==69|(L<<24>>24|0)==48){N=F+8|0;if((N|0)==(k|0)){w=1111;break L1296}V=L;W=bQ[c[(c[y>>2]|0)+52>>2]&1023](u,c[N>>2]|0,0)|0;X=N}else{V=0;W=L;X=H}H=c[(c[B>>2]|0)+36>>2]|0;c[C>>2]=K;c[D>>2]=P;bV[H&1023](n,b,o,p,f,g,h,W,V);c[v>>2]=c[E>>2]|0;U=X+4|0}else if((w|0)==1117){while(1){w=0;H=Q+4|0;if((H|0)==(k|0)){Y=k;break}if(bQ[c[(c[z>>2]|0)+12>>2]&1023](u,8192,c[H>>2]|0)|0){Q=H;w=1117}else{Y=H;break}}I=K;H=P;while(1){do{if((I|0)==0){Z=0}else{L=c[I+12>>2]|0;if((L|0)==(c[I+16>>2]|0)){_=bW[c[(c[I>>2]|0)+36>>2]&1023](I)|0}else{_=c[L>>2]|0}if((_|0)!=-1){Z=I;break}c[v>>2]=0;Z=0}}while(0);L=(Z|0)==0;do{if((H|0)==0){w=1132}else{N=c[H+12>>2]|0;if((N|0)==(c[H+16>>2]|0)){$=bW[c[(c[H>>2]|0)+36>>2]&1023](H)|0}else{$=c[N>>2]|0}if(($|0)==-1){c[x>>2]=0;w=1132;break}else{if(L^(H|0)==0){aa=H;break}else{U=Y;break L1328}}}}while(0);if((w|0)==1132){w=0;if(L){U=Y;break L1328}else{aa=0}}N=Z+12|0;ab=c[N>>2]|0;ac=Z+16|0;if((ab|0)==(c[ac>>2]|0)){ad=bW[c[(c[Z>>2]|0)+36>>2]&1023](Z)|0}else{ad=c[ab>>2]|0}if(!(bQ[c[(c[z>>2]|0)+12>>2]&1023](u,8192,ad)|0)){U=Y;break L1328}ab=c[N>>2]|0;if((ab|0)==(c[ac>>2]|0)){ac=c[(c[Z>>2]|0)+40>>2]|0;bW[ac&1023](Z);I=Z;H=aa;continue}else{c[N>>2]=ab+4|0;I=Z;H=aa;continue}}}}while(0);if((U|0)==(k|0)){w=1150;break L1294}F=U;G=c[g>>2]|0}if((w|0)==1102){c[g>>2]=4;ae=K;break}else if((w|0)==1108){c[g>>2]=4;ae=K;break}else if((w|0)==1111){c[g>>2]=4;ae=K;break}}}while(0);if((w|0)==1150){ae=c[v>>2]|0}u=d|0;do{if((ae|0)!=0){t=c[ae+12>>2]|0;if((t|0)==(c[ae+16>>2]|0)){af=bW[c[(c[ae>>2]|0)+36>>2]&1023](ae)|0}else{af=c[t>>2]|0}if((af|0)!=-1){break}c[u>>2]=0}}while(0);v=c[u>>2]|0;t=(v|0)==0;G=e|0;F=c[G>>2]|0;do{if((F|0)==0){w=1163}else{z=c[F+12>>2]|0;if((z|0)==(c[F+16>>2]|0)){ag=bW[c[(c[F>>2]|0)+36>>2]&1023](F)|0}else{ag=c[z>>2]|0}if((ag|0)==-1){c[G>>2]=0;w=1163;break}if(!(t^(F|0)==0)){break}ah=a|0;c[ah>>2]=v;i=l;return}}while(0);do{if((w|0)==1163){if(t){break}ah=a|0;c[ah>>2]=v;i=l;return}}while(0);c[g>>2]=c[g>>2]|2;ah=a|0;c[ah>>2]=v;i=l;return}}while(0);l=bf(4)|0;c[l>>2]=5e3;aO(l|0,10664,510)}function fX(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+24|0;k=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+8|0;m=c[f+28>>2]|0;f=m+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3256]|0)!=-1){c[l>>2]=13024;c[l+4>>2]=24;c[l+8>>2]=0;dh(13024,l,250)}l=(c[3257]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=bW[c[c[q>>2]>>2]&1023](q)|0;c[k>>2]=p;p=(eY(d,k,r,r+168|0,o,g,0)|0)-r|0;if((p|0)>=168){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+24>>2]=((p|0)/12&-1|0)%7;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bf(4)|0;c[j>>2]=5e3;aO(j|0,10664,510)}function fY(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+24|0;k=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[k>>2]|0;k=j|0;l=j+8|0;m=c[f+28>>2]|0;f=m+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3256]|0)!=-1){c[l>>2]=13024;c[l+4>>2]=24;c[l+8>>2]=0;dh(13024,l,250)}l=(c[3257]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=bW[c[(c[q>>2]|0)+4>>2]&1023](q)|0;c[k>>2]=p;p=(eY(d,k,r,r+288|0,o,g,0)|0)-r|0;if((p|0)>=288){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+16>>2]=((p|0)/12&-1|0)%12;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bf(4)|0;c[j>>2]=5e3;aO(j|0,10664,510)}function fZ(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;i=i+24|0;j=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[j>>2]|0;j=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[j>>2]|0;j=b|0;k=b+8|0;l=c[f+28>>2]|0;f=l+4|0;J=c[f>>2]|0,c[f>>2]=J+1,J;if((c[3256]|0)!=-1){c[k>>2]=13024;c[k+4>>2]=24;c[k+8>>2]=0;dh(13024,k,250)}k=(c[3257]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}if(((J=c[f>>2]|0,c[f>>2]=J+ -1,J)|0)==0){bT[c[(c[l>>2]|0)+8>>2]&1023](l)}c[j>>2]=c[e>>2]|0;o=f2(d,j,g,n,4)|0;if((c[g>>2]&4|0)!=0){p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}if((o|0)<69){s=o+2e3|0}else{s=(o-69|0)>>>0<31?o+1900|0:o}c[h+20>>2]=s-1900|0;p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}}while(0);b=bf(4)|0;c[b>>2]=5e3;aO(b|0,10664,510)}function f_(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0;l=i;i=i+320|0;m=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[m>>2]|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=l|0;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;z=l+112|0;A=l+120|0;B=l+128|0;C=l+136|0;D=l+144|0;E=l+152|0;F=l+160|0;G=l+168|0;H=l+176|0;I=l+184|0;K=l+192|0;L=l+200|0;M=l+208|0;N=l+216|0;O=l+224|0;P=l+232|0;Q=l+240|0;R=l+248|0;S=l+256|0;T=l+264|0;U=l+272|0;V=l+280|0;W=l+288|0;X=l+296|0;Y=l+304|0;Z=l+312|0;c[h>>2]=0;_=c[g+28>>2]|0;$=_+4|0;J=c[$>>2]|0,c[$>>2]=J+1,J;if((c[3256]|0)!=-1){c[y>>2]=13024;c[y+4>>2]=24;c[y+8>>2]=0;dh(13024,y,250)}y=(c[3257]|0)-1|0;aa=c[_+8>>2]|0;do{if((c[_+12>>2]|0)-aa>>2>>>0>y>>>0){ab=c[aa+(y<<2)>>2]|0;if((ab|0)==0){break}ac=ab;if(((J=c[$>>2]|0,c[$>>2]=J+ -1,J)|0)==0){bT[c[(c[_>>2]|0)+8>>2]&1023](_)}ab=k<<24>>24;L1470:do{if((ab|0)==114){ad=e|0;c[M>>2]=c[ad>>2]|0;c[N>>2]=c[f>>2]|0;fW(L,d,M,N,g,h,j,4584,4628);c[ad>>2]=c[L>>2]|0}else if((ab|0)==82){ad=e|0;c[P>>2]=c[ad>>2]|0;c[Q>>2]=c[f>>2]|0;fW(O,d,P,Q,g,h,j,4560,4580);c[ad>>2]=c[O>>2]|0}else if((ab|0)==83){c[p>>2]=c[f>>2]|0;ad=f2(e,p,h,ac,2)|0;ae=c[h>>2]|0;if((ae&4|0)==0&(ad|0)<61){c[j>>2]=ad;break}else{c[h>>2]=ae|4;break}}else if((ab|0)==110|(ab|0)==116){c[I>>2]=c[f>>2]|0;f$(0,e,I,h,ac)}else if((ab|0)==112){c[K>>2]=c[f>>2]|0;f0(d,j+8|0,e,K,h,ac)}else if((ab|0)==70){ae=e|0;c[G>>2]=c[ae>>2]|0;c[H>>2]=c[f>>2]|0;fW(F,d,G,H,g,h,j,4496,4528);c[ae>>2]=c[F>>2]|0}else if((ab|0)==109){c[r>>2]=c[f>>2]|0;ae=(f2(e,r,h,ac,2)|0)-1|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ae|0)<12){c[j+16>>2]=ae;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==73){ad=j+8|0;c[t>>2]=c[f>>2]|0;ae=f2(e,t,h,ac,2)|0;af=c[h>>2]|0;do{if((af&4|0)==0){if((ae-1|0)>>>0>=12){break}c[ad>>2]=ae;break L1470}}while(0);c[h>>2]=af|4}else if((ab|0)==98|(ab|0)==66|(ab|0)==104){ae=c[f>>2]|0;ad=d+8|0;ag=bW[c[(c[ad>>2]|0)+4>>2]&1023](ad)|0;c[w>>2]=ae;ae=(eY(e,w,ag,ag+288|0,ac,h,0)|0)-ag|0;if((ae|0)>=288){break}c[j+16>>2]=((ae|0)/12&-1|0)%12}else if((ab|0)==77){c[q>>2]=c[f>>2]|0;ae=f2(e,q,h,ac,2)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ae|0)<60){c[j+4>>2]=ae;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==84){ag=e|0;c[S>>2]=c[ag>>2]|0;c[T>>2]=c[f>>2]|0;fW(R,d,S,T,g,h,j,4528,4560);c[ag>>2]=c[R>>2]|0}else if((ab|0)==119){c[o>>2]=c[f>>2]|0;ag=f2(e,o,h,ac,1)|0;ae=c[h>>2]|0;if((ae&4|0)==0&(ag|0)<7){c[j+24>>2]=ag;break}else{c[h>>2]=ae|4;break}}else if((ab|0)==99){ae=d+8|0;ag=bW[c[(c[ae>>2]|0)+12>>2]&1023](ae)|0;ae=e|0;c[A>>2]=c[ae>>2]|0;c[B>>2]=c[f>>2]|0;ad=a[ag]|0;if((ad&1)<<24>>24==0){ah=ag+4|0;ai=ag+4|0}else{aj=c[ag+8>>2]|0;ah=aj;ai=aj}aj=ad&255;if((aj&1|0)==0){ak=aj>>>1}else{ak=c[ag+4>>2]|0}fW(z,d,A,B,g,h,j,ai,ah+(ak<<2)|0);c[ae>>2]=c[z>>2]|0}else if((ab|0)==97|(ab|0)==65){ae=c[f>>2]|0;ag=d+8|0;aj=bW[c[c[ag>>2]>>2]&1023](ag)|0;c[x>>2]=ae;ae=(eY(e,x,aj,aj+168|0,ac,h,0)|0)-aj|0;if((ae|0)>=168){break}c[j+24>>2]=((ae|0)/12&-1|0)%7}else if((ab|0)==100|(ab|0)==101){ae=j+12|0;c[v>>2]=c[f>>2]|0;aj=f2(e,v,h,ac,2)|0;ag=c[h>>2]|0;do{if((ag&4|0)==0){if((aj-1|0)>>>0>=31){break}c[ae>>2]=aj;break L1470}}while(0);c[h>>2]=ag|4}else if((ab|0)==68){aj=e|0;c[D>>2]=c[aj>>2]|0;c[E>>2]=c[f>>2]|0;fW(C,d,D,E,g,h,j,4632,4664);c[aj>>2]=c[C>>2]|0}else if((ab|0)==72){c[u>>2]=c[f>>2]|0;aj=f2(e,u,h,ac,2)|0;ae=c[h>>2]|0;if((ae&4|0)==0&(aj|0)<24){c[j+8>>2]=aj;break}else{c[h>>2]=ae|4;break}}else if((ab|0)==120){ae=c[(c[d>>2]|0)+20>>2]|0;c[U>>2]=c[e>>2]|0;c[V>>2]=c[f>>2]|0;bY[ae&1023](b,d,U,V,g,h,j);i=l;return}else if((ab|0)==88){ae=d+8|0;aj=bW[c[(c[ae>>2]|0)+24>>2]&1023](ae)|0;ae=e|0;c[X>>2]=c[ae>>2]|0;c[Y>>2]=c[f>>2]|0;af=a[aj]|0;if((af&1)<<24>>24==0){al=aj+4|0;am=aj+4|0}else{ad=c[aj+8>>2]|0;al=ad;am=ad}ad=af&255;if((ad&1|0)==0){an=ad>>>1}else{an=c[aj+4>>2]|0}fW(W,d,X,Y,g,h,j,am,al+(an<<2)|0);c[ae>>2]=c[W>>2]|0}else if((ab|0)==106){c[s>>2]=c[f>>2]|0;ae=f2(e,s,h,ac,3)|0;aj=c[h>>2]|0;if((aj&4|0)==0&(ae|0)<366){c[j+28>>2]=ae;break}else{c[h>>2]=aj|4;break}}else if((ab|0)==121){c[n>>2]=c[f>>2]|0;aj=f2(e,n,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}if((aj|0)<69){ao=aj+2e3|0}else{ao=(aj-69|0)>>>0<31?aj+1900|0:aj}c[j+20>>2]=ao-1900|0}else if((ab|0)==89){c[m>>2]=c[f>>2]|0;aj=f2(e,m,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}c[j+20>>2]=aj-1900|0}else if((ab|0)==37){c[Z>>2]=c[f>>2]|0;f1(0,e,Z,h,ac)}else{c[h>>2]=c[h>>2]|4}}while(0);c[b>>2]=c[e>>2]|0;i=l;return}}while(0);l=bf(4)|0;c[l>>2]=5e3;aO(l|0,10664,510)}function f$(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;a=i;g=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[g>>2]|0;g=b|0;b=d|0;d=f;L1551:while(1){h=c[g>>2]|0;do{if((h|0)==0){j=1}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){l=bW[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[g>>2]=0;j=1;break}else{j=(c[g>>2]|0)==0;break}}}while(0);h=c[b>>2]|0;do{if((h|0)==0){m=1312}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){n=bW[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{n=c[k>>2]|0}if((n|0)==-1){c[b>>2]=0;m=1312;break}else{k=(h|0)==0;if(j^k){o=h;p=k;break}else{q=h;r=k;break L1551}}}}while(0);if((m|0)==1312){m=0;if(j){q=0;r=1;break}else{o=0;p=1}}h=c[g>>2]|0;k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){s=bW[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{s=c[k>>2]|0}if(!(bQ[c[(c[d>>2]|0)+12>>2]&1023](f,8192,s)|0)){q=o;r=p;break}k=c[g>>2]|0;h=k+12|0;t=c[h>>2]|0;if((t|0)==(c[k+16>>2]|0)){u=c[(c[k>>2]|0)+40>>2]|0;bW[u&1023](k);continue}else{c[h>>2]=t+4|0;continue}}p=c[g>>2]|0;do{if((p|0)==0){v=1}else{o=c[p+12>>2]|0;if((o|0)==(c[p+16>>2]|0)){w=bW[c[(c[p>>2]|0)+36>>2]&1023](p)|0}else{w=c[o>>2]|0}if((w|0)==-1){c[g>>2]=0;v=1;break}else{v=(c[g>>2]|0)==0;break}}}while(0);do{if(r){m=1334}else{g=c[q+12>>2]|0;if((g|0)==(c[q+16>>2]|0)){x=bW[c[(c[q>>2]|0)+36>>2]&1023](q)|0}else{x=c[g>>2]|0}if((x|0)==-1){c[b>>2]=0;m=1334;break}if(!(v^(q|0)==0)){break}i=a;return}}while(0);do{if((m|0)==1334){if(v){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function f0(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+8|0;k=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[k>>2]|0;k=j|0;l=a+8|0;a=bW[c[(c[l>>2]|0)+8>>2]&1023](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2]|0;f=eY(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12|0;i=j;return}function f1(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;a=i;g=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[g>>2]|0;g=b|0;b=c[g>>2]|0;do{if((b|0)==0){h=1}else{j=c[b+12>>2]|0;if((j|0)==(c[b+16>>2]|0)){k=bW[c[(c[b>>2]|0)+36>>2]&1023](b)|0}else{k=c[j>>2]|0}if((k|0)==-1){c[g>>2]=0;h=1;break}else{h=(c[g>>2]|0)==0;break}}}while(0);k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=1374}else{b=c[d+12>>2]|0;if((b|0)==(c[d+16>>2]|0)){m=bW[c[(c[d>>2]|0)+36>>2]&1023](d)|0}else{m=c[b>>2]|0}if((m|0)==-1){c[k>>2]=0;l=1374;break}else{b=(d|0)==0;if(h^b){n=d;o=b;break}else{l=1376;break}}}}while(0);do{if((l|0)==1374){if(h){l=1376;break}else{n=0;o=1;break}}}while(0);if((l|0)==1376){c[e>>2]=c[e>>2]|6;i=a;return}h=c[g>>2]|0;d=c[h+12>>2]|0;if((d|0)==(c[h+16>>2]|0)){p=bW[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{p=c[d>>2]|0}if(bQ[c[(c[f>>2]|0)+52>>2]&1023](f,p,0)<<24>>24!=37){c[e>>2]=c[e>>2]|4;i=a;return}p=c[g>>2]|0;f=p+12|0;d=c[f>>2]|0;if((d|0)==(c[p+16>>2]|0)){h=c[(c[p>>2]|0)+40>>2]|0;bW[h&1023](p)}else{c[f>>2]=d+4|0}d=c[g>>2]|0;do{if((d|0)==0){q=1}else{f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0)){r=bW[c[(c[d>>2]|0)+36>>2]&1023](d)|0}else{r=c[f>>2]|0}if((r|0)==-1){c[g>>2]=0;q=1;break}else{q=(c[g>>2]|0)==0;break}}}while(0);do{if(o){l=1398}else{g=c[n+12>>2]|0;if((g|0)==(c[n+16>>2]|0)){s=bW[c[(c[n>>2]|0)+36>>2]&1023](n)|0}else{s=c[g>>2]|0}if((s|0)==-1){c[k>>2]=0;l=1398;break}if(!(q^(n|0)==0)){break}i=a;return}}while(0);do{if((l|0)==1398){if(q){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function f2(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;g=i;h=b;b=i;i=i+4|0;i=i+7>>3<<3;c[b>>2]=c[h>>2]|0;h=a|0;a=c[h>>2]|0;do{if((a|0)==0){j=1}else{k=c[a+12>>2]|0;if((k|0)==(c[a+16>>2]|0)){l=bW[c[(c[a>>2]|0)+36>>2]&1023](a)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[h>>2]=0;j=1;break}else{j=(c[h>>2]|0)==0;break}}}while(0);l=b|0;b=c[l>>2]|0;do{if((b|0)==0){m=1420}else{a=c[b+12>>2]|0;if((a|0)==(c[b+16>>2]|0)){n=bW[c[(c[b>>2]|0)+36>>2]&1023](b)|0}else{n=c[a>>2]|0}if((n|0)==-1){c[l>>2]=0;m=1420;break}else{if(j^(b|0)==0){o=b;break}else{m=1422;break}}}}while(0);do{if((m|0)==1420){if(j){m=1422;break}else{o=0;break}}}while(0);if((m|0)==1422){c[d>>2]=c[d>>2]|6;p=0;i=g;return p|0}j=c[h>>2]|0;b=c[j+12>>2]|0;if((b|0)==(c[j+16>>2]|0)){q=bW[c[(c[j>>2]|0)+36>>2]&1023](j)|0}else{q=c[b>>2]|0}b=e;if(!(bQ[c[(c[b>>2]|0)+12>>2]&1023](e,2048,q)|0)){c[d>>2]=c[d>>2]|4;p=0;i=g;return p|0}j=e;n=bQ[c[(c[j>>2]|0)+52>>2]&1023](e,q,0)<<24>>24;q=c[h>>2]|0;a=q+12|0;k=c[a>>2]|0;do{if((k|0)==(c[q+16>>2]|0)){r=c[(c[q>>2]|0)+40>>2]|0;bW[r&1023](q);s=n;t=f;u=o;break}else{c[a>>2]=k+4|0;s=n;t=f;u=o;break}}while(0);while(1){v=s-48|0;o=t-1|0;f=c[h>>2]|0;do{if((f|0)==0){w=0}else{n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0)){x=bW[c[(c[f>>2]|0)+36>>2]&1023](f)|0}else{x=c[n>>2]|0}if((x|0)==-1){c[h>>2]=0;w=0;break}else{w=c[h>>2]|0;break}}}while(0);f=(w|0)==0;if((u|0)==0){y=w;z=0}else{n=c[u+12>>2]|0;if((n|0)==(c[u+16>>2]|0)){A=bW[c[(c[u>>2]|0)+36>>2]&1023](u)|0}else{A=c[n>>2]|0}if((A|0)==-1){c[l>>2]=0;B=0}else{B=u}y=c[h>>2]|0;z=B}C=(z|0)==0;if(!((f^C)&(o|0)>0)){break}f=c[y+12>>2]|0;if((f|0)==(c[y+16>>2]|0)){D=bW[c[(c[y>>2]|0)+36>>2]&1023](y)|0}else{D=c[f>>2]|0}if(!(bQ[c[(c[b>>2]|0)+12>>2]&1023](e,2048,D)|0)){p=v;m=1470;break}f=(bQ[c[(c[j>>2]|0)+52>>2]&1023](e,D,0)<<24>>24)+(v*10&-1)|0;n=c[h>>2]|0;k=n+12|0;a=c[k>>2]|0;if((a|0)==(c[n+16>>2]|0)){q=c[(c[n>>2]|0)+40>>2]|0;bW[q&1023](n);s=f;t=o;u=z;continue}else{c[k>>2]=a+4|0;s=f;t=o;u=z;continue}}if((m|0)==1470){i=g;return p|0}do{if((y|0)==0){E=1}else{u=c[y+12>>2]|0;if((u|0)==(c[y+16>>2]|0)){F=bW[c[(c[y>>2]|0)+36>>2]&1023](y)|0}else{F=c[u>>2]|0}if((F|0)==-1){c[h>>2]=0;E=1;break}else{E=(c[h>>2]|0)==0;break}}}while(0);do{if(C){m=1466}else{h=c[z+12>>2]|0;if((h|0)==(c[z+16>>2]|0)){G=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{G=c[h>>2]|0}if((G|0)==-1){c[l>>2]=0;m=1466;break}if(E^(z|0)==0){p=v}else{break}i=g;return p|0}}while(0);do{if((m|0)==1466){if(E){break}else{p=v}i=g;return p|0}}while(0);c[d>>2]=c[d>>2]|2;p=v;i=g;return p|0}function f3(a){a=a|0;var b=0,d=0;b=a;d=c[a+8>>2]|0;if((d|0)==0){jJ(b);return}bd(d|0);jJ(b);return}function f4(a){a=a|0;var b=0;b=c[a+8>>2]|0;if((b|0)==0){return}bd(b|0);return}function f5(a){a=a|0;return}function f6(a){a=a|0;return 127}function f7(a){a=a|0;return 127}function f8(a){a=a|0;return 0}function f9(a){a=a|0;return}function ga(a){a=a|0;return 127}function gb(a){a=a|0;return 127}function gc(a){a=a|0;return 0}function gd(a){a=a|0;return}function ge(a){a=a|0;return 2147483647}function gf(a){a=a|0;return 2147483647}function gg(a){a=a|0;return 0}function gh(a){a=a|0;return}function gi(a){a=a|0;return 2147483647}function gj(a){a=a|0;return 2147483647}function gk(a){a=a|0;return 0}function gl(a){a=a|0;return}function gm(a){a=a|0;return}function gn(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function go(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gp(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gq(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gr(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gs(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gt(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gu(b,c){b=b|0;c=c|0;c=b;D=67109634;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;return}function gv(b,c){b=b|0;c=c|0;c=b;a[b]=2;a[c+1|0]=45;a[c+2|0]=0;return}function gw(b,c){b=b|0;c=c|0;c=b;a[b]=2;a[c+1|0]=45;a[c+2|0]=0;return}function gx(b,d){b=b|0;d=d|0;a[b]=2;d=b+4|0;c[d>>2]=45;c[d+4>>2]=0;return}function gy(b,d){b=b|0;d=d|0;a[b]=2;d=b+4|0;c[d>>2]=45;c[d+4>>2]=0;return}function gz(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+112|0;f=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[f>>2]|0;f=g|0;l=g+8|0;m=l|0;n=f|0;a[n]=37;o=f+1|0;a[o]=j;p=f+2|0;a[p]=k;a[f+3|0]=0;if(k<<24>>24!=0){a[o]=k;a[p]=j}j=bO(m|0,100,n|0,h|0,c[d+8>>2]|0)|0;d=l+j|0;l=c[e>>2]|0;if((j|0)==0){q=l;r=b|0;c[r>>2]=q;i=g;return}else{s=l;t=m}while(1){m=a[t]|0;if((s|0)==0){u=0}else{l=s+24|0;j=c[l>>2]|0;if((j|0)==(c[s+28>>2]|0)){v=b3[c[(c[s>>2]|0)+52>>2]&1023](s,m&255)|0}else{c[l>>2]=j+1|0;a[j]=m;v=m&255}u=(v|0)==-1?0:s}m=t+1|0;if((m|0)==(d|0)){q=u;break}else{s=u;t=m}}r=b|0;c[r>>2]=q;i=g;return}function gA(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+408|0;e=d;d=i;i=i+4|0;i=i+7>>3<<3;c[d>>2]=c[e>>2]|0;e=f|0;k=f+400|0;l=e|0;c[k>>2]=e+400|0;gU(b+8|0,l,k,g,h,j);j=c[k>>2]|0;k=c[d>>2]|0;if((l|0)==(j|0)){m=k;n=a|0;c[n>>2]=m;i=f;return}else{o=k;p=l}while(1){l=c[p>>2]|0;if((o|0)==0){q=0}else{k=o+24|0;d=c[k>>2]|0;if((d|0)==(c[o+28>>2]|0)){r=b3[c[(c[o>>2]|0)+52>>2]&1023](o,l)|0}else{c[k>>2]=d+4|0;c[d>>2]=l;r=l}q=(r|0)==-1?0:o}l=p+4|0;if((l|0)==(j|0)){m=q;break}else{o=q;p=l}}n=a|0;c[n>>2]=m;i=f;return}function gB(a){a=a|0;jJ(a);return}function gC(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gD(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gE(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gF(a){a=a|0;jJ(a);return}function gG(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gH(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gI(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gJ(a){a=a|0;jJ(a);return}function gK(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gL(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gM(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gN(a){a=a|0;jJ(a);return}function gO(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gP(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gQ(a,b){a=a|0;b=b|0;jP(a|0,0,12);return}function gR(a){a=a|0;jJ(a);return}function gS(a){a=a|0;var b=0,d=0;b=a;d=c[a+8>>2]|0;if((d|0)==0){jJ(b);return}bd(d|0);jJ(b);return}function gT(a){a=a|0;var b=0;b=c[a+8>>2]|0;if((b|0)==0){return}bd(b|0);return}function gU(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+120|0;k=j|0;l=j+112|0;m=i;i=i+4|0;i=i+7>>3<<3;n=j+8|0;o=k|0;a[o]=37;p=k+1|0;a[p]=g;q=k+2|0;a[q]=h;a[k+3|0]=0;if(h<<24>>24!=0){a[p]=h;a[q]=g}g=b|0;bO(n|0,100,o|0,f|0,c[g>>2]|0);c[l>>2]=0;c[l+4>>2]=0;c[m>>2]=n;n=(c[e>>2]|0)-d>>2;f=bJ(c[g>>2]|0)|0;g=jg(d,m,n,l)|0;if((f|0)!=0){bJ(f|0)}if((g|0)==-1){gY(944)}else{c[e>>2]=d+(g<<2)|0;i=j;return}}function gV(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;d=i;i=i+280|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=d|0;m=d+16|0;n=d+120|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=d+160|0;t=d+176|0;u=n|0;c[u>>2]=m|0;v=n+4|0;c[v>>2]=416;w=p|0;x=c[h+28>>2]|0;c[w>>2]=x;y=x+4|0;J=c[y>>2]|0,c[y>>2]=J+1,J;y=c[w>>2]|0;if((c[3258]|0)!=-1){c[l>>2]=13032;c[l+4>>2]=24;c[l+8>>2]=0;dh(13032,l,250)}l=(c[3259]|0)-1|0;x=c[y+8>>2]|0;do{if((c[y+12>>2]|0)-x>>2>>>0>l>>>0){z=c[x+(l<<2)>>2]|0;if((z|0)==0){break}A=z;a[q]=0;B=f|0;c[r>>2]=c[B>>2]|0;do{if(gW(e,r,g,p,c[h+4>>2]|0,j,q,A,n,o,m+100|0)|0){D=s|0;E=c[(c[z>>2]|0)+32>>2]|0;b0[E&1023](A,4480,4490,D);E=t|0;F=c[o>>2]|0;G=c[u>>2]|0;H=F-G|0;do{if((H|0)>98){I=jA(H+2|0)|0;if((I|0)!=0){K=I;L=I;break}I=bf(4)|0;c[I>>2]=4968;aO(I|0,10648,66)}else{K=E;L=0}}while(0);if((a[q]&1)<<24>>24==0){M=K}else{a[K]=45;M=K+1|0}L1918:do{if(G>>>0<F>>>0){H=s+10|0;I=s;N=M;O=G;while(1){P=D;while(1){if((P|0)==(H|0)){Q=H;break}if((a[P]|0)==(a[O]|0)){Q=P;break}else{P=P+1|0}}a[N]=a[4480+(Q-I|0)|0]|0;P=O+1|0;R=N+1|0;if(P>>>0<(c[o>>2]|0)>>>0){N=R;O=P}else{S=R;break L1918}}}else{S=M}}while(0);a[S]=0;if((aK(E|0,1408,(C=i,i=i+8|0,c[C>>2]=k,C)|0)|0)!=1){gY(1376)}if((L|0)==0){break}jB(L)}}while(0);A=e|0;z=c[A>>2]|0;do{if((z|0)==0){T=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){T=z;break}if((bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0)!=-1){T=z;break}c[A>>2]=0;T=0}}while(0);A=(T|0)==0;z=c[B>>2]|0;do{if((z|0)==0){U=1617}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){if(A){break}else{U=1619;break}}if((bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0)==-1){c[B>>2]=0;U=1617;break}else{if(A^(z|0)==0){break}else{U=1619;break}}}}while(0);do{if((U|0)==1617){if(A){U=1619;break}else{break}}}while(0);if((U|0)==1619){c[j>>2]=c[j>>2]|2}c[b>>2]=T;A=c[w>>2]|0;z=A+4|0;if(((J=c[z>>2]|0,c[z>>2]=J+ -1,J)|0)==0){bT[c[(c[A>>2]|0)+8>>2]&1023](A|0)}A=c[u>>2]|0;c[u>>2]=0;if((A|0)==0){i=d;return}bT[c[v>>2]&1023](A);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}
function gW(e,f,g,h,j,k,l,m,n,o,p){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0,bO=0,bP=0;q=i;i=i+440|0;r=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[r>>2]|0;r=q|0;s=q+400|0;t=q+408|0;u=q+416|0;v=q+424|0;w=v;x=i;i=i+12|0;i=i+7>>3<<3;y=i;i=i+12|0;i=i+7>>3<<3;z=i;i=i+12|0;i=i+7>>3<<3;A=i;i=i+12|0;i=i+7>>3<<3;B=i;i=i+4|0;i=i+7>>3<<3;C=i;i=i+4|0;i=i+7>>3<<3;D=r|0;jP(w|0,0,12);E=x;F=y;G=z;H=A;jP(E|0,0,12);jP(F|0,0,12);jP(G|0,0,12);jP(H|0,0,12);g0(g,h,s,t,u,v,x,y,z,B);h=n|0;c[o>>2]=c[h>>2]|0;g=e|0;e=f|0;f=m+8|0;m=A+1|0;I=A+8|0;J=A|0;K=A+4|0;A=z+1|0;L=z+4|0;M=z+8|0;N=y+1|0;O=y+4|0;P=y+8|0;Q=(j&512|0)!=0;j=x+1|0;R=x+4|0;S=x+8|0;x=s+3|0;T=n+4|0;n=v+4|0;U=p;p=416;V=D;W=D;D=r+400|0;r=0;X=0;L1963:while(1){Y=c[g>>2]|0;do{if((Y|0)==0){Z=0}else{if((c[Y+12>>2]|0)!=(c[Y+16>>2]|0)){Z=Y;break}if((bW[c[(c[Y>>2]|0)+36>>2]&1023](Y)|0)==-1){c[g>>2]=0;Z=0;break}else{Z=c[g>>2]|0;break}}}while(0);Y=(Z|0)==0;_=c[e>>2]|0;do{if((_|0)==0){$=1648}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){if(Y){aa=_;break}else{ab=p;ac=V;ad=W;ae=r;$=1946;break L1963}}if((bW[c[(c[_>>2]|0)+36>>2]&1023](_)|0)==-1){c[e>>2]=0;$=1648;break}else{if(Y){aa=_;break}else{ab=p;ac=V;ad=W;ae=r;$=1946;break L1963}}}}while(0);if(($|0)==1648){$=0;if(Y){ab=p;ac=V;ad=W;ae=r;$=1946;break}else{aa=0}}_=a[s+X|0]|0;do{if((_|0)==1){if((X|0)==3){ab=p;ac=V;ad=W;ae=r;$=1946;break L1963}af=c[g>>2]|0;ag=c[af+12>>2]|0;if((ag|0)==(c[af+16>>2]|0)){ah=bW[c[(c[af>>2]|0)+36>>2]&1023](af)&255}else{ah=a[ag]|0}if(ah<<24>>24<=-1){$=1700;break L1963}if((b[(c[f>>2]|0)+(ah<<24>>24<<1)>>1]&8192)<<16>>16==0){$=1700;break L1963}ag=c[g>>2]|0;af=ag+12|0;ai=c[af>>2]|0;if((ai|0)==(c[ag+16>>2]|0)){aj=bW[c[(c[ag>>2]|0)+40>>2]&1023](ag)&255}else{c[af>>2]=ai+1|0;aj=a[ai]|0}ai=a[H]|0;if((ai&1)<<24>>24==0){ak=10;al=ai}else{ai=c[J>>2]|0;ak=(ai&-2)-1|0;al=ai&255}ai=al&255;af=(ai&1|0)==0?ai>>>1:c[K>>2]|0;if((af|0)==(ak|0)){if((ak|0)==-3){$=1688;break L1963}ai=(al&1)<<24>>24==0?m:c[I>>2]|0;do{if(ak>>>0<2147483631){ag=ak+1|0;am=ak<<1;an=ag>>>0<am>>>0?am:ag;if(an>>>0<11){ao=11;break}ao=an+16&-16}else{ao=-2}}while(0);an=jG(ao)|0;jQ(an|0,ai|0,ak);if((ak|0)!=10){jJ(ai)}c[I>>2]=an;ag=ao|1;c[J>>2]=ag;ap=ag&255;aq=an}else{ap=al;aq=c[I>>2]|0}an=(ap&1)<<24>>24==0?m:aq;a[an+af|0]=aj;ag=af+1|0;a[an+ag|0]=0;if((a[H]&1)<<24>>24==0){a[H]=ag<<1&255;$=1701;break}else{c[K>>2]=ag;$=1701;break}}else if((_|0)==0){$=1701}else if((_|0)==2){if(!((r|0)!=0|X>>>0<2)){if((X|0)==2){ar=(a[x]|0)!=0}else{ar=0}if(!(Q|ar)){as=0;at=D;au=W;av=V;aw=p;ax=U;break}}ag=a[E]|0;an=(ag&1)<<24>>24==0?j:c[S>>2]|0;L2026:do{if((X|0)==0){ay=an}else{if((d[s+(X-1|0)|0]|0)>=2){ay=an;break}am=ag&255;az=an+((am&1|0)==0?am>>>1:c[R>>2]|0)|0;am=an;while(1){if((am|0)==(az|0)){aA=az;break}aB=a[am]|0;if(aB<<24>>24<=-1){aA=am;break}if((b[(c[f>>2]|0)+(aB<<24>>24<<1)>>1]&8192)<<16>>16==0){aA=am;break}else{am=am+1|0}}am=aA-an|0;az=a[H]|0;aB=az&255;aC=(aB&1|0)==0?aB>>>1:c[K>>2]|0;if(am>>>0>aC>>>0){ay=an;break}aB=(az&1)<<24>>24==0?m:c[I>>2]|0;az=aB+aC|0;if((aA|0)==(an|0)){ay=an;break}aD=an;aE=aB+(aC-am|0)|0;while(1){if((a[aE]|0)!=(a[aD]|0)){ay=an;break L2026}am=aE+1|0;if((am|0)==(az|0)){ay=aA;break L2026}else{aD=aD+1|0;aE=am}}}}while(0);af=ag&255;L2040:do{if((ay|0)==(an+((af&1|0)==0?af>>>1:c[R>>2]|0)|0)){aF=ay}else{ai=aa;aE=ay;while(1){aD=c[g>>2]|0;do{if((aD|0)==0){aG=0}else{if((c[aD+12>>2]|0)!=(c[aD+16>>2]|0)){aG=aD;break}if((bW[c[(c[aD>>2]|0)+36>>2]&1023](aD)|0)==-1){c[g>>2]=0;aG=0;break}else{aG=c[g>>2]|0;break}}}while(0);aD=(aG|0)==0;do{if((ai|0)==0){$=1812}else{if((c[ai+12>>2]|0)!=(c[ai+16>>2]|0)){if(aD){aH=ai;break}else{aF=aE;break L2040}}if((bW[c[(c[ai>>2]|0)+36>>2]&1023](ai)|0)==-1){c[e>>2]=0;$=1812;break}else{if(aD){aH=ai;break}else{aF=aE;break L2040}}}}while(0);if(($|0)==1812){$=0;if(aD){aF=aE;break L2040}else{aH=0}}az=c[g>>2]|0;am=c[az+12>>2]|0;if((am|0)==(c[az+16>>2]|0)){aI=bW[c[(c[az>>2]|0)+36>>2]&1023](az)&255}else{aI=a[am]|0}if(aI<<24>>24!=(a[aE]|0)){aF=aE;break L2040}am=c[g>>2]|0;az=am+12|0;aC=c[az>>2]|0;if((aC|0)==(c[am+16>>2]|0)){aB=c[(c[am>>2]|0)+40>>2]|0;bW[aB&1023](am)}else{c[az>>2]=aC+1|0}aC=aE+1|0;az=a[E]|0;am=az&255;if((aC|0)==(((az&1)<<24>>24==0?j:c[S>>2]|0)+((am&1|0)==0?am>>>1:c[R>>2]|0)|0)){aF=aC;break L2040}else{ai=aH;aE=aC}}}}while(0);if(!Q){as=r;at=D;au=W;av=V;aw=p;ax=U;break}af=a[E]|0;an=af&255;if((aF|0)==(((af&1)<<24>>24==0?j:c[S>>2]|0)+((an&1|0)==0?an>>>1:c[R>>2]|0)|0)){as=r;at=D;au=W;av=V;aw=p;ax=U;break}else{$=1825;break L1963}}else if((_|0)==4){an=a[u]|0;af=0;ag=D;aE=W;ai=V;aC=p;am=U;L2076:while(1){az=c[g>>2]|0;do{if((az|0)==0){aJ=0}else{if((c[az+12>>2]|0)!=(c[az+16>>2]|0)){aJ=az;break}if((bW[c[(c[az>>2]|0)+36>>2]&1023](az)|0)==-1){c[g>>2]=0;aJ=0;break}else{aJ=c[g>>2]|0;break}}}while(0);az=(aJ|0)==0;aB=c[e>>2]|0;do{if((aB|0)==0){$=1838}else{if((c[aB+12>>2]|0)!=(c[aB+16>>2]|0)){if(az){break}else{break L2076}}if((bW[c[(c[aB>>2]|0)+36>>2]&1023](aB)|0)==-1){c[e>>2]=0;$=1838;break}else{if(az){break}else{break L2076}}}}while(0);if(($|0)==1838){$=0;if(az){break}}aB=c[g>>2]|0;aK=c[aB+12>>2]|0;if((aK|0)==(c[aB+16>>2]|0)){aL=bW[c[(c[aB>>2]|0)+36>>2]&1023](aB)&255}else{aL=a[aK]|0}do{if(aL<<24>>24>-1){if((b[(c[f>>2]|0)+(aL<<24>>24<<1)>>1]&2048)<<16>>16==0){$=1858;break}aK=c[o>>2]|0;if((aK|0)==(am|0)){aB=(c[T>>2]|0)!=416;aM=c[h>>2]|0;aN=am-aM|0;aO=aN>>>0<2147483647?aN<<1:-1;aP=jC(aB?aM:0,aO)|0;if((aP|0)==0){$=1848;break L1963}do{if(aB){c[h>>2]=aP;aQ=aP}else{aM=c[h>>2]|0;c[h>>2]=aP;if((aM|0)==0){aQ=aP;break}bT[c[T>>2]&1023](aM);aQ=c[h>>2]|0}}while(0);c[T>>2]=216;aP=aQ+aN|0;c[o>>2]=aP;aR=(c[h>>2]|0)+aO|0;aS=aP}else{aR=am;aS=aK}c[o>>2]=aS+1|0;a[aS]=aL;aT=af+1|0;aU=ag;aV=aE;aW=ai;aX=aC;aY=aR;break}else{$=1858}}while(0);if(($|0)==1858){$=0;az=d[w]|0;if(!((af|0)!=0&(((az&1|0)==0?az>>>1:c[n>>2]|0)|0)!=0&aL<<24>>24==an<<24>>24)){break}if((aE|0)==(ag|0)){az=aE-ai|0;aP=az>>>0<2147483647?az<<1:-1;if((aC|0)==416){aZ=0}else{aZ=ai}aB=jC(aZ,aP)|0;aD=aB;if((aB|0)==0){$=1863;break L1963}a_=aD+(aP>>>2<<2)|0;a$=aD+(az>>2<<2)|0;a0=aD;a1=216}else{a_=ag;a$=aE;a0=ai;a1=aC}c[a$>>2]=af;aT=0;aU=a_;aV=a$+4|0;aW=a0;aX=a1;aY=am}aD=c[g>>2]|0;az=aD+12|0;aP=c[az>>2]|0;if((aP|0)==(c[aD+16>>2]|0)){aB=c[(c[aD>>2]|0)+40>>2]|0;bW[aB&1023](aD);af=aT;ag=aU;aE=aV;ai=aW;aC=aX;am=aY;continue}else{c[az>>2]=aP+1|0;af=aT;ag=aU;aE=aV;ai=aW;aC=aX;am=aY;continue}}if((ai|0)==(aE|0)|(af|0)==0){a2=ag;a3=aE;a4=ai;a5=aC}else{if((aE|0)==(ag|0)){an=aE-ai|0;aP=an>>>0<2147483647?an<<1:-1;if((aC|0)==416){a6=0}else{a6=ai}az=jC(a6,aP)|0;aD=az;if((az|0)==0){$=1875;break L1963}a7=aD+(aP>>>2<<2)|0;a8=aD+(an>>2<<2)|0;a9=aD;ba=216}else{a7=ag;a8=aE;a9=ai;ba=aC}c[a8>>2]=af;a2=a7;a3=a8+4|0;a4=a9;a5=ba}L2141:do{if((c[B>>2]|0)>0){aD=c[g>>2]|0;do{if((aD|0)==0){bb=0}else{if((c[aD+12>>2]|0)!=(c[aD+16>>2]|0)){bb=aD;break}if((bW[c[(c[aD>>2]|0)+36>>2]&1023](aD)|0)==-1){c[g>>2]=0;bb=0;break}else{bb=c[g>>2]|0;break}}}while(0);aD=(bb|0)==0;an=c[e>>2]|0;do{if((an|0)==0){$=1892}else{if((c[an+12>>2]|0)!=(c[an+16>>2]|0)){if(aD){bc=an;break}else{$=1899;break L1963}}if((bW[c[(c[an>>2]|0)+36>>2]&1023](an)|0)==-1){c[e>>2]=0;$=1892;break}else{if(aD){bc=an;break}else{$=1899;break L1963}}}}while(0);if(($|0)==1892){$=0;if(aD){$=1899;break L1963}else{bc=0}}an=c[g>>2]|0;aP=c[an+12>>2]|0;if((aP|0)==(c[an+16>>2]|0)){bd=bW[c[(c[an>>2]|0)+36>>2]&1023](an)&255}else{bd=a[aP]|0}if(bd<<24>>24!=(a[t]|0)){$=1899;break L1963}aP=c[g>>2]|0;an=aP+12|0;az=c[an>>2]|0;do{if((az|0)==(c[aP+16>>2]|0)){aB=c[(c[aP>>2]|0)+40>>2]|0;bW[aB&1023](aP);be=am;bf=bc;break}else{c[an>>2]=az+1|0;be=am;bf=bc;break}}while(0);while(1){az=c[g>>2]|0;do{if((az|0)==0){bg=0}else{if((c[az+12>>2]|0)!=(c[az+16>>2]|0)){bg=az;break}if((bW[c[(c[az>>2]|0)+36>>2]&1023](az)|0)==-1){c[g>>2]=0;bg=0;break}else{bg=c[g>>2]|0;break}}}while(0);az=(bg|0)==0;do{if((bf|0)==0){$=1915}else{if((c[bf+12>>2]|0)!=(c[bf+16>>2]|0)){if(az){bh=bf;break}else{$=1923;break L1963}}if((bW[c[(c[bf>>2]|0)+36>>2]&1023](bf)|0)==-1){c[e>>2]=0;$=1915;break}else{if(az){bh=bf;break}else{$=1923;break L1963}}}}while(0);if(($|0)==1915){$=0;if(az){$=1923;break L1963}else{bh=0}}aK=c[g>>2]|0;aO=c[aK+12>>2]|0;if((aO|0)==(c[aK+16>>2]|0)){bi=bW[c[(c[aK>>2]|0)+36>>2]&1023](aK)&255}else{bi=a[aO]|0}if(bi<<24>>24<=-1){$=1923;break L1963}if((b[(c[f>>2]|0)+(bi<<24>>24<<1)>>1]&2048)<<16>>16==0){$=1923;break L1963}aO=c[o>>2]|0;if((aO|0)==(be|0)){aK=(c[T>>2]|0)!=416;aN=c[h>>2]|0;an=be-aN|0;aP=an>>>0<2147483647?an<<1:-1;aD=jC(aK?aN:0,aP)|0;if((aD|0)==0){$=1926;break L1963}do{if(aK){c[h>>2]=aD;bj=aD}else{aN=c[h>>2]|0;c[h>>2]=aD;if((aN|0)==0){bj=aD;break}bT[c[T>>2]&1023](aN);bj=c[h>>2]|0}}while(0);c[T>>2]=216;aD=bj+an|0;c[o>>2]=aD;bk=(c[h>>2]|0)+aP|0;bl=aD}else{bk=be;bl=aO}aD=c[g>>2]|0;aK=c[aD+12>>2]|0;if((aK|0)==(c[aD+16>>2]|0)){az=bW[c[(c[aD>>2]|0)+36>>2]&1023](aD)&255;bm=az;bn=c[o>>2]|0}else{bm=a[aK]|0;bn=bl}c[o>>2]=bn+1|0;a[bn]=bm;aK=(c[B>>2]|0)-1|0;c[B>>2]=aK;az=c[g>>2]|0;aD=az+12|0;aN=c[aD>>2]|0;if((aN|0)==(c[az+16>>2]|0)){aB=c[(c[az>>2]|0)+40>>2]|0;bW[aB&1023](az)}else{c[aD>>2]=aN+1|0}if((aK|0)>0){be=bk;bf=bh}else{bo=bk;break L2141}}}else{bo=am}}while(0);if((c[o>>2]|0)==(c[h>>2]|0)){$=1944;break L1963}else{as=r;at=a2;au=a3;av=a4;aw=a5;ax=bo;break}}else if((_|0)==3){am=a[F]|0;af=am&255;aC=(af&1|0)==0?af>>>1:c[O>>2]|0;af=a[G]|0;ai=af&255;aE=(ai&1|0)==0?ai>>>1:c[L>>2]|0;if((aC|0)==(-aE|0)){as=r;at=D;au=W;av=V;aw=p;ax=U;break}ai=(aC|0)==0;aC=c[g>>2]|0;ag=c[aC+12>>2]|0;aK=c[aC+16>>2]|0;aN=(ag|0)==(aK|0);if(!(ai|(aE|0)==0)){if(aN){aE=bW[c[(c[aC>>2]|0)+36>>2]&1023](aC)&255;aD=c[g>>2]|0;bp=aE;bq=a[F]|0;br=aD;bs=c[aD+12>>2]|0;bt=c[aD+16>>2]|0}else{bp=a[ag]|0;bq=am;br=aC;bs=ag;bt=aK}aK=br+12|0;aD=(bs|0)==(bt|0);if(bp<<24>>24==(a[(bq&1)<<24>>24==0?N:c[P>>2]|0]|0)){if(aD){aE=c[(c[br>>2]|0)+40>>2]|0;bW[aE&1023](br)}else{c[aK>>2]=bs+1|0}aK=d[F]|0;as=((aK&1|0)==0?aK>>>1:c[O>>2]|0)>>>0>1?y:r;at=D;au=W;av=V;aw=p;ax=U;break}if(aD){bu=bW[c[(c[br>>2]|0)+36>>2]&1023](br)&255}else{bu=a[bs]|0}if(bu<<24>>24!=(a[(a[G]&1)<<24>>24==0?A:c[M>>2]|0]|0)){$=1783;break L1963}aD=c[g>>2]|0;aK=aD+12|0;aE=c[aK>>2]|0;if((aE|0)==(c[aD+16>>2]|0)){az=c[(c[aD>>2]|0)+40>>2]|0;bW[az&1023](aD)}else{c[aK>>2]=aE+1|0}a[l]=1;aE=d[G]|0;as=((aE&1|0)==0?aE>>>1:c[L>>2]|0)>>>0>1?z:r;at=D;au=W;av=V;aw=p;ax=U;break}if(ai){if(aN){ai=bW[c[(c[aC>>2]|0)+36>>2]&1023](aC)&255;bv=ai;bw=a[G]|0}else{bv=a[ag]|0;bw=af}if(bv<<24>>24!=(a[(bw&1)<<24>>24==0?A:c[M>>2]|0]|0)){as=r;at=D;au=W;av=V;aw=p;ax=U;break}af=c[g>>2]|0;ai=af+12|0;aE=c[ai>>2]|0;if((aE|0)==(c[af+16>>2]|0)){aK=c[(c[af>>2]|0)+40>>2]|0;bW[aK&1023](af)}else{c[ai>>2]=aE+1|0}a[l]=1;aE=d[G]|0;as=((aE&1|0)==0?aE>>>1:c[L>>2]|0)>>>0>1?z:r;at=D;au=W;av=V;aw=p;ax=U;break}if(aN){aN=bW[c[(c[aC>>2]|0)+36>>2]&1023](aC)&255;bx=aN;by=a[F]|0}else{bx=a[ag]|0;by=am}if(bx<<24>>24!=(a[(by&1)<<24>>24==0?N:c[P>>2]|0]|0)){a[l]=1;as=r;at=D;au=W;av=V;aw=p;ax=U;break}am=c[g>>2]|0;ag=am+12|0;aN=c[ag>>2]|0;if((aN|0)==(c[am+16>>2]|0)){aC=c[(c[am>>2]|0)+40>>2]|0;bW[aC&1023](am)}else{c[ag>>2]=aN+1|0}aN=d[F]|0;as=((aN&1|0)==0?aN>>>1:c[O>>2]|0)>>>0>1?y:r;at=D;au=W;av=V;aw=p;ax=U;break}else{as=r;at=D;au=W;av=V;aw=p;ax=U}}while(0);L2273:do{if(($|0)==1701){$=0;if((X|0)==3){ab=p;ac=V;ad=W;ae=r;$=1946;break L1963}else{bz=aa}while(1){_=c[g>>2]|0;do{if((_|0)==0){bA=0}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){bA=_;break}if((bW[c[(c[_>>2]|0)+36>>2]&1023](_)|0)==-1){c[g>>2]=0;bA=0;break}else{bA=c[g>>2]|0;break}}}while(0);_=(bA|0)==0;do{if((bz|0)==0){$=1714}else{if((c[bz+12>>2]|0)!=(c[bz+16>>2]|0)){if(_){bB=bz;break}else{as=r;at=D;au=W;av=V;aw=p;ax=U;break L2273}}if((bW[c[(c[bz>>2]|0)+36>>2]&1023](bz)|0)==-1){c[e>>2]=0;$=1714;break}else{if(_){bB=bz;break}else{as=r;at=D;au=W;av=V;aw=p;ax=U;break L2273}}}}while(0);if(($|0)==1714){$=0;if(_){as=r;at=D;au=W;av=V;aw=p;ax=U;break L2273}else{bB=0}}Y=c[g>>2]|0;aN=c[Y+12>>2]|0;if((aN|0)==(c[Y+16>>2]|0)){bC=bW[c[(c[Y>>2]|0)+36>>2]&1023](Y)&255}else{bC=a[aN]|0}if(bC<<24>>24<=-1){as=r;at=D;au=W;av=V;aw=p;ax=U;break L2273}if((b[(c[f>>2]|0)+(bC<<24>>24<<1)>>1]&8192)<<16>>16==0){as=r;at=D;au=W;av=V;aw=p;ax=U;break L2273}aN=c[g>>2]|0;Y=aN+12|0;ag=c[Y>>2]|0;if((ag|0)==(c[aN+16>>2]|0)){bD=bW[c[(c[aN>>2]|0)+40>>2]&1023](aN)&255}else{c[Y>>2]=ag+1|0;bD=a[ag]|0}ag=a[H]|0;if((ag&1)<<24>>24==0){bE=10;bF=ag}else{ag=c[J>>2]|0;bE=(ag&-2)-1|0;bF=ag&255}ag=bF&255;Y=(ag&1|0)==0?ag>>>1:c[K>>2]|0;if((Y|0)==(bE|0)){if((bE|0)==-3){$=1731;break L1963}ag=(bF&1)<<24>>24==0?m:c[I>>2]|0;do{if(bE>>>0<2147483631){aN=bE+1|0;am=bE<<1;aC=aN>>>0<am>>>0?am:aN;if(aC>>>0<11){bG=11;break}bG=aC+16&-16}else{bG=-2}}while(0);_=jG(bG)|0;jQ(_|0,ag|0,bE);if((bE|0)!=10){jJ(ag)}c[I>>2]=_;aC=bG|1;c[J>>2]=aC;bH=aC&255;bI=_}else{bH=bF;bI=c[I>>2]|0}_=(bH&1)<<24>>24==0?m:bI;a[_+Y|0]=bD;aC=Y+1|0;a[_+aC|0]=0;if((a[H]&1)<<24>>24==0){a[H]=aC<<1&255;bz=bB;continue}else{c[K>>2]=aC;bz=bB;continue}}}}while(0);aC=X+1|0;if(aC>>>0<4){U=ax;p=aw;V=av;W=au;D=at;r=as;X=aC}else{ab=aw;ac=av;ad=au;ae=as;$=1946;break}}L2329:do{if(($|0)==1688){di(0);return 0}else if(($|0)==1731){di(0);return 0}else if(($|0)==1700){c[k>>2]=c[k>>2]|4;bJ=0;bK=V;bL=p}else if(($|0)==1783){c[k>>2]=c[k>>2]|4;bJ=0;bK=V;bL=p}else if(($|0)==1825){c[k>>2]=c[k>>2]|4;bJ=0;bK=V;bL=p}else if(($|0)==1848){jO();return 0}else if(($|0)==1863){jO();return 0}else if(($|0)==1875){jO();return 0}else if(($|0)==1899){c[k>>2]=c[k>>2]|4;bJ=0;bK=a4;bL=a5}else if(($|0)==1923){c[k>>2]=c[k>>2]|4;bJ=0;bK=a4;bL=a5}else if(($|0)==1926){jO();return 0}else if(($|0)==1944){c[k>>2]=c[k>>2]|4;bJ=0;bK=a4;bL=a5}else if(($|0)==1946){L2349:do{if((ae|0)!=0){as=ae;au=ae+1|0;av=ae+8|0;aw=ae+4|0;X=1;L2351:while(1){r=d[as]|0;if((r&1|0)==0){bM=r>>>1}else{bM=c[aw>>2]|0}if(X>>>0>=bM>>>0){break L2349}r=c[g>>2]|0;do{if((r|0)==0){bN=0}else{if((c[r+12>>2]|0)!=(c[r+16>>2]|0)){bN=r;break}if((bW[c[(c[r>>2]|0)+36>>2]&1023](r)|0)==-1){c[g>>2]=0;bN=0;break}else{bN=c[g>>2]|0;break}}}while(0);r=(bN|0)==0;Y=c[e>>2]|0;do{if((Y|0)==0){$=1964}else{if((c[Y+12>>2]|0)!=(c[Y+16>>2]|0)){if(r){break}else{break L2351}}if((bW[c[(c[Y>>2]|0)+36>>2]&1023](Y)|0)==-1){c[e>>2]=0;$=1964;break}else{if(r){break}else{break L2351}}}}while(0);if(($|0)==1964){$=0;if(r){break}}Y=c[g>>2]|0;ag=c[Y+12>>2]|0;if((ag|0)==(c[Y+16>>2]|0)){bO=bW[c[(c[Y>>2]|0)+36>>2]&1023](Y)&255}else{bO=a[ag]|0}if((a[as]&1)<<24>>24==0){bP=au}else{bP=c[av>>2]|0}if(bO<<24>>24!=(a[bP+X|0]|0)){break}ag=X+1|0;Y=c[g>>2]|0;at=Y+12|0;D=c[at>>2]|0;if((D|0)==(c[Y+16>>2]|0)){W=c[(c[Y>>2]|0)+40>>2]|0;bW[W&1023](Y);X=ag;continue}else{c[at>>2]=D+1|0;X=ag;continue}}c[k>>2]=c[k>>2]|4;bJ=0;bK=ac;bL=ab;break L2329}}while(0);if((ac|0)==(ad|0)){bJ=1;bK=ad;bL=ab;break}c[C>>2]=0;eA(v,ac,ad,C);if((c[C>>2]|0)==0){bJ=1;bK=ac;bL=ab;break}c[k>>2]=c[k>>2]|4;bJ=0;bK=ac;bL=ab}}while(0);if((a[H]&1)<<24>>24!=0){jJ(c[I>>2]|0)}if((a[G]&1)<<24>>24!=0){jJ(c[M>>2]|0)}if((a[F]&1)<<24>>24!=0){jJ(c[P>>2]|0)}if((a[E]&1)<<24>>24!=0){jJ(c[S>>2]|0)}if((a[w]&1)<<24>>24!=0){jJ(c[v+8>>2]|0)}if((bK|0)==0){i=q;return bJ|0}bT[bL&1023](bK);i=q;return bJ|0}function gX(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)<<24>>24==0){k=10;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g|0;if((e|0)==(d|0)){return b|0}if((k-j|0)>>>0<h>>>0){dl(b,k,(j+h|0)-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)<<24>>24==0){n=b+1|0}else{n=c[b+8>>2]|0}m=e+(j-g|0)|0;g=d;d=n+j|0;while(1){a[d]=a[g]|0;l=g+1|0;if((l|0)==(e|0)){break}else{g=l;d=d+1|0}}a[n+m|0]=0;m=j+h|0;if((a[f]&1)<<24>>24==0){a[f]=m<<1&255;return b|0}else{c[b+4>>2]=m;return b|0}return 0}function gY(a){a=a|0;var b=0,d=0,e=0,f=0;b=bf(8)|0;c[b>>2]=5032;d=b+4|0;if((d|0)==0){aO(b|0,10680,184)}e=jS(a|0)|0;f=jH(e+13|0)|0;c[f+4>>2]=e;c[f>>2]=e;e=f+12|0;c[d>>2]=e;c[f+8>>2]=0;jT(e|0,a|0);aO(b|0,10680,184)}function gZ(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0;d=i;i=i+160|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=d|0;m=d+16|0;n=d+120|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=n|0;c[s>>2]=m|0;t=n+4|0;c[t>>2]=416;u=p|0;v=c[h+28>>2]|0;c[u>>2]=v;w=v+4|0;J=c[w>>2]|0,c[w>>2]=J+1,J;w=c[u>>2]|0;if((c[3258]|0)!=-1){c[l>>2]=13032;c[l+4>>2]=24;c[l+8>>2]=0;dh(13032,l,250)}l=(c[3259]|0)-1|0;v=c[w+8>>2]|0;do{if((c[w+12>>2]|0)-v>>2>>>0>l>>>0){x=c[v+(l<<2)>>2]|0;if((x|0)==0){break}y=x;a[q]=0;z=f|0;A=c[z>>2]|0;c[r>>2]=A;if(gW(e,r,g,p,c[h+4>>2]|0,j,q,y,n,o,m+100|0)|0){B=k;if((a[B]&1)<<24>>24==0){a[k+1|0]=0;a[B]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}C=x;do{if((a[q]&1)<<24>>24!=0){x=b3[c[(c[C>>2]|0)+28>>2]&1023](y,45)|0;D=a[B]|0;if((D&1)<<24>>24==0){E=10;F=D}else{D=c[k>>2]|0;E=(D&-2)-1|0;F=D&255}D=F&255;if((D&1|0)==0){G=D>>>1}else{G=c[k+4>>2]|0}if((G|0)==(E|0)){dl(k,E,1,E,E,0,0);H=a[B]|0}else{H=F}if((H&1)<<24>>24==0){I=k+1|0}else{I=c[k+8>>2]|0}a[I+G|0]=x;x=G+1|0;a[I+x|0]=0;if((a[B]&1)<<24>>24==0){a[B]=x<<1&255;break}else{c[k+4>>2]=x;break}}}while(0);B=b3[c[(c[C>>2]|0)+28>>2]&1023](y,48)|0;x=c[o>>2]|0;D=x-1|0;K=c[s>>2]|0;while(1){if(K>>>0>=D>>>0){break}if((a[K]|0)==B<<24>>24){K=K+1|0}else{break}}gX(k,K,x)}B=e|0;D=c[B>>2]|0;do{if((D|0)==0){L=0}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){L=D;break}if((bW[c[(c[D>>2]|0)+36>>2]&1023](D)|0)!=-1){L=D;break}c[B>>2]=0;L=0}}while(0);B=(L|0)==0;do{if((A|0)==0){M=2070}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){if(B){break}else{M=2072;break}}if((bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0)==-1){c[z>>2]=0;M=2070;break}else{if(B^(A|0)==0){break}else{M=2072;break}}}}while(0);do{if((M|0)==2070){if(B){M=2072;break}else{break}}}while(0);if((M|0)==2072){c[j>>2]=c[j>>2]|2}c[b>>2]=L;B=c[u>>2]|0;A=B+4|0;if(((J=c[A>>2]|0,c[A>>2]=J+ -1,J)|0)==0){bT[c[(c[B>>2]|0)+8>>2]&1023](B|0)}B=c[s>>2]|0;c[s>>2]=0;if((B|0)==0){i=d;return}bT[c[t>>2]&1023](B);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function g_(a){a=a|0;return}function g$(a){a=a|0;jJ(a);return}function g0(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;n=i;i=i+56|0;o=n|0;p=n+16|0;q=n+32|0;r=n+40|0;s=r;t=i;i=i+12|0;i=i+7>>3<<3;u=t;v=i;i=i+12|0;i=i+7>>3<<3;w=v;x=i;i=i+12|0;i=i+7>>3<<3;y=x;z=i;i=i+4|0;i=i+7>>3<<3;A=i;i=i+12|0;i=i+7>>3<<3;B=A;C=i;i=i+12|0;i=i+7>>3<<3;E=C;F=i;i=i+12|0;i=i+7>>3<<3;G=F;H=i;i=i+12|0;i=i+7>>3<<3;I=H;if(b){b=c[d>>2]|0;if((c[3386]|0)!=-1){c[p>>2]=13544;c[p+4>>2]=24;c[p+8>>2]=0;dh(13544,p,250)}p=(c[3387]|0)-1|0;J=c[b+8>>2]|0;if((c[b+12>>2]|0)-J>>2>>>0<=p>>>0){K=bf(4)|0;L=K;c[L>>2]=5e3;aO(K|0,10664,510)}b=c[J+(p<<2)>>2]|0;if((b|0)==0){K=bf(4)|0;L=K;c[L>>2]=5e3;aO(K|0,10664,510)}K=b;bU[c[(c[b>>2]|0)+44>>2]&1023](q,K);L=e;D=c[q>>2]|0;a[L]=D&255;D=D>>8;a[L+1|0]=D&255;D=D>>8;a[L+2|0]=D&255;D=D>>8;a[L+3|0]=D&255;L=b;bU[c[(c[L>>2]|0)+32>>2]&1023](r,K);r=l;if((a[r]&1)<<24>>24==0){a[l+1|0]=0;a[r]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dj(l,0);c[r>>2]=c[s>>2]|0;c[r+4>>2]=c[s+4>>2]|0;c[r+8>>2]=c[s+8>>2]|0;jP(s|0,0,12);bU[c[(c[L>>2]|0)+28>>2]&1023](t,K);t=k;if((a[t]&1)<<24>>24==0){a[k+1|0]=0;a[t]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dj(k,0);c[t>>2]=c[u>>2]|0;c[t+4>>2]=c[u+4>>2]|0;c[t+8>>2]=c[u+8>>2]|0;jP(u|0,0,12);u=b;a[f]=bW[c[(c[u>>2]|0)+12>>2]&1023](K)|0;a[g]=bW[c[(c[u>>2]|0)+16>>2]&1023](K)|0;bU[c[(c[L>>2]|0)+20>>2]&1023](v,K);v=h;if((a[v]&1)<<24>>24==0){a[h+1|0]=0;a[v]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dj(h,0);c[v>>2]=c[w>>2]|0;c[v+4>>2]=c[w+4>>2]|0;c[v+8>>2]=c[w+8>>2]|0;jP(w|0,0,12);bU[c[(c[L>>2]|0)+24>>2]&1023](x,K);x=j;if((a[x]&1)<<24>>24==0){a[j+1|0]=0;a[x]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dj(j,0);c[x>>2]=c[y>>2]|0;c[x+4>>2]=c[y+4>>2]|0;c[x+8>>2]=c[y+8>>2]|0;jP(y|0,0,12);y=bW[c[(c[b>>2]|0)+36>>2]&1023](K)|0;c[m>>2]=y;i=n;return}else{K=c[d>>2]|0;if((c[3388]|0)!=-1){c[o>>2]=13552;c[o+4>>2]=24;c[o+8>>2]=0;dh(13552,o,250)}o=(c[3389]|0)-1|0;d=c[K+8>>2]|0;if((c[K+12>>2]|0)-d>>2>>>0<=o>>>0){M=bf(4)|0;N=M;c[N>>2]=5e3;aO(M|0,10664,510)}K=c[d+(o<<2)>>2]|0;if((K|0)==0){M=bf(4)|0;N=M;c[N>>2]=5e3;aO(M|0,10664,510)}M=K;bU[c[(c[K>>2]|0)+44>>2]&1023](z,M);N=e;D=c[z>>2]|0;a[N]=D&255;D=D>>8;a[N+1|0]=D&255;D=D>>8;a[N+2|0]=D&255;D=D>>8;a[N+3|0]=D&255;N=K;bU[c[(c[N>>2]|0)+32>>2]&1023](A,M);A=l;if((a[A]&1)<<24>>24==0){a[l+1|0]=0;a[A]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dj(l,0);c[A>>2]=c[B>>2]|0;c[A+4>>2]=c[B+4>>2]|0;c[A+8>>2]=c[B+8>>2]|0;jP(B|0,0,12);bU[c[(c[N>>2]|0)+28>>2]&1023](C,M);C=k;if((a[C]&1)<<24>>24==0){a[k+1|0]=0;a[C]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dj(k,0);c[C>>2]=c[E>>2]|0;c[C+4>>2]=c[E+4>>2]|0;c[C+8>>2]=c[E+8>>2]|0;jP(E|0,0,12);E=K;a[f]=bW[c[(c[E>>2]|0)+12>>2]&1023](M)|0;a[g]=bW[c[(c[E>>2]|0)+16>>2]&1023](M)|0;bU[c[(c[N>>2]|0)+20>>2]&1023](F,M);F=h;if((a[F]&1)<<24>>24==0){a[h+1|0]=0;a[F]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dj(h,0);c[F>>2]=c[G>>2]|0;c[F+4>>2]=c[G+4>>2]|0;c[F+8>>2]=c[G+8>>2]|0;jP(G|0,0,12);bU[c[(c[N>>2]|0)+24>>2]&1023](H,M);H=j;if((a[H]&1)<<24>>24==0){a[j+1|0]=0;a[H]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dj(j,0);c[H>>2]=c[I>>2]|0;c[H+4>>2]=c[I+4>>2]|0;c[H+8>>2]=c[I+8>>2]|0;jP(I|0,0,12);y=bW[c[(c[K>>2]|0)+36>>2]&1023](M)|0;c[m>>2]=y;i=n;return}}function g1(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;d=i;i=i+600|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=d|0;m=d+16|0;n=d+416|0;o=d+424|0;p=d+432|0;q=d+440|0;r=d+448|0;s=d+456|0;t=d+496|0;u=n|0;c[u>>2]=m|0;v=n+4|0;c[v>>2]=416;w=p|0;x=c[h+28>>2]|0;c[w>>2]=x;y=x+4|0;J=c[y>>2]|0,c[y>>2]=J+1,J;y=c[w>>2]|0;if((c[3256]|0)!=-1){c[l>>2]=13024;c[l+4>>2]=24;c[l+8>>2]=0;dh(13024,l,250)}l=(c[3257]|0)-1|0;x=c[y+8>>2]|0;do{if((c[y+12>>2]|0)-x>>2>>>0>l>>>0){z=c[x+(l<<2)>>2]|0;if((z|0)==0){break}A=z;a[q]=0;B=f|0;c[r>>2]=c[B>>2]|0;do{if(g2(e,r,g,p,c[h+4>>2]|0,j,q,A,n,o,m+400|0)|0){D=s|0;E=c[(c[z>>2]|0)+48>>2]|0;b0[E&1023](A,4464,4474,D);E=t|0;F=c[o>>2]|0;G=c[u>>2]|0;H=F-G|0;do{if((H|0)>392){I=jA((H>>2)+2|0)|0;if((I|0)!=0){K=I;L=I;break}I=bf(4)|0;c[I>>2]=4968;aO(I|0,10648,66)}else{K=E;L=0}}while(0);if((a[q]&1)<<24>>24==0){M=K}else{a[K]=45;M=K+1|0}L2602:do{if(G>>>0<F>>>0){H=s+40|0;I=s;N=M;O=G;while(1){P=D;while(1){if((P|0)==(H|0)){Q=H;break}if((c[P>>2]|0)==(c[O>>2]|0)){Q=P;break}else{P=P+4|0}}a[N]=a[4464+(Q-I>>2)|0]|0;P=O+4|0;R=N+1|0;if(P>>>0<(c[o>>2]|0)>>>0){N=R;O=P}else{S=R;break L2602}}}else{S=M}}while(0);a[S]=0;if((aK(E|0,1408,(C=i,i=i+8|0,c[C>>2]=k,C)|0)|0)!=1){gY(1376)}if((L|0)==0){break}jB(L)}}while(0);A=e|0;z=c[A>>2]|0;do{if((z|0)==0){T=0}else{D=c[z+12>>2]|0;if((D|0)==(c[z+16>>2]|0)){U=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{U=c[D>>2]|0}if((U|0)!=-1){T=z;break}c[A>>2]=0;T=0}}while(0);A=(T|0)==0;z=c[B>>2]|0;do{if((z|0)==0){V=2187}else{D=c[z+12>>2]|0;if((D|0)==(c[z+16>>2]|0)){W=bW[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{W=c[D>>2]|0}if((W|0)==-1){c[B>>2]=0;V=2187;break}else{if(A^(z|0)==0){break}else{V=2189;break}}}}while(0);do{if((V|0)==2187){if(A){V=2189;break}else{break}}}while(0);if((V|0)==2189){c[j>>2]=c[j>>2]|2}c[b>>2]=T;A=c[w>>2]|0;z=A+4|0;if(((J=c[z>>2]|0,c[z>>2]=J+ -1,J)|0)==0){bT[c[(c[A>>2]|0)+8>>2]&1023](A|0)}A=c[u>>2]|0;c[u>>2]=0;if((A|0)==0){i=d;return}bT[c[v>>2]&1023](A);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function g2(b,e,f,g,h,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0;p=i;i=i+448|0;q=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[q>>2]|0;q=p|0;r=p+8|0;s=p+408|0;t=p+416|0;u=p+424|0;v=p+432|0;w=v;x=i;i=i+12|0;i=i+7>>3<<3;y=i;i=i+12|0;i=i+7>>3<<3;z=i;i=i+12|0;i=i+7>>3<<3;A=i;i=i+12|0;i=i+7>>3<<3;B=i;i=i+4|0;i=i+7>>3<<3;C=i;i=i+4|0;i=i+7>>3<<3;c[q>>2]=o;o=r|0;jP(w|0,0,12);D=x;E=y;F=z;G=A;jP(D|0,0,12);jP(E|0,0,12);jP(F|0,0,12);jP(G|0,0,12);g5(f,g,s,t,u,v,x,y,z,B);g=m|0;c[n>>2]=c[g>>2]|0;f=b|0;b=e|0;e=l;H=A+4|0;I=A+8|0;J=A|0;K=z+4|0;L=z+8|0;M=y+4|0;N=y+8|0;O=(h&512|0)!=0;h=x+4|0;P=x+8|0;x=s+3|0;Q=v+4|0;R=416;S=o;T=o;o=r+400|0;r=0;U=0;L2649:while(1){V=c[f>>2]|0;do{if((V|0)==0){W=1}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){Y=bW[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{Y=c[X>>2]|0}if((Y|0)==-1){c[f>>2]=0;W=1;break}else{W=(c[f>>2]|0)==0;break}}}while(0);V=c[b>>2]|0;do{if((V|0)==0){Z=2219}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){_=bW[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{_=c[X>>2]|0}if((_|0)==-1){c[b>>2]=0;Z=2219;break}else{if(W^(V|0)==0){$=V;break}else{aa=R;ab=S;ac=T;ad=r;Z=2485;break L2649}}}}while(0);if((Z|0)==2219){Z=0;if(W){aa=R;ab=S;ac=T;ad=r;Z=2485;break}else{$=0}}V=a[s+U|0]|0;L2673:do{if((V|0)==1){if((U|0)==3){aa=R;ab=S;ac=T;ad=r;Z=2485;break L2649}X=c[f>>2]|0;ae=c[X+12>>2]|0;if((ae|0)==(c[X+16>>2]|0)){af=bW[c[(c[X>>2]|0)+36>>2]&1023](X)|0}else{af=c[ae>>2]|0}if(!(bQ[c[(c[e>>2]|0)+12>>2]&1023](l,8192,af)|0)){Z=2260;break L2649}ae=c[f>>2]|0;X=ae+12|0;ag=c[X>>2]|0;if((ag|0)==(c[ae+16>>2]|0)){ah=bW[c[(c[ae>>2]|0)+40>>2]&1023](ae)|0}else{c[X>>2]=ag+4|0;ah=c[ag>>2]|0}ag=a[G]|0;if((ag&1)<<24>>24==0){ai=1;aj=ag}else{ag=c[J>>2]|0;ai=(ag&-2)-1|0;aj=ag&255}ag=aj&255;X=(ag&1|0)==0?ag>>>1:c[H>>2]|0;if((X|0)==(ai|0)){dU(A,ai,1,ai,ai,0,0);ak=a[G]|0}else{ak=aj}ag=(ak&1)<<24>>24==0?H:c[I>>2]|0;c[ag+(X<<2)>>2]=ah;ae=X+1|0;c[ag+(ae<<2)>>2]=0;if((a[G]&1)<<24>>24==0){a[G]=ae<<1&255;Z=2261;break}else{c[H>>2]=ae;Z=2261;break}}else if((V|0)==0){Z=2261}else if((V|0)==3){ae=a[E]|0;ag=ae&255;X=(ag&1|0)==0;al=a[F]|0;am=al&255;an=(am&1|0)==0;if(((X?ag>>>1:c[M>>2]|0)|0)==(-(an?am>>>1:c[K>>2]|0)|0)){ao=r;ap=o;aq=T;ar=S;as=R;break}do{if(((X?ag>>>1:c[M>>2]|0)|0)!=0){if(((an?am>>>1:c[K>>2]|0)|0)==0){break}at=c[f>>2]|0;au=c[at+12>>2]|0;if((au|0)==(c[at+16>>2]|0)){av=bW[c[(c[at>>2]|0)+36>>2]&1023](at)|0;aw=av;ax=a[E]|0}else{aw=c[au>>2]|0;ax=ae}au=c[f>>2]|0;av=au+12|0;at=c[av>>2]|0;ay=(at|0)==(c[au+16>>2]|0);if((aw|0)==(c[((ax&1)<<24>>24==0?M:c[N>>2]|0)>>2]|0)){if(ay){az=c[(c[au>>2]|0)+40>>2]|0;bW[az&1023](au)}else{c[av>>2]=at+4|0}av=d[E]|0;ao=((av&1|0)==0?av>>>1:c[M>>2]|0)>>>0>1?y:r;ap=o;aq=T;ar=S;as=R;break L2673}if(ay){aA=bW[c[(c[au>>2]|0)+36>>2]&1023](au)|0}else{aA=c[at>>2]|0}if((aA|0)!=(c[((a[F]&1)<<24>>24==0?K:c[L>>2]|0)>>2]|0)){Z=2333;break L2649}at=c[f>>2]|0;au=at+12|0;ay=c[au>>2]|0;if((ay|0)==(c[at+16>>2]|0)){av=c[(c[at>>2]|0)+40>>2]|0;bW[av&1023](at)}else{c[au>>2]=ay+4|0}a[k]=1;ay=d[F]|0;ao=((ay&1|0)==0?ay>>>1:c[K>>2]|0)>>>0>1?z:r;ap=o;aq=T;ar=S;as=R;break L2673}}while(0);am=c[f>>2]|0;an=c[am+12>>2]|0;ay=(an|0)==(c[am+16>>2]|0);if(((X?ag>>>1:c[M>>2]|0)|0)==0){if(ay){au=bW[c[(c[am>>2]|0)+36>>2]&1023](am)|0;aB=au;aC=a[F]|0}else{aB=c[an>>2]|0;aC=al}if((aB|0)!=(c[((aC&1)<<24>>24==0?K:c[L>>2]|0)>>2]|0)){ao=r;ap=o;aq=T;ar=S;as=R;break}au=c[f>>2]|0;at=au+12|0;av=c[at>>2]|0;if((av|0)==(c[au+16>>2]|0)){az=c[(c[au>>2]|0)+40>>2]|0;bW[az&1023](au)}else{c[at>>2]=av+4|0}a[k]=1;av=d[F]|0;ao=((av&1|0)==0?av>>>1:c[K>>2]|0)>>>0>1?z:r;ap=o;aq=T;ar=S;as=R;break}if(ay){ay=bW[c[(c[am>>2]|0)+36>>2]&1023](am)|0;aD=ay;aE=a[E]|0}else{aD=c[an>>2]|0;aE=ae}if((aD|0)!=(c[((aE&1)<<24>>24==0?M:c[N>>2]|0)>>2]|0)){a[k]=1;ao=r;ap=o;aq=T;ar=S;as=R;break}an=c[f>>2]|0;ay=an+12|0;am=c[ay>>2]|0;if((am|0)==(c[an+16>>2]|0)){av=c[(c[an>>2]|0)+40>>2]|0;bW[av&1023](an)}else{c[ay>>2]=am+4|0}am=d[E]|0;ao=((am&1|0)==0?am>>>1:c[M>>2]|0)>>>0>1?y:r;ap=o;aq=T;ar=S;as=R;break}else if((V|0)==2){if(!((r|0)!=0|U>>>0<2)){if((U|0)==2){aF=(a[x]|0)!=0}else{aF=0}if(!(O|aF)){ao=0;ap=o;aq=T;ar=S;as=R;break}}am=a[D]|0;ay=(am&1)<<24>>24==0?h:c[P>>2]|0;L2755:do{if((U|0)==0){aG=ay;aH=am;aI=$}else{if((d[s+(U-1|0)|0]|0)<2){aJ=ay;aK=am}else{aG=ay;aH=am;aI=$;break}while(1){an=aK&255;if((aJ|0)==(((aK&1)<<24>>24==0?h:c[P>>2]|0)+(((an&1|0)==0?an>>>1:c[h>>2]|0)<<2)|0)){aL=aK;break}if(!(bQ[c[(c[e>>2]|0)+12>>2]&1023](l,8192,c[aJ>>2]|0)|0)){Z=2344;break}aJ=aJ+4|0;aK=a[D]|0}if((Z|0)==2344){Z=0;aL=a[D]|0}an=(aL&1)<<24>>24==0;av=aJ-(an?h:c[P>>2]|0)>>2;at=a[G]|0;au=at&255;az=(au&1|0)==0;L2765:do{if(av>>>0<=(az?au>>>1:c[H>>2]|0)>>>0){aM=(at&1)<<24>>24==0;aN=(aM?H:c[I>>2]|0)+((az?au>>>1:c[H>>2]|0)-av<<2)|0;aO=(aM?H:c[I>>2]|0)+((az?au>>>1:c[H>>2]|0)<<2)|0;if((aN|0)==(aO|0)){aG=aJ;aH=aL;aI=$;break L2755}else{aP=aN;aQ=an?h:c[P>>2]|0}while(1){if((c[aP>>2]|0)!=(c[aQ>>2]|0)){break L2765}aN=aP+4|0;if((aN|0)==(aO|0)){aG=aJ;aH=aL;aI=$;break L2755}aP=aN;aQ=aQ+4|0}}}while(0);aG=an?h:c[P>>2]|0;aH=aL;aI=$;break}}while(0);L2772:while(1){am=aH&255;if((aG|0)==(((aH&1)<<24>>24==0?h:c[P>>2]|0)+(((am&1|0)==0?am>>>1:c[h>>2]|0)<<2)|0)){break}am=c[f>>2]|0;do{if((am|0)==0){aR=1}else{ay=c[am+12>>2]|0;if((ay|0)==(c[am+16>>2]|0)){aS=bW[c[(c[am>>2]|0)+36>>2]&1023](am)|0}else{aS=c[ay>>2]|0}if((aS|0)==-1){c[f>>2]=0;aR=1;break}else{aR=(c[f>>2]|0)==0;break}}}while(0);do{if((aI|0)==0){Z=2365}else{am=c[aI+12>>2]|0;if((am|0)==(c[aI+16>>2]|0)){aT=bW[c[(c[aI>>2]|0)+36>>2]&1023](aI)|0}else{aT=c[am>>2]|0}if((aT|0)==-1){c[b>>2]=0;Z=2365;break}else{if(aR^(aI|0)==0){aU=aI;break}else{break L2772}}}}while(0);if((Z|0)==2365){Z=0;if(aR){break}else{aU=0}}am=c[f>>2]|0;an=c[am+12>>2]|0;if((an|0)==(c[am+16>>2]|0)){aV=bW[c[(c[am>>2]|0)+36>>2]&1023](am)|0}else{aV=c[an>>2]|0}if((aV|0)!=(c[aG>>2]|0)){break}an=c[f>>2]|0;am=an+12|0;ay=c[am>>2]|0;if((ay|0)==(c[an+16>>2]|0)){ae=c[(c[an>>2]|0)+40>>2]|0;bW[ae&1023](an)}else{c[am>>2]=ay+4|0}aG=aG+4|0;aH=a[D]|0;aI=aU}if(!O){ao=r;ap=o;aq=T;ar=S;as=R;break}ay=a[D]|0;am=ay&255;if((aG|0)==(((ay&1)<<24>>24==0?h:c[P>>2]|0)+(((am&1|0)==0?am>>>1:c[h>>2]|0)<<2)|0)){ao=r;ap=o;aq=T;ar=S;as=R;break}else{Z=2377;break L2649}}else if((V|0)==4){am=0;ay=o;an=T;ae=S;al=R;L2808:while(1){ag=c[f>>2]|0;do{if((ag|0)==0){aW=1}else{X=c[ag+12>>2]|0;if((X|0)==(c[ag+16>>2]|0)){aX=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{aX=c[X>>2]|0}if((aX|0)==-1){c[f>>2]=0;aW=1;break}else{aW=(c[f>>2]|0)==0;break}}}while(0);ag=c[b>>2]|0;do{if((ag|0)==0){Z=2391}else{X=c[ag+12>>2]|0;if((X|0)==(c[ag+16>>2]|0)){aY=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{aY=c[X>>2]|0}if((aY|0)==-1){c[b>>2]=0;Z=2391;break}else{if(aW^(ag|0)==0){break}else{break L2808}}}}while(0);if((Z|0)==2391){Z=0;if(aW){break}}ag=c[f>>2]|0;X=c[ag+12>>2]|0;if((X|0)==(c[ag+16>>2]|0)){aZ=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{aZ=c[X>>2]|0}if(bQ[c[(c[e>>2]|0)+12>>2]&1023](l,2048,aZ)|0){X=c[n>>2]|0;if((X|0)==(c[q>>2]|0)){g8(m,n,q);a_=c[n>>2]|0}else{a_=X}c[n>>2]=a_+4|0;c[a_>>2]=aZ;a$=am+1|0;a0=ay;a1=an;a2=ae;a3=al}else{X=d[w]|0;if((((X&1|0)==0?X>>>1:c[Q>>2]|0)|0)==0|(am|0)==0){break}if((aZ|0)!=(c[u>>2]|0)){break}if((an|0)==(ay|0)){X=(al|0)!=416;ag=an-ae|0;au=ag>>>0<2147483647?ag<<1:-1;if(X){a4=ae}else{a4=0}X=jC(a4,au)|0;az=X;if((X|0)==0){Z=2408;break L2649}a5=az+(au>>>2<<2)|0;a6=az+(ag>>2<<2)|0;a7=az;a8=216}else{a5=ay;a6=an;a7=ae;a8=al}c[a6>>2]=am;a$=0;a0=a5;a1=a6+4|0;a2=a7;a3=a8}az=c[f>>2]|0;ag=az+12|0;au=c[ag>>2]|0;if((au|0)==(c[az+16>>2]|0)){X=c[(c[az>>2]|0)+40>>2]|0;bW[X&1023](az);am=a$;ay=a0;an=a1;ae=a2;al=a3;continue}else{c[ag>>2]=au+4|0;am=a$;ay=a0;an=a1;ae=a2;al=a3;continue}}if((ae|0)==(an|0)|(am|0)==0){a9=ay;ba=an;bb=ae;bc=al}else{if((an|0)==(ay|0)){au=(al|0)!=416;ag=an-ae|0;az=ag>>>0<2147483647?ag<<1:-1;if(au){bd=ae}else{bd=0}au=jC(bd,az)|0;X=au;if((au|0)==0){Z=2422;break L2649}be=X+(az>>>2<<2)|0;bf=X+(ag>>2<<2)|0;bg=X;bh=216}else{be=ay;bf=an;bg=ae;bh=al}c[bf>>2]=am;a9=be;ba=bf+4|0;bb=bg;bc=bh}X=c[B>>2]|0;L2874:do{if((X|0)>0){ag=c[f>>2]|0;do{if((ag|0)==0){bi=1}else{az=c[ag+12>>2]|0;if((az|0)==(c[ag+16>>2]|0)){bj=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bj=c[az>>2]|0}if((bj|0)==-1){c[f>>2]=0;bi=1;break}else{bi=(c[f>>2]|0)==0;break}}}while(0);ag=c[b>>2]|0;do{if((ag|0)==0){Z=2442}else{az=c[ag+12>>2]|0;if((az|0)==(c[ag+16>>2]|0)){bk=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bk=c[az>>2]|0}if((bk|0)==-1){c[b>>2]=0;Z=2442;break}else{if(bi^(ag|0)==0){bl=ag;break}else{Z=2448;break L2649}}}}while(0);if((Z|0)==2442){Z=0;if(bi){Z=2448;break L2649}else{bl=0}}ag=c[f>>2]|0;az=c[ag+12>>2]|0;if((az|0)==(c[ag+16>>2]|0)){bm=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bm=c[az>>2]|0}if((bm|0)!=(c[t>>2]|0)){Z=2448;break L2649}az=c[f>>2]|0;ag=az+12|0;au=c[ag>>2]|0;do{if((au|0)==(c[az+16>>2]|0)){av=c[(c[az>>2]|0)+40>>2]|0;bW[av&1023](az);bn=bl;bo=X;break}else{c[ag>>2]=au+4|0;bn=bl;bo=X;break}}while(0);while(1){au=c[f>>2]|0;do{if((au|0)==0){bp=1}else{ag=c[au+12>>2]|0;if((ag|0)==(c[au+16>>2]|0)){bq=bW[c[(c[au>>2]|0)+36>>2]&1023](au)|0}else{bq=c[ag>>2]|0}if((bq|0)==-1){c[f>>2]=0;bp=1;break}else{bp=(c[f>>2]|0)==0;break}}}while(0);do{if((bn|0)==0){Z=2465}else{au=c[bn+12>>2]|0;if((au|0)==(c[bn+16>>2]|0)){br=bW[c[(c[bn>>2]|0)+36>>2]&1023](bn)|0}else{br=c[au>>2]|0}if((br|0)==-1){c[b>>2]=0;Z=2465;break}else{if(bp^(bn|0)==0){bs=bn;break}else{Z=2472;break L2649}}}}while(0);if((Z|0)==2465){Z=0;if(bp){Z=2472;break L2649}else{bs=0}}au=c[f>>2]|0;ag=c[au+12>>2]|0;if((ag|0)==(c[au+16>>2]|0)){bt=bW[c[(c[au>>2]|0)+36>>2]&1023](au)|0}else{bt=c[ag>>2]|0}if(!(bQ[c[(c[e>>2]|0)+12>>2]&1023](l,2048,bt)|0)){Z=2472;break L2649}if((c[n>>2]|0)==(c[q>>2]|0)){g8(m,n,q)}ag=c[f>>2]|0;au=c[ag+12>>2]|0;if((au|0)==(c[ag+16>>2]|0)){bu=bW[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bu=c[au>>2]|0}au=c[n>>2]|0;c[n>>2]=au+4|0;c[au>>2]=bu;au=bo-1|0;c[B>>2]=au;ag=c[f>>2]|0;az=ag+12|0;av=c[az>>2]|0;if((av|0)==(c[ag+16>>2]|0)){at=c[(c[ag>>2]|0)+40>>2]|0;bW[at&1023](ag)}else{c[az>>2]=av+4|0}if((au|0)>0){bn=bs;bo=au}else{break L2874}}}}while(0);if((c[n>>2]|0)==(c[g>>2]|0)){Z=2483;break L2649}else{ao=r;ap=a9;aq=ba;ar=bb;as=bc;break}}else{ao=r;ap=o;aq=T;ar=S;as=R}}while(0);L2948:do{if((Z|0)==2261){Z=0;if((U|0)==3){aa=R;ab=S;ac=T;ad=r;Z=2485;break L2649}else{bv=$}while(1){V=c[f>>2]|0;do{if((V|0)==0){bw=1}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){bx=bW[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{bx=c[X>>2]|0}if((bx|0)==-1){c[f>>2]=0;bw=1;break}else{bw=(c[f>>2]|0)==0;break}}}while(0);do{if((bv|0)==0){Z=2275}else{V=c[bv+12>>2]|0;if((V|0)==(c[bv+16>>2]|0)){by=bW[c[(c[bv>>2]|0)+36>>2]&1023](bv)|0}else{by=c[V>>2]|0}if((by|0)==-1){c[b>>2]=0;Z=2275;break}else{if(bw^(bv|0)==0){bz=bv;break}else{ao=r;ap=o;aq=T;ar=S;as=R;break L2948}}}}while(0);if((Z|0)==2275){Z=0;if(bw){ao=r;ap=o;aq=T;ar=S;as=R;break L2948}else{bz=0}}V=c[f>>2]|0;X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){bA=bW[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{bA=c[X>>2]|0}if(!(bQ[c[(c[e>>2]|0)+12>>2]&1023](l,8192,bA)|0)){ao=r;ap=o;aq=T;ar=S;as=R;break L2948}X=c[f>>2]|0;V=X+12|0;am=c[V>>2]|0;if((am|0)==(c[X+16>>2]|0)){bB=bW[c[(c[X>>2]|0)+40>>2]&1023](X)|0}else{c[V>>2]=am+4|0;bB=c[am>>2]|0}am=a[G]|0;if((am&1)<<24>>24==0){bC=1;bD=am}else{am=c[J>>2]|0;bC=(am&-2)-1|0;bD=am&255}am=bD&255;V=(am&1|0)==0?am>>>1:c[H>>2]|0;if((V|0)==(bC|0)){dU(A,bC,1,bC,bC,0,0);bE=a[G]|0}else{bE=bD}am=(bE&1)<<24>>24==0?H:c[I>>2]|0;c[am+(V<<2)>>2]=bB;X=V+1|0;c[am+(X<<2)>>2]=0;if((a[G]&1)<<24>>24==0){a[G]=X<<1&255;bv=bz;continue}else{c[H>>2]=X;bv=bz;continue}}}}while(0);X=U+1|0;if(X>>>0<4){R=as;S=ar;T=aq;o=ap;r=ao;U=X}else{aa=as;ab=ar;ac=aq;ad=ao;Z=2485;break}}L2995:do{if((Z|0)==2260){c[j>>2]=c[j>>2]|4;bF=0;bG=S;bH=R}else if((Z|0)==2333){c[j>>2]=c[j>>2]|4;bF=0;bG=S;bH=R}else if((Z|0)==2377){c[j>>2]=c[j>>2]|4;bF=0;bG=S;bH=R}else if((Z|0)==2408){jO();return 0}else if((Z|0)==2422){jO();return 0}else if((Z|0)==2448){c[j>>2]=c[j>>2]|4;bF=0;bG=bb;bH=bc}else if((Z|0)==2472){c[j>>2]=c[j>>2]|4;bF=0;bG=bb;bH=bc}else if((Z|0)==2483){c[j>>2]=c[j>>2]|4;bF=0;bG=bb;bH=bc}else if((Z|0)==2485){L3007:do{if((ad|0)!=0){ao=ad;aq=ad+4|0;ar=ad+8|0;as=1;L3009:while(1){U=d[ao]|0;if((U&1|0)==0){bI=U>>>1}else{bI=c[aq>>2]|0}if(as>>>0>=bI>>>0){break L3007}U=c[f>>2]|0;do{if((U|0)==0){bJ=1}else{r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bK=bW[c[(c[U>>2]|0)+36>>2]&1023](U)|0}else{bK=c[r>>2]|0}if((bK|0)==-1){c[f>>2]=0;bJ=1;break}else{bJ=(c[f>>2]|0)==0;break}}}while(0);U=c[b>>2]|0;do{if((U|0)==0){Z=2504}else{r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bL=bW[c[(c[U>>2]|0)+36>>2]&1023](U)|0}else{bL=c[r>>2]|0}if((bL|0)==-1){c[b>>2]=0;Z=2504;break}else{if(bJ^(U|0)==0){break}else{break L3009}}}}while(0);if((Z|0)==2504){Z=0;if(bJ){break}}U=c[f>>2]|0;r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bM=bW[c[(c[U>>2]|0)+36>>2]&1023](U)|0}else{bM=c[r>>2]|0}if((a[ao]&1)<<24>>24==0){bN=aq}else{bN=c[ar>>2]|0}if((bM|0)!=(c[bN+(as<<2)>>2]|0)){break}r=as+1|0;U=c[f>>2]|0;ap=U+12|0;o=c[ap>>2]|0;if((o|0)==(c[U+16>>2]|0)){T=c[(c[U>>2]|0)+40>>2]|0;bW[T&1023](U);as=r;continue}else{c[ap>>2]=o+4|0;as=r;continue}}c[j>>2]=c[j>>2]|4;bF=0;bG=ab;bH=aa;break L2995}}while(0);if((ab|0)==(ac|0)){bF=1;bG=ac;bH=aa;break}c[C>>2]=0;eA(v,ab,ac,C);if((c[C>>2]|0)==0){bF=1;bG=ab;bH=aa;break}c[j>>2]=c[j>>2]|4;bF=0;bG=ab;bH=aa}}while(0);if((a[G]&1)<<24>>24!=0){jJ(c[I>>2]|0)}if((a[F]&1)<<24>>24!=0){jJ(c[L>>2]|0)}if((a[E]&1)<<24>>24!=0){jJ(c[N>>2]|0)}if((a[D]&1)<<24>>24!=0){jJ(c[P>>2]|0)}if((a[w]&1)<<24>>24!=0){jJ(c[v+8>>2]|0)}if((bG|0)==0){i=p;return bF|0}bT[bH&1023](bG);i=p;return bF|0}function g3(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)<<24>>24==0){k=1;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g>>2;if((h|0)==0){return b|0}if((k-j|0)>>>0<h>>>0){dU(b,k,(j+h|0)-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)<<24>>24==0){n=b+4|0}else{n=c[b+8>>2]|0}m=n+(j<<2)|0;if((d|0)==(e|0)){o=m}else{l=(j+(((e-4|0)+(-g|0)|0)>>>2)|0)+1|0;g=d;d=m;while(1){c[d>>2]=c[g>>2]|0;m=g+4|0;if((m|0)==(e|0)){break}else{g=m;d=d+4|0}}o=n+(l<<2)|0}c[o>>2]=0;o=j+h|0;if((a[f]&1)<<24>>24==0){a[f]=o<<1&255;return b|0}else{c[b+4>>2]=o;return b|0}return 0}function g4(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+456|0;l=e;e=i;i=i+4|0;i=i+7>>3<<3;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=d|0;m=d+16|0;n=d+416|0;o=d+424|0;p=d+432|0;q=d+440|0;r=d+448|0;s=n|0;c[s>>2]=m|0;t=n+4|0;c[t>>2]=416;u=p|0;v=c[h+28>>2]|0;c[u>>2]=v;w=v+4|0;J=c[w>>2]|0,c[w>>2]=J+1,J;w=c[u>>2]|0;if((c[3256]|0)!=-1){c[l>>2]=13024;c[l+4>>2]=24;c[l+8>>2]=0;dh(13024,l,250)}l=(c[3257]|0)-1|0;v=c[w+8>>2]|0;do{if((c[w+12>>2]|0)-v>>2>>>0>l>>>0){x=c[v+(l<<2)>>2]|0;if((x|0)==0){break}y=x;a[q]=0;z=f|0;A=c[z>>2]|0;c[r>>2]=A;if(g2(e,r,g,p,c[h+4>>2]|0,j,q,y,n,o,m+400|0)|0){B=k;if((a[B]&1)<<24>>24==0){c[k+4>>2]=0;a[B]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}C=x;do{if((a[q]&1)<<24>>24!=0){x=b3[c[(c[C>>2]|0)+44>>2]&1023](y,45)|0;D=a[B]|0;if((D&1)<<24>>24==0){E=1;F=D}else{D=c[k>>2]|0;E=(D&-2)-1|0;F=D&255}D=F&255;if((D&1|0)==0){G=D>>>1}else{G=c[k+4>>2]|0}if((G|0)==(E|0)){dU(k,E,1,E,E,0,0);H=a[B]|0}else{H=F}if((H&1)<<24>>24==0){I=k+4|0}else{I=c[k+8>>2]|0}c[I+(G<<2)>>2]=x;x=G+1|0;c[I+(x<<2)>>2]=0;if((a[B]&1)<<24>>24==0){a[B]=x<<1&255;break}else{c[k+4>>2]=x;break}}}while(0);B=b3[c[(c[C>>2]|0)+44>>2]&1023](y,48)|0;x=c[o>>2]|0;D=x-4|0;K=c[s>>2]|0;while(1){if(K>>>0>=D>>>0){break}if((c[K>>2]|0)==(B|0)){K=K+4|0}else{break}}g3(k,K,x)}B=e|0;D=c[B>>2]|0;do{if((D|0)==0){L=0}else{y=c[D+12>>2]|0;if((y|0)==(c[D+16>>2]|0)){M=bW[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{M=c[y>>2]|0}if((M|0)!=-1){L=D;break}c[B>>2]=0;L=0}}while(0);B=(L|0)==0;do{if((A|0)==0){N=2605}else{D=c[A+12>>2]|0;if((D|0)==(c[A+16>>2]|0)){O=bW[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{O=c[D>>2]|0}if((O|0)==-1){c[z>>2]=0;N=2605;break}else{if(B^(A|0)==0){break}else{N=2607;break}}}}while(0);do{if((N|0)==2605){if(B){N=2607;break}else{break}}}while(0);if((N|0)==2607){c[j>>2]=c[j>>2]|2}c[b>>2]=L;B=c[u>>2]|0;A=B+4|0;if(((J=c[A>>2]|0,c[A>>2]=J+ -1,J)|0)==0){bT[c[(c[B>>2]|0)+8>>2]&1023](B|0)}B=c[s>>2]|0;c[s>>2]=0;if((B|0)==0){i=d;return}bT[c[t>>2]&1023](B);i=d;return}}while(0);d=bf(4)|0;c[d>>2]=5e3;aO(d|0,10664,510)}function g5(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;n=i;i=i+56|0;o=n|0;p=n+16|0;q=n+32|0;r=n+40|0;s=r;t=i;i=i+12|0;i=i+7>>3<<3;u=t;v=i;i=i+12|0;i=i+7>>3<<3;w=v;x=i;i=i+12|0;i=i+7>>3<<3;y=x;z=i;i=i+4|0;i=i+7>>3<<3;A=i;i=i+12|0;i=i+7>>3<<3;B=A;C=i;i=i+12|0;i=i+7>>3<<3;E=C;F=i;i=i+12|0;i=i+7>>3<<3;G=F;H=i;i=i+12|0;i=i+7>>3<<3;I=H;if(b){b=c[d>>2]|0;if((c[3382]|0)!=-1){c[p>>2]=13528;c[p+4>>2]=24;c[p+8>>2]=0;dh(13528,p,250)}p=(c[3383]|0)-1|0;J=c[b+8>>2]|0;if((c[b+12>>2]|0)-J>>2>>>0<=p>>>0){K=bf(4)|0;L=K;c[L>>2]=5e3;aO(K|0,10664,510)}b=c[J+(p<<2)>>2]|0;if((b|0)==0){K=bf(4)|0;L=K;c[L>>2]=5e3;aO(K|0,10664,510)}K=b;bU[c[(c[b>>2]|0)+44>>2]&1023](q,K);L=e;D=c[q>>2]|0;a[L]=D&255;D=D>>8;a[L+1|0]=D&255;D=D>>8;a[L+2|0]=D&255;D=D>>8;a[L+3|0]=D&255;L=b;bU[c[(c[L>>2]|0)+32>>2]&1023](r,K);r=l;if((a[r]&1)<<24>>24==0){c[l+4>>2]=0;a[r]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dS(l,0);c[r>>2]=c[s>>2]|0;c[r+4>>2]=c[s+4>>2]|0;c[r+8>>2]=c[s+8>>2]|0;jP(s|0,0,12);bU[c[(c[L>>2]|0)+28>>2]&1023](t,K);t=k;if((a[t]&1)<<24>>24==0){c[k+4>>2]=0;a[t]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dS(k,0);c[t>>2]=c[u>>2]|0;c[t+4>>2]=c[u+4>>2]|0;c[t+8>>2]=c[u+8>>2]|0;jP(u|0,0,12);u=b;c[f>>2]=bW[c[(c[u>>2]|0)+12>>2]&1023](K)|0;c[g>>2]=bW[c[(c[u>>2]|0)+16>>2]&1023](K)|0;bU[c[(c[b>>2]|0)+20>>2]&1023](v,K);v=h;if((a[v]&1)<<24>>24==0){a[h+1|0]=0;a[v]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dj(h,0);c[v>>2]=c[w>>2]|0;c[v+4>>2]=c[w+4>>2]|0;c[v+8>>2]=c[w+8>>2]|0;jP(w|0,0,12);bU[c[(c[L>>2]|0)+24>>2]&1023](x,K);x=j;if((a[x]&1)<<24>>24==0){c[j+4>>2]=0;a[x]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}dS(j,0);c[x>>2]=c[y>>2]|0;c[x+4>>2]=c[y+4>>2]|0;c[x+8>>2]=c[y+8>>2]|0;jP(y|0,0,12);y=bW[c[(c[u>>2]|0)+36>>2]&1023](K)|0;c[m>>2]=y;i=n;return}else{K=c[d>>2]|0;if((c[3384]|0)!=-1){c[o>>2]=13536;c[o+4>>2]=24;c[o+8>>2]=0;dh(13536,o,250)}o=(c[3385]|0)-1|0;d=c[K+8>>2]|0;if((c[K+12>>2]|0)-d>>2>>>0<=o>>>0){M=bf(4)|0;N=M;c[N>>2]=5e3;aO(M|0,10664,510)}K=c[d+(o<<2)>>2]|0;if((K|0)==0){M=bf(4)|0;N=M;c[N>>2]=5e3;aO(M|0,10664,510)}M=K;bU[c[(c[K>>2]|0)+44>>2]&1023](z,M);N=e;D=c[z>>2]|0;a[N]=D&255;D=D>>8;a[N+1|0]=D&255;D=D>>8;a[N+2|0]=D&255;D=D>>8;a[N+3|0]=D&255;N=K;bU[c[(c[N>>2]|0)+32>>2]&1023](A,M);A=l;if((a[A]&1)<<24>>24==0){c[l+4>>2]=0;a[A]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dS(l,0);c[A>>2]=c[B>>2]|0;c[A+4>>2]=c[B+4>>2]|0;c[A+8>>2]=c[B+8>>2]|0;jP(B|0,0,12);bU[c[(c[N>>2]|0)+28>>2]&1023](C,M);C=k;if((a[C]&1)<<24>>24==0){c[k+4>>2]=0;a[C]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dS(k,0);c[C>>2]=c[E>>2]|0;c[C+4>>2]=c[E+4>>2]|0;c[C+8>>2]=c[E+8>>2]|0;jP(E|0,0,12);E=K;c[f>>2]=bW[c[(c[E>>2]|0)+12>>2]&1023](M)|0;c[g>>2]=bW[c[(c[E>>2]|0)+16>>2]&1023](M)|0;bU[c[(c[K>>2]|0)+20>>2]&1023](F,M);F=h;if((a[F]&1)<<24>>24==0){a[h+1|0]=0;a[F]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dj(h,0);c[F>>2]=c[G>>2]|0;c[F+4>>2]=c[G+4>>2]|0;c[F+8>>2]=c[G+8>>2]|0;jP(G|0,0,12);bU[c[(c[N>>2]|0)+24>>2]&1023](H,M);H=j;if((a[H]&1)<<24>>24==0){c[j+4>>2]=0;a[H]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}dS(j,0);c[H>>2]=c[I>>2]|0;c[H+4>>2]=c[I+4>>2]|0;c[H+8>>2]=c[I+8>>2]|0;jP(I|0,0,12);y=bW[c[(c[E>>2]|0)+36>>2]&1023](M)|0;c[m>>2]=y;i=n;return}}function g6(a){a=a|0;return}function g7(a){a=a|0;jJ(a);return}function g8(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a+4|0;f=(c[e>>2]|0)!=416;g=a|0;a=c[g>>2]|0;h=a;i=(c[d>>2]|0)-h|0;j=i>>>0<2147483647?i<<1:-1;i=(c[b>>2]|0)-h>>2;if(f){k=a}else{k=0}a=jC(k,j)|0;k=a;if((a|0)==0){jO()}do{if(f){c[g>>2]=k;l=k}else{a=c[g>>2]|0;c[g>>2]=k;if((a|0)==0){l=k;break}bT[c[e>>2]&1023](a);l=c[g>>2]|0}}while(0);c[e>>2]=216;c[b>>2]=l+(i<<2)|0;c[d>>2]=(c[g>>2]|0)+(j>>>2<<2)|0;return}function g9(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;e=i;i=i+280|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=e|0;n=e+120|0;o=e+232|0;p=e+240|0;q=e+248|0;r=e+256|0;s=e+264|0;t=s;u=i;i=i+12|0;i=i+7>>3<<3;v=u;w=i;i=i+12|0;i=i+7>>3<<3;x=w;y=i;i=i+4|0;i=i+7>>3<<3;z=i;i=i+100|0;i=i+7>>3<<3;A=i;i=i+4|0;i=i+7>>3<<3;B=i;i=i+4|0;i=i+7>>3<<3;D=i;i=i+4|0;i=i+7>>3<<3;E=e+16|0;c[n>>2]=E;F=e+128|0;G=aL(E|0,100,1352,(C=i,i=i+8|0,h[C>>3]=l,C)|0)|0;do{if(G>>>0>99){if(a[13632]|0){H=c[994]|0}else{E=bD(1,1320,0)|0;c[994]=E;a[13632]=1;H=E}E=fm(n,H,1352,(C=i,i=i+8|0,h[C>>3]=l,C)|0)|0;I=c[n>>2]|0;if((I|0)==0){K=bf(4)|0;c[K>>2]=4968;aO(K|0,10648,66)}K=jA(E)|0;if((K|0)!=0){L=K;M=E;N=I;O=K;break}K=bf(4)|0;c[K>>2]=4968;aO(K|0,10648,66)}else{L=F;M=G;N=0;O=0}}while(0);G=o|0;F=c[j+28>>2]|0;c[G>>2]=F;H=F+4|0;J=c[H>>2]|0,c[H>>2]=J+1,J;H=c[G>>2]|0;if((c[3258]|0)!=-1){c[m>>2]=13032;c[m+4>>2]=24;c[m+8>>2]=0;dh(13032,m,250)}m=(c[3259]|0)-1|0;F=c[H+8>>2]|0;do{if((c[H+12>>2]|0)-F>>2>>>0>m>>>0){K=c[F+(m<<2)>>2]|0;if((K|0)==0){break}I=K;E=c[n>>2]|0;b0[c[(c[K>>2]|0)+32>>2]&1023](I,E,E+M|0,L);if((M|0)==0){P=0}else{P=(a[c[n>>2]|0]|0)==45}jP(t|0,0,12);jP(v|0,0,12);jP(x|0,0,12);ha(g,P,o,p,q,r,s,u,w,y);E=z|0;K=c[y>>2]|0;if((M|0)>(K|0)){Q=d[x]|0;if((Q&1|0)==0){R=Q>>>1}else{R=c[w+4>>2]|0}Q=d[v]|0;if((Q&1|0)==0){S=Q>>>1}else{S=c[u+4>>2]|0}T=((M-K<<1|1)+R|0)+S|0}else{Q=d[x]|0;if((Q&1|0)==0){U=Q>>>1}else{U=c[w+4>>2]|0}Q=d[v]|0;if((Q&1|0)==0){V=Q>>>1}else{V=c[u+4>>2]|0}T=(U+2|0)+V|0}Q=T+K|0;do{if(Q>>>0>100){W=jA(Q)|0;if((W|0)!=0){X=W;Y=W;break}W=bf(4)|0;c[W>>2]=4968;aO(W|0,10648,66)}else{X=E;Y=0}}while(0);hc(X,A,B,c[j+4>>2]|0,L,L+M|0,I,P,p,a[q]|0,a[r]|0,s,u,w,K);c[D>>2]=c[f>>2]|0;ff(b,D,X,c[A>>2]|0,c[B>>2]|0,j,k);if((Y|0)!=0){jB(Y)}if((a[x]&1)<<24>>24!=0){jJ(c[w+8>>2]|0)}if((a[v]&1)<<24>>24!=0){jJ(c[u+8>>2]|0)}if((a[t]&1)<<24>>24!=0){jJ(c[s+8>>2]|0)}E=c[G>>2]|0;Q=E+4|0;if(((J=c[Q>>2]|0,c[Q>>2]=J+ -1,J)|0)==0){bT[c[(c[E>>2]|0)+8>>2]&1023](E|0)}if((O|0)!=0){jB(O)}if((N|0)==0){i=e;return}jB(N);i=e;return}}while(0);e=bf(4)|0;c[e>>2]=5e3;aO(e|0,10664,510)}function ha(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;n=i;i=i+40|0;o=n|0;p=n+16|0;q=n+32|0;r=q;s=i;i=i+12|0;i=i+7>>3<<3;t=s;u=i;i=i+4|0;i=i+7>>3<<3;v=u;w=i;i=i+12|0;i=i+7>>3<<3;x=w;y=i;i=i+12|0;i=i+7>>3<<3;z=y;A=i;i=i+12|0;i=i+7>>3<<3;B=A;C=i;i=i+4|0;i=i+7>>3<<3;E=C;F=i;i=i+12|0;i=i+7>>3<<3;G=F;H=i;i=i+4|0;i=i+7>>3<<3;I=H;J=i;i=i+12|0;i=i+7>>3<<3;K=J;L=i;i=i+12|0;i=i+7>>3<<3;M=L;N=i;i=i+12|0;i=i+7>>3<<3;O=N;P=c[e>>2]|0;if(b){if((c[3386]|0)!=-1){c[p>>2]=13544;c[p+4>>2]=24;c[p+8>>2]=0;dh(13544,p,250)}p=(c[3387]|0)-1|0;b=c[P+8>>2]|0;if((c[P+12>>2]|0)-b>>2>>>0<=p>>>0){Q=bf(4)|0;R=Q;c[R>>2]=5e3;aO(Q|0,10664,510)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){Q=bf(4)|0;R=Q;c[R>>2]=5e3;aO(Q|0,10664,510)}Q=e;R=c[e>>2]|0;if(d){bU[c[R+44>>2]&1023](r,Q);r=f;D=c[q>>2]|0;a[r]=D&255;D=D>>8;a[r+1|0]=D&255;D=D>>8;a[r+2|0]=D&255;D=D>>8;a[r+3|0]=D&255;bU[c[(c[e>>2]|0)+32>>2]&1023](s,Q);s=l;if((a[s]&1)<<24>>24==0){a[l+1|0]=0;a[s]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dj(l,0);c[s>>2]=c[t>>2]|0;c[s+4>>2]=c[t+4>>2]|0;c[s+8>>2]=c[t+8>>2]|0;jP(t|0,0,12)}else{bU[c[R+40>>2]&1023](v,Q);v=f;D=c[u>>2]|0;a[v]=D&255;D=D>>8;a[v+1|0]=D&255;D=D>>8;a[v+2|0]=D&255;D=D>>8;a[v+3|0]=D&255;bU[c[(c[e>>2]|0)+28>>2]&1023](w,Q);w=l;if((a[w]&1)<<24>>24==0){a[l+1|0]=0;a[w]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dj(l,0);c[w>>2]=c[x>>2]|0;c[w+4>>2]=c[x+4>>2]|0;c[w+8>>2]=c[x+8>>2]|0;jP(x|0,0,12)}x=e;a[g]=bW[c[(c[x>>2]|0)+12>>2]&1023](Q)|0;a[h]=bW[c[(c[x>>2]|0)+16>>2]&1023](Q)|0;x=e;bU[c[(c[x>>2]|0)+20>>2]&1023](y,Q);y=j;if((a[y]&1)<<24>>24==0){a[j+1|0]=0;a[y]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dj(j,0);c[y>>2]=c[z>>2]|0;c[y+4>>2]=c[z+4>>2]|0;c[y+8>>2]=c[z+8>>2]|0;jP(z|0,0,12);bU[c[(c[x>>2]|0)+24>>2]&1023](A,Q);A=k;if((a[A]&1)<<24>>24==0){a[k+1|0]=0;a[A]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dj(k,0);c[A>>2]=c[B>>2]|0;c[A+4>>2]=c[B+4>>2]|0;c[A+8>>2]=c[B+8>>2]|0;jP(B|0,0,12);B=bW[c[(c[e>>2]|0)+36>>2]&1023](Q)|0;c[m>>2]=B;i=n;return}else{if((c[3388]|0)!=-1){c[o>>2]=13552;c[o+4>>2]=24;c[o+8>>2]=0;dh(13552,o,250)}o=(c[3389]|0)-1|0;Q=c[P+8>>2]|0;if((c[P+12>>2]|0)-Q>>2>>>0<=o>>>0){S=bf(4)|0;T=S;c[T>>2]=5e3;aO(S|0,10664,510)}P=c[Q+(o<<2)>>2]|0;if((P|0)==0){S=bf(4)|0;T=S;c[T>>2]=5e3;aO(S|0,10664,510)}S=P;T=c[P>>2]|0;if(d){bU[c[T+44>>2]&1023](E,S);E=f;D=c[C>>2]|0;a[E]=D&255;D=D>>8;a[E+1|0]=D&255;D=D>>8;a[E+2|0]=D&255;D=D>>8;a[E+3|0]=D&255;bU[c[(c[P>>2]|0)+32>>2]&1023](F,S);F=l;if((a[F]&1)<<24>>24==0){a[l+1|0]=0;a[F]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dj(l,0);c[F>>2]=c[G>>2]|0;c[F+4>>2]=c[G+4>>2]|0;c[F+8>>2]=c[G+8>>2]|0;jP(G|0,0,12)}else{bU[c[T+40>>2]&1023](I,S);I=f;D=c[H>>2]|0;a[I]=D&255;D=D>>8;a[I+1|0]=D&255;D=D>>8;a[I+2|0]=D&255;D=D>>8;a[I+3|0]=D&255;bU[c[(c[P>>2]|0)+28>>2]&1023](J,S);J=l;if((a[J]&1)<<24>>24==0){a[l+1|0]=0;a[J]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dj(l,0);c[J>>2]=c[K>>2]|0;c[J+4>>2]=c[K+4>>2]|0;c[J+8>>2]=c[K+8>>2]|0;jP(K|0,0,12)}K=P;a[g]=bW[c[(c[K>>2]|0)+12>>2]&1023](S)|0;a[h]=bW[c[(c[K>>2]|0)+16>>2]&1023](S)|0;K=P;bU[c[(c[K>>2]|0)+20>>2]&1023](L,S);L=j;if((a[L]&1)<<24>>24==0){a[j+1|0]=0;a[L]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dj(j,0);c[L>>2]=c[M>>2]|0;c[L+4>>2]=c[M+4>>2]|0;c[L+8>>2]=c[M+8>>2]|0;jP(M|0,0,12);bU[c[(c[K>>2]|0)+24>>2]&1023](N,S);N=k;if((a[N]&1)<<24>>24==0){a[k+1|0]=0;a[N]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dj(k,0);c[N>>2]=c[O>>2]|0;c[N+4>>2]=c[O+4>>2]|0;c[N+8>>2]=c[O+8>>2]|0;jP(O|0,0,12);B=bW[c[(c[P>>2]|0)+36>>2]&1023](S)|0;c[m>>2]=B;i=n;return}}function hb(a){a=a|0;return}function hc(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0;c[f>>2]=d;s=j;t=q;u=q+1|0;v=q+8|0;w=q+4|0;q=p;x=(g&512|0)==0;y=p+1|0;z=p+4|0;A=p+8|0;p=j+8|0;B=(r|0)>0;C=o;D=o+1|0;E=o+8|0;F=o+4|0;o=-r|0;G=h;h=0;while(1){H=a[l+h|0]|0;L3408:do{if((H|0)==4){I=c[f>>2]|0;J=k?G+1|0:G;K=J;while(1){if(K>>>0>=i>>>0){break}L=a[K]|0;if(L<<24>>24<=-1){break}if((b[(c[p>>2]|0)+(L<<24>>24<<1)>>1]&2048)<<16>>16==0){break}else{K=K+1|0}}L=K;if(B){do{if(K>>>0>J>>>0){M=J+(-L|0)|0;N=M>>>0<o>>>0?o:M;M=N+r|0;O=K;P=r;Q=I;while(1){R=O-1|0;S=a[R]|0;c[f>>2]=Q+1|0;a[Q]=S;S=P-1|0;T=(S|0)>0;if(!(R>>>0>J>>>0&T)){break}O=R;P=S;Q=c[f>>2]|0}Q=K+N|0;if(T){U=M;V=Q;W=2871;break}else{X=0;Y=M;Z=Q;break}}else{U=r;V=K;W=2871}}while(0);if((W|0)==2871){W=0;X=b3[c[(c[s>>2]|0)+28>>2]&1023](j,48)|0;Y=U;Z=V}L=c[f>>2]|0;c[f>>2]=L+1|0;L3426:do{if((Y|0)>0){Q=Y;P=L;while(1){a[P]=X;O=Q-1|0;S=c[f>>2]|0;c[f>>2]=S+1|0;if((O|0)>0){Q=O;P=S}else{_=S;break L3426}}}else{_=L}}while(0);a[_]=m;$=Z}else{$=K}L3431:do{if(($|0)==(J|0)){L=b3[c[(c[s>>2]|0)+28>>2]&1023](j,48)|0;P=c[f>>2]|0;c[f>>2]=P+1|0;a[P]=L}else{L=a[C]|0;P=L&255;if((P&1|0)==0){aa=P>>>1}else{aa=c[F>>2]|0}do{if((aa|0)==0){ab=$;ac=0;ad=0;ae=-1}else{if((L&1)<<24>>24==0){af=D}else{af=c[E>>2]|0}ab=$;ac=0;ad=0;ae=a[af]|0;break}}while(0);while(1){do{if((ac|0)==(ae|0)){L=c[f>>2]|0;c[f>>2]=L+1|0;a[L]=n;L=ad+1|0;P=a[C]|0;Q=P&255;if((Q&1|0)==0){ag=Q>>>1}else{ag=c[F>>2]|0}if(L>>>0>=ag>>>0){ah=ae;ai=L;aj=0;break}Q=(P&1)<<24>>24==0;if(Q){ak=D}else{ak=c[E>>2]|0}if((a[ak+L|0]|0)==127){ah=-1;ai=L;aj=0;break}if(Q){al=D}else{al=c[E>>2]|0}ah=a[al+L|0]|0;ai=L;aj=0}else{ah=ae;ai=ad;aj=ac}}while(0);L=ab-1|0;Q=a[L]|0;P=c[f>>2]|0;c[f>>2]=P+1|0;a[P]=Q;if((L|0)==(J|0)){break L3431}else{ab=L;ac=aj+1|0;ad=ai;ae=ah}}}}while(0);K=c[f>>2]|0;if((I|0)==(K|0)){am=J;break}L=K-1|0;if(I>>>0<L>>>0){an=I;ao=L}else{am=J;break}while(1){L=a[an]|0;a[an]=a[ao]|0;a[ao]=L;L=an+1|0;K=ao-1|0;if(L>>>0<K>>>0){an=L;ao=K}else{am=J;break L3408}}}else if((H|0)==2){J=a[q]|0;I=J&255;K=(I&1|0)==0;if(K){ap=I>>>1}else{ap=c[z>>2]|0}if((ap|0)==0|x){am=G;break}if((J&1)<<24>>24==0){aq=y;ar=y}else{J=c[A>>2]|0;aq=J;ar=J}if(K){as=I>>>1}else{as=c[z>>2]|0}I=aq+as|0;K=c[f>>2]|0;L3477:do{if((ar|0)==(I|0)){at=K}else{J=ar;L=K;while(1){a[L]=a[J]|0;Q=J+1|0;P=L+1|0;if((Q|0)==(I|0)){at=P;break L3477}else{J=Q;L=P}}}}while(0);c[f>>2]=at;am=G}else if((H|0)==3){I=a[t]|0;K=I&255;if((K&1|0)==0){au=K>>>1}else{au=c[w>>2]|0}if((au|0)==0){am=G;break}if((I&1)<<24>>24==0){av=u}else{av=c[v>>2]|0}I=a[av]|0;K=c[f>>2]|0;c[f>>2]=K+1|0;a[K]=I;am=G}else if((H|0)==0){c[e>>2]=c[f>>2]|0;am=G}else if((H|0)==1){c[e>>2]=c[f>>2]|0;I=b3[c[(c[s>>2]|0)+28>>2]&1023](j,32)|0;K=c[f>>2]|0;c[f>>2]=K+1|0;a[K]=I;am=G}else{am=G}}while(0);H=h+1|0;if(H>>>0<4){G=am;h=H}else{break}}h=a[t]|0;t=h&255;am=(t&1|0)==0;if(am){aw=t>>>1}else{aw=c[w>>2]|0}if(aw>>>0>1){if((h&1)<<24>>24==0){ax=u;ay=u}else{u=c[v>>2]|0;ax=u;ay=u}if(am){az=t>>>1}else{az=c[w>>2]|0}w=ax+az|0;az=c[f>>2]|0;ax=ay+1|0;L3507:do{if((ax|0)==(w|0)){aA=az}else{ay=az;t=ax;while(1){a[ay]=a[t]|0;am=ay+1|0;u=t+1|0;if((u|0)==(w|0)){aA=am;break L3507}else{ay=am;t=u}}}}while(0);c[f>>2]=aA}aA=g&176;if((aA|0)==32){c[e>>2]=c[f>>2]|0;return}else if((aA|0)==16){return}else{c[e>>2]=d;return}}function hd(a){a=a|0;jJ(a);return}function he(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;e=i;i=i+64|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=e|0;m=e+16|0;n=e+24|0;o=e+32|0;p=e+40|0;q=e+48|0;r=q;s=i;i=i+12|0;i=i+7>>3<<3;t=s;u=i;i=i+12|0;i=i+7>>3<<3;v=u;w=i;i=i+4|0;i=i+7>>3<<3;x=i;i=i+100|0;i=i+7>>3<<3;y=i;i=i+4|0;i=i+7>>3<<3;z=i;i=i+4|0;i=i+7>>3<<3;A=i;i=i+4|0;i=i+7>>3<<3;B=m|0;C=c[h+28>>2]|0;c[B>>2]=C;D=C+4|0;J=c[D>>2]|0,c[D>>2]=J+1,J;D=c[B>>2]|0;if((c[3258]|0)!=-1){c[l>>2]=13032;c[l+4>>2]=24;c[l+8>>2]=0;dh(13032,l,250)}l=(c[3259]|0)-1|0;C=c[D+8>>2]|0;do{if((c[D+12>>2]|0)-C>>2>>>0>l>>>0){E=c[C+(l<<2)>>2]|0;if((E|0)==0){break}F=E;G=k;H=k;I=a[H]|0;K=I&255;if((K&1|0)==0){L=K>>>1}else{L=c[k+4>>2]|0}if((L|0)==0){M=0}else{if((I&1)<<24>>24==0){N=G+1|0}else{N=c[k+8>>2]|0}I=a[N]|0;M=I<<24>>24==b3[c[(c[E>>2]|0)+28>>2]&1023](F,45)<<24>>24}jP(r|0,0,12);jP(t|0,0,12);jP(v|0,0,12);ha(g,M,m,n,o,p,q,s,u,w);E=x|0;I=a[H]|0;K=I&255;O=(K&1|0)==0;if(O){P=K>>>1}else{P=c[k+4>>2]|0}Q=c[w>>2]|0;if((P|0)>(Q|0)){if(O){R=K>>>1}else{R=c[k+4>>2]|0}K=d[v]|0;if((K&1|0)==0){S=K>>>1}else{S=c[u+4>>2]|0}K=d[t]|0;if((K&1|0)==0){T=K>>>1}else{T=c[s+4>>2]|0}U=((R-Q<<1|1)+S|0)+T|0}else{K=d[v]|0;if((K&1|0)==0){V=K>>>1}else{V=c[u+4>>2]|0}K=d[t]|0;if((K&1|0)==0){W=K>>>1}else{W=c[s+4>>2]|0}U=(V+2|0)+W|0}K=U+Q|0;do{if(K>>>0>100){O=jA(K)|0;if((O|0)!=0){X=O;Y=O;Z=a[H]|0;break}O=bf(4)|0;c[O>>2]=4968;aO(O|0,10648,66)}else{X=E;Y=0;Z=I}}while(0);if((Z&1)<<24>>24==0){_=G+1|0;$=G+1|0}else{I=c[k+8>>2]|0;_=I;$=I}I=Z&255;if((I&1|0)==0){aa=I>>>1}else{aa=c[k+4>>2]|0}hc(X,y,z,c[h+4>>2]|0,$,_+aa|0,F,M,n,a[o]|0,a[p]|0,q,s,u,Q);c[A>>2]=c[f>>2]|0;ff(b,A,X,c[y>>2]|0,c[z>>2]|0,h,j);if((Y|0)!=0){jB(Y)}if((a[v]&1)<<24>>24!=0){jJ(c[u+8>>2]|0)}if((a[t]&1)<<24>>24!=0){jJ(c[s+8>>2]|0)}if((a[r]&1)<<24>>24!=0){jJ(c[q+8>>2]|0)}I=c[B>>2]|0;E=I+4|0;if(((J=c[E>>2]|0,c[E>>2]=J+ -1,J)|0)!=0){i=e;return}bT[c[(c[I>>2]|0)+8>>2]&1023](I|0);i=e;return}}while(0);e=bf(4)|0;c[e>>2]=5e3;aO(e|0,10664,510)}function hf(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=+l;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;e=i;i=i+576|0;m=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[m>>2]|0;m=e|0;n=e+120|0;o=e+528|0;p=e+536|0;q=e+544|0;r=e+552|0;s=e+560|0;t=s;u=i;i=i+12|0;i=i+7>>3<<3;v=u;w=i;i=i+12|0;i=i+7>>3<<3;x=w;y=i;i=i+4|0;i=i+7>>3<<3;z=i;i=i+400|0;A=i;i=i+4|0;i=i+7>>3<<3;B=i;i=i+4|0;i=i+7>>3<<3;D=i;i=i+4|0;i=i+7>>3<<3;E=e+16|0;c[n>>2]=E;F=e+128|0;G=aL(E|0,100,1352,(C=i,i=i+8|0,h[C>>3]=l,C)|0)|0;do{if(G>>>0>99){if(a[13632]|0){H=c[994]|0}else{E=bD(1,1320,0)|0;c[994]=E;a[13632]=1;H=E}E=fm(n,H,1352,(C=i,i=i+8|0,h[C>>3]=l,C)|0)|0;I=c[n>>2]|0;if((I|0)==0){K=bf(4)|0;c[K>>2]=4968;aO(K|0,10648,66)}K=jA(E<<2)|0;L=K;if((K|0)!=0){M=L;N=E;O=I;P=L;break}L=bf(4)|0;c[L>>2]=4968;aO(L|0,10648,66)}else{M=F;N=G;O=0;P=0}}while(0);G=o|0;F=c[j+28>>2]|0;c[G>>2]=F;H=F+4|0;J=c[H>>2]|0,c[H>>2]=J+1,J;H=c[G>>2]|0;if((c[3256]|0)!=-1){c[m>>2]=13024;c[m+4>>2]=24;c[m+8>>2]=0;dh(13024,m,250)}m=(c[3257]|0)-1|0;F=c[H+8>>2]|0;do{if((c[H+12>>2]|0)-F>>2>>>0>m>>>0){L=c[F+(m<<2)>>2]|0;if((L|0)==0){break}I=L;E=c[n>>2]|0;b0[c[(c[L>>2]|0)+48>>2]&1023](I,E,E+N|0,M);if((N|0)==0){Q=0}else{Q=(a[c[n>>2]|0]|0)==45}jP(t|0,0,12);jP(v|0,0,12);jP(x|0,0,12);hg(g,Q,o,p,q,r,s,u,w,y);E=z|0;L=c[y>>2]|0;if((N|0)>(L|0)){K=d[x]|0;if((K&1|0)==0){R=K>>>1}else{R=c[w+4>>2]|0}K=d[v]|0;if((K&1|0)==0){S=K>>>1}else{S=c[u+4>>2]|0}T=((N-L<<1|1)+R|0)+S|0}else{K=d[x]|0;if((K&1|0)==0){U=K>>>1}else{U=c[w+4>>2]|0}K=d[v]|0;if((K&1|0)==0){V=K>>>1}else{V=c[u+4>>2]|0}T=(U+2|0)+V|0}K=T+L|0;do{if(K>>>0>100){W=jA(K<<2)|0;X=W;if((W|0)!=0){Y=X;Z=X;break}X=bf(4)|0;c[X>>2]=4968;aO(X|0,10648,66)}else{Y=E;Z=0}}while(0);hh(Y,A,B,c[j+4>>2]|0,M,M+(N<<2)|0,I,Q,p,c[q>>2]|0,c[r>>2]|0,s,u,w,L);c[D>>2]=c[f>>2]|0;fx(b,D,Y,c[A>>2]|0,c[B>>2]|0,j,k);if((Z|0)!=0){jB(Z)}if((a[x]&1)<<24>>24!=0){jJ(c[w+8>>2]|0)}if((a[v]&1)<<24>>24!=0){jJ(c[u+8>>2]|0)}if((a[t]&1)<<24>>24!=0){jJ(c[s+8>>2]|0)}E=c[G>>2]|0;K=E+4|0;if(((J=c[K>>2]|0,c[K>>2]=J+ -1,J)|0)==0){bT[c[(c[E>>2]|0)+8>>2]&1023](E|0)}if((P|0)!=0){jB(P)}if((O|0)==0){i=e;return}jB(O);i=e;return}}while(0);e=bf(4)|0;c[e>>2]=5e3;aO(e|0,10664,510)}function hg(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;n=i;i=i+40|0;o=n|0;p=n+16|0;q=n+32|0;r=q;s=i;i=i+12|0;i=i+7>>3<<3;t=s;u=i;i=i+4|0;i=i+7>>3<<3;v=u;w=i;i=i+12|0;i=i+7>>3<<3;x=w;y=i;i=i+12|0;i=i+7>>3<<3;z=y;A=i;i=i+12|0;i=i+7>>3<<3;B=A;C=i;i=i+4|0;i=i+7>>3<<3;E=C;F=i;i=i+12|0;i=i+7>>3<<3;G=F;H=i;i=i+4|0;i=i+7>>3<<3;I=H;J=i;i=i+12|0;i=i+7>>3<<3;K=J;L=i;i=i+12|0;i=i+7>>3<<3;M=L;N=i;i=i+12|0;i=i+7>>3<<3;O=N;P=c[e>>2]|0;if(b){if((c[3382]|0)!=-1){c[p>>2]=13528;c[p+4>>2]=24;c[p+8>>2]=0;dh(13528,p,250)}p=(c[3383]|0)-1|0;b=c[P+8>>2]|0;if((c[P+12>>2]|0)-b>>2>>>0<=p>>>0){Q=bf(4)|0;R=Q;c[R>>2]=5e3;aO(Q|0,10664,510)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){Q=bf(4)|0;R=Q;c[R>>2]=5e3;aO(Q|0,10664,510)}Q=e;R=c[e>>2]|0;if(d){bU[c[R+44>>2]&1023](r,Q);r=f;D=c[q>>2]|0;a[r]=D&255;D=D>>8;a[r+1|0]=D&255;D=D>>8;a[r+2|0]=D&255;D=D>>8;a[r+3|0]=D&255;bU[c[(c[e>>2]|0)+32>>2]&1023](s,Q);s=l;if((a[s]&1)<<24>>24==0){c[l+4>>2]=0;a[s]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dS(l,0);c[s>>2]=c[t>>2]|0;c[s+4>>2]=c[t+4>>2]|0;c[s+8>>2]=c[t+8>>2]|0;jP(t|0,0,12)}else{bU[c[R+40>>2]&1023](v,Q);v=f;D=c[u>>2]|0;a[v]=D&255;D=D>>8;a[v+1|0]=D&255;D=D>>8;a[v+2|0]=D&255;D=D>>8;a[v+3|0]=D&255;bU[c[(c[e>>2]|0)+28>>2]&1023](w,Q);w=l;if((a[w]&1)<<24>>24==0){c[l+4>>2]=0;a[w]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dS(l,0);c[w>>2]=c[x>>2]|0;c[w+4>>2]=c[x+4>>2]|0;c[w+8>>2]=c[x+8>>2]|0;jP(x|0,0,12)}x=e;c[g>>2]=bW[c[(c[x>>2]|0)+12>>2]&1023](Q)|0;c[h>>2]=bW[c[(c[x>>2]|0)+16>>2]&1023](Q)|0;bU[c[(c[e>>2]|0)+20>>2]&1023](y,Q);y=j;if((a[y]&1)<<24>>24==0){a[j+1|0]=0;a[y]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dj(j,0);c[y>>2]=c[z>>2]|0;c[y+4>>2]=c[z+4>>2]|0;c[y+8>>2]=c[z+8>>2]|0;jP(z|0,0,12);bU[c[(c[e>>2]|0)+24>>2]&1023](A,Q);A=k;if((a[A]&1)<<24>>24==0){c[k+4>>2]=0;a[A]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dS(k,0);c[A>>2]=c[B>>2]|0;c[A+4>>2]=c[B+4>>2]|0;c[A+8>>2]=c[B+8>>2]|0;jP(B|0,0,12);B=bW[c[(c[x>>2]|0)+36>>2]&1023](Q)|0;c[m>>2]=B;i=n;return}else{if((c[3384]|0)!=-1){c[o>>2]=13536;c[o+4>>2]=24;c[o+8>>2]=0;dh(13536,o,250)}o=(c[3385]|0)-1|0;Q=c[P+8>>2]|0;if((c[P+12>>2]|0)-Q>>2>>>0<=o>>>0){S=bf(4)|0;T=S;c[T>>2]=5e3;aO(S|0,10664,510)}P=c[Q+(o<<2)>>2]|0;if((P|0)==0){S=bf(4)|0;T=S;c[T>>2]=5e3;aO(S|0,10664,510)}S=P;T=c[P>>2]|0;if(d){bU[c[T+44>>2]&1023](E,S);E=f;D=c[C>>2]|0;a[E]=D&255;D=D>>8;a[E+1|0]=D&255;D=D>>8;a[E+2|0]=D&255;D=D>>8;a[E+3|0]=D&255;bU[c[(c[P>>2]|0)+32>>2]&1023](F,S);F=l;if((a[F]&1)<<24>>24==0){c[l+4>>2]=0;a[F]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dS(l,0);c[F>>2]=c[G>>2]|0;c[F+4>>2]=c[G+4>>2]|0;c[F+8>>2]=c[G+8>>2]|0;jP(G|0,0,12)}else{bU[c[T+40>>2]&1023](I,S);I=f;D=c[H>>2]|0;a[I]=D&255;D=D>>8;a[I+1|0]=D&255;D=D>>8;a[I+2|0]=D&255;D=D>>8;a[I+3|0]=D&255;bU[c[(c[P>>2]|0)+28>>2]&1023](J,S);J=l;if((a[J]&1)<<24>>24==0){c[l+4>>2]=0;a[J]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dS(l,0);c[J>>2]=c[K>>2]|0;c[J+4>>2]=c[K+4>>2]|0;c[J+8>>2]=c[K+8>>2]|0;jP(K|0,0,12)}K=P;c[g>>2]=bW[c[(c[K>>2]|0)+12>>2]&1023](S)|0;c[h>>2]=bW[c[(c[K>>2]|0)+16>>2]&1023](S)|0;bU[c[(c[P>>2]|0)+20>>2]&1023](L,S);L=j;if((a[L]&1)<<24>>24==0){a[j+1|0]=0;a[L]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dj(j,0);c[L>>2]=c[M>>2]|0;c[L+4>>2]=c[M+4>>2]|0;c[L+8>>2]=c[M+8>>2]|0;jP(M|0,0,12);bU[c[(c[P>>2]|0)+24>>2]&1023](N,S);N=k;if((a[N]&1)<<24>>24==0){c[k+4>>2]=0;a[N]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dS(k,0);c[N>>2]=c[O>>2]|0;c[N+4>>2]=c[O+4>>2]|0;c[N+8>>2]=c[O+8>>2]|0;jP(O|0,0,12);B=bW[c[(c[K>>2]|0)+36>>2]&1023](S)|0;c[m>>2]=B;i=n;return}}function hh(b,d,e,f,g,h,i,j,k,l,m,n,o,p,q){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;var r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0;c[e>>2]=b;r=i;s=p;t=p+4|0;u=p+8|0;p=o;v=(f&512|0)==0;w=o+4|0;x=o+8|0;o=i;y=(q|0)>0;z=n;A=n+1|0;B=n+8|0;C=n+4|0;n=g;g=0;while(1){D=a[k+g|0]|0;L3755:do{if((D|0)==2){E=a[p]|0;F=E&255;G=(F&1|0)==0;if(G){H=F>>>1}else{H=c[w>>2]|0}if((H|0)==0|v){I=n;break}if((E&1)<<24>>24==0){J=w;K=w;L=w}else{E=c[x>>2]|0;J=E;K=E;L=E}if(G){M=F>>>1}else{M=c[w>>2]|0}F=J+(M<<2)|0;G=c[e>>2]|0;if((K|0)==(F|0)){N=G}else{E=((J+(M-1<<2)|0)+(-L|0)|0)>>>2;O=K;P=G;while(1){c[P>>2]=c[O>>2]|0;Q=O+4|0;if((Q|0)==(F|0)){break}O=Q;P=P+4|0}N=G+(E+1<<2)|0}c[e>>2]=N;I=n}else if((D|0)==1){c[d>>2]=c[e>>2]|0;P=b3[c[(c[r>>2]|0)+44>>2]&1023](i,32)|0;O=c[e>>2]|0;c[e>>2]=O+4|0;c[O>>2]=P;I=n}else if((D|0)==3){P=a[s]|0;O=P&255;if((O&1|0)==0){R=O>>>1}else{R=c[t>>2]|0}if((R|0)==0){I=n;break}if((P&1)<<24>>24==0){S=t}else{S=c[u>>2]|0}P=c[S>>2]|0;O=c[e>>2]|0;c[e>>2]=O+4|0;c[O>>2]=P;I=n}else if((D|0)==0){c[d>>2]=c[e>>2]|0;I=n}else if((D|0)==4){P=c[e>>2]|0;O=j?n+4|0:n;F=O;while(1){if(F>>>0>=h>>>0){break}if(bQ[c[(c[o>>2]|0)+12>>2]&1023](i,2048,c[F>>2]|0)|0){F=F+4|0}else{break}}if(y){do{if(F>>>0>O>>>0){E=F;G=q;while(1){T=E-4|0;Q=c[T>>2]|0;U=c[e>>2]|0;c[e>>2]=U+4|0;c[U>>2]=Q;V=G-1|0;W=(V|0)>0;if(T>>>0>O>>>0&W){E=T;G=V}else{break}}if(W){X=V;Y=T;Z=3175;break}else{_=0;$=V;aa=T;break}}else{X=q;Y=F;Z=3175}}while(0);if((Z|0)==3175){Z=0;_=b3[c[(c[r>>2]|0)+44>>2]&1023](i,48)|0;$=X;aa=Y}G=c[e>>2]|0;c[e>>2]=G+4|0;L3802:do{if(($|0)>0){E=$;Q=G;while(1){c[Q>>2]=_;U=E-1|0;ab=c[e>>2]|0;c[e>>2]=ab+4|0;if((U|0)>0){E=U;Q=ab}else{ac=ab;break L3802}}}else{ac=G}}while(0);c[ac>>2]=l;ad=aa}else{ad=F}L3807:do{if((ad|0)==(O|0)){G=b3[c[(c[r>>2]|0)+44>>2]&1023](i,48)|0;Q=c[e>>2]|0;c[e>>2]=Q+4|0;c[Q>>2]=G}else{G=a[z]|0;Q=G&255;if((Q&1|0)==0){ae=Q>>>1}else{ae=c[C>>2]|0}do{if((ae|0)==0){af=ad;ag=0;ah=0;ai=-1}else{if((G&1)<<24>>24==0){aj=A}else{aj=c[B>>2]|0}af=ad;ag=0;ah=0;ai=a[aj]|0;break}}while(0);while(1){do{if((ag|0)==(ai|0)){G=c[e>>2]|0;c[e>>2]=G+4|0;c[G>>2]=m;G=ah+1|0;Q=a[z]|0;E=Q&255;if((E&1|0)==0){ak=E>>>1}else{ak=c[C>>2]|0}if(G>>>0>=ak>>>0){al=ai;am=G;an=0;break}E=(Q&1)<<24>>24==0;if(E){ao=A}else{ao=c[B>>2]|0}if((a[ao+G|0]|0)==127){al=-1;am=G;an=0;break}if(E){ap=A}else{ap=c[B>>2]|0}al=a[ap+G|0]|0;am=G;an=0}else{al=ai;am=ah;an=ag}}while(0);G=af-4|0;E=c[G>>2]|0;Q=c[e>>2]|0;c[e>>2]=Q+4|0;c[Q>>2]=E;if((G|0)==(O|0)){break L3807}else{af=G;ag=an+1|0;ah=am;ai=al}}}}while(0);F=c[e>>2]|0;if((P|0)==(F|0)){I=O;break}G=F-4|0;if(P>>>0<G>>>0){aq=P;ar=G}else{I=O;break}while(1){G=c[aq>>2]|0;c[aq>>2]=c[ar>>2]|0;c[ar>>2]=G;G=aq+4|0;F=ar-4|0;if(G>>>0<F>>>0){aq=G;ar=F}else{I=O;break L3755}}}else{I=n}}while(0);D=g+1|0;if(D>>>0<4){n=I;g=D}else{break}}g=a[s]|0;s=g&255;I=(s&1|0)==0;if(I){as=s>>>1}else{as=c[t>>2]|0}if(as>>>0>1){if((g&1)<<24>>24==0){at=t;au=t;av=t}else{g=c[u>>2]|0;at=g;au=g;av=g}if(I){aw=s>>>1}else{aw=c[t>>2]|0}t=at+(aw<<2)|0;s=c[e>>2]|0;I=au+4|0;if((I|0)==(t|0)){ax=s}else{au=(((at+(aw-2<<2)|0)+(-av|0)|0)>>>2)+1|0;av=s;aw=I;while(1){c[av>>2]=c[aw>>2]|0;I=aw+4|0;if((I|0)==(t|0)){break}else{av=av+4|0;aw=I}}ax=s+(au<<2)|0}c[e>>2]=ax}ax=f&176;if((ax|0)==16){return}else if((ax|0)==32){c[d>>2]=c[e>>2]|0;return}else{c[d>>2]=b;return}}function hi(a){a=a|0;return}function hj(a){a=a|0;return}function hk(a){a=a|0;jJ(a);return}function hl(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((a[d]&1)<<24>>24==0){f=d+1|0}else{f=c[d+8>>2]|0}d=be(f|0,200)|0;return d>>>(((d|0)!=-1&1)>>>0)|0}function hm(a,b){a=a|0;b=b|0;aY(((b|0)==-1?-1:b<<1)|0);return}function hn(a){a=a|0;jJ(a);return}function ho(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((a[d]&1)<<24>>24==0){f=d+1|0}else{f=c[d+8>>2]|0}d=be(f|0,200)|0;return d>>>(((d|0)!=-1&1)>>>0)|0}function hp(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;e=i;i=i+64|0;l=f;f=i;i=i+4|0;i=i+7>>3<<3;c[f>>2]=c[l>>2]|0;l=e|0;m=e+16|0;n=e+24|0;o=e+32|0;p=e+40|0;q=e+48|0;r=q;s=i;i=i+12|0;i=i+7>>3<<3;t=s;u=i;i=i+12|0;i=i+7>>3<<3;v=u;w=i;i=i+4|0;i=i+7>>3<<3;x=i;i=i+400|0;y=i;i=i+4|0;i=i+7>>3<<3;z=i;i=i+4|0;i=i+7>>3<<3;A=i;i=i+4|0;i=i+7>>3<<3;B=m|0;C=c[h+28>>2]|0;c[B>>2]=C;D=C+4|0;J=c[D>>2]|0,c[D>>2]=J+1,J;D=c[B>>2]|0;if((c[3256]|0)!=-1){c[l>>2]=13024;c[l+4>>2]=24;c[l+8>>2]=0;dh(13024,l,250)}l=(c[3257]|0)-1|0;C=c[D+8>>2]|0;do{if((c[D+12>>2]|0)-C>>2>>>0>l>>>0){E=c[C+(l<<2)>>2]|0;if((E|0)==0){break}F=E;G=k;H=a[G]|0;I=H&255;if((I&1|0)==0){K=I>>>1}else{K=c[k+4>>2]|0}if((K|0)==0){L=0}else{if((H&1)<<24>>24==0){M=k+4|0}else{M=c[k+8>>2]|0}H=c[M>>2]|0;L=(H|0)==(b3[c[(c[E>>2]|0)+44>>2]&1023](F,45)|0)}jP(r|0,0,12);jP(t|0,0,12);jP(v|0,0,12);hg(g,L,m,n,o,p,q,s,u,w);E=x|0;H=a[G]|0;I=H&255;N=(I&1|0)==0;if(N){O=I>>>1}else{O=c[k+4>>2]|0}P=c[w>>2]|0;if((O|0)>(P|0)){if(N){Q=I>>>1}else{Q=c[k+4>>2]|0}I=d[v]|0;if((I&1|0)==0){R=I>>>1}else{R=c[u+4>>2]|0}I=d[t]|0;if((I&1|0)==0){S=I>>>1}else{S=c[s+4>>2]|0}T=((Q-P<<1|1)+R|0)+S|0}else{I=d[v]|0;if((I&1|0)==0){U=I>>>1}else{U=c[u+4>>2]|0}I=d[t]|0;if((I&1|0)==0){V=I>>>1}else{V=c[s+4>>2]|0}T=(U+2|0)+V|0}I=T+P|0;do{if(I>>>0>100){N=jA(I<<2)|0;W=N;if((N|0)!=0){X=W;Y=W;Z=a[G]|0;break}W=bf(4)|0;c[W>>2]=4968;aO(W|0,10648,66)}else{X=E;Y=0;Z=H}}while(0);if((Z&1)<<24>>24==0){_=k+4|0;$=k+4|0}else{H=c[k+8>>2]|0;_=H;$=H}H=Z&255;if((H&1|0)==0){aa=H>>>1}else{aa=c[k+4>>2]|0}hh(X,y,z,c[h+4>>2]|0,$,_+(aa<<2)|0,F,L,n,c[o>>2]|0,c[p>>2]|0,q,s,u,P);c[A>>2]=c[f>>2]|0;fx(b,A,X,c[y>>2]|0,c[z>>2]|0,h,j);if((Y|0)!=0){jB(Y)}if((a[v]&1)<<24>>24!=0){jJ(c[u+8>>2]|0)}if((a[t]&1)<<24>>24!=0){jJ(c[s+8>>2]|0)}if((a[r]&1)<<24>>24!=0){jJ(c[q+8>>2]|0)}H=c[B>>2]|0;E=H+4|0;if(((J=c[E>>2]|0,c[E>>2]=J+ -1,J)|0)!=0){i=e;return}bT[c[(c[H>>2]|0)+8>>2]&1023](H|0);i=e;return}}while(0);e=bf(4)|0;c[e>>2]=5e3;aO(e|0,10664,510)}function hq(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;d=i;i=i+16|0;j=d|0;k=j;jP(k|0,0,12);l=b;m=h;n=a[h]|0;if((n&1)<<24>>24==0){o=m+1|0;p=m+1|0}else{m=c[h+8>>2]|0;o=m;p=m}m=n&255;if((m&1|0)==0){q=m>>>1}else{q=c[h+4>>2]|0}h=o+q|0;do{if(p>>>0<h>>>0){q=j+1|0;o=j+8|0;m=j|0;n=j+4|0;r=p;s=0;while(1){t=a[r]|0;if((s&1)<<24>>24==0){u=10;v=s}else{w=c[m>>2]|0;u=(w&-2)-1|0;v=w&255}w=v&255;x=(w&1|0)==0?w>>>1:c[n>>2]|0;if((x|0)==(u|0)){if((u|0)==-3){y=103;break}w=(v&1)<<24>>24==0?q:c[o>>2]|0;do{if(u>>>0<2147483631){z=u+1|0;A=u<<1;B=z>>>0<A>>>0?A:z;if(B>>>0<11){C=11;break}C=B+16&-16}else{C=-2}}while(0);B=jG(C)|0;jQ(B|0,w|0,u);if((u|0)!=10){jJ(w)}c[o>>2]=B;B=C|1;c[m>>2]=B;D=B&255}else{D=v}B=(D&1)<<24>>24==0?q:c[o>>2]|0;a[B+x|0]=t;z=x+1|0;a[B+z|0]=0;B=a[k]|0;if((B&1)<<24>>24==0){A=z<<1&255;a[k]=A;E=A}else{c[n>>2]=z;E=B}B=r+1|0;if(B>>>0<h>>>0){r=B;s=E}else{y=116;break}}if((y|0)==116){s=(e|0)==-1?-1:e<<1;if((E&1)<<24>>24==0){F=s;y=121;break}G=c[j+8>>2]|0;H=s;break}else if((y|0)==103){di(0)}}else{F=(e|0)==-1?-1:e<<1;y=121;break}}while(0);if((y|0)==121){G=j+1|0;H=F}F=a1(H|0,f|0,g|0,G|0)|0;jP(l|0,0,12);G=jS(F|0)|0;g=F+G|0;L140:do{if((G|0)>0){f=b+1|0;H=b+4|0;y=b+8|0;e=b|0;E=F;h=0;while(1){D=a[E]|0;if((h&1)<<24>>24==0){I=10;J=h}else{v=c[e>>2]|0;I=(v&-2)-1|0;J=v&255}v=J&255;if((v&1|0)==0){K=v>>>1}else{K=c[H>>2]|0}if((K|0)==(I|0)){dl(b,I,1,I,I,0,0);L=a[l]|0}else{L=J}if((L&1)<<24>>24==0){M=f}else{M=c[y>>2]|0}a[M+K|0]=D;D=K+1|0;a[M+D|0]=0;v=a[l]|0;if((v&1)<<24>>24==0){C=D<<1&255;a[l]=C;N=C}else{c[H>>2]=D;N=v}v=E+1|0;if(v>>>0<g>>>0){E=v;h=N}else{break L140}}}}while(0);if((a[k]&1)<<24>>24==0){i=d;return}jJ(c[j+8>>2]|0);i=d;return}function hr(a,b){a=a|0;b=b|0;aY(((b|0)==-1?-1:b<<1)|0);return}function hs(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;d=i;i=i+224|0;j=d|0;k=d+8|0;l=d+40|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+192|0;q=d+200|0;r=d+208|0;s=r;t=i;i=i+8|0;u=i;i=i+8|0;jP(s|0,0,12);v=b;w=t|0;c[t+4>>2]=0;c[t>>2]=6664;x=a[h]|0;if((x&1)<<24>>24==0){y=h+4|0;z=h+4|0}else{A=c[h+8>>2]|0;y=A;z=A}A=x&255;if((A&1|0)==0){B=A>>>1}else{B=c[h+4>>2]|0}h=y+(B<<2)|0;do{if(z>>>0<h>>>0){B=t;y=k|0;A=k+32|0;x=r+1|0;C=r+8|0;D=r|0;E=r+4|0;F=z;G=6664;L180:while(1){c[m>>2]=F;H=(b$[c[G+12>>2]&1023](w,j,F,h,m,y,A,l)|0)==2;if(H|(c[m>>2]|0)==(F|0)){gY(944)}L186:do{if(y>>>0<(c[l>>2]|0)>>>0){I=y;J=a[s]|0;while(1){K=a[I]|0;if((J&1)<<24>>24==0){L=10;M=J}else{N=c[D>>2]|0;L=(N&-2)-1|0;M=N&255}N=M&255;O=(N&1|0)==0?N>>>1:c[E>>2]|0;if((O|0)==(L|0)){if((L|0)==-3){P=168;break L180}N=(M&1)<<24>>24==0?x:c[C>>2]|0;do{if(L>>>0<2147483631){Q=L+1|0;R=L<<1;S=Q>>>0<R>>>0?R:Q;if(S>>>0<11){T=11;break}T=S+16&-16}else{T=-2}}while(0);S=jG(T)|0;jQ(S|0,N|0,L);if((L|0)!=10){jJ(N)}c[C>>2]=S;S=T|1;c[D>>2]=S;U=S&255}else{U=M}S=(U&1)<<24>>24==0?x:c[C>>2]|0;a[S+O|0]=K;Q=O+1|0;a[S+Q|0]=0;S=a[s]|0;if((S&1)<<24>>24==0){R=Q<<1&255;a[s]=R;V=R}else{c[E>>2]=Q;V=S}S=I+1|0;if(S>>>0<(c[l>>2]|0)>>>0){I=S;J=V}else{break L186}}}}while(0);J=c[m>>2]|0;if(J>>>0>=h>>>0|H){P=183;break}F=J;G=c[B>>2]|0}if((P|0)==168){di(0)}else if((P|0)==183){B=(e|0)==-1?-1:e<<1;if((a[s]&1)<<24>>24==0){W=B;P=190;break}X=c[r+8>>2]|0;Y=B;break}}else{W=(e|0)==-1?-1:e<<1;P=190;break}}while(0);if((P|0)==190){X=r+1|0;Y=W}W=a1(Y|0,f|0,g|0,X|0)|0;jP(v|0,0,12);X=u|0;c[u+4>>2]=0;c[u>>2]=6608;g=jS(W|0)|0;f=W+g|0;L220:do{if((g|0)>=1){Y=u;P=f;e=o|0;h=o+128|0;m=b+4|0;V=b+8|0;l=b|0;U=W;M=6608;while(1){c[q>>2]=U;T=(b$[c[M+16>>2]&1023](X,n,U,(P-U|0)>32?U+32|0:f,q,e,h,p)|0)==2;if(T|(c[q>>2]|0)==(U|0)){gY(944)}L228:do{if(e>>>0<(c[p>>2]|0)>>>0){L=e;j=a[v]|0;while(1){w=c[L>>2]|0;if((j&1)<<24>>24==0){Z=1;_=j}else{z=c[l>>2]|0;Z=(z&-2)-1|0;_=z&255}z=_&255;if((z&1|0)==0){$=z>>>1}else{$=c[m>>2]|0}if(($|0)==(Z|0)){dU(b,Z,1,Z,Z,0,0);aa=a[v]|0}else{aa=_}if((aa&1)<<24>>24==0){ab=m}else{ab=c[V>>2]|0}c[ab+($<<2)>>2]=w;w=$+1|0;c[ab+(w<<2)>>2]=0;z=a[v]|0;if((z&1)<<24>>24==0){k=w<<1&255;a[v]=k;ac=k}else{c[m>>2]=w;ac=z}z=L+4|0;if(z>>>0<(c[p>>2]|0)>>>0){L=z;j=ac}else{break L228}}}}while(0);H=c[q>>2]|0;if(H>>>0>=f>>>0|T){break L220}U=H;M=c[Y>>2]|0}}}while(0);if((a[s]&1)<<24>>24==0){i=d;return}jJ(c[r+8>>2]|0);i=d;return}function ht(a){a=a|0;var b=0;c[a>>2]=6128;b=c[a+8>>2]|0;if((b|0)==0){return}bd(b|0);return}function hu(b){b=b|0;var d=0,e=0,f=0,g=0;b=bf(8)|0;c[b>>2]=5096;d=b+4|0;if((d|0)==0){e=b;c[e>>2]=5064;aO(b|0,10696,246)}f=jH(19)|0;c[f+4>>2]=6;c[f>>2]=6;g=f+12|0;c[d>>2]=g;c[f+8>>2]=0;a[g]=a[1344]|0;a[g+1|0]=a[1345|0]|0;a[g+2|0]=a[1346|0]|0;a[g+3|0]=a[1347|0]|0;a[g+4|0]=a[1348|0]|0;a[g+5|0]=a[1349|0]|0;a[g+6|0]=a[1350|0]|0;e=b;c[e>>2]=5064;aO(b|0,10696,246)}function hv(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0;e=i;i=i+448|0;f=e|0;g=e+16|0;h=e+32|0;j=e+48|0;k=e+64|0;l=e+80|0;m=e+96|0;n=e+112|0;o=e+128|0;p=e+144|0;q=e+160|0;r=e+176|0;s=e+192|0;t=e+208|0;u=e+224|0;v=e+240|0;w=e+256|0;x=e+272|0;y=e+288|0;z=e+304|0;A=e+320|0;B=e+336|0;C=e+352|0;D=e+368|0;E=e+384|0;F=e+400|0;G=e+416|0;H=e+432|0;c[b+4>>2]=d-1|0;c[b>>2]=6384;d=b+8|0;I=d|0;K=b+12|0;a[b+136|0]=1;L=b+24|0;M=L;c[K>>2]=M;c[I>>2]=M;c[b+16>>2]=L+112|0;L=28;N=M;while(1){if((N|0)==0){O=0}else{c[N>>2]=0;O=c[K>>2]|0}P=O+4|0;c[K>>2]=P;M=L-1|0;if((M|0)==0){break}else{L=M;N=P}}N=b+144|0;b=N;a[N]=2;a[b+1|0]=67;a[b+2|0]=0;b=c[I>>2]|0;if((b|0)!=(P|0)){c[K>>2]=O+(-((O+(-b|0)|0)>>>2)<<2)|0}c[1051]=0;c[1050]=6088;if((c[3178]|0)!=-1){c[H>>2]=12712;c[H+4>>2]=24;c[H+8>>2]=0;dh(12712,H,250)}H=c[3179]|0;b=H-1|0;J=c[1051]|0,c[1051]=J+1,J;O=c[K>>2]|0;P=c[I>>2]|0;N=O-P>>2;do{if(N>>>0>b>>>0){Q=P}else{if(N>>>0<H>>>0){i9(d,H-N|0);Q=c[I>>2]|0;break}if(N>>>0<=H>>>0){Q=P;break}L=P+(H<<2)|0;if((L|0)==(O|0)){Q=P;break}c[K>>2]=O+((((O-4|0)+(-L|0)|0)>>>2^-1)<<2)|0;Q=P}}while(0);P=c[Q+(b<<2)>>2]|0;do{if((P|0)!=0){Q=P+4|0;if(((J=c[Q>>2]|0,c[Q>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[P>>2]|0)+8>>2]&1023](P|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4200;c[1049]=0;c[1048]=6048;if((c[3176]|0)!=-1){c[G>>2]=12704;c[G+4>>2]=24;c[G+8>>2]=0;dh(12704,G,250)}G=c[3177]|0;b=G-1|0;J=c[1049]|0,c[1049]=J+1,J;P=c[K>>2]|0;Q=c[I>>2]|0;O=P-Q>>2;do{if(O>>>0>b>>>0){R=Q}else{if(O>>>0<G>>>0){i9(d,G-O|0);R=c[I>>2]|0;break}if(O>>>0<=G>>>0){R=Q;break}H=Q+(G<<2)|0;if((H|0)==(P|0)){R=Q;break}c[K>>2]=P+((((P-4|0)+(-H|0)|0)>>>2^-1)<<2)|0;R=Q}}while(0);Q=c[R+(b<<2)>>2]|0;do{if((Q|0)!=0){R=Q+4|0;if(((J=c[R>>2]|0,c[R>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[Q>>2]|0)+8>>2]&1023](Q|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4192;c[1105]=0;c[1104]=6496;c[1106]=0;a[4428]=0;c[1106]=c[bb()>>2]|0;if((c[3258]|0)!=-1){c[F>>2]=13032;c[F+4>>2]=24;c[F+8>>2]=0;dh(13032,F,250)}F=c[3259]|0;b=F-1|0;J=c[1105]|0,c[1105]=J+1,J;Q=c[K>>2]|0;R=c[I>>2]|0;P=Q-R>>2;do{if(P>>>0>b>>>0){S=R}else{if(P>>>0<F>>>0){i9(d,F-P|0);S=c[I>>2]|0;break}if(P>>>0<=F>>>0){S=R;break}G=R+(F<<2)|0;if((G|0)==(Q|0)){S=R;break}c[K>>2]=Q+((((Q-4|0)+(-G|0)|0)>>>2^-1)<<2)|0;S=R}}while(0);R=c[S+(b<<2)>>2]|0;do{if((R|0)!=0){S=R+4|0;if(((J=c[S>>2]|0,c[S>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[R>>2]|0)+8>>2]&1023](R|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4416;c[1103]=0;c[1102]=6416;if((c[3256]|0)!=-1){c[E>>2]=13024;c[E+4>>2]=24;c[E+8>>2]=0;dh(13024,E,250)}E=c[3257]|0;b=E-1|0;J=c[1103]|0,c[1103]=J+1,J;R=c[K>>2]|0;S=c[I>>2]|0;Q=R-S>>2;do{if(Q>>>0>b>>>0){T=S}else{if(Q>>>0<E>>>0){i9(d,E-Q|0);T=c[I>>2]|0;break}if(Q>>>0<=E>>>0){T=S;break}F=S+(E<<2)|0;if((F|0)==(R|0)){T=S;break}c[K>>2]=R+((((R-4|0)+(-F|0)|0)>>>2^-1)<<2)|0;T=S}}while(0);S=c[T+(b<<2)>>2]|0;do{if((S|0)!=0){T=S+4|0;if(((J=c[T>>2]|0,c[T>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[S>>2]|0)+8>>2]&1023](S|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4408;c[1057]=0;c[1056]=6184;if((c[3182]|0)!=-1){c[D>>2]=12728;c[D+4>>2]=24;c[D+8>>2]=0;dh(12728,D,250)}D=c[3183]|0;b=D-1|0;J=c[1057]|0,c[1057]=J+1,J;S=c[K>>2]|0;T=c[I>>2]|0;R=S-T>>2;do{if(R>>>0>b>>>0){U=T}else{if(R>>>0<D>>>0){i9(d,D-R|0);U=c[I>>2]|0;break}if(R>>>0<=D>>>0){U=T;break}E=T+(D<<2)|0;if((E|0)==(S|0)){U=T;break}c[K>>2]=S+((((S-4|0)+(-E|0)|0)>>>2^-1)<<2)|0;U=T}}while(0);T=c[U+(b<<2)>>2]|0;do{if((T|0)!=0){U=T+4|0;if(((J=c[U>>2]|0,c[U>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[T>>2]|0)+8>>2]&1023](T|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4224;c[1053]=0;c[1052]=6128;c[1054]=0;if((c[3180]|0)!=-1){c[C>>2]=12720;c[C+4>>2]=24;c[C+8>>2]=0;dh(12720,C,250)}C=c[3181]|0;b=C-1|0;J=c[1053]|0,c[1053]=J+1,J;T=c[K>>2]|0;U=c[I>>2]|0;S=T-U>>2;do{if(S>>>0>b>>>0){V=U}else{if(S>>>0<C>>>0){i9(d,C-S|0);V=c[I>>2]|0;break}if(S>>>0<=C>>>0){V=U;break}D=U+(C<<2)|0;if((D|0)==(T|0)){V=U;break}c[K>>2]=T+((((T-4|0)+(-D|0)|0)>>>2^-1)<<2)|0;V=U}}while(0);U=c[V+(b<<2)>>2]|0;do{if((U|0)!=0){V=U+4|0;if(((J=c[V>>2]|0,c[V>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[U>>2]|0)+8>>2]&1023](U|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4208;c[1059]=0;c[1058]=6240;if((c[3184]|0)!=-1){c[B>>2]=12736;c[B+4>>2]=24;c[B+8>>2]=0;dh(12736,B,250)}B=c[3185]|0;b=B-1|0;J=c[1059]|0,c[1059]=J+1,J;U=c[K>>2]|0;V=c[I>>2]|0;T=U-V>>2;do{if(T>>>0>b>>>0){W=V}else{if(T>>>0<B>>>0){i9(d,B-T|0);W=c[I>>2]|0;break}if(T>>>0<=B>>>0){W=V;break}C=V+(B<<2)|0;if((C|0)==(U|0)){W=V;break}c[K>>2]=U+((((U-4|0)+(-C|0)|0)>>>2^-1)<<2)|0;W=V}}while(0);V=c[W+(b<<2)>>2]|0;do{if((V|0)!=0){W=V+4|0;if(((J=c[W>>2]|0,c[W>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[V>>2]|0)+8>>2]&1023](V|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4232;c[1061]=0;c[1060]=6296;if((c[3186]|0)!=-1){c[A>>2]=12744;c[A+4>>2]=24;c[A+8>>2]=0;dh(12744,A,250)}A=c[3187]|0;b=A-1|0;J=c[1061]|0,c[1061]=J+1,J;V=c[K>>2]|0;W=c[I>>2]|0;U=V-W>>2;do{if(U>>>0>b>>>0){X=W}else{if(U>>>0<A>>>0){i9(d,A-U|0);X=c[I>>2]|0;break}if(U>>>0<=A>>>0){X=W;break}B=W+(A<<2)|0;if((B|0)==(V|0)){X=W;break}c[K>>2]=V+((((V-4|0)+(-B|0)|0)>>>2^-1)<<2)|0;X=W}}while(0);W=c[X+(b<<2)>>2]|0;do{if((W|0)!=0){X=W+4|0;if(((J=c[X>>2]|0,c[X>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[W>>2]|0)+8>>2]&1023](W|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4240;c[1031]=0;c[1030]=5592;a[4128]=46;a[4129]=44;jP(4132,0,12);if((c[3162]|0)!=-1){c[z>>2]=12648;c[z+4>>2]=24;c[z+8>>2]=0;dh(12648,z,250)}z=c[3163]|0;b=z-1|0;J=c[1031]|0,c[1031]=J+1,J;W=c[K>>2]|0;X=c[I>>2]|0;V=W-X>>2;do{if(V>>>0>b>>>0){Y=X}else{if(V>>>0<z>>>0){i9(d,z-V|0);Y=c[I>>2]|0;break}if(V>>>0<=z>>>0){Y=X;break}A=X+(z<<2)|0;if((A|0)==(W|0)){Y=X;break}c[K>>2]=W+((((W-4|0)+(-A|0)|0)>>>2^-1)<<2)|0;Y=X}}while(0);X=c[Y+(b<<2)>>2]|0;do{if((X|0)!=0){Y=X+4|0;if(((J=c[Y>>2]|0,c[Y>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[X>>2]|0)+8>>2]&1023](X|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4120;c[1023]=0;c[1022]=5544;c[1024]=46;c[1025]=44;jP(4104,0,12);if((c[3160]|0)!=-1){c[y>>2]=12640;c[y+4>>2]=24;c[y+8>>2]=0;dh(12640,y,250)}y=c[3161]|0;b=y-1|0;J=c[1023]|0,c[1023]=J+1,J;X=c[K>>2]|0;Y=c[I>>2]|0;W=X-Y>>2;do{if(W>>>0>b>>>0){Z=Y}else{if(W>>>0<y>>>0){i9(d,y-W|0);Z=c[I>>2]|0;break}if(W>>>0<=y>>>0){Z=Y;break}z=Y+(y<<2)|0;if((z|0)==(X|0)){Z=Y;break}c[K>>2]=X+((((X-4|0)+(-z|0)|0)>>>2^-1)<<2)|0;Z=Y}}while(0);Y=c[Z+(b<<2)>>2]|0;do{if((Y|0)!=0){Z=Y+4|0;if(((J=c[Z>>2]|0,c[Z>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[Y>>2]|0)+8>>2]&1023](Y|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4088;c[1047]=0;c[1046]=5976;if((c[3174]|0)!=-1){c[x>>2]=12696;c[x+4>>2]=24;c[x+8>>2]=0;dh(12696,x,250)}x=c[3175]|0;b=x-1|0;J=c[1047]|0,c[1047]=J+1,J;Y=c[K>>2]|0;Z=c[I>>2]|0;X=Y-Z>>2;do{if(X>>>0>b>>>0){_=Z}else{if(X>>>0<x>>>0){i9(d,x-X|0);_=c[I>>2]|0;break}if(X>>>0<=x>>>0){_=Z;break}y=Z+(x<<2)|0;if((y|0)==(Y|0)){_=Z;break}c[K>>2]=Y+((((Y-4|0)+(-y|0)|0)>>>2^-1)<<2)|0;_=Z}}while(0);Z=c[_+(b<<2)>>2]|0;do{if((Z|0)!=0){_=Z+4|0;if(((J=c[_>>2]|0,c[_>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[Z>>2]|0)+8>>2]&1023](Z|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4184;c[1045]=0;c[1044]=5904;if((c[3172]|0)!=-1){c[w>>2]=12688;c[w+4>>2]=24;c[w+8>>2]=0;dh(12688,w,250)}w=c[3173]|0;b=w-1|0;J=c[1045]|0,c[1045]=J+1,J;Z=c[K>>2]|0;_=c[I>>2]|0;Y=Z-_>>2;do{if(Y>>>0>b>>>0){$=_}else{if(Y>>>0<w>>>0){i9(d,w-Y|0);$=c[I>>2]|0;break}if(Y>>>0<=w>>>0){$=_;break}x=_+(w<<2)|0;if((x|0)==(Z|0)){$=_;break}c[K>>2]=Z+((((Z-4|0)+(-x|0)|0)>>>2^-1)<<2)|0;$=_}}while(0);_=c[$+(b<<2)>>2]|0;do{if((_|0)!=0){$=_+4|0;if(((J=c[$>>2]|0,c[$>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[_>>2]|0)+8>>2]&1023](_|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4176;c[1043]=0;c[1042]=5840;if((c[3170]|0)!=-1){c[v>>2]=12680;c[v+4>>2]=24;c[v+8>>2]=0;dh(12680,v,250)}v=c[3171]|0;b=v-1|0;J=c[1043]|0,c[1043]=J+1,J;_=c[K>>2]|0;$=c[I>>2]|0;Z=_-$>>2;do{if(Z>>>0>b>>>0){aa=$}else{if(Z>>>0<v>>>0){i9(d,v-Z|0);aa=c[I>>2]|0;break}if(Z>>>0<=v>>>0){aa=$;break}w=$+(v<<2)|0;if((w|0)==(_|0)){aa=$;break}c[K>>2]=_+((((_-4|0)+(-w|0)|0)>>>2^-1)<<2)|0;aa=$}}while(0);$=c[aa+(b<<2)>>2]|0;do{if(($|0)!=0){aa=$+4|0;if(((J=c[aa>>2]|0,c[aa>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[$>>2]|0)+8>>2]&1023]($|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4168;c[1041]=0;c[1040]=5776;if((c[3168]|0)!=-1){c[u>>2]=12672;c[u+4>>2]=24;c[u+8>>2]=0;dh(12672,u,250)}u=c[3169]|0;b=u-1|0;J=c[1041]|0,c[1041]=J+1,J;$=c[K>>2]|0;aa=c[I>>2]|0;_=$-aa>>2;do{if(_>>>0>b>>>0){ab=aa}else{if(_>>>0<u>>>0){i9(d,u-_|0);ab=c[I>>2]|0;break}if(_>>>0<=u>>>0){ab=aa;break}v=aa+(u<<2)|0;if((v|0)==($|0)){ab=aa;break}c[K>>2]=$+(((($-4|0)+(-v|0)|0)>>>2^-1)<<2)|0;ab=aa}}while(0);aa=c[ab+(b<<2)>>2]|0;do{if((aa|0)!=0){ab=aa+4|0;if(((J=c[ab>>2]|0,c[ab>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[aa>>2]|0)+8>>2]&1023](aa|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4160;c[1115]=0;c[1114]=7424;if((c[3388]|0)!=-1){c[t>>2]=13552;c[t+4>>2]=24;c[t+8>>2]=0;dh(13552,t,250)}t=c[3389]|0;b=t-1|0;J=c[1115]|0,c[1115]=J+1,J;aa=c[K>>2]|0;ab=c[I>>2]|0;$=aa-ab>>2;do{if($>>>0>b>>>0){ac=ab}else{if($>>>0<t>>>0){i9(d,t-$|0);ac=c[I>>2]|0;break}if($>>>0<=t>>>0){ac=ab;break}u=ab+(t<<2)|0;if((u|0)==(aa|0)){ac=ab;break}c[K>>2]=aa+((((aa-4|0)+(-u|0)|0)>>>2^-1)<<2)|0;ac=ab}}while(0);ab=c[ac+(b<<2)>>2]|0;do{if((ab|0)!=0){ac=ab+4|0;if(((J=c[ac>>2]|0,c[ac>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ab>>2]|0)+8>>2]&1023](ab|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4456;c[1113]=0;c[1112]=7360;if((c[3386]|0)!=-1){c[s>>2]=13544;c[s+4>>2]=24;c[s+8>>2]=0;dh(13544,s,250)}s=c[3387]|0;b=s-1|0;J=c[1113]|0,c[1113]=J+1,J;ab=c[K>>2]|0;ac=c[I>>2]|0;aa=ab-ac>>2;do{if(aa>>>0>b>>>0){ad=ac}else{if(aa>>>0<s>>>0){i9(d,s-aa|0);ad=c[I>>2]|0;break}if(aa>>>0<=s>>>0){ad=ac;break}t=ac+(s<<2)|0;if((t|0)==(ab|0)){ad=ac;break}c[K>>2]=ab+((((ab-4|0)+(-t|0)|0)>>>2^-1)<<2)|0;ad=ac}}while(0);ac=c[ad+(b<<2)>>2]|0;do{if((ac|0)!=0){ad=ac+4|0;if(((J=c[ad>>2]|0,c[ad>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ac>>2]|0)+8>>2]&1023](ac|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4448;c[1111]=0;c[1110]=7296;if((c[3384]|0)!=-1){c[r>>2]=13536;c[r+4>>2]=24;c[r+8>>2]=0;dh(13536,r,250)}r=c[3385]|0;b=r-1|0;J=c[1111]|0,c[1111]=J+1,J;ac=c[K>>2]|0;ad=c[I>>2]|0;ab=ac-ad>>2;do{if(ab>>>0>b>>>0){ae=ad}else{if(ab>>>0<r>>>0){i9(d,r-ab|0);ae=c[I>>2]|0;break}if(ab>>>0<=r>>>0){ae=ad;break}s=ad+(r<<2)|0;if((s|0)==(ac|0)){ae=ad;break}c[K>>2]=ac+((((ac-4|0)+(-s|0)|0)>>>2^-1)<<2)|0;ae=ad}}while(0);ad=c[ae+(b<<2)>>2]|0;do{if((ad|0)!=0){ae=ad+4|0;if(((J=c[ae>>2]|0,c[ae>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ad>>2]|0)+8>>2]&1023](ad|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4440;c[1109]=0;c[1108]=7232;if((c[3382]|0)!=-1){c[q>>2]=13528;c[q+4>>2]=24;c[q+8>>2]=0;dh(13528,q,250)}q=c[3383]|0;b=q-1|0;J=c[1109]|0,c[1109]=J+1,J;ad=c[K>>2]|0;ae=c[I>>2]|0;ac=ad-ae>>2;do{if(ac>>>0>b>>>0){af=ae}else{if(ac>>>0<q>>>0){i9(d,q-ac|0);af=c[I>>2]|0;break}if(ac>>>0<=q>>>0){af=ae;break}r=ae+(q<<2)|0;if((r|0)==(ad|0)){af=ae;break}c[K>>2]=ad+((((ad-4|0)+(-r|0)|0)>>>2^-1)<<2)|0;af=ae}}while(0);ae=c[af+(b<<2)>>2]|0;do{if((ae|0)!=0){af=ae+4|0;if(((J=c[af>>2]|0,c[af>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ae>>2]|0)+8>>2]&1023](ae|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4432;c[1005]=0;c[1004]=5248;if((c[3150]|0)!=-1){c[p>>2]=12600;c[p+4>>2]=24;c[p+8>>2]=0;dh(12600,p,250)}p=c[3151]|0;b=p-1|0;J=c[1005]|0,c[1005]=J+1,J;ae=c[K>>2]|0;af=c[I>>2]|0;ad=ae-af>>2;do{if(ad>>>0>b>>>0){ag=af}else{if(ad>>>0<p>>>0){i9(d,p-ad|0);ag=c[I>>2]|0;break}if(ad>>>0<=p>>>0){ag=af;break}q=af+(p<<2)|0;if((q|0)==(ae|0)){ag=af;break}c[K>>2]=ae+((((ae-4|0)+(-q|0)|0)>>>2^-1)<<2)|0;ag=af}}while(0);af=c[ag+(b<<2)>>2]|0;do{if((af|0)!=0){ag=af+4|0;if(((J=c[ag>>2]|0,c[ag>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[af>>2]|0)+8>>2]&1023](af|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4016;c[1003]=0;c[1002]=5208;if((c[3148]|0)!=-1){c[o>>2]=12592;c[o+4>>2]=24;c[o+8>>2]=0;dh(12592,o,250)}o=c[3149]|0;b=o-1|0;J=c[1003]|0,c[1003]=J+1,J;af=c[K>>2]|0;ag=c[I>>2]|0;ae=af-ag>>2;do{if(ae>>>0>b>>>0){ah=ag}else{if(ae>>>0<o>>>0){i9(d,o-ae|0);ah=c[I>>2]|0;break}if(ae>>>0<=o>>>0){ah=ag;break}p=ag+(o<<2)|0;if((p|0)==(af|0)){ah=ag;break}c[K>>2]=af+((((af-4|0)+(-p|0)|0)>>>2^-1)<<2)|0;ah=ag}}while(0);ag=c[ah+(b<<2)>>2]|0;do{if((ag|0)!=0){ah=ag+4|0;if(((J=c[ah>>2]|0,c[ah>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ag>>2]|0)+8>>2]&1023](ag|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4008;c[1001]=0;c[1e3]=5168;if((c[3146]|0)!=-1){c[n>>2]=12584;c[n+4>>2]=24;c[n+8>>2]=0;dh(12584,n,250)}n=c[3147]|0;b=n-1|0;J=c[1001]|0,c[1001]=J+1,J;ag=c[K>>2]|0;ah=c[I>>2]|0;af=ag-ah>>2;do{if(af>>>0>b>>>0){ai=ah}else{if(af>>>0<n>>>0){i9(d,n-af|0);ai=c[I>>2]|0;break}if(af>>>0<=n>>>0){ai=ah;break}o=ah+(n<<2)|0;if((o|0)==(ag|0)){ai=ah;break}c[K>>2]=ag+((((ag-4|0)+(-o|0)|0)>>>2^-1)<<2)|0;ai=ah}}while(0);ah=c[ai+(b<<2)>>2]|0;do{if((ah|0)!=0){ai=ah+4|0;if(((J=c[ai>>2]|0,c[ai>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ah>>2]|0)+8>>2]&1023](ah|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4e3;c[999]=0;c[998]=5128;if((c[3144]|0)!=-1){c[m>>2]=12576;c[m+4>>2]=24;c[m+8>>2]=0;dh(12576,m,250)}m=c[3145]|0;b=m-1|0;J=c[999]|0,c[999]=J+1,J;ah=c[K>>2]|0;ai=c[I>>2]|0;ag=ah-ai>>2;do{if(ag>>>0>b>>>0){aj=ai}else{if(ag>>>0<m>>>0){i9(d,m-ag|0);aj=c[I>>2]|0;break}if(ag>>>0<=m>>>0){aj=ai;break}n=ai+(m<<2)|0;if((n|0)==(ah|0)){aj=ai;break}c[K>>2]=ah+((((ah-4|0)+(-n|0)|0)>>>2^-1)<<2)|0;aj=ai}}while(0);ai=c[aj+(b<<2)>>2]|0;do{if((ai|0)!=0){aj=ai+4|0;if(((J=c[aj>>2]|0,c[aj>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ai>>2]|0)+8>>2]&1023](ai|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=3992;c[1019]=0;c[1018]=5448;c[1020]=5496;if((c[3158]|0)!=-1){c[l>>2]=12632;c[l+4>>2]=24;c[l+8>>2]=0;dh(12632,l,250)}l=c[3159]|0;b=l-1|0;J=c[1019]|0,c[1019]=J+1,J;ai=c[K>>2]|0;aj=c[I>>2]|0;ah=ai-aj>>2;do{if(ah>>>0>b>>>0){ak=aj}else{if(ah>>>0<l>>>0){i9(d,l-ah|0);ak=c[I>>2]|0;break}if(ah>>>0<=l>>>0){ak=aj;break}m=aj+(l<<2)|0;if((m|0)==(ai|0)){ak=aj;break}c[K>>2]=ai+((((ai-4|0)+(-m|0)|0)>>>2^-1)<<2)|0;ak=aj}}while(0);aj=c[ak+(b<<2)>>2]|0;do{if((aj|0)!=0){ak=aj+4|0;if(((J=c[ak>>2]|0,c[ak>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[aj>>2]|0)+8>>2]&1023](aj|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4072;c[1015]=0;c[1014]=5352;c[1016]=5400;if((c[3156]|0)!=-1){c[k>>2]=12624;c[k+4>>2]=24;c[k+8>>2]=0;dh(12624,k,250)}k=c[3157]|0;b=k-1|0;J=c[1015]|0,c[1015]=J+1,J;aj=c[K>>2]|0;ak=c[I>>2]|0;ai=aj-ak>>2;do{if(ai>>>0>b>>>0){al=ak}else{if(ai>>>0<k>>>0){i9(d,k-ai|0);al=c[I>>2]|0;break}if(ai>>>0<=k>>>0){al=ak;break}l=ak+(k<<2)|0;if((l|0)==(aj|0)){al=ak;break}c[K>>2]=aj+((((aj-4|0)+(-l|0)|0)>>>2^-1)<<2)|0;al=ak}}while(0);ak=c[al+(b<<2)>>2]|0;do{if((ak|0)!=0){al=ak+4|0;if(((J=c[al>>2]|0,c[al>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ak>>2]|0)+8>>2]&1023](ak|0)}}while(0);c[(c[I>>2]|0)+(b<<2)>>2]=4056;c[1011]=0;c[1010]=6352;if(a[13632]|0){am=c[994]|0}else{b=bD(1,1320,0)|0;c[994]=b;a[13632]=1;am=b}c[1012]=am;c[1010]=5320;if((c[3154]|0)!=-1){c[j>>2]=12616;c[j+4>>2]=24;c[j+8>>2]=0;dh(12616,j,250)}j=c[3155]|0;am=j-1|0;J=c[1011]|0,c[1011]=J+1,J;b=c[K>>2]|0;ak=c[I>>2]|0;al=b-ak>>2;do{if(al>>>0>am>>>0){an=ak}else{if(al>>>0<j>>>0){i9(d,j-al|0);an=c[I>>2]|0;break}if(al>>>0<=j>>>0){an=ak;break}aj=ak+(j<<2)|0;if((aj|0)==(b|0)){an=ak;break}c[K>>2]=b+((((b-4|0)+(-aj|0)|0)>>>2^-1)<<2)|0;an=ak}}while(0);ak=c[an+(am<<2)>>2]|0;do{if((ak|0)!=0){an=ak+4|0;if(((J=c[an>>2]|0,c[an>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ak>>2]|0)+8>>2]&1023](ak|0)}}while(0);c[(c[I>>2]|0)+(am<<2)>>2]=4040;c[1007]=0;c[1006]=6352;if(a[13632]|0){ao=c[994]|0}else{am=bD(1,1320,0)|0;c[994]=am;a[13632]=1;ao=am}c[1008]=ao;c[1006]=5288;if((c[3152]|0)!=-1){c[h>>2]=12608;c[h+4>>2]=24;c[h+8>>2]=0;dh(12608,h,250)}h=c[3153]|0;ao=h-1|0;J=c[1007]|0,c[1007]=J+1,J;am=c[K>>2]|0;ak=c[I>>2]|0;an=am-ak>>2;do{if(an>>>0>ao>>>0){ap=ak}else{if(an>>>0<h>>>0){i9(d,h-an|0);ap=c[I>>2]|0;break}if(an>>>0<=h>>>0){ap=ak;break}b=ak+(h<<2)|0;if((b|0)==(am|0)){ap=ak;break}c[K>>2]=am+((((am-4|0)+(-b|0)|0)>>>2^-1)<<2)|0;ap=ak}}while(0);ak=c[ap+(ao<<2)>>2]|0;do{if((ak|0)!=0){ap=ak+4|0;if(((J=c[ap>>2]|0,c[ap>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ak>>2]|0)+8>>2]&1023](ak|0)}}while(0);c[(c[I>>2]|0)+(ao<<2)>>2]=4024;c[1039]=0;c[1038]=5680;if((c[3166]|0)!=-1){c[g>>2]=12664;c[g+4>>2]=24;c[g+8>>2]=0;dh(12664,g,250)}g=c[3167]|0;ao=g-1|0;J=c[1039]|0,c[1039]=J+1,J;ak=c[K>>2]|0;ap=c[I>>2]|0;am=ak-ap>>2;do{if(am>>>0>ao>>>0){aq=ap}else{if(am>>>0<g>>>0){i9(d,g-am|0);aq=c[I>>2]|0;break}if(am>>>0<=g>>>0){aq=ap;break}h=ap+(g<<2)|0;if((h|0)==(ak|0)){aq=ap;break}c[K>>2]=ak+((((ak-4|0)+(-h|0)|0)>>>2^-1)<<2)|0;aq=ap}}while(0);ap=c[aq+(ao<<2)>>2]|0;do{if((ap|0)!=0){aq=ap+4|0;if(((J=c[aq>>2]|0,c[aq>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[ap>>2]|0)+8>>2]&1023](ap|0)}}while(0);c[(c[I>>2]|0)+(ao<<2)>>2]=4152;c[1037]=0;c[1036]=5640;if((c[3164]|0)!=-1){c[f>>2]=12656;c[f+4>>2]=24;c[f+8>>2]=0;dh(12656,f,250)}f=c[3165]|0;ao=f-1|0;J=c[1037]|0,c[1037]=J+1,J;ap=c[K>>2]|0;aq=c[I>>2]|0;ak=ap-aq>>2;do{if(ak>>>0>ao>>>0){ar=aq}else{if(ak>>>0<f>>>0){i9(d,f-ak|0);ar=c[I>>2]|0;break}if(ak>>>0<=f>>>0){ar=aq;break}g=aq+(f<<2)|0;if((g|0)==(ap|0)){ar=aq;break}c[K>>2]=ap+((((ap-4|0)+(-g|0)|0)>>>2^-1)<<2)|0;ar=aq}}while(0);aq=c[ar+(ao<<2)>>2]|0;if((aq|0)==0){as=c[I>>2]|0;at=as+(ao<<2)|0;c[at>>2]=4144;i=e;return}ar=aq+4|0;if(((J=c[ar>>2]|0,c[ar>>2]=J+ -1,J)|0)!=0){as=c[I>>2]|0;at=as+(ao<<2)|0;c[at>>2]=4144;i=e;return}bT[c[(c[aq>>2]|0)+8>>2]&1023](aq|0);as=c[I>>2]|0;at=as+(ao<<2)|0;c[at>>2]=4144;i=e;return}function hw(a,b){a=a|0;b=b|0;return b|0}function hx(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function hy(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function hz(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function hA(a){a=a|0;return 1}function hB(a){a=a|0;return 1}function hC(a){a=a|0;return 1}function hD(a,b){a=a|0;b=b|0;return b<<24>>24|0}function hE(a,b,c){a=a|0;b=b|0;c=c|0;return(b>>>0<128?b&255:c)|0}function hF(a,b,c){a=a|0;b=b|0;c=c|0;return(b<<24>>24>-1?b:c)|0}function hG(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=d-c|0;return(b>>>0<e>>>0?b:e)|0}function hH(a){a=a|0;c[a+4>>2]=(J=c[3188]|0,c[3188]=J+1,J)+1|0;return}function hI(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((d|0)==(e|0)){g=d;return g|0}else{h=d;i=f}while(1){c[i>>2]=a[h]|0;f=h+1|0;if((f|0)==(e|0)){g=e;break}else{h=f;i=i+4|0}}return g|0}function hJ(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;if((d|0)==(e|0)){h=d;return h|0}b=(((e-4|0)+(-d|0)|0)>>>2)+1|0;i=d;j=g;while(1){g=c[i>>2]|0;a[j]=g>>>0<128?g&255:f;g=i+4|0;if((g|0)==(e|0)){break}else{i=g;j=j+1|0}}h=d+(b<<2)|0;return h|0}function hK(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((c|0)==(d|0)){f=c;return f|0}else{g=c;h=e}while(1){a[h]=a[g]|0;e=g+1|0;if((e|0)==(d|0)){f=d;break}else{g=e;h=h+1|0}}return f|0}function hL(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((c|0)==(d|0)){g=c;return g|0}else{h=c;i=f}while(1){f=a[h]|0;a[i]=f<<24>>24>-1?f:e;f=h+1|0;if((f|0)==(d|0)){g=d;break}else{h=f;i=i+1|0}}return g|0}function hM(a){a=a|0;hN(a);jJ(a);return}function hN(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;c[b>>2]=6384;d=b+12|0;e=c[d>>2]|0;f=b+8|0;g=c[f>>2]|0;L780:do{if((e|0)==(g|0)){h=e}else{i=0;j=g;while(1){k=c[j+(i<<2)>>2]|0;do{if((k|0)!=0){l=k+4|0;if(((J=c[l>>2]|0,c[l>>2]=J+ -1,J)|0)!=0){break}bT[c[(c[k>>2]|0)+8>>2]&1023](k|0)}}while(0);k=i+1|0;l=c[f>>2]|0;if(k>>>0<(c[d>>2]|0)-l>>2>>>0){i=k;j=l}else{h=l;break L780}}}}while(0);if((a[b+144|0]&1)<<24>>24==0){m=h}else{jJ(c[b+152>>2]|0);m=c[f>>2]|0}if((m|0)==0){return}f=c[d>>2]|0;if((m|0)!=(f|0)){c[d>>2]=f+((((f-4|0)+(-m|0)|0)>>>2^-1)<<2)|0}if((m|0)==(b+24|0)){a[b+136|0]=0;return}else{jJ(m);return}}function hO(a){a=a|0;jJ(a);return}function hP(a){a=a|0;if((a|0)==0){return}bT[c[(c[a>>2]|0)+4>>2]&1023](a);return}function hQ(a){a=a|0;jJ(a);return}function hR(b){b=b|0;var d=0;c[b>>2]=6496;d=c[b+8>>2]|0;do{if((d|0)!=0){if((a[b+12|0]&1)<<24>>24==0){break}jK(d)}}while(0);jJ(b);return}function hS(b){b=b|0;var d=0;c[b>>2]=6496;d=c[b+8>>2]|0;if((d|0)==0){return}if((a[b+12|0]&1)<<24>>24==0){return}jK(d);return}function hT(a){a=a|0;jJ(a);return}function hU(a,d,e){a=a|0;d=d|0;e=e|0;var f=0;if(e>>>0>=128){f=0;return f|0}f=(b[(c[bb()>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0;return f|0}function hV(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;if((d|0)==(e|0)){g=d;return g|0}else{h=d;i=f}while(1){f=c[h>>2]|0;if(f>>>0<128){j=b[(c[bb()>>2]|0)+(f<<1)>>1]|0}else{j=0}b[i>>1]=j;f=h+4|0;if((f|0)==(e|0)){g=e;break}else{h=f;i=i+2|0}}return g|0}function hW(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((e|0)==(f|0)){g=e;return g|0}else{h=e}while(1){e=c[h>>2]|0;if(e>>>0<128){if((b[(c[bb()>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0){g=h;i=756;break}}e=h+4|0;if((e|0)==(f|0)){g=f;i=758;break}else{h=e}}if((i|0)==758){return g|0}else if((i|0)==756){return g|0}return 0}function hX(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;a=e;while(1){if((a|0)==(f|0)){g=f;h=768;break}e=c[a>>2]|0;if(e>>>0>=128){g=a;h=767;break}if((b[(c[bb()>>2]|0)+(e<<1)>>1]&d)<<16>>16==0){g=a;h=766;break}else{a=a+4|0}}if((h|0)==768){return g|0}else if((h|0)==767){return g|0}else if((h|0)==766){return g|0}return 0}function hY(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>=128){d=b;return d|0}d=c[(c[bs()>>2]|0)+(b<<2)>>2]|0;return d|0}function hZ(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((b|0)==(d|0)){e=b;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128){g=c[(c[bs()>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}return e|0}function h_(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>=128){d=b;return d|0}d=c[(c[bu()>>2]|0)+(b<<2)>>2]|0;return d|0}function h$(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((b|0)==(d|0)){e=b;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128){g=c[(c[bu()>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}return e|0}function h0(a,b){a=a|0;b=b|0;var d=0;if(b<<24>>24<=-1){d=b;return d|0}d=c[(c[bs()>>2]|0)+(b<<24>>24<<2)>>2]&255;return d|0}function h1(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((d|0)==(e|0)){f=d;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24>-1){h=c[(c[bs()>>2]|0)+(d<<24>>24<<2)>>2]&255}else{h=d}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}return f|0}function h2(a,b){a=a|0;b=b|0;var d=0;if(b<<24>>24<=-1){d=b;return d|0}d=c[(c[bu()>>2]|0)+(b<<24>>24<<2)>>2]&255;return d|0}function h3(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((d|0)==(e|0)){f=d;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24>-1){h=c[(c[bu()>>2]|0)+(d<<24>>24<<2)>>2]&255}else{h=d}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}return f|0}function h4(a){a=a|0;var b=0,d=0;c[a>>2]=6128;b=c[a+8>>2]|0;if((b|0)==0){d=a;jJ(d);return}bd(b|0);d=a;jJ(d);return}function h5(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=e;while(1){if((d|0)==(f|0)){k=f;break}if((c[d>>2]|0)==0){k=d;break}else{d=d+4|0}}c[j>>2]=h;c[g>>2]=e;L935:do{if((e|0)==(f|0)|(h|0)==(i|0)){l=e}else{d=i;m=b+8|0;n=h;o=e;p=k;while(1){q=bJ(c[m>>2]|0)|0;r=ji(n,g,p-o>>2,d-n|0,0)|0;if((q|0)!=0){bJ(q|0)}if((r|0)==(-1|0)){s=848;break}else if((r|0)==0){t=1;s=870;break}q=(c[j>>2]|0)+r|0;c[j>>2]=q;if((q|0)==(i|0)){s=867;break}if((p|0)==(f|0)){u=f;v=q;w=c[g>>2]|0}else{q=bJ(c[m>>2]|0)|0;if((q|0)!=0){bJ(q|0)}q=c[j>>2]|0;if((q|0)==(i|0)){t=1;s=872;break}c[j>>2]=q+1|0;a[q]=0;q=(c[g>>2]|0)+4|0;c[g>>2]=q;r=q;while(1){if((r|0)==(f|0)){x=f;break}if((c[r>>2]|0)==0){x=r;break}else{r=r+4|0}}u=x;v=c[j>>2]|0;w=q}if((w|0)==(f|0)|(v|0)==(i|0)){l=w;break L935}else{n=v;o=w;p=u}}if((s|0)==848){c[j>>2]=n;L958:do{if((o|0)==(c[g>>2]|0)){y=o}else{p=o;d=n;while(1){r=c[p>>2]|0;z=bJ(c[m>>2]|0)|0;A=jh(d,r,0)|0;if((z|0)!=0){bJ(z|0)}if((A|0)==-1){y=p;break L958}z=(c[j>>2]|0)+A|0;c[j>>2]=z;A=p+4|0;if((A|0)==(c[g>>2]|0)){y=A;break L958}else{p=A;d=z}}}}while(0);c[g>>2]=y;t=2;return t|0}else if((s|0)==867){l=c[g>>2]|0;break}else if((s|0)==870){return t|0}else if((s|0)==872){return t|0}}}while(0);t=(l|0)!=(f|0)&1;return t|0}function h6(a){a=a|0;return 0}function h7(d,f,g,h,i,j,k,l){d=d|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0;c[g>>2]=d;c[j>>2]=h;do{if((l&2|0)!=0){if((i-h|0)<3){m=1;return m|0}else{c[j>>2]=h+1|0;a[h]=-17;d=c[j>>2]|0;c[j>>2]=d+1|0;a[d]=-69;d=c[j>>2]|0;c[j>>2]=d+1|0;a[d]=-65;break}}}while(0);h=f;l=c[g>>2]|0;if(l>>>0>=f>>>0){m=0;return m|0}d=i;i=l;L983:while(1){l=b[i>>1]|0;n=l&65535;if(n>>>0>k>>>0){m=2;o=904;break}do{if((l&65535)<128){p=c[j>>2]|0;if((d-p|0)<1){m=1;o=906;break L983}c[j>>2]=p+1|0;a[p]=l&255}else{if((l&65535)<2048){p=c[j>>2]|0;if((d-p|0)<2){m=1;o=909;break L983}c[j>>2]=p+1|0;a[p]=(n>>>6|192)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n&63|128)&255;break}if((l&65535)<55296){p=c[j>>2]|0;if((d-p|0)<3){m=1;o=910;break L983}c[j>>2]=p+1|0;a[p]=(n>>>12|224)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n>>>6&63|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n&63|128)&255;break}if((l&65535)>=56320){if((l&65535)<57344){m=2;o=901;break L983}p=c[j>>2]|0;if((d-p|0)<3){m=1;o=902;break L983}c[j>>2]=p+1|0;a[p]=(n>>>12|224)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n>>>6&63|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n&63|128)&255;break}if((h-i|0)<4){m=1;o=911;break L983}p=i+2|0;q=e[p>>1]|0;if((q&64512|0)!=56320){m=2;o=912;break L983}if((d-(c[j>>2]|0)|0)<4){m=1;o=908;break L983}r=n&960;if(((r<<10)+65536|n<<10&64512|q&1023)>>>0>k>>>0){m=2;o=903;break L983}c[g>>2]=p;p=(r>>>6)+1|0;r=c[j>>2]|0;c[j>>2]=r+1|0;a[r]=(p>>>2|240)&255;r=c[j>>2]|0;c[j>>2]=r+1|0;a[r]=(n>>>2&15|p<<4&48|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n<<4&48|q>>>6&15|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(q&63|128)&255}}while(0);n=(c[g>>2]|0)+2|0;c[g>>2]=n;if(n>>>0<f>>>0){i=n}else{m=0;o=907;break}}if((o|0)==901){return m|0}else if((o|0)==902){return m|0}else if((o|0)==903){return m|0}else if((o|0)==904){return m|0}else if((o|0)==906){return m|0}else if((o|0)==907){return m|0}else if((o|0)==908){return m|0}else if((o|0)==909){return m|0}else if((o|0)==910){return m|0}else if((o|0)==911){return m|0}else if((o|0)==912){return m|0}return 0}function h8(a){a=a|0;jJ(a);return}function h9(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=h7(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>1<<1)|0;c[j>>2]=g+((c[k>>2]|0)-g|0)|0;i=b;return l|0}function ia(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=il(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d|0)|0;c[j>>2]=g+((c[k>>2]|0)-g>>1<<1)|0;i=b;return l|0}function ib(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;l=i;i=i+8|0;m=l|0;n=m;o=e;while(1){if((o|0)==(f|0)){p=f;break}if((a[o]|0)==0){p=o;break}else{o=o+1|0}}c[k>>2]=h;c[g>>2]=e;L1028:do{if((e|0)==(f|0)|(h|0)==(j|0)){q=e}else{o=d;r=j;s=b+8|0;t=h;u=e;v=p;while(1){w=c[o+4>>2]|0;c[m>>2]=c[o>>2]|0;c[m+4>>2]=w;x=v;w=bJ(c[s>>2]|0)|0;y=jf(t,g,x-u|0,r-t>>2,d)|0;if((w|0)!=0){bJ(w|0)}if((y|0)==(-1|0)){z=926;break}else if((y|0)==0){A=2;z=953;break}w=(c[k>>2]|0)+(y<<2)|0;c[k>>2]=w;if((w|0)==(j|0)){z=948;break}y=c[g>>2]|0;if((v|0)==(f|0)){B=f;C=w;D=y}else{E=bJ(c[s>>2]|0)|0;F=je(w,y,1,d)|0;if((E|0)!=0){bJ(E|0)}if((F|0)!=0){A=2;z=951;break}c[k>>2]=(c[k>>2]|0)+4|0;F=(c[g>>2]|0)+1|0;c[g>>2]=F;E=F;while(1){if((E|0)==(f|0)){G=f;break}if((a[E]|0)==0){G=E;break}else{E=E+1|0}}B=G;C=c[k>>2]|0;D=F}if((D|0)==(f|0)|(C|0)==(j|0)){q=D;break L1028}else{t=C;u=D;v=B}}if((z|0)==948){q=c[g>>2]|0;break}else if((z|0)==926){c[k>>2]=t;L1051:do{if((u|0)==(c[g>>2]|0)){H=u}else{v=t;r=u;while(1){o=bJ(c[s>>2]|0)|0;E=je(v,r,x-r|0,n)|0;if((o|0)!=0){bJ(o|0)}if((E|0)==0){I=r+1|0}else if((E|0)==(-1|0)){z=932;break}else if((E|0)==(-2|0)){z=933;break}else{I=r+E|0}E=(c[k>>2]|0)+4|0;c[k>>2]=E;if((I|0)==(c[g>>2]|0)){H=I;break L1051}else{v=E;r=I}}if((z|0)==932){c[g>>2]=r;A=2;i=l;return A|0}else if((z|0)==933){c[g>>2]=r;A=1;i=l;return A|0}}}while(0);c[g>>2]=H;A=(H|0)!=(f|0)&1;i=l;return A|0}else if((z|0)==951){i=l;return A|0}else if((z|0)==953){i=l;return A|0}}}while(0);A=(q|0)!=(f|0)&1;i=l;return A|0}function ic(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;d=bJ(c[a+8>>2]|0)|0;if((d|0)==0){return 0}bJ(d|0);return 0}function id(a){a=a|0;var b=0,d=0,e=0;b=a+8|0;a=bJ(c[b>>2]|0)|0;if((a|0)!=0){bJ(a|0)}a=c[b>>2]|0;if((a|0)==0){return 1}b=bJ(a|0)|0;a=aM()|0;if((b|0)==0){d=(a|0)==1;e=d&1;return e|0}bJ(b|0);d=(a|0)==1;e=d&1;return e|0}function ie(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;if((f|0)==0|(d|0)==(e|0)){g=0;return g|0}h=e;i=a+8|0;a=(b|0)!=0?b:112;b=d;d=0;j=0;while(1){k=bJ(c[i>>2]|0)|0;l=je(0,b,h-b|0,a)|0;if((k|0)!=0){bJ(k|0)}if((l|0)==0){m=1;n=b+1|0}else if((l|0)==(-1|0)|(l|0)==(-2|0)){g=d;o=993;break}else{m=l;n=b+l|0}l=m+d|0;k=j+1|0;if(k>>>0>=f>>>0|(n|0)==(e|0)){g=l;o=992;break}else{b=n;d=l;j=k}}if((o|0)==993){return g|0}else if((o|0)==992){return g|0}return 0}function ig(a){a=a|0;var b=0,d=0,e=0;b=c[a+8>>2]|0;do{if((b|0)==0){d=1}else{a=bJ(b|0)|0;e=aM()|0;if((a|0)==0){d=e;break}bJ(a|0);d=e}}while(0);return d|0}function ih(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function ii(a){a=a|0;return 0}function ij(a){a=a|0;return 0}function ik(a){a=a|0;return 4}function il(e,f,g,h,i,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;c[g>>2]=e;c[j>>2]=h;h=c[g>>2]|0;do{if((l&4|0)==0){m=h}else{if((f-h|0)<=2){m=h;break}if((a[h]|0)!=-17){m=h;break}if((a[h+1|0]|0)!=-69){m=h;break}if((a[h+2|0]|0)!=-65){m=h;break}e=h+3|0;c[g>>2]=e;m=e}}while(0);L1126:do{if(m>>>0<f>>>0){h=f;l=i;e=c[j>>2]|0;n=m;L1128:while(1){if(e>>>0>=i>>>0){o=n;break L1126}p=a[n]|0;q=p&255;if(q>>>0>k>>>0){r=2;s=1061;break}do{if(p<<24>>24>-1){b[e>>1]=p&255;c[g>>2]=(c[g>>2]|0)+1|0}else{if((p&255)<194){r=2;s=1059;break L1128}if((p&255)<224){if((h-n|0)<2){r=1;s=1066;break L1128}t=d[n+1|0]|0;if((t&192|0)!=128){r=2;s=1067;break L1128}u=t&63|q<<6&1984;if(u>>>0>k>>>0){r=2;s=1053;break L1128}b[e>>1]=u&65535;c[g>>2]=(c[g>>2]|0)+2|0;break}if((p&255)<240){if((h-n|0)<3){r=1;s=1062;break L1128}u=a[n+1|0]|0;t=a[n+2|0]|0;if((q|0)==224){if((u&-32)<<24>>24!=-96){r=2;s=1052;break L1128}}else if((q|0)==237){if((u&-32)<<24>>24!=-128){r=2;s=1070;break L1128}}else{if((u&-64)<<24>>24!=-128){r=2;s=1071;break L1128}}v=t&255;if((v&192|0)!=128){r=2;s=1065;break L1128}t=(u&255)<<6&4032|q<<12|v&63;if((t&65535)>>>0>k>>>0){r=2;s=1063;break L1128}b[e>>1]=t&65535;c[g>>2]=(c[g>>2]|0)+3|0;break}if((p&255)>=245){r=2;s=1060;break L1128}if((h-n|0)<4){r=1;s=1054;break L1128}t=a[n+1|0]|0;v=a[n+2|0]|0;u=a[n+3|0]|0;if((q|0)==240){if((t+112&255)>=48){r=2;s=1064;break L1128}}else if((q|0)==244){if((t&-16)<<24>>24!=-128){r=2;s=1068;break L1128}}else{if((t&-64)<<24>>24!=-128){r=2;s=1069;break L1128}}w=v&255;if((w&192|0)!=128){r=2;s=1055;break L1128}v=u&255;if((v&192|0)!=128){r=2;s=1056;break L1128}if((l-e|0)<4){r=1;s=1057;break L1128}u=q&7;x=t&255;t=w<<6;y=v&63;if((x<<12&258048|u<<18|t&4032|y)>>>0>k>>>0){r=2;s=1058;break L1128}b[e>>1]=(x<<2&60|w>>>4&3|((x>>>4&3|u<<2)<<6)+16320|55296)&65535;u=(c[j>>2]|0)+2|0;c[j>>2]=u;b[u>>1]=(y|t&960|56320)&65535;c[g>>2]=(c[g>>2]|0)+4|0}}while(0);q=(c[j>>2]|0)+2|0;c[j>>2]=q;p=c[g>>2]|0;if(p>>>0<f>>>0){e=q;n=p}else{o=p;break L1126}}if((s|0)==1059){return r|0}else if((s|0)==1060){return r|0}else if((s|0)==1061){return r|0}else if((s|0)==1062){return r|0}else if((s|0)==1063){return r|0}else if((s|0)==1064){return r|0}else if((s|0)==1065){return r|0}else if((s|0)==1066){return r|0}else if((s|0)==1067){return r|0}else if((s|0)==1068){return r|0}else if((s|0)==1069){return r|0}else if((s|0)==1070){return r|0}else if((s|0)==1071){return r|0}else if((s|0)==1052){return r|0}else if((s|0)==1053){return r|0}else if((s|0)==1054){return r|0}else if((s|0)==1055){return r|0}else if((s|0)==1056){return r|0}else if((s|0)==1057){return r|0}else if((s|0)==1058){return r|0}}else{o=m}}while(0);r=o>>>0<f>>>0&1;return r|0}function im(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;do{if((g&4|0)==0){h=b}else{if((c-b|0)<=2){h=b;break}if((a[b]|0)!=-17){h=b;break}if((a[b+1|0]|0)!=-69){h=b;break}h=(a[b+2|0]|0)==-65?b+3|0:b}}while(0);L1195:do{if(h>>>0<c>>>0&(e|0)!=0){g=c;i=0;j=h;L1197:while(1){k=a[j]|0;l=k&255;if(l>>>0>f>>>0){m=j;break L1195}do{if(k<<24>>24>-1){n=j+1|0;o=i}else{if((k&255)<194){m=j;break L1195}if((k&255)<224){if((g-j|0)<2){m=j;break L1195}p=d[j+1|0]|0;if((p&192|0)!=128){m=j;break L1195}if((p&63|l<<6&1984)>>>0>f>>>0){m=j;break L1195}n=j+2|0;o=i;break}if((k&255)<240){q=j;if((g-q|0)<3){m=j;break L1195}p=a[j+1|0]|0;r=a[j+2|0]|0;if((l|0)==224){if((p&-32)<<24>>24!=-96){s=1093;break L1197}}else if((l|0)==237){if((p&-32)<<24>>24!=-128){s=1095;break L1197}}else{if((p&-64)<<24>>24!=-128){s=1097;break L1197}}t=r&255;if((t&192|0)!=128){m=j;break L1195}if(((p&255)<<6&4032|l<<12&61440|t&63)>>>0>f>>>0){m=j;break L1195}n=j+3|0;o=i;break}if((k&255)>=245){m=j;break L1195}u=j;if((g-u|0)<4){m=j;break L1195}if((e-i|0)>>>0<2){m=j;break L1195}t=a[j+1|0]|0;p=a[j+2|0]|0;r=a[j+3|0]|0;if((l|0)==244){if((t&-16)<<24>>24!=-128){s=1108;break L1197}}else if((l|0)==240){if((t+112&255)>=48){s=1106;break L1197}}else{if((t&-64)<<24>>24!=-128){s=1110;break L1197}}v=p&255;if((v&192|0)!=128){m=j;break L1195}p=r&255;if((p&192|0)!=128){m=j;break L1195}if(((t&255)<<12&258048|l<<18&1835008|v<<6&4032|p&63)>>>0>f>>>0){m=j;break L1195}n=j+4|0;o=i+1|0}}while(0);l=o+1|0;if(n>>>0<c>>>0&l>>>0<e>>>0){i=l;j=n}else{m=n;break L1195}}if((s|0)==1106){w=u-b|0;return w|0}else if((s|0)==1108){w=u-b|0;return w|0}else if((s|0)==1093){w=q-b|0;return w|0}else if((s|0)==1095){w=q-b|0;return w|0}else if((s|0)==1110){w=u-b|0;return w|0}else if((s|0)==1097){w=q-b|0;return w|0}}else{m=h}}while(0);w=m-b|0;return w|0}function io(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0;c[e>>2]=b;c[h>>2]=f;do{if((j&2|0)!=0){if((g-f|0)<3){k=1;return k|0}else{c[h>>2]=f+1|0;a[f]=-17;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=-69;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=-65;break}}}while(0);f=c[e>>2]|0;if(f>>>0>=d>>>0){k=0;return k|0}j=g;g=f;L1258:while(1){f=c[g>>2]|0;if((f&-2048|0)==55296|f>>>0>i>>>0){k=2;l=1151;break}do{if(f>>>0<128){b=c[h>>2]|0;if((j-b|0)<1){k=1;l=1144;break L1258}c[h>>2]=b+1|0;a[b]=f&255}else{if(f>>>0<2048){b=c[h>>2]|0;if((j-b|0)<2){k=1;l=1150;break L1258}c[h>>2]=b+1|0;a[b]=(f>>>6|192)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f&63|128)&255;break}b=c[h>>2]|0;m=j-b|0;if(f>>>0<65536){if((m|0)<3){k=1;l=1147;break L1258}c[h>>2]=b+1|0;a[b]=(f>>>12|224)&255;n=c[h>>2]|0;c[h>>2]=n+1|0;a[n]=(f>>>6&63|128)&255;n=c[h>>2]|0;c[h>>2]=n+1|0;a[n]=(f&63|128)&255;break}else{if((m|0)<4){k=1;l=1148;break L1258}c[h>>2]=b+1|0;a[b]=(f>>>18|240)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f>>>12&63|128)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f>>>6&63|128)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f&63|128)&255;break}}}while(0);f=(c[e>>2]|0)+4|0;c[e>>2]=f;if(f>>>0<d>>>0){g=f}else{k=0;l=1149;break}}if((l|0)==1144){return k|0}else if((l|0)==1149){return k|0}else if((l|0)==1150){return k|0}else if((l|0)==1147){return k|0}else if((l|0)==1148){return k|0}else if((l|0)==1151){return k|0}return 0}function ip(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return im(c,d,e,1114111,0)|0}function iq(a){a=a|0;jJ(a);return}function ir(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=io(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>2<<2)|0;c[j>>2]=g+((c[k>>2]|0)-g|0)|0;i=b;return l|0}function is(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+16|0;a=b|0;k=b+8|0;c[a>>2]=d;c[k>>2]=g;l=ix(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d|0)|0;c[j>>2]=g+((c[k>>2]|0)-g>>2<<2)|0;i=b;return l|0}function it(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function iu(a){a=a|0;return 0}function iv(a){a=a|0;return 0}function iw(a){a=a|0;return 4}function ix(b,e,f,g,h,i,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;c[f>>2]=b;c[i>>2]=g;g=c[f>>2]|0;do{if((k&4|0)==0){l=g}else{if((e-g|0)<=2){l=g;break}if((a[g]|0)!=-17){l=g;break}if((a[g+1|0]|0)!=-69){l=g;break}if((a[g+2|0]|0)!=-65){l=g;break}b=g+3|0;c[f>>2]=b;l=b}}while(0);L1298:do{if(l>>>0<e>>>0){g=e;k=c[i>>2]|0;b=l;L1300:while(1){if(k>>>0>=h>>>0){m=b;break L1298}n=a[b]|0;o=n&255;do{if(n<<24>>24>-1){if(o>>>0>j>>>0){p=2;q=1214;break L1300}c[k>>2]=o;c[f>>2]=(c[f>>2]|0)+1|0}else{if((n&255)<194){p=2;q=1206;break L1300}if((n&255)<224){if((g-b|0)<2){p=1;q=1212;break L1300}r=d[b+1|0]|0;if((r&192|0)!=128){p=2;q=1211;break L1300}s=r&63|o<<6&1984;if(s>>>0>j>>>0){p=2;q=1215;break L1300}c[k>>2]=s;c[f>>2]=(c[f>>2]|0)+2|0;break}if((n&255)<240){if((g-b|0)<3){p=1;q=1209;break L1300}s=a[b+1|0]|0;r=a[b+2|0]|0;if((o|0)==224){if((s&-32)<<24>>24!=-96){p=2;q=1202;break L1300}}else if((o|0)==237){if((s&-32)<<24>>24!=-128){p=2;q=1208;break L1300}}else{if((s&-64)<<24>>24!=-128){p=2;q=1213;break L1300}}t=r&255;if((t&192|0)!=128){p=2;q=1207;break L1300}r=(s&255)<<6&4032|o<<12&61440|t&63;if(r>>>0>j>>>0){p=2;q=1217;break L1300}c[k>>2]=r;c[f>>2]=(c[f>>2]|0)+3|0;break}if((n&255)>=245){p=2;q=1200;break L1300}if((g-b|0)<4){p=1;q=1201;break L1300}r=a[b+1|0]|0;t=a[b+2|0]|0;s=a[b+3|0]|0;if((o|0)==240){if((r+112&255)>=48){p=2;q=1216;break L1300}}else if((o|0)==244){if((r&-16)<<24>>24!=-128){p=2;q=1218;break L1300}}else{if((r&-64)<<24>>24!=-128){p=2;q=1219;break L1300}}u=t&255;if((u&192|0)!=128){p=2;q=1210;break L1300}t=s&255;if((t&192|0)!=128){p=2;q=1205;break L1300}s=(r&255)<<12&258048|o<<18&1835008|u<<6&4032|t&63;if(s>>>0>j>>>0){p=2;q=1203;break L1300}c[k>>2]=s;c[f>>2]=(c[f>>2]|0)+4|0}}while(0);o=(c[i>>2]|0)+4|0;c[i>>2]=o;n=c[f>>2]|0;if(n>>>0<e>>>0){k=o;b=n}else{m=n;break L1298}}if((q|0)==1217){return p|0}else if((q|0)==1218){return p|0}else if((q|0)==1219){return p|0}else if((q|0)==1200){return p|0}else if((q|0)==1211){return p|0}else if((q|0)==1212){return p|0}else if((q|0)==1213){return p|0}else if((q|0)==1214){return p|0}else if((q|0)==1215){return p|0}else if((q|0)==1216){return p|0}else if((q|0)==1205){return p|0}else if((q|0)==1206){return p|0}else if((q|0)==1207){return p|0}else if((q|0)==1208){return p|0}else if((q|0)==1209){return p|0}else if((q|0)==1210){return p|0}else if((q|0)==1201){return p|0}else if((q|0)==1202){return p|0}else if((q|0)==1203){return p|0}}else{m=l}}while(0);p=m>>>0<e>>>0&1;return p|0}function iy(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;do{if((g&4|0)==0){h=b}else{if((c-b|0)<=2){h=b;break}if((a[b]|0)!=-17){h=b;break}if((a[b+1|0]|0)!=-69){h=b;break}h=(a[b+2|0]|0)==-65?b+3|0:b}}while(0);L1365:do{if(h>>>0<c>>>0&(e|0)!=0){g=c;i=1;j=h;L1367:while(1){k=a[j]|0;l=k&255;do{if(k<<24>>24>-1){if(l>>>0>f>>>0){m=j;break L1365}n=j+1|0}else{if((k&255)<194){m=j;break L1365}if((k&255)<224){if((g-j|0)<2){m=j;break L1365}o=d[j+1|0]|0;if((o&192|0)!=128){m=j;break L1365}if((o&63|l<<6&1984)>>>0>f>>>0){m=j;break L1365}n=j+2|0;break}if((k&255)<240){p=j;if((g-p|0)<3){m=j;break L1365}o=a[j+1|0]|0;q=a[j+2|0]|0;if((l|0)==224){if((o&-32)<<24>>24!=-96){r=1240;break L1367}}else if((l|0)==237){if((o&-32)<<24>>24!=-128){r=1242;break L1367}}else{if((o&-64)<<24>>24!=-128){r=1244;break L1367}}s=q&255;if((s&192|0)!=128){m=j;break L1365}if(((o&255)<<6&4032|l<<12&61440|s&63)>>>0>f>>>0){m=j;break L1365}n=j+3|0;break}if((k&255)>=245){m=j;break L1365}t=j;if((g-t|0)<4){m=j;break L1365}s=a[j+1|0]|0;o=a[j+2|0]|0;q=a[j+3|0]|0;if((l|0)==244){if((s&-16)<<24>>24!=-128){r=1254;break L1367}}else if((l|0)==240){if((s+112&255)>=48){r=1252;break L1367}}else{if((s&-64)<<24>>24!=-128){r=1256;break L1367}}u=o&255;if((u&192|0)!=128){m=j;break L1365}o=q&255;if((o&192|0)!=128){m=j;break L1365}if(((s&255)<<12&258048|l<<18&1835008|u<<6&4032|o&63)>>>0>f>>>0){m=j;break L1365}n=j+4|0}}while(0);if(!(n>>>0<c>>>0&i>>>0<e>>>0)){m=n;break L1365}i=i+1|0;j=n}if((r|0)==1240){v=p-b|0;return v|0}else if((r|0)==1242){v=p-b|0;return v|0}else if((r|0)==1244){v=p-b|0;return v|0}else if((r|0)==1254){v=t-b|0;return v|0}else if((r|0)==1256){v=t-b|0;return v|0}else if((r|0)==1252){v=t-b|0;return v|0}}else{m=h}}while(0);v=m-b|0;return v|0}function iz(b){b=b|0;return a[b+8|0]|0}function iA(a){a=a|0;return c[a+8>>2]|0}function iB(b){b=b|0;return a[b+9|0]|0}function iC(a){a=a|0;return c[a+12>>2]|0}function iD(b,c){b=b|0;c=c|0;c=b;a[b]=8;b=c+1|0;D=1702195828;a[b]=D&255;D=D>>8;a[b+1|0]=D&255;D=D>>8;a[b+2|0]=D&255;D=D>>8;a[b+3|0]=D&255;a[c+5|0]=0;return}function iE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return iy(c,d,e,1114111,0)|0}function iF(a){a=a|0;jJ(a);return}function iG(a){a=a|0;jJ(a);return}function iH(b){b=b|0;var d=0;c[b>>2]=5592;if((a[b+12|0]&1)<<24>>24==0){d=b;jJ(d);return}jJ(c[b+20>>2]|0);d=b;jJ(d);return}function iI(b){b=b|0;c[b>>2]=5592;if((a[b+12|0]&1)<<24>>24==0){return}jJ(c[b+20>>2]|0);return}function iJ(b){b=b|0;var d=0;c[b>>2]=5544;if((a[b+16|0]&1)<<24>>24==0){d=b;jJ(d);return}jJ(c[b+24>>2]|0);d=b;jJ(d);return}function iK(b){b=b|0;c[b>>2]=5544;if((a[b+16|0]&1)<<24>>24==0){return}jJ(c[b+24>>2]|0);return}function iL(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;b=jG(32)|0;d=b;c[a+8>>2]=d;c[a>>2]=9;c[a+4>>2]=4;a=1272;e=4;f=d;while(1){d=e-1|0;c[f>>2]=c[a>>2]|0;if((d|0)==0){break}else{a=a+4|0;e=d;f=f+4|0}}c[b+16>>2]=0;return}function iM(b,c){b=b|0;c=c|0;c=b;a[b]=10;b=c+1|0;a[b]=a[1264]|0;a[b+1|0]=a[1265|0]|0;a[b+2|0]=a[1266|0]|0;a[b+3|0]=a[1267|0]|0;a[b+4|0]=a[1268|0]|0;a[c+6|0]=0;return}function iN(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;b=jG(32)|0;d=b;c[a+8>>2]=d;c[a>>2]=9;c[a+4>>2]=5;a=1240;e=5;f=d;while(1){d=e-1|0;c[f>>2]=c[a>>2]|0;if((d|0)==0){break}else{a=a+4|0;e=d;f=f+4|0}}c[b+20>>2]=0;return}function iO(b){b=b|0;var d=0;if(a[13712]|0){d=c[1216]|0;return d|0}if(!(a[13600]|0)){jP(3488,0,168);aR(724,0,v|0);a[13600]=1}dd(3488,1528);dd(3500,1520);dd(3512,1512);dd(3524,1496);dd(3536,1480);dd(3548,1472);dd(3560,1456);dd(3572,1448);dd(3584,1440);dd(3596,1432);dd(3608,1424);dd(3620,1416);dd(3632,1400);dd(3644,1392);c[1216]=3488;a[13712]=1;d=3488;return d|0}function iP(b){b=b|0;var d=0;if(a[13656]|0){d=c[1194]|0;return d|0}if(!(a[13576]|0)){jP(2744,0,168);aR(378,0,v|0);a[13576]=1}dF(2744,1912,6);dF(2756,1880,6);dF(2768,1848,7);dF(2780,1808,9);dF(2792,1768,8);dF(2804,1736,6);dF(2816,1696,8);dF(2828,1680,3);dF(2840,1664,3);dF(2852,1648,3);dF(2864,1592,3);dF(2876,1576,3);dF(2888,1560,3);dF(2900,1544,3);c[1194]=2744;a[13656]=1;d=2744;return d|0}function iQ(b){b=b|0;var d=0;if(a[13704]|0){d=c[1214]|0;return d|0}if(!(a[13592]|0)){jP(3200,0,288);aR(420,0,v|0);a[13592]=1}dd(3200,344);dd(3212,312);dd(3224,304);dd(3236,296);dd(3248,288);dd(3260,280);dd(3272,272);dd(3284,264);dd(3296,208);dd(3308,200);dd(3320,184);dd(3332,168);dd(3344,160);dd(3356,152);dd(3368,144);dd(3380,136);dd(3392,288);dd(3404,128);dd(3416,120);dd(3428,1976);dd(3440,1968);dd(3452,1960);dd(3464,1952);dd(3476,1944);c[1214]=3200;a[13704]=1;d=3200;return d|0}function iR(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=d+12|0;if((a[e]&1)<<24>>24==0){f=b;c[f>>2]=c[e>>2]|0;c[f+4>>2]=c[e+4>>2]|0;c[f+8>>2]=c[e+8>>2]|0;return}e=c[d+20>>2]|0;f=c[d+16>>2]|0;if((f|0)==-1){di(0)}if(f>>>0<11){a[b]=f<<1&255;g=b+1|0}else{d=f+16&-16;h=jG(d)|0;c[b+8>>2]=h;c[b>>2]=d|1;c[b+4>>2]=f;g=h}jQ(g|0,e|0,f);a[g+f|0]=0;return}function iS(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=d+16|0;if((a[e]&1)<<24>>24==0){f=b;c[f>>2]=c[e>>2]|0;c[f+4>>2]=c[e+4>>2]|0;c[f+8>>2]=c[e+8>>2]|0;return}e=c[d+24>>2]|0;f=c[d+20>>2]|0;if((f|0)==-1){di(0)}if(f>>>0<11){a[b]=f<<1&255;g=b+1|0}else{d=f+16&-16;h=jG(d)|0;c[b+8>>2]=h;c[b>>2]=d|1;c[b+4>>2]=f;g=h}jQ(g|0,e|0,f);a[g+f|0]=0;return}function iT(b){b=b|0;var d=0;if(a[13648]|0){d=c[1192]|0;return d|0}if(!(a[13568]|0)){jP(2456,0,288);aR(318,0,v|0);a[13568]=1}dF(2456,864,7);dF(2468,824,8);dF(2480,800,5);dF(2492,776,5);dF(2504,464,3);dF(2516,752,4);dF(2528,728,4);dF(2540,696,6);dF(2552,656,9);dF(2564,624,7);dF(2576,584,8);dF(2588,544,8);dF(2600,528,3);dF(2612,512,3);dF(2624,496,3);dF(2636,480,3);dF(2648,464,3);dF(2660,448,3);dF(2672,432,3);dF(2684,416,3);dF(2696,400,3);dF(2708,384,3);dF(2720,368,3);dF(2732,352,3);c[1192]=2456;a[13648]=1;d=2456;return d|0}function iU(b){b=b|0;var d=0;if(a[13720]|0){d=c[1218]|0;return d|0}if(!(a[13608]|0)){jP(3656,0,288);aR(314,0,v|0);a[13608]=1}dd(3656,904);dd(3668,896);c[1218]=3656;a[13720]=1;d=3656;return d|0}function iV(b){b=b|0;var d=0;if(a[13664]|0){d=c[1196]|0;return d|0}if(!(a[13584]|0)){jP(2912,0,288);aR(684,0,v|0);a[13584]=1}dF(2912,928,2);dF(2924,912,2);c[1196]=2912;a[13664]=1;d=2912;return d|0}function iW(b){b=b|0;var c=0;if(a[13728]|0){return 4880}a[4880]=16;b=4881;c=b|0;D=623865125;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;c=b+4|0;D=2032480100;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;a[4889]=0;aR(716,4880,v|0);a[13728]=1;return 4880}function iX(b){b=b|0;var d=0,e=0,f=0,g=0;if(a[13672]|0){return 4792}b=jG(48)|0;d=b;c[1200]=d;c[1198]=13;c[1199]=8;e=1200;f=8;g=d;while(1){d=f-1|0;c[g>>2]=c[e>>2]|0;if((d|0)==0){break}else{e=e+4|0;f=d;g=g+4|0}}c[b+32>>2]=0;aR(484,4792,v|0);a[13672]=1;return 4792}function iY(b){b=b|0;var c=0;if(a[13752]|0){return 4928}a[4928]=16;b=4929;c=b|0;D=624576549;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;c=b+4|0;D=1394948685;a[c]=D&255;D=D>>8;a[c+1|0]=D&255;D=D>>8;a[c+2|0]=D&255;D=D>>8;a[c+3|0]=D&255;a[4937]=0;aR(716,4928,v|0);a[13752]=1;return 4928}function iZ(b){b=b|0;var d=0,e=0,f=0,g=0;if(a[13696]|0){return 4840}b=jG(48)|0;d=b;c[1212]=d;c[1210]=13;c[1211]=8;e=1144;f=8;g=d;while(1){d=f-1|0;c[g>>2]=c[e>>2]|0;if((d|0)==0){break}else{e=e+4|0;f=d;g=g+4|0}}c[b+32>>2]=0;aR(484,4840,v|0);a[13696]=1;return 4840}function i_(b){b=b|0;if(a[13744]|0){return 4912}b=jG(32)|0;c[1230]=b;c[1228]=33;c[1229]=20;jQ(b|0,1120,20);a[b+20|0]=0;aR(716,4912,v|0);a[13744]=1;return 4912}function i$(b){b=b|0;var d=0,e=0,f=0,g=0;if(a[13688]|0){return 4824}b=jG(96)|0;d=b;c[1208]=d;c[1206]=25;c[1207]=20;e=1032;f=20;g=d;while(1){d=f-1|0;c[g>>2]=c[e>>2]|0;if((d|0)==0){break}else{e=e+4|0;f=d;g=g+4|0}}c[b+80>>2]=0;aR(484,4824,v|0);a[13688]=1;return 4824}function i0(b){b=b|0;if(a[13736]|0){return 4896}b=jG(16)|0;c[1226]=b;c[1224]=17;c[1225]=11;jQ(b|0,1016,11);a[b+11|0]=0;aR(716,4896,v|0);a[13736]=1;return 4896}function i1(b){b=b|0;var d=0,e=0,f=0,g=0;if(a[13680]|0){return 4808}b=jG(48)|0;d=b;c[1204]=d;c[1202]=13;c[1203]=11;e=968;f=11;g=d;while(1){d=f-1|0;c[g>>2]=c[e>>2]|0;if((d|0)==0){break}else{e=e+4|0;f=d;g=g+4|0}}c[b+44>>2]=0;aR(484,4808,v|0);a[13680]=1;return 4808}function i2(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;d=(c[a>>2]|0)+(c[b+4>>2]|0)|0;a=d;e=c[b>>2]|0;if((e&1|0)==0){b=e;bT[b&1023](a);return}else{b=c[(c[d>>2]|0)+(e-1|0)>>2]|0;bT[b&1023](a);return}}function i3(b){b=b|0;var d=0;b=3200;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jJ(c[b-12+8>>2]|0)}if((d|0)==2912){break}else{b=d}}return}function i4(b){b=b|0;var d=0;b=3944;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jJ(c[b-12+8>>2]|0)}if((d|0)==3656){break}else{b=d}}return}function i5(b){b=b|0;var d=0;b=2744;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jJ(c[b-12+8>>2]|0)}if((d|0)==2456){break}else{b=d}}return}function i6(b){b=b|0;var d=0;b=3488;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jJ(c[b-12+8>>2]|0)}if((d|0)==3200){break}else{b=d}}return}function i7(b){b=b|0;if((a[2900]&1)<<24>>24!=0){jJ(c[727]|0)}if((a[2888]&1)<<24>>24!=0){jJ(c[724]|0)}if((a[2876]&1)<<24>>24!=0){jJ(c[721]|0)}if((a[2864]&1)<<24>>24!=0){jJ(c[718]|0)}if((a[2852]&1)<<24>>24!=0){jJ(c[715]|0)}if((a[2840]&1)<<24>>24!=0){jJ(c[712]|0)}if((a[2828]&1)<<24>>24!=0){jJ(c[709]|0)}if((a[2816]&1)<<24>>24!=0){jJ(c[706]|0)}if((a[2804]&1)<<24>>24!=0){jJ(c[703]|0)}if((a[2792]&1)<<24>>24!=0){jJ(c[700]|0)}if((a[2780]&1)<<24>>24!=0){jJ(c[697]|0)}if((a[2768]&1)<<24>>24!=0){jJ(c[694]|0)}if((a[2756]&1)<<24>>24!=0){jJ(c[691]|0)}if((a[2744]&1)<<24>>24==0){return}jJ(c[688]|0);return}function i8(b){b=b|0;if((a[3644]&1)<<24>>24!=0){jJ(c[913]|0)}if((a[3632]&1)<<24>>24!=0){jJ(c[910]|0)}if((a[3620]&1)<<24>>24!=0){jJ(c[907]|0)}if((a[3608]&1)<<24>>24!=0){jJ(c[904]|0)}if((a[3596]&1)<<24>>24!=0){jJ(c[901]|0)}if((a[3584]&1)<<24>>24!=0){jJ(c[898]|0)}if((a[3572]&1)<<24>>24!=0){jJ(c[895]|0)}if((a[3560]&1)<<24>>24!=0){jJ(c[892]|0)}if((a[3548]&1)<<24>>24!=0){jJ(c[889]|0)}if((a[3536]&1)<<24>>24!=0){jJ(c[886]|0)}if((a[3524]&1)<<24>>24!=0){jJ(c[883]|0)}if((a[3512]&1)<<24>>24!=0){jJ(c[880]|0)}if((a[3500]&1)<<24>>24!=0){jJ(c[877]|0)}if((a[3488]&1)<<24>>24==0){return}jJ(c[874]|0);return}function i9(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;e=b+8|0;f=b+4|0;g=c[f>>2]|0;h=c[e>>2]|0;i=g;if(h-i>>2>>>0>=d>>>0){j=d;k=g;while(1){if((k|0)==0){l=0}else{c[k>>2]=0;l=c[f>>2]|0}g=l+4|0;c[f>>2]=g;m=j-1|0;if((m|0)==0){break}else{j=m;k=g}}return}k=b+16|0;j=b|0;l=c[j>>2]|0;g=i-l>>2;i=g+d|0;if(i>>>0>1073741823){hu(0)}m=h-l|0;do{if(m>>2>>>0>536870910){n=1073741823;o=1523}else{l=m>>1;h=l>>>0<i>>>0?i:l;if((h|0)==0){p=0;q=0;break}l=b+128|0;if(!((a[l]&1)<<24>>24==0&h>>>0<29)){n=h;o=1523;break}a[l]=1;p=k;q=h;break}}while(0);if((o|0)==1523){p=jG(n<<2)|0;q=n}n=d;d=p+(g<<2)|0;while(1){if((d|0)==0){r=0}else{c[d>>2]=0;r=d}s=r+4|0;o=n-1|0;if((o|0)==0){break}else{n=o;d=s}}d=c[j>>2]|0;n=(c[f>>2]|0)-d|0;r=p+(g-(n>>2)<<2)|0;g=d;jQ(r|0,g|0,n);c[j>>2]=r;c[f>>2]=s;c[e>>2]=p+(q<<2)|0;if((d|0)==0){return}if((d|0)==(k|0)){a[b+128|0]=0;return}else{jJ(g);return}}function ja(a){a=a|0;return 1328}function jb(a){a=a|0;return}function jc(a){a=a|0;return}function jd(a){a=a|0;return}function je(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,t=0,u=0,v=0,w=0,x=0,y=0;g=i;i=i+8|0;h=g|0;c[h>>2]=b;j=((f|0)==0?104:f)|0;f=c[j>>2]|0;L1747:do{if((d|0)==0){if((f|0)==0){k=0}else{break}i=g;return k|0}else{if((b|0)==0){l=h;c[h>>2]=l;m=l}else{m=b}if((e|0)==0){k=-2;i=g;return k|0}do{if((f|0)==0){l=a[d]|0;n=l&255;if(l<<24>>24>-1){c[m>>2]=n;k=l<<24>>24!=0&1;i=g;return k|0}else{l=n-194|0;if(l>>>0>50){break L1747}o=d+1|0;p=c[s+(l<<2)>>2]|0;q=e-1|0;break}}else{o=d;p=f;q=e}}while(0);L1763:do{if((q|0)==0){r=p}else{l=a[o]|0;n=(l&255)>>>3;if((n-16|n+(p>>26))>>>0>7){break L1747}else{t=o;u=p;v=q;w=l}while(1){l=t+1|0;x=(w&255)-128|u<<6;y=v-1|0;if((x|0)>=0){break}if((y|0)==0){r=x;break L1763}n=a[l]|0;if(((n&255)-128|0)>>>0>63){break L1747}else{t=l;u=x;v=y;w=n}}c[j>>2]=0;c[m>>2]=x;k=e-y|0;i=g;return k|0}}while(0);c[j>>2]=r;k=-2;i=g;return k|0}}while(0);c[j>>2]=0;c[bF()>>2]=138;k=-1;i=g;return k|0}function jf(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;g=i;i=i+1032|0;h=g|0;j=g+1024|0;k=c[b>>2]|0;c[j>>2]=k;l=(a|0)!=0;m=l?e:256;e=l?a:h|0;L1778:do{if((k|0)==0|(m|0)==0){n=0;o=d;p=m;q=e;r=k}else{a=h|0;s=m;t=d;u=0;v=e;w=k;while(1){x=t>>>2;y=x>>>0>=s>>>0;if(!(y|t>>>0>131)){n=u;o=t;p=s;q=v;r=w;break L1778}z=y?s:x;A=t-z|0;x=jg(v,j,z,f)|0;if((x|0)==-1){break}if((v|0)==(a|0)){B=a;C=s}else{B=v+(x<<2)|0;C=s-x|0}z=x+u|0;x=c[j>>2]|0;if((x|0)==0|(C|0)==0){n=z;o=A;p=C;q=B;r=x;break L1778}else{s=C;t=A;u=z;v=B;w=x}}n=-1;o=A;p=0;q=v;r=c[j>>2]|0}}while(0);L1789:do{if((r|0)==0){D=n;E=r}else{if((p|0)==0|(o|0)==0){D=n;E=r;break}else{F=p;G=o;H=n;I=q;J=r}while(1){K=je(I,J,G,f)|0;if((K+2|0)>>>0<3){break}A=J+K|0;c[j>>2]=A;B=F-1|0;C=H+1|0;if((B|0)==0|(G|0)==(K|0)){D=C;E=A;break L1789}else{F=B;G=G-K|0;H=C;I=I+4|0;J=A}}if((K|0)==(-1|0)){D=-1;E=J;break}else if((K|0)==0){c[j>>2]=0;D=H;E=0;break}else{c[f>>2]=0;D=H;E=J;break}}}while(0);if(!l){i=g;return D|0}c[b>>2]=E;i=g;return D|0}function jg(b,e,f,g){b=b|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0;h=c[e>>2]|0;do{if((g|0)==0){i=1590}else{j=g|0;k=c[j>>2]|0;if((k|0)==0){i=1590;break}if((b|0)==0){l=k;m=h;n=f;i=1601;break}c[j>>2]=0;o=k;p=h;q=b;r=f;i=1621;break}}while(0);do{if((i|0)==1590){if((b|0)==0){t=h;u=f;i=1592;break}else{v=h;w=b;x=f;i=1591;break}}}while(0);L1810:while(1){if((i|0)==1601){i=0;h=(d[m]|0)>>>3;if((h-16|h+(l>>26))>>>0>7){i=1602;break}h=m+1|0;do{if((l&33554432|0)==0){y=h}else{if(((d[h]|0)-128|0)>>>0>63){i=1605;break L1810}g=m+2|0;if((l&524288|0)==0){y=g;break}if(((d[g]|0)-128|0)>>>0>63){i=1608;break L1810}y=m+3|0}}while(0);t=y;u=n-1|0;i=1592;continue}else if((i|0)==1591){i=0;if((x|0)==0){z=f;i=1639;break}else{A=x;B=w;C=v}while(1){h=a[C]|0;do{if(((h&255)-1|0)>>>0<127){if((C&3|0)==0&A>>>0>3){D=A;E=B;F=C}else{G=C;H=B;I=A;J=h;break}while(1){K=c[F>>2]|0;if(((K-16843009|K)&-2139062144|0)!=0){i=1615;break}c[E>>2]=K&255;c[E+4>>2]=d[F+1|0]|0;c[E+8>>2]=d[F+2|0]|0;L=F+4|0;M=E+16|0;c[E+12>>2]=d[F+3|0]|0;N=D-4|0;if(N>>>0>3){D=N;E=M;F=L}else{i=1616;break}}if((i|0)==1615){i=0;G=F;H=E;I=D;J=K&255;break}else if((i|0)==1616){i=0;G=L;H=M;I=N;J=a[L]|0;break}}else{G=C;H=B;I=A;J=h}}while(0);O=J&255;if((O-1|0)>>>0>=127){break}c[H>>2]=O;h=I-1|0;if((h|0)==0){z=f;i=1641;break L1810}else{A=h;B=H+4|0;C=G+1|0}}h=O-194|0;if(h>>>0>50){P=I;Q=H;R=G;i=1632;break}o=c[s+(h<<2)>>2]|0;p=G+1|0;q=H;r=I;i=1621;continue}else if((i|0)==1621){i=0;h=d[p]|0;g=h>>>3;if((g-16|g+(o>>26))>>>0>7){i=1622;break}g=p+1|0;S=h-128|o<<6;do{if((S|0)<0){h=(d[g]|0)-128|0;if(h>>>0>63){i=1625;break L1810}k=p+2|0;T=h|S<<6;if((T|0)>=0){U=T;V=k;break}h=(d[k]|0)-128|0;if(h>>>0>63){i=1628;break L1810}U=h|T<<6;V=p+3|0}else{U=S;V=g}}while(0);c[q>>2]=U;v=V;w=q+4|0;x=r-1|0;i=1591;continue}else if((i|0)==1592){i=0;g=a[t]|0;do{if(((g&255)-1|0)>>>0<127){if((t&3|0)!=0){W=t;X=u;Y=g;break}h=c[t>>2]|0;if(((h-16843009|h)&-2139062144|0)==0){Z=u;_=t}else{W=t;X=u;Y=h&255;break}while(1){$=_+4|0;aa=Z-4|0;ab=c[$>>2]|0;if(((ab-16843009|ab)&-2139062144|0)==0){Z=aa;_=$}else{break}}W=$;X=aa;Y=ab&255}else{W=t;X=u;Y=g}}while(0);g=Y&255;if((g-1|0)>>>0<127){t=W+1|0;u=X-1|0;i=1592;continue}h=g-194|0;if(h>>>0>50){P=X;Q=b;R=W;i=1632;break}l=c[s+(h<<2)>>2]|0;m=W+1|0;n=X;i=1601;continue}}do{if((i|0)==1605){ac=l;ad=m-1|0;ae=b;af=n;i=1631;break}else if((i|0)==1602){ac=l;ad=m-1|0;ae=b;af=n;i=1631;break}else if((i|0)==1639){return z|0}else if((i|0)==1641){return z|0}else if((i|0)==1628){ac=T;ad=p-1|0;ae=q;af=r;i=1631;break}else if((i|0)==1622){ac=o;ad=p-1|0;ae=q;af=r;i=1631;break}else if((i|0)==1608){ac=l;ad=m-1|0;ae=b;af=n;i=1631;break}else if((i|0)==1625){ac=S;ad=p-1|0;ae=q;af=r;i=1631;break}}while(0);do{if((i|0)==1631){if((ac|0)==0){P=af;Q=ae;R=ad;i=1632;break}else{ag=ae;ah=ad;break}}}while(0);do{if((i|0)==1632){if((a[R]|0)!=0){ag=Q;ah=R;break}if((Q|0)!=0){c[Q>>2]=0;c[e>>2]=0}z=f-P|0;return z|0}}while(0);c[bF()>>2]=138;if((ag|0)==0){z=-1;return z|0}c[e>>2]=ah;z=-1;return z|0}function jh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((b|0)==0){f=1;return f|0}if(d>>>0<128){a[b]=d&255;f=1;return f|0}if(d>>>0<2048){a[b]=(d>>>6|192)&255;a[b+1|0]=(d&63|128)&255;f=2;return f|0}if(d>>>0<55296|(d-57344|0)>>>0<8192){a[b]=(d>>>12|224)&255;a[b+1|0]=(d>>>6&63|128)&255;a[b+2|0]=(d&63|128)&255;f=3;return f|0}if((d-65536|0)>>>0<1048576){a[b]=(d>>>18|240)&255;a[b+1|0]=(d>>>12&63|128)&255;a[b+2|0]=(d>>>6&63|128)&255;a[b+3|0]=(d&63|128)&255;f=4;return f|0}else{c[bF()>>2]=138;f=-1;return f|0}return 0}function ji(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;f=i;i=i+264|0;g=f|0;h=f+256|0;j=c[b>>2]|0;c[h>>2]=j;k=(a|0)!=0;l=k?e:256;e=k?a:g|0;L1900:do{if((j|0)==0|(l|0)==0){m=0;n=d;o=l;p=e;q=j}else{a=g|0;r=l;s=d;t=0;u=e;v=j;while(1){w=s>>>0>=r>>>0;if(!(w|s>>>0>32)){m=t;n=s;o=r;p=u;q=v;break L1900}x=w?r:s;y=s-x|0;w=jj(u,h,x,0)|0;if((w|0)==-1){break}if((u|0)==(a|0)){z=a;A=r}else{z=u+w|0;A=r-w|0}x=w+t|0;w=c[h>>2]|0;if((w|0)==0|(A|0)==0){m=x;n=y;o=A;p=z;q=w;break L1900}else{r=A;s=y;t=x;u=z;v=w}}m=-1;n=y;o=0;p=u;q=c[h>>2]|0}}while(0);L1911:do{if((q|0)==0){B=m;C=q}else{if((o|0)==0|(n|0)==0){B=m;C=q;break}else{D=o;E=n;F=m;G=p;H=q}while(1){I=jh(G,c[H>>2]|0,0)|0;if((I+1|0)>>>0<2){break}y=H+4|0;c[h>>2]=y;z=E-1|0;A=F+1|0;if((D|0)==(I|0)|(z|0)==0){B=A;C=y;break L1911}else{D=D-I|0;E=z;F=A;G=G+I|0;H=y}}if((I|0)!=0){B=-1;C=H;break}c[h>>2]=0;B=F;C=0}}while(0);if(!k){i=f;return B|0}c[b>>2]=C;i=f;return B|0}function jj(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;f=i;i=i+8|0;g=f|0;if((b|0)==0){h=c[d>>2]|0;j=g|0;k=c[h>>2]|0;if((k|0)==0){l=0;i=f;return l|0}else{m=0;n=h;o=k}while(1){if(o>>>0>127){k=jh(j,o,0)|0;if((k|0)==-1){l=-1;p=1707;break}else{q=k}}else{q=1}k=q+m|0;h=n+4|0;r=c[h>>2]|0;if((r|0)==0){l=k;p=1709;break}else{m=k;n=h;o=r}}if((p|0)==1707){i=f;return l|0}else if((p|0)==1709){i=f;return l|0}}L1937:do{if(e>>>0>3){o=e;n=b;m=c[d>>2]|0;while(1){q=c[m>>2]|0;if((q|0)==0){s=o;t=n;break L1937}if(q>>>0>127){j=jh(n,q,0)|0;if((j|0)==-1){l=-1;break}u=n+j|0;v=o-j|0;w=m}else{a[n]=q&255;u=n+1|0;v=o-1|0;w=c[d>>2]|0}q=w+4|0;c[d>>2]=q;if(v>>>0>3){o=v;n=u;m=q}else{s=v;t=u;break L1937}}i=f;return l|0}else{s=e;t=b}}while(0);L1949:do{if((s|0)==0){x=0}else{b=g|0;u=s;v=t;w=c[d>>2]|0;while(1){m=c[w>>2]|0;if((m|0)==0){p=1703;break}if(m>>>0>127){n=jh(b,m,0)|0;if((n|0)==-1){l=-1;p=1710;break}if(n>>>0>u>>>0){p=1699;break}jh(v,c[w>>2]|0,0);y=v+n|0;z=u-n|0;A=w}else{a[v]=m&255;y=v+1|0;z=u-1|0;A=c[d>>2]|0}m=A+4|0;c[d>>2]=m;if((z|0)==0){x=0;break L1949}else{u=z;v=y;w=m}}if((p|0)==1699){l=e-u|0;i=f;return l|0}else if((p|0)==1703){a[v]=0;x=u;break}else if((p|0)==1710){i=f;return l|0}}}while(0);c[d>>2]=0;l=e-x|0;i=f;return l|0}function jk(a){a=a|0;jJ(a);return}function jl(a){a=a|0;return}function jm(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((c[d+8>>2]|0)!=(b|0)){return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function jn(a){a=a|0;jJ(a);return}function jo(a){a=a|0;jJ(a);return}function jp(a){a=a|0;jJ(a);return}function jq(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+56|0;f=e|0;do{if((a|0)==(b|0)){g=1}else{if((b|0)==0){g=0;break}h=jt(b,12192,12176,-1)|0;j=h;if((h|0)==0){g=0;break}jP(f|0,0,56);c[f>>2]=j;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;b5[c[(c[h>>2]|0)+28>>2]&1023](j,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;break}c[d>>2]=c[f+16>>2]|0;g=1}}while(0);i=e;return g|0}function jr(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((b|0)!=(c[d+8>>2]|0)){g=c[b+8>>2]|0;b5[c[(c[g>>2]|0)+28>>2]&1023](g,d,e,f);return}g=d+16|0;b=c[g>>2]|0;if((b|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function js(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;if((b|0)==(c[d+8>>2]|0)){g=d+16|0;h=c[g>>2]|0;if((h|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((h|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}h=d+24|0;if((c[h>>2]|0)!=2){return}c[h>>2]=f;return}h=c[b+12>>2]|0;g=b+16+(h<<3)|0;i=c[b+20>>2]|0;j=i>>8;if((i&1|0)==0){k=j}else{k=c[(c[e>>2]|0)+j>>2]|0}j=c[b+16>>2]|0;b5[c[(c[j>>2]|0)+28>>2]&1023](j,d,e+k|0,(i&2|0)!=0?f:2);if((h|0)<=1){return}h=d+54|0;i=e;k=b+24|0;while(1){b=c[k+4>>2]|0;j=b>>8;if((b&1|0)==0){l=j}else{l=c[(c[i>>2]|0)+j>>2]|0}j=c[k>>2]|0;b5[c[(c[j>>2]|0)+28>>2]&1023](j,d,e+l|0,(b&2|0)!=0?f:2);if((a[h]&1)<<24>>24!=0){m=1773;break}b=k+8|0;if(b>>>0<g>>>0){k=b}else{m=1767;break}}if((m|0)==1767){return}else if((m|0)==1773){return}}function jt(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+56|0;g=f|0;h=c[a>>2]|0;j=a+(c[h-8>>2]|0)|0;k=c[h-4>>2]|0;h=k;c[g>>2]=d;c[g+4>>2]=a;c[g+8>>2]=b;c[g+12>>2]=e;e=g+16|0;b=g+20|0;a=g+24|0;l=g+28|0;m=g+32|0;n=g+40|0;jP(e|0,0,39);if((k|0)==(d|0)){c[g+48>>2]=1;b2[c[(c[k>>2]|0)+20>>2]&1023](h,g,j,j,1,0);i=f;return((c[a>>2]|0)==1?j:0)|0}bS[c[(c[k>>2]|0)+24>>2]&1023](h,g,j,1,0);j=c[g+36>>2]|0;do{if((j|0)==1){if((c[a>>2]|0)!=1){if((c[n>>2]|0)!=0){o=0;break}if((c[l>>2]|0)!=1){o=0;break}if((c[m>>2]|0)!=1){o=0;break}}o=c[e>>2]|0}else if((j|0)==0){if((c[n>>2]|0)!=1){o=0;break}if((c[l>>2]|0)!=1){o=0;break}o=(c[m>>2]|0)==1?c[b>>2]|0:0}else{o=0}}while(0);i=f;return o|0}function ju(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)==(c[d>>2]|0)){do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=c[b+12>>2]|0;k=b+16+(j<<3)|0;L2077:do{if((j|0)>0){l=d+52|0;m=d+53|0;n=d+54|0;o=b+8|0;p=d+24|0;q=e;r=0;s=b+16|0;t=0;L2079:while(1){a[l]=0;a[m]=0;u=c[s+4>>2]|0;v=u>>8;if((u&1|0)==0){w=v}else{w=c[(c[q>>2]|0)+v>>2]|0}v=c[s>>2]|0;b2[c[(c[v>>2]|0)+20>>2]&1023](v,d,e,e+w|0,2-(u>>>1&1)|0,g);if((a[n]&1)<<24>>24!=0){x=t;y=r;break}do{if((a[m]&1)<<24>>24==0){z=t;A=r}else{if((a[l]&1)<<24>>24==0){if((c[o>>2]&1|0)==0){x=1;y=r;break L2079}else{z=1;A=r;break}}if((c[p>>2]|0)==1){B=1812;break L2077}if((c[o>>2]&2|0)==0){B=1812;break L2077}else{z=1;A=1}}}while(0);u=s+8|0;if(u>>>0<k>>>0){r=A;s=u;t=z}else{x=z;y=A;break}}if(y){C=x;B=1811;break}else{D=x;B=1808;break}}else{D=0;B=1808}}while(0);do{if((B|0)==1808){c[h>>2]=e;k=d+40|0;c[k>>2]=(c[k>>2]|0)+1|0;if((c[d+36>>2]|0)!=1){C=D;B=1811;break}if((c[d+24>>2]|0)!=2){C=D;B=1811;break}a[d+54|0]=1;if(D){B=1812;break}else{B=1813;break}}}while(0);do{if((B|0)==1811){if(C){B=1812;break}else{B=1813;break}}}while(0);if((B|0)==1812){c[i>>2]=3;return}else if((B|0)==1813){c[i>>2]=4;return}}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}C=c[b+12>>2]|0;D=b+16+(C<<3)|0;x=c[b+20>>2]|0;y=x>>8;if((x&1|0)==0){E=y}else{E=c[(c[e>>2]|0)+y>>2]|0}y=c[b+16>>2]|0;bS[c[(c[y>>2]|0)+24>>2]&1023](y,d,e+E|0,(x&2|0)!=0?f:2,g);x=b+24|0;if((C|0)<=1){return}C=c[b+8>>2]|0;do{if((C&2|0)==0){b=d+36|0;if((c[b>>2]|0)==1){break}if((C&1|0)==0){E=d+54|0;y=e;A=x;while(1){if((a[E]&1)<<24>>24!=0){B=1849;break}if((c[b>>2]|0)==1){B=1843;break}z=c[A+4>>2]|0;w=z>>8;if((z&1|0)==0){F=w}else{F=c[(c[y>>2]|0)+w>>2]|0}w=c[A>>2]|0;bS[c[(c[w>>2]|0)+24>>2]&1023](w,d,e+F|0,(z&2|0)!=0?f:2,g);z=A+8|0;if(z>>>0<D>>>0){A=z}else{B=1850;break}}if((B|0)==1843){return}else if((B|0)==1849){return}else if((B|0)==1850){return}}A=d+24|0;y=d+54|0;E=e;i=x;while(1){if((a[y]&1)<<24>>24!=0){B=1855;break}if((c[b>>2]|0)==1){if((c[A>>2]|0)==1){B=1844;break}}z=c[i+4>>2]|0;w=z>>8;if((z&1|0)==0){G=w}else{G=c[(c[E>>2]|0)+w>>2]|0}w=c[i>>2]|0;bS[c[(c[w>>2]|0)+24>>2]&1023](w,d,e+G|0,(z&2|0)!=0?f:2,g);z=i+8|0;if(z>>>0<D>>>0){i=z}else{B=1840;break}}if((B|0)==1840){return}else if((B|0)==1844){return}else if((B|0)==1855){return}}}while(0);G=d+54|0;F=e;C=x;while(1){if((a[G]&1)<<24>>24!=0){B=1841;break}x=c[C+4>>2]|0;i=x>>8;if((x&1|0)==0){H=i}else{H=c[(c[F>>2]|0)+i>>2]|0}i=c[C>>2]|0;bS[c[(c[i>>2]|0)+24>>2]&1023](i,d,e+H|0,(x&2|0)!=0?f:2,g);x=C+8|0;if(x>>>0<D>>>0){C=x}else{B=1845;break}}if((B|0)==1841){return}else if((B|0)==1845){return}}function jv(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)!=(c[d>>2]|0)){h=c[b+8>>2]|0;bS[c[(c[h>>2]|0)+24>>2]&1023](h,d,e,f,g);return}do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=d+52|0;a[j]=0;k=d+53|0;a[k]=0;l=c[b+8>>2]|0;b2[c[(c[l>>2]|0)+20>>2]&1023](l,d,e,e,1,g);do{if((a[k]&1)<<24>>24==0){m=0;n=1868}else{if((a[j]&1)<<24>>24==0){m=1;n=1868;break}else{break}}}while(0);L2179:do{if((n|0)==1868){c[h>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){n=1871;break}a[d+54|0]=1;if(m){break L2179}else{break}}else{n=1871}}while(0);if((n|0)==1871){if(m){break}}c[i>>2]=4;return}}while(0);c[i>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function jw(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){return}g=d+28|0;if((c[g>>2]|0)==1){return}c[g>>2]=f;return}if((c[d>>2]|0)!=(b|0)){return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function jx(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;if((c[d+8>>2]|0)!=(b|0)){return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g;i=g}else{i=b}if(!((c[d+48>>2]|0)==1&(i|0)==1)){return}a[d+54|0]=1;return}function jy(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;if((b|0)!=(c[d+8>>2]|0)){i=d+52|0;j=a[i]&1;k=d+53|0;l=a[k]&1;m=c[b+12>>2]|0;n=b+16+(m<<3)|0;a[i]=0;a[k]=0;o=c[b+20>>2]|0;p=o>>8;if((o&1|0)==0){q=p}else{q=c[(c[f>>2]|0)+p>>2]|0}p=c[b+16>>2]|0;b2[c[(c[p>>2]|0)+20>>2]&1023](p,d,e,f+q|0,(o&2|0)!=0?g:2,h);L2253:do{if((m|0)>1){o=d+24|0;q=b+8|0;p=d+54|0;r=f;s=b+24|0;while(1){if((a[p]&1)<<24>>24!=0){break L2253}do{if((a[i]&1)<<24>>24==0){if((a[k]&1)<<24>>24==0){break}if((c[q>>2]&1|0)==0){break L2253}}else{if((c[o>>2]|0)==1){break L2253}if((c[q>>2]&2|0)==0){break L2253}}}while(0);a[i]=0;a[k]=0;t=c[s+4>>2]|0;u=t>>8;if((t&1|0)==0){v=u}else{v=c[(c[r>>2]|0)+u>>2]|0}u=c[s>>2]|0;b2[c[(c[u>>2]|0)+20>>2]&1023](u,d,e,f+v|0,(t&2|0)!=0?g:2,h);t=s+8|0;if(t>>>0<n>>>0){s=t}else{break L2253}}}}while(0);a[i]=j;a[k]=l;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;l=c[f>>2]|0;if((l|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((l|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;l=c[e>>2]|0;if((l|0)==2){c[e>>2]=g;w=g}else{w=l}if(!((c[d+48>>2]|0)==1&(w|0)==1)){return}a[d+54|0]=1;return}function jz(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;if((b|0)!=(c[d+8>>2]|0)){i=c[b+8>>2]|0;b2[c[(c[i>>2]|0)+20>>2]&1023](i,d,e,f,g,h);return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;h=c[f>>2]|0;if((h|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;h=c[e>>2]|0;if((h|0)==2){c[e>>2]=g;j=g}else{j=h}if(!((c[d+48>>2]|0)==1&(j|0)==1)){return}a[d+54|0]=1;return}function jA(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0;do{if(a>>>0<245){if(a>>>0<11){b=16}else{b=a+11&-8}d=b>>>3;e=c[496]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=2024+(h<<2)|0;j=2024+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[496]=e&(1<<g^-1)}else{if(l>>>0<(c[500]|0)>>>0){aS();return 0;return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{aS();return 0;return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[498]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=2024+(p<<2)|0;m=2024+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[496]=e&(1<<r^-1)}else{if(l>>>0<(c[500]|0)>>>0){aS();return 0;return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{aS();return 0;return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[498]|0;if((l|0)!=0){q=c[501]|0;d=l>>>3;l=d<<1;f=2024+(l<<2)|0;k=c[496]|0;h=1<<d;do{if((k&h|0)==0){c[496]=k|h;s=f;t=2024+(l+2<<2)|0}else{d=2024+(l+2<<2)|0;g=c[d>>2]|0;if(g>>>0>=(c[500]|0)>>>0){s=g;t=d;break}aS();return 0;return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[498]=m;c[501]=e;n=i;return n|0}l=c[497]|0;if((l|0)==0){o=b;break}h=(l&-l)-1|0;l=h>>>12&16;k=h>>>(l>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;d=r>>>(p>>>0);r=d>>>1&1;g=c[2288+((h|l|k|p|r)+(d>>>(r>>>0))<<2)>>2]|0;r=g;d=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;d=k?u:d;p=k?g:p}r=d;i=c[500]|0;if(r>>>0<i>>>0){aS();return 0;return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){aS();return 0;return 0}e=c[d+24>>2]|0;f=c[d+12>>2]|0;L2373:do{if((f|0)==(d|0)){q=d+20|0;g=c[q>>2]|0;do{if((g|0)==0){k=d+16|0;l=c[k>>2]|0;if((l|0)==0){v=0;break L2373}else{w=l;x=k;break}}else{w=g;x=q}}while(0);while(1){q=w+20|0;g=c[q>>2]|0;if((g|0)!=0){w=g;x=q;continue}q=w+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=g;x=q}}if(x>>>0<i>>>0){aS();return 0;return 0}else{c[x>>2]=0;v=w;break}}else{q=c[d+8>>2]|0;if(q>>>0<i>>>0){aS();return 0;return 0}g=q+12|0;if((c[g>>2]|0)!=(d|0)){aS();return 0;return 0}k=f+8|0;if((c[k>>2]|0)==(d|0)){c[g>>2]=f;c[k>>2]=q;v=f;break}else{aS();return 0;return 0}}}while(0);L2395:do{if((e|0)!=0){f=d+28|0;i=2288+(c[f>>2]<<2)|0;do{if((d|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[497]=c[497]&(1<<c[f>>2]^-1);break L2395}else{if(e>>>0<(c[500]|0)>>>0){aS();return 0;return 0}q=e+16|0;if((c[q>>2]|0)==(d|0)){c[q>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L2395}}}while(0);if(v>>>0<(c[500]|0)>>>0){aS();return 0;return 0}c[v+24>>2]=e;f=c[d+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[d+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16){e=p+b|0;c[d+4>>2]=e|3;f=r+(e+4|0)|0;c[f>>2]=c[f>>2]|1}else{c[d+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b|0)>>2]=p;f=c[498]|0;if((f|0)!=0){e=c[501]|0;i=f>>>3;f=i<<1;q=2024+(f<<2)|0;k=c[496]|0;g=1<<i;do{if((k&g|0)==0){c[496]=k|g;y=q;z=2024+(f+2<<2)|0}else{i=2024+(f+2<<2)|0;l=c[i>>2]|0;if(l>>>0>=(c[500]|0)>>>0){y=l;z=i;break}aS();return 0;return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=q}c[498]=p;c[501]=m}f=d+8|0;if((f|0)==0){o=b;break}else{n=f}return n|0}else{if(a>>>0>4294967231){o=-1;break}f=a+11|0;g=f&-8;k=c[497]|0;if((k|0)==0){o=g;break}r=-g|0;i=f>>>8;do{if((i|0)==0){A=0}else{if(g>>>0>16777215){A=31;break}f=(i+1048320|0)>>>16&8;l=i<<f;h=(l+520192|0)>>>16&4;j=l<<h;l=(j+245760|0)>>>16&2;B=(14-(h|f|l)|0)+(j<<l>>>15)|0;A=g>>>((B+7|0)>>>0)&1|B<<1}}while(0);i=c[2288+(A<<2)>>2]|0;L2443:do{if((i|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}d=0;m=r;p=i;q=g<<F;e=0;while(1){B=c[p+4>>2]&-8;l=B-g|0;if(l>>>0<m>>>0){if((B|0)==(g|0)){C=p;D=l;E=p;break L2443}else{G=p;H=l}}else{G=d;H=m}l=c[p+20>>2]|0;B=c[p+16+(q>>>31<<2)>>2]|0;j=(l|0)==0|(l|0)==(B|0)?e:l;if((B|0)==0){C=G;D=H;E=j;break L2443}else{d=G;m=H;p=B;q=q<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){i=2<<A;r=k&(i|-i);if((r|0)==0){o=g;break}i=(r&-r)-1|0;r=i>>>12&16;e=i>>>(r>>>0);i=e>>>5&8;q=e>>>(i>>>0);e=q>>>2&4;p=q>>>(e>>>0);q=p>>>1&2;m=p>>>(q>>>0);p=m>>>1&1;I=c[2288+((i|r|e|q|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}L2458:do{if((I|0)==0){J=D;K=C}else{p=I;m=D;q=C;while(1){e=(c[p+4>>2]&-8)-g|0;r=e>>>0<m>>>0;i=r?e:m;e=r?p:q;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=i;q=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=i;K=e;break L2458}else{p=r;m=i;q=e}}}}while(0);if((K|0)==0){o=g;break}if(J>>>0>=((c[498]|0)-g|0)>>>0){o=g;break}k=K;q=c[500]|0;if(k>>>0<q>>>0){aS();return 0;return 0}m=k+g|0;p=m;if(k>>>0>=m>>>0){aS();return 0;return 0}e=c[K+24>>2]|0;i=c[K+12>>2]|0;L2471:do{if((i|0)==(K|0)){r=K+20|0;d=c[r>>2]|0;do{if((d|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break L2471}else{M=B;N=j;break}}else{M=d;N=r}}while(0);while(1){r=M+20|0;d=c[r>>2]|0;if((d|0)!=0){M=d;N=r;continue}r=M+16|0;d=c[r>>2]|0;if((d|0)==0){break}else{M=d;N=r}}if(N>>>0<q>>>0){aS();return 0;return 0}else{c[N>>2]=0;L=M;break}}else{r=c[K+8>>2]|0;if(r>>>0<q>>>0){aS();return 0;return 0}d=r+12|0;if((c[d>>2]|0)!=(K|0)){aS();return 0;return 0}j=i+8|0;if((c[j>>2]|0)==(K|0)){c[d>>2]=i;c[j>>2]=r;L=i;break}else{aS();return 0;return 0}}}while(0);L2493:do{if((e|0)!=0){i=K+28|0;q=2288+(c[i>>2]<<2)|0;do{if((K|0)==(c[q>>2]|0)){c[q>>2]=L;if((L|0)!=0){break}c[497]=c[497]&(1<<c[i>>2]^-1);break L2493}else{if(e>>>0<(c[500]|0)>>>0){aS();return 0;return 0}r=e+16|0;if((c[r>>2]|0)==(K|0)){c[r>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L2493}}}while(0);if(L>>>0<(c[500]|0)>>>0){aS();return 0;return 0}c[L+24>>2]=e;i=c[K+16>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[L+16>>2]=i;c[i+24>>2]=L;break}}}while(0);i=c[K+20>>2]|0;if((i|0)==0){break}if(i>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[L+20>>2]=i;c[i+24>>2]=L;break}}}while(0);do{if(J>>>0<16){e=J+g|0;c[K+4>>2]=e|3;i=k+(e+4|0)|0;c[i>>2]=c[i>>2]|1}else{c[K+4>>2]=g|3;c[k+(g|4)>>2]=J|1;c[k+(J+g|0)>>2]=J;i=J>>>3;if(J>>>0<256){e=i<<1;q=2024+(e<<2)|0;r=c[496]|0;j=1<<i;do{if((r&j|0)==0){c[496]=r|j;O=q;P=2024+(e+2<<2)|0}else{i=2024+(e+2<<2)|0;d=c[i>>2]|0;if(d>>>0>=(c[500]|0)>>>0){O=d;P=i;break}aS();return 0;return 0}}while(0);c[P>>2]=p;c[O+12>>2]=p;c[k+(g+8|0)>>2]=O;c[k+(g+12|0)>>2]=q;break}e=m;j=J>>>8;do{if((j|0)==0){Q=0}else{if(J>>>0>16777215){Q=31;break}r=(j+1048320|0)>>>16&8;i=j<<r;d=(i+520192|0)>>>16&4;B=i<<d;i=(B+245760|0)>>>16&2;l=(14-(d|r|i)|0)+(B<<i>>>15)|0;Q=J>>>((l+7|0)>>>0)&1|l<<1}}while(0);j=2288+(Q<<2)|0;c[k+(g+28|0)>>2]=Q;c[k+(g+20|0)>>2]=0;c[k+(g+16|0)>>2]=0;q=c[497]|0;l=1<<Q;if((q&l|0)==0){c[497]=q|l;c[j>>2]=e;c[k+(g+24|0)>>2]=j;c[k+(g+12|0)>>2]=e;c[k+(g+8|0)>>2]=e;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}l=J<<R;q=c[j>>2]|0;while(1){if((c[q+4>>2]&-8|0)==(J|0)){break}S=q+16+(l>>>31<<2)|0;j=c[S>>2]|0;if((j|0)==0){T=2128;break}else{l=l<<1;q=j}}if((T|0)==2128){if(S>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[S>>2]=e;c[k+(g+24|0)>>2]=q;c[k+(g+12|0)>>2]=e;c[k+(g+8|0)>>2]=e;break}}l=q+8|0;j=c[l>>2]|0;i=c[500]|0;if(q>>>0<i>>>0){aS();return 0;return 0}if(j>>>0<i>>>0){aS();return 0;return 0}else{c[j+12>>2]=e;c[l>>2]=e;c[k+(g+8|0)>>2]=j;c[k+(g+12|0)>>2]=q;c[k+(g+24|0)>>2]=0;break}}}while(0);k=K+8|0;if((k|0)==0){o=g;break}else{n=k}return n|0}}while(0);K=c[498]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[501]|0;if(S>>>0>15){R=J;c[501]=R+o|0;c[498]=S;c[R+(o+4|0)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[498]=0;c[501]=0;c[J+4>>2]=K|3;S=J+(K+4|0)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[499]|0;if(o>>>0<J>>>0){S=J-o|0;c[499]=S;J=c[502]|0;K=J;c[502]=K+o|0;c[K+(o+4|0)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[20]|0)==0){J=aZ(8)|0;if((J-1&J|0)==0){c[22]=J;c[21]=J;c[23]=-1;c[24]=2097152;c[25]=0;c[607]=0;c[20]=bo(0)&-16^1431655768;break}else{aS();return 0;return 0}}}while(0);J=o+48|0;S=c[22]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[606]|0;do{if((O|0)!=0){P=c[604]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L2585:do{if((c[607]&4|0)==0){O=c[502]|0;L2587:do{if((O|0)==0){T=2158}else{L=O;P=2432;while(1){U=P|0;M=c[U>>2]|0;if(M>>>0<=L>>>0){V=P+4|0;if((M+(c[V>>2]|0)|0)>>>0>L>>>0){break}}M=c[P+8>>2]|0;if((M|0)==0){T=2158;break L2587}else{P=M}}if((P|0)==0){T=2158;break}L=R-(c[499]|0)&Q;if(L>>>0>=2147483647){W=0;break}q=bj(L|0)|0;e=(q|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=e?q:-1;Y=e?L:0;Z=q;_=L;T=2167;break}}while(0);do{if((T|0)==2158){O=bj(0)|0;if((O|0)==-1){W=0;break}g=O;L=c[21]|0;q=L-1|0;if((q&g|0)==0){$=S}else{$=(S-g|0)+(q+g&-L)|0}L=c[604]|0;g=L+$|0;if(!($>>>0>o>>>0&$>>>0<2147483647)){W=0;break}q=c[606]|0;if((q|0)!=0){if(g>>>0<=L>>>0|g>>>0>q>>>0){W=0;break}}q=bj($|0)|0;g=(q|0)==(O|0);X=g?O:-1;Y=g?$:0;Z=q;_=$;T=2167;break}}while(0);L2607:do{if((T|0)==2167){q=-_|0;if((X|0)!=-1){aa=Y;ab=X;T=2178;break L2585}do{if((Z|0)!=-1&_>>>0<2147483647&_>>>0<J>>>0){g=c[22]|0;O=(K-_|0)+g&-g;if(O>>>0>=2147483647){ac=_;break}if((bj(O|0)|0)==-1){bj(q|0);W=Y;break L2607}else{ac=O+_|0;break}}else{ac=_}}while(0);if((Z|0)==-1){W=Y}else{aa=ac;ab=Z;T=2178;break L2585}}}while(0);c[607]=c[607]|4;ad=W;T=2175;break}else{ad=0;T=2175}}while(0);do{if((T|0)==2175){if(S>>>0>=2147483647){break}W=bj(S|0)|0;Z=bj(0)|0;if(!((Z|0)!=-1&(W|0)!=-1&W>>>0<Z>>>0)){break}ac=Z-W|0;Z=ac>>>0>(o+40|0)>>>0;Y=Z?W:-1;if((Y|0)==-1){break}else{aa=Z?ac:ad;ab=Y;T=2178;break}}}while(0);do{if((T|0)==2178){ad=(c[604]|0)+aa|0;c[604]=ad;if(ad>>>0>(c[605]|0)>>>0){c[605]=ad}ad=c[502]|0;L2627:do{if((ad|0)==0){S=c[500]|0;if((S|0)==0|ab>>>0<S>>>0){c[500]=ab}c[608]=ab;c[609]=aa;c[611]=0;c[505]=c[20]|0;c[504]=-1;S=0;while(1){Y=S<<1;ac=2024+(Y<<2)|0;c[2024+(Y+3<<2)>>2]=ac;c[2024+(Y+2<<2)>>2]=ac;ac=S+1|0;if(ac>>>0<32){S=ac}else{break}}S=ab+8|0;if((S&7|0)==0){ae=0}else{ae=-S&7}S=(aa-40|0)-ae|0;c[502]=ab+ae|0;c[499]=S;c[ab+(ae+4|0)>>2]=S|1;c[ab+(aa-36|0)>>2]=40;c[503]=c[24]|0}else{S=2432;while(1){af=c[S>>2]|0;ag=S+4|0;ah=c[ag>>2]|0;if((ab|0)==(af+ah|0)){T=2190;break}ac=c[S+8>>2]|0;if((ac|0)==0){break}else{S=ac}}do{if((T|0)==2190){if((c[S+12>>2]&8|0)!=0){break}ac=ad;if(!(ac>>>0>=af>>>0&ac>>>0<ab>>>0)){break}c[ag>>2]=ah+aa|0;ac=c[502]|0;Y=(c[499]|0)+aa|0;Z=ac;W=ac+8|0;if((W&7|0)==0){ai=0}else{ai=-W&7}W=Y-ai|0;c[502]=Z+ai|0;c[499]=W;c[Z+(ai+4|0)>>2]=W|1;c[Z+(Y+4|0)>>2]=40;c[503]=c[24]|0;break L2627}}while(0);if(ab>>>0<(c[500]|0)>>>0){c[500]=ab}S=ab+aa|0;Y=2432;while(1){aj=Y|0;if((c[aj>>2]|0)==(S|0)){T=2200;break}Z=c[Y+8>>2]|0;if((Z|0)==0){break}else{Y=Z}}do{if((T|0)==2200){if((c[Y+12>>2]&8|0)!=0){break}c[aj>>2]=ab;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+aa|0;S=ab+8|0;if((S&7|0)==0){ak=0}else{ak=-S&7}S=ab+(aa+8|0)|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ab+(al+aa|0)|0;Z=S;W=ak+o|0;ac=ab+W|0;_=ac;K=(S-(ab+ak|0)|0)-o|0;c[ab+(ak+4|0)>>2]=o|3;do{if((Z|0)==(c[502]|0)){J=(c[499]|0)+K|0;c[499]=J;c[502]=_;c[ab+(W+4|0)>>2]=J|1}else{if((Z|0)==(c[501]|0)){J=(c[498]|0)+K|0;c[498]=J;c[501]=_;c[ab+(W+4|0)>>2]=J|1;c[ab+(J+W|0)>>2]=J;break}J=aa+4|0;X=c[ab+(J+al|0)>>2]|0;if((X&3|0)==1){$=X&-8;V=X>>>3;L2672:do{if(X>>>0<256){U=c[ab+((al|8)+aa|0)>>2]|0;Q=c[ab+((aa+12|0)+al|0)>>2]|0;R=2024+(V<<1<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[500]|0)>>>0){aS();return 0;return 0}if((c[U+12>>2]|0)==(Z|0)){break}aS();return 0;return 0}}while(0);if((Q|0)==(U|0)){c[496]=c[496]&(1<<V^-1);break}do{if((Q|0)==(R|0)){am=Q+8|0}else{if(Q>>>0<(c[500]|0)>>>0){aS();return 0;return 0}q=Q+8|0;if((c[q>>2]|0)==(Z|0)){am=q;break}aS();return 0;return 0}}while(0);c[U+12>>2]=Q;c[am>>2]=U}else{R=S;q=c[ab+((al|24)+aa|0)>>2]|0;P=c[ab+((aa+12|0)+al|0)>>2]|0;L2693:do{if((P|0)==(R|0)){O=al|16;g=ab+(J+O|0)|0;L=c[g>>2]|0;do{if((L|0)==0){e=ab+(O+aa|0)|0;M=c[e>>2]|0;if((M|0)==0){an=0;break L2693}else{ao=M;ap=e;break}}else{ao=L;ap=g}}while(0);while(1){g=ao+20|0;L=c[g>>2]|0;if((L|0)!=0){ao=L;ap=g;continue}g=ao+16|0;L=c[g>>2]|0;if((L|0)==0){break}else{ao=L;ap=g}}if(ap>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[ap>>2]=0;an=ao;break}}else{g=c[ab+((al|8)+aa|0)>>2]|0;if(g>>>0<(c[500]|0)>>>0){aS();return 0;return 0}L=g+12|0;if((c[L>>2]|0)!=(R|0)){aS();return 0;return 0}O=P+8|0;if((c[O>>2]|0)==(R|0)){c[L>>2]=P;c[O>>2]=g;an=P;break}else{aS();return 0;return 0}}}while(0);if((q|0)==0){break}P=ab+((aa+28|0)+al|0)|0;U=2288+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=an;if((an|0)!=0){break}c[497]=c[497]&(1<<c[P>>2]^-1);break L2672}else{if(q>>>0<(c[500]|0)>>>0){aS();return 0;return 0}Q=q+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=an}else{c[q+20>>2]=an}if((an|0)==0){break L2672}}}while(0);if(an>>>0<(c[500]|0)>>>0){aS();return 0;return 0}c[an+24>>2]=q;R=al|16;P=c[ab+(R+aa|0)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[an+16>>2]=P;c[P+24>>2]=an;break}}}while(0);P=c[ab+(J+R|0)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[an+20>>2]=P;c[P+24>>2]=an;break}}}while(0);aq=ab+(($|al)+aa|0)|0;ar=$+K|0}else{aq=Z;ar=K}J=aq+4|0;c[J>>2]=c[J>>2]&-2;c[ab+(W+4|0)>>2]=ar|1;c[ab+(ar+W|0)>>2]=ar;J=ar>>>3;if(ar>>>0<256){V=J<<1;X=2024+(V<<2)|0;P=c[496]|0;q=1<<J;do{if((P&q|0)==0){c[496]=P|q;as=X;at=2024+(V+2<<2)|0}else{J=2024+(V+2<<2)|0;U=c[J>>2]|0;if(U>>>0>=(c[500]|0)>>>0){as=U;at=J;break}aS();return 0;return 0}}while(0);c[at>>2]=_;c[as+12>>2]=_;c[ab+(W+8|0)>>2]=as;c[ab+(W+12|0)>>2]=X;break}V=ac;q=ar>>>8;do{if((q|0)==0){au=0}else{if(ar>>>0>16777215){au=31;break}P=(q+1048320|0)>>>16&8;$=q<<P;J=($+520192|0)>>>16&4;U=$<<J;$=(U+245760|0)>>>16&2;Q=(14-(J|P|$)|0)+(U<<$>>>15)|0;au=ar>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);q=2288+(au<<2)|0;c[ab+(W+28|0)>>2]=au;c[ab+(W+20|0)>>2]=0;c[ab+(W+16|0)>>2]=0;X=c[497]|0;Q=1<<au;if((X&Q|0)==0){c[497]=X|Q;c[q>>2]=V;c[ab+(W+24|0)>>2]=q;c[ab+(W+12|0)>>2]=V;c[ab+(W+8|0)>>2]=V;break}if((au|0)==31){av=0}else{av=25-(au>>>1)|0}Q=ar<<av;X=c[q>>2]|0;while(1){if((c[X+4>>2]&-8|0)==(ar|0)){break}aw=X+16+(Q>>>31<<2)|0;q=c[aw>>2]|0;if((q|0)==0){T=2273;break}else{Q=Q<<1;X=q}}if((T|0)==2273){if(aw>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[aw>>2]=V;c[ab+(W+24|0)>>2]=X;c[ab+(W+12|0)>>2]=V;c[ab+(W+8|0)>>2]=V;break}}Q=X+8|0;q=c[Q>>2]|0;$=c[500]|0;if(X>>>0<$>>>0){aS();return 0;return 0}if(q>>>0<$>>>0){aS();return 0;return 0}else{c[q+12>>2]=V;c[Q>>2]=V;c[ab+(W+8|0)>>2]=q;c[ab+(W+12|0)>>2]=X;c[ab+(W+24|0)>>2]=0;break}}}while(0);n=ab+(ak|8)|0;return n|0}}while(0);Y=ad;W=2432;while(1){ax=c[W>>2]|0;if(ax>>>0<=Y>>>0){ay=c[W+4>>2]|0;az=ax+ay|0;if(az>>>0>Y>>>0){break}}W=c[W+8>>2]|0}W=ax+(ay-39|0)|0;if((W&7|0)==0){aA=0}else{aA=-W&7}W=ax+((ay-47|0)+aA|0)|0;ac=W>>>0<(ad+16|0)>>>0?Y:W;W=ac+8|0;_=ab+8|0;if((_&7|0)==0){aB=0}else{aB=-_&7}_=(aa-40|0)-aB|0;c[502]=ab+aB|0;c[499]=_;c[ab+(aB+4|0)>>2]=_|1;c[ab+(aa-36|0)>>2]=40;c[503]=c[24]|0;c[ac+4>>2]=27;c[W>>2]=c[608]|0;c[W+4>>2]=c[2436>>2]|0;c[W+8>>2]=c[2440>>2]|0;c[W+12>>2]=c[2444>>2]|0;c[608]=ab;c[609]=aa;c[611]=0;c[610]=W;W=ac+28|0;c[W>>2]=7;L2791:do{if((ac+32|0)>>>0<az>>>0){_=W;while(1){K=_+4|0;c[K>>2]=7;if((_+8|0)>>>0<az>>>0){_=K}else{break L2791}}}}while(0);if((ac|0)==(Y|0)){break}W=ac-ad|0;_=Y+(W+4|0)|0;c[_>>2]=c[_>>2]&-2;c[ad+4>>2]=W|1;c[Y+W>>2]=W;_=W>>>3;if(W>>>0<256){K=_<<1;Z=2024+(K<<2)|0;S=c[496]|0;q=1<<_;do{if((S&q|0)==0){c[496]=S|q;aC=Z;aD=2024+(K+2<<2)|0}else{_=2024+(K+2<<2)|0;Q=c[_>>2]|0;if(Q>>>0>=(c[500]|0)>>>0){aC=Q;aD=_;break}aS();return 0;return 0}}while(0);c[aD>>2]=ad;c[aC+12>>2]=ad;c[ad+8>>2]=aC;c[ad+12>>2]=Z;break}K=ad;q=W>>>8;do{if((q|0)==0){aE=0}else{if(W>>>0>16777215){aE=31;break}S=(q+1048320|0)>>>16&8;Y=q<<S;ac=(Y+520192|0)>>>16&4;_=Y<<ac;Y=(_+245760|0)>>>16&2;Q=(14-(ac|S|Y)|0)+(_<<Y>>>15)|0;aE=W>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);q=2288+(aE<<2)|0;c[ad+28>>2]=aE;c[ad+20>>2]=0;c[ad+16>>2]=0;Z=c[497]|0;Q=1<<aE;if((Z&Q|0)==0){c[497]=Z|Q;c[q>>2]=K;c[ad+24>>2]=q;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}if((aE|0)==31){aF=0}else{aF=25-(aE>>>1)|0}Q=W<<aF;Z=c[q>>2]|0;while(1){if((c[Z+4>>2]&-8|0)==(W|0)){break}aG=Z+16+(Q>>>31<<2)|0;q=c[aG>>2]|0;if((q|0)==0){T=2308;break}else{Q=Q<<1;Z=q}}if((T|0)==2308){if(aG>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[aG>>2]=K;c[ad+24>>2]=Z;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}}Q=Z+8|0;W=c[Q>>2]|0;q=c[500]|0;if(Z>>>0<q>>>0){aS();return 0;return 0}if(W>>>0<q>>>0){aS();return 0;return 0}else{c[W+12>>2]=K;c[Q>>2]=K;c[ad+8>>2]=W;c[ad+12>>2]=Z;c[ad+24>>2]=0;break}}}while(0);ad=c[499]|0;if(ad>>>0<=o>>>0){break}W=ad-o|0;c[499]=W;ad=c[502]|0;Q=ad;c[502]=Q+o|0;c[Q+(o+4|0)>>2]=W|1;c[ad+4>>2]=o|3;n=ad+8|0;return n|0}}while(0);c[bF()>>2]=12;n=0;return n|0}function jB(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[500]|0;if(b>>>0<e>>>0){aS()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){aS()}h=f&-8;i=a+(h-8|0)|0;j=i;L2844:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){aS()}if((n|0)==(c[501]|0)){p=a+(h-4|0)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[498]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4|0)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256){k=c[a+(l+8|0)>>2]|0;s=c[a+(l+12|0)>>2]|0;t=2024+(p<<1<<2)|0;do{if((k|0)!=(t|0)){if(k>>>0<e>>>0){aS()}if((c[k+12>>2]|0)==(n|0)){break}aS()}}while(0);if((s|0)==(k|0)){c[496]=c[496]&(1<<p^-1);q=n;r=o;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<e>>>0){aS()}v=s+8|0;if((c[v>>2]|0)==(n|0)){u=v;break}aS()}}while(0);c[k+12>>2]=s;c[u>>2]=k;q=n;r=o;break}t=m;p=c[a+(l+24|0)>>2]|0;v=c[a+(l+12|0)>>2]|0;L2878:do{if((v|0)==(t|0)){w=a+(l+20|0)|0;x=c[w>>2]|0;do{if((x|0)==0){y=a+(l+16|0)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break L2878}else{B=z;C=y;break}}else{B=x;C=w}}while(0);while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){B=x;C=w;continue}w=B+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=x;C=w}}if(C>>>0<e>>>0){aS()}else{c[C>>2]=0;A=B;break}}else{w=c[a+(l+8|0)>>2]|0;if(w>>>0<e>>>0){aS()}x=w+12|0;if((c[x>>2]|0)!=(t|0)){aS()}y=v+8|0;if((c[y>>2]|0)==(t|0)){c[x>>2]=v;c[y>>2]=w;A=v;break}else{aS()}}}while(0);if((p|0)==0){q=n;r=o;break}v=a+(l+28|0)|0;m=2288+(c[v>>2]<<2)|0;do{if((t|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[497]=c[497]&(1<<c[v>>2]^-1);q=n;r=o;break L2844}else{if(p>>>0<(c[500]|0)>>>0){aS()}k=p+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L2844}}}while(0);if(A>>>0<(c[500]|0)>>>0){aS()}c[A+24>>2]=p;t=c[a+(l+16|0)>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[500]|0)>>>0){aS()}else{c[A+16>>2]=t;c[t+24>>2]=A;break}}}while(0);t=c[a+(l+20|0)>>2]|0;if((t|0)==0){q=n;r=o;break}if(t>>>0<(c[500]|0)>>>0){aS()}else{c[A+20>>2]=t;c[t+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){aS()}A=a+(h-4|0)|0;e=c[A>>2]|0;if((e&1|0)==0){aS()}do{if((e&2|0)==0){if((j|0)==(c[502]|0)){B=(c[499]|0)+r|0;c[499]=B;c[502]=q;c[q+4>>2]=B|1;if((q|0)==(c[501]|0)){c[501]=0;c[498]=0}if(B>>>0<=(c[503]|0)>>>0){return}jD(0);return}if((j|0)==(c[501]|0)){B=(c[498]|0)+r|0;c[498]=B;c[501]=q;c[q+4>>2]=B|1;c[d+B>>2]=B;return}B=(e&-8)+r|0;C=e>>>3;L2949:do{if(e>>>0<256){u=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=2024+(C<<1<<2)|0;do{if((u|0)!=(b|0)){if(u>>>0<(c[500]|0)>>>0){aS()}if((c[u+12>>2]|0)==(j|0)){break}aS()}}while(0);if((g|0)==(u|0)){c[496]=c[496]&(1<<C^-1);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[500]|0)>>>0){aS()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}aS()}}while(0);c[u+12>>2]=g;c[D>>2]=u}else{b=i;f=c[a+(h+16|0)>>2]|0;t=c[a+(h|4)>>2]|0;L2970:do{if((t|0)==(b|0)){p=a+(h+12|0)|0;v=c[p>>2]|0;do{if((v|0)==0){m=a+(h+8|0)|0;k=c[m>>2]|0;if((k|0)==0){E=0;break L2970}else{F=k;G=m;break}}else{F=v;G=p}}while(0);while(1){p=F+20|0;v=c[p>>2]|0;if((v|0)!=0){F=v;G=p;continue}p=F+16|0;v=c[p>>2]|0;if((v|0)==0){break}else{F=v;G=p}}if(G>>>0<(c[500]|0)>>>0){aS()}else{c[G>>2]=0;E=F;break}}else{p=c[a+h>>2]|0;if(p>>>0<(c[500]|0)>>>0){aS()}v=p+12|0;if((c[v>>2]|0)!=(b|0)){aS()}m=t+8|0;if((c[m>>2]|0)==(b|0)){c[v>>2]=t;c[m>>2]=p;E=t;break}else{aS()}}}while(0);if((f|0)==0){break}t=a+(h+20|0)|0;u=2288+(c[t>>2]<<2)|0;do{if((b|0)==(c[u>>2]|0)){c[u>>2]=E;if((E|0)!=0){break}c[497]=c[497]&(1<<c[t>>2]^-1);break L2949}else{if(f>>>0<(c[500]|0)>>>0){aS()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L2949}}}while(0);if(E>>>0<(c[500]|0)>>>0){aS()}c[E+24>>2]=f;b=c[a+(h+8|0)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[500]|0)>>>0){aS()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12|0)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[500]|0)>>>0){aS()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=B|1;c[d+B>>2]=B;if((q|0)!=(c[501]|0)){H=B;break}c[498]=B;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);r=H>>>3;if(H>>>0<256){d=r<<1;e=2024+(d<<2)|0;A=c[496]|0;E=1<<r;do{if((A&E|0)==0){c[496]=A|E;I=e;J=2024+(d+2<<2)|0}else{r=2024+(d+2<<2)|0;h=c[r>>2]|0;if(h>>>0>=(c[500]|0)>>>0){I=h;J=r;break}aS()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=e;return}e=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}J=(I+1048320|0)>>>16&8;d=I<<J;E=(d+520192|0)>>>16&4;A=d<<E;d=(A+245760|0)>>>16&2;r=(14-(E|J|d)|0)+(A<<d>>>15)|0;K=H>>>((r+7|0)>>>0)&1|r<<1}}while(0);I=2288+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;r=c[497]|0;d=1<<K;do{if((r&d|0)==0){c[497]=r|d;c[I>>2]=e;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}A=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(A>>>31<<2)|0;E=c[M>>2]|0;if((E|0)==0){N=2487;break}else{A=A<<1;J=E}}if((N|0)==2487){if(M>>>0<(c[500]|0)>>>0){aS()}else{c[M>>2]=e;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}A=J+8|0;B=c[A>>2]|0;E=c[500]|0;if(J>>>0<E>>>0){aS()}if(B>>>0<E>>>0){aS()}else{c[B+12>>2]=e;c[A>>2]=e;c[q+8>>2]=B;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[504]|0)-1|0;c[504]=q;if((q|0)==0){O=2440}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[504]=-1;return}function jC(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;if((a|0)==0){d=jA(b)|0;return d|0}if(b>>>0>4294967231){c[bF()>>2]=12;d=0;return d|0}if(b>>>0<11){e=16}else{e=b+11&-8}f=jE(a-8|0,e)|0;if((f|0)!=0){d=f+8|0;return d|0}f=jA(b)|0;if((f|0)==0){d=0;return d|0}e=c[a-4>>2]|0;g=(e&-8)-((e&3|0)==0?8:4)|0;jQ(f|0,a|0,g>>>0<b>>>0?g:b);jB(a);d=f;return d|0}function jD(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;do{if((c[20]|0)==0){b=aZ(8)|0;if((b-1&b|0)==0){c[22]=b;c[21]=b;c[23]=-1;c[24]=2097152;c[25]=0;c[607]=0;c[20]=bo(0)&-16^1431655768;break}else{aS();return 0;return 0}}}while(0);if(a>>>0>=4294967232){d=0;return d|0}b=c[502]|0;if((b|0)==0){d=0;return d|0}e=c[499]|0;do{if(e>>>0>(a+40|0)>>>0){f=c[22]|0;g=ah(((((((-40-a|0)-1|0)+e|0)+f|0)>>>0)/(f>>>0)>>>0)-1|0,f);h=b;i=2432;while(1){j=c[i>>2]|0;if(j>>>0<=h>>>0){if((j+(c[i+4>>2]|0)|0)>>>0>h>>>0){k=i;break}}j=c[i+8>>2]|0;if((j|0)==0){k=0;break}else{i=j}}if((c[k+12>>2]&8|0)!=0){break}i=bj(0)|0;h=k+4|0;if((i|0)!=((c[k>>2]|0)+(c[h>>2]|0)|0)){break}j=bj(-(g>>>0>2147483646?-2147483648-f|0:g)|0)|0;l=bj(0)|0;if(!((j|0)!=-1&l>>>0<i>>>0)){break}j=i-l|0;if((i|0)==(l|0)){break}c[h>>2]=(c[h>>2]|0)-j|0;c[604]=(c[604]|0)-j|0;h=c[502]|0;m=(c[499]|0)-j|0;j=h;n=h+8|0;if((n&7|0)==0){o=0}else{o=-n&7}n=m-o|0;c[502]=j+o|0;c[499]=n;c[j+(o+4|0)>>2]=n|1;c[j+(m+4|0)>>2]=40;c[503]=c[24]|0;d=(i|0)!=(l|0)&1;return d|0}}while(0);if((c[499]|0)>>>0<=(c[503]|0)>>>0){d=0;return d|0}c[503]=-1;d=0;return d|0}function jE(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=a+4|0;e=c[d>>2]|0;f=e&-8;g=a;h=g+f|0;i=h;j=c[500]|0;if(g>>>0<j>>>0){aS();return 0;return 0}k=e&3;if(!((k|0)!=1&g>>>0<h>>>0)){aS();return 0;return 0}l=g+(f|4)|0;m=c[l>>2]|0;if((m&1|0)==0){aS();return 0;return 0}if((k|0)==0){if(b>>>0<256){n=0;return n|0}do{if(f>>>0>=(b+4|0)>>>0){if((f-b|0)>>>0>c[22]<<1>>>0){break}else{n=a}return n|0}}while(0);n=0;return n|0}if(f>>>0>=b>>>0){k=f-b|0;if(k>>>0<=15){n=a;return n|0}c[d>>2]=e&1|b|2;c[g+(b+4|0)>>2]=k|3;c[l>>2]=c[l>>2]|1;jF(g+b|0,k);n=a;return n|0}if((i|0)==(c[502]|0)){k=(c[499]|0)+f|0;if(k>>>0<=b>>>0){n=0;return n|0}l=k-b|0;c[d>>2]=e&1|b|2;c[g+(b+4|0)>>2]=l|1;c[502]=g+b|0;c[499]=l;n=a;return n|0}if((i|0)==(c[501]|0)){l=(c[498]|0)+f|0;if(l>>>0<b>>>0){n=0;return n|0}k=l-b|0;if(k>>>0>15){c[d>>2]=e&1|b|2;c[g+(b+4|0)>>2]=k|1;c[g+l>>2]=k;o=g+(l+4|0)|0;c[o>>2]=c[o>>2]&-2;p=g+b|0;q=k}else{c[d>>2]=e&1|l|2;e=g+(l+4|0)|0;c[e>>2]=c[e>>2]|1;p=0;q=0}c[498]=q;c[501]=p;n=a;return n|0}if((m&2|0)!=0){n=0;return n|0}p=(m&-8)+f|0;if(p>>>0<b>>>0){n=0;return n|0}q=p-b|0;e=m>>>3;L3170:do{if(m>>>0<256){l=c[g+(f+8|0)>>2]|0;k=c[g+(f+12|0)>>2]|0;o=2024+(e<<1<<2)|0;do{if((l|0)!=(o|0)){if(l>>>0<j>>>0){aS();return 0;return 0}if((c[l+12>>2]|0)==(i|0)){break}aS();return 0;return 0}}while(0);if((k|0)==(l|0)){c[496]=c[496]&(1<<e^-1);break}do{if((k|0)==(o|0)){r=k+8|0}else{if(k>>>0<j>>>0){aS();return 0;return 0}s=k+8|0;if((c[s>>2]|0)==(i|0)){r=s;break}aS();return 0;return 0}}while(0);c[l+12>>2]=k;c[r>>2]=l}else{o=h;s=c[g+(f+24|0)>>2]|0;t=c[g+(f+12|0)>>2]|0;L3191:do{if((t|0)==(o|0)){u=g+(f+20|0)|0;v=c[u>>2]|0;do{if((v|0)==0){w=g+(f+16|0)|0;x=c[w>>2]|0;if((x|0)==0){y=0;break L3191}else{z=x;A=w;break}}else{z=v;A=u}}while(0);while(1){u=z+20|0;v=c[u>>2]|0;if((v|0)!=0){z=v;A=u;continue}u=z+16|0;v=c[u>>2]|0;if((v|0)==0){break}else{z=v;A=u}}if(A>>>0<j>>>0){aS();return 0;return 0}else{c[A>>2]=0;y=z;break}}else{u=c[g+(f+8|0)>>2]|0;if(u>>>0<j>>>0){aS();return 0;return 0}v=u+12|0;if((c[v>>2]|0)!=(o|0)){aS();return 0;return 0}w=t+8|0;if((c[w>>2]|0)==(o|0)){c[v>>2]=t;c[w>>2]=u;y=t;break}else{aS();return 0;return 0}}}while(0);if((s|0)==0){break}t=g+(f+28|0)|0;l=2288+(c[t>>2]<<2)|0;do{if((o|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[497]=c[497]&(1<<c[t>>2]^-1);break L3170}else{if(s>>>0<(c[500]|0)>>>0){aS();return 0;return 0}k=s+16|0;if((c[k>>2]|0)==(o|0)){c[k>>2]=y}else{c[s+20>>2]=y}if((y|0)==0){break L3170}}}while(0);if(y>>>0<(c[500]|0)>>>0){aS();return 0;return 0}c[y+24>>2]=s;o=c[g+(f+16|0)>>2]|0;do{if((o|0)!=0){if(o>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[y+16>>2]=o;c[o+24>>2]=y;break}}}while(0);o=c[g+(f+20|0)>>2]|0;if((o|0)==0){break}if(o>>>0<(c[500]|0)>>>0){aS();return 0;return 0}else{c[y+20>>2]=o;c[o+24>>2]=y;break}}}while(0);if(q>>>0<16){c[d>>2]=p|c[d>>2]&1|2;y=g+(p|4)|0;c[y>>2]=c[y>>2]|1;n=a;return n|0}else{c[d>>2]=c[d>>2]&1|b|2;c[g+(b+4|0)>>2]=q|3;d=g+(p|4)|0;c[d>>2]=c[d>>2]|1;jF(g+b|0,q);n=a;return n|0}return 0}function jF(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;d=a;e=d+b|0;f=e;g=c[a+4>>2]|0;L3246:do{if((g&1|0)==0){h=c[a>>2]|0;if((g&3|0)==0){return}i=d+(-h|0)|0;j=i;k=h+b|0;l=c[500]|0;if(i>>>0<l>>>0){aS()}if((j|0)==(c[501]|0)){m=d+(b+4|0)|0;if((c[m>>2]&3|0)!=3){n=j;o=k;break}c[498]=k;c[m>>2]=c[m>>2]&-2;c[d+(4-h|0)>>2]=k|1;c[e>>2]=k;return}m=h>>>3;if(h>>>0<256){p=c[d+(8-h|0)>>2]|0;q=c[d+(12-h|0)>>2]|0;r=2024+(m<<1<<2)|0;do{if((p|0)!=(r|0)){if(p>>>0<l>>>0){aS()}if((c[p+12>>2]|0)==(j|0)){break}aS()}}while(0);if((q|0)==(p|0)){c[496]=c[496]&(1<<m^-1);n=j;o=k;break}do{if((q|0)==(r|0)){s=q+8|0}else{if(q>>>0<l>>>0){aS()}t=q+8|0;if((c[t>>2]|0)==(j|0)){s=t;break}aS()}}while(0);c[p+12>>2]=q;c[s>>2]=p;n=j;o=k;break}r=i;m=c[d+(24-h|0)>>2]|0;t=c[d+(12-h|0)>>2]|0;L3280:do{if((t|0)==(r|0)){u=16-h|0;v=d+(u+4|0)|0;w=c[v>>2]|0;do{if((w|0)==0){x=d+u|0;y=c[x>>2]|0;if((y|0)==0){z=0;break L3280}else{A=y;B=x;break}}else{A=w;B=v}}while(0);while(1){v=A+20|0;w=c[v>>2]|0;if((w|0)!=0){A=w;B=v;continue}v=A+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{A=w;B=v}}if(B>>>0<l>>>0){aS()}else{c[B>>2]=0;z=A;break}}else{v=c[d+(8-h|0)>>2]|0;if(v>>>0<l>>>0){aS()}w=v+12|0;if((c[w>>2]|0)!=(r|0)){aS()}u=t+8|0;if((c[u>>2]|0)==(r|0)){c[w>>2]=t;c[u>>2]=v;z=t;break}else{aS()}}}while(0);if((m|0)==0){n=j;o=k;break}t=d+(28-h|0)|0;l=2288+(c[t>>2]<<2)|0;do{if((r|0)==(c[l>>2]|0)){c[l>>2]=z;if((z|0)!=0){break}c[497]=c[497]&(1<<c[t>>2]^-1);n=j;o=k;break L3246}else{if(m>>>0<(c[500]|0)>>>0){aS()}i=m+16|0;if((c[i>>2]|0)==(r|0)){c[i>>2]=z}else{c[m+20>>2]=z}if((z|0)==0){n=j;o=k;break L3246}}}while(0);if(z>>>0<(c[500]|0)>>>0){aS()}c[z+24>>2]=m;r=16-h|0;t=c[d+r>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[500]|0)>>>0){aS()}else{c[z+16>>2]=t;c[t+24>>2]=z;break}}}while(0);t=c[d+(r+4|0)>>2]|0;if((t|0)==0){n=j;o=k;break}if(t>>>0<(c[500]|0)>>>0){aS()}else{c[z+20>>2]=t;c[t+24>>2]=z;n=j;o=k;break}}else{n=a;o=b}}while(0);a=c[500]|0;if(e>>>0<a>>>0){aS()}z=d+(b+4|0)|0;A=c[z>>2]|0;do{if((A&2|0)==0){if((f|0)==(c[502]|0)){B=(c[499]|0)+o|0;c[499]=B;c[502]=n;c[n+4>>2]=B|1;if((n|0)!=(c[501]|0)){return}c[501]=0;c[498]=0;return}if((f|0)==(c[501]|0)){B=(c[498]|0)+o|0;c[498]=B;c[501]=n;c[n+4>>2]=B|1;c[n+B>>2]=B;return}B=(A&-8)+o|0;s=A>>>3;L3345:do{if(A>>>0<256){g=c[d+(b+8|0)>>2]|0;t=c[d+(b+12|0)>>2]|0;h=2024+(s<<1<<2)|0;do{if((g|0)!=(h|0)){if(g>>>0<a>>>0){aS()}if((c[g+12>>2]|0)==(f|0)){break}aS()}}while(0);if((t|0)==(g|0)){c[496]=c[496]&(1<<s^-1);break}do{if((t|0)==(h|0)){C=t+8|0}else{if(t>>>0<a>>>0){aS()}m=t+8|0;if((c[m>>2]|0)==(f|0)){C=m;break}aS()}}while(0);c[g+12>>2]=t;c[C>>2]=g}else{h=e;m=c[d+(b+24|0)>>2]|0;l=c[d+(b+12|0)>>2]|0;L3347:do{if((l|0)==(h|0)){i=d+(b+20|0)|0;p=c[i>>2]|0;do{if((p|0)==0){q=d+(b+16|0)|0;v=c[q>>2]|0;if((v|0)==0){D=0;break L3347}else{E=v;F=q;break}}else{E=p;F=i}}while(0);while(1){i=E+20|0;p=c[i>>2]|0;if((p|0)!=0){E=p;F=i;continue}i=E+16|0;p=c[i>>2]|0;if((p|0)==0){break}else{E=p;F=i}}if(F>>>0<a>>>0){aS()}else{c[F>>2]=0;D=E;break}}else{i=c[d+(b+8|0)>>2]|0;if(i>>>0<a>>>0){aS()}p=i+12|0;if((c[p>>2]|0)!=(h|0)){aS()}q=l+8|0;if((c[q>>2]|0)==(h|0)){c[p>>2]=l;c[q>>2]=i;D=l;break}else{aS()}}}while(0);if((m|0)==0){break}l=d+(b+28|0)|0;g=2288+(c[l>>2]<<2)|0;do{if((h|0)==(c[g>>2]|0)){c[g>>2]=D;if((D|0)!=0){break}c[497]=c[497]&(1<<c[l>>2]^-1);break L3345}else{if(m>>>0<(c[500]|0)>>>0){aS()}t=m+16|0;if((c[t>>2]|0)==(h|0)){c[t>>2]=D}else{c[m+20>>2]=D}if((D|0)==0){break L3345}}}while(0);if(D>>>0<(c[500]|0)>>>0){aS()}c[D+24>>2]=m;h=c[d+(b+16|0)>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[500]|0)>>>0){aS()}else{c[D+16>>2]=h;c[h+24>>2]=D;break}}}while(0);h=c[d+(b+20|0)>>2]|0;if((h|0)==0){break}if(h>>>0<(c[500]|0)>>>0){aS()}else{c[D+20>>2]=h;c[h+24>>2]=D;break}}}while(0);c[n+4>>2]=B|1;c[n+B>>2]=B;if((n|0)!=(c[501]|0)){G=B;break}c[498]=B;return}else{c[z>>2]=A&-2;c[n+4>>2]=o|1;c[n+o>>2]=o;G=o}}while(0);o=G>>>3;if(G>>>0<256){A=o<<1;z=2024+(A<<2)|0;D=c[496]|0;b=1<<o;do{if((D&b|0)==0){c[496]=D|b;H=z;I=2024+(A+2<<2)|0}else{o=2024+(A+2<<2)|0;d=c[o>>2]|0;if(d>>>0>=(c[500]|0)>>>0){H=d;I=o;break}aS()}}while(0);c[I>>2]=n;c[H+12>>2]=n;c[n+8>>2]=H;c[n+12>>2]=z;return}z=n;H=G>>>8;do{if((H|0)==0){J=0}else{if(G>>>0>16777215){J=31;break}I=(H+1048320|0)>>>16&8;A=H<<I;b=(A+520192|0)>>>16&4;D=A<<b;A=(D+245760|0)>>>16&2;o=(14-(b|I|A)|0)+(D<<A>>>15)|0;J=G>>>((o+7|0)>>>0)&1|o<<1}}while(0);H=2288+(J<<2)|0;c[n+28>>2]=J;c[n+20>>2]=0;c[n+16>>2]=0;o=c[497]|0;A=1<<J;if((o&A|0)==0){c[497]=o|A;c[H>>2]=z;c[n+24>>2]=H;c[n+12>>2]=n;c[n+8>>2]=n;return}if((J|0)==31){K=0}else{K=25-(J>>>1)|0}J=G<<K;K=c[H>>2]|0;while(1){if((c[K+4>>2]&-8|0)==(G|0)){break}L=K+16+(J>>>31<<2)|0;H=c[L>>2]|0;if((H|0)==0){M=2793;break}else{J=J<<1;K=H}}if((M|0)==2793){if(L>>>0<(c[500]|0)>>>0){aS()}c[L>>2]=z;c[n+24>>2]=K;c[n+12>>2]=n;c[n+8>>2]=n;return}L=K+8|0;M=c[L>>2]|0;J=c[500]|0;if(K>>>0<J>>>0){aS()}if(M>>>0<J>>>0){aS()}c[M+12>>2]=z;c[L>>2]=z;c[n+8>>2]=M;c[n+12>>2]=K;c[n+24>>2]=0;return}function jG(a){a=a|0;var b=0,d=0,e=0;b=(a|0)==0?1:a;while(1){d=jA(b)|0;if((d|0)!=0){e=2837;break}a=(J=c[3390]|0,c[3390]=J+0,J);if((a|0)==0){break}b_[a&1023]()}if((e|0)==2837){return d|0}d=bf(4)|0;c[d>>2]=4968;aO(d|0,10648,66);return 0}function jH(a){a=a|0;return jG(a)|0}function jI(a){a=a|0;return 1184}function jJ(a){a=a|0;if((a|0)!=0){jB(a)}return}function jK(a){a=a|0;jJ(a);return}function jL(a){a=a|0;jJ(a);return}function jM(a){a=a|0;return}function jN(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0,u=0,v=0.0,w=0,x=0,y=0,z=0.0,A=0.0,B=0,C=0,D=0,E=0.0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0.0,O=0,P=0,Q=0.0,R=0.0,S=0.0;e=b;while(1){f=e+1|0;if((bg(a[e]|0|0)|0)==0){break}else{e=f}}g=a[e]|0;if((g<<24>>24|0)==45){i=f;j=1}else if((g<<24>>24|0)==43){i=f;j=0}else{i=e;j=0}e=-1;f=0;g=i;while(1){k=a[g]|0;if(((k<<24>>24)-48|0)>>>0<10){l=e}else{if(k<<24>>24!=46|(e|0)>-1){break}else{l=f}}e=l;f=f+1|0;g=g+1|0}l=g+(-f|0)|0;i=(e|0)<0;m=((i^1)<<31>>31)+f|0;n=(m|0)>18;o=(n?-18:-m|0)+(i?f:e)|0;e=n?18:m;do{if((e|0)==0){p=b;q=0.0}else{do{if((e|0)>9){m=l;n=e;f=0;while(1){i=a[m]|0;r=m+1|0;if(i<<24>>24==46){s=a[r]|0;t=m+2|0}else{s=i;t=r}u=((f*10&-1)-48|0)+(s<<24>>24)|0;r=n-1|0;if((r|0)>9){m=t;n=r;f=u}else{break}}v=+(u|0)*1.0e9;w=9;x=t;y=2865;break}else{if((e|0)>0){v=0.0;w=e;x=l;y=2865;break}else{z=0.0;A=0.0;break}}}while(0);if((y|0)==2865){f=x;n=w;m=0;while(1){r=a[f]|0;i=f+1|0;if(r<<24>>24==46){B=a[i]|0;C=f+2|0}else{B=r;C=i}D=((m*10&-1)-48|0)+(B<<24>>24)|0;i=n-1|0;if((i|0)>0){f=C;n=i;m=D}else{break}}z=+(D|0);A=v}E=A+z;L3508:do{if((k<<24>>24|0)==69|(k<<24>>24|0)==101){m=g+1|0;n=a[m]|0;if((n<<24>>24|0)==45){F=g+2|0;G=1}else if((n<<24>>24|0)==43){F=g+2|0;G=0}else{F=m;G=0}m=a[F]|0;if(((m<<24>>24)-48|0)>>>0<10){H=F;I=0;J=m}else{K=0;L=F;M=G;break}while(1){m=((I*10&-1)-48|0)+(J<<24>>24)|0;n=H+1|0;f=a[n]|0;if(((f<<24>>24)-48|0)>>>0<10){H=n;I=m;J=f}else{K=m;L=n;M=G;break L3508}}}else{K=0;L=g;M=0}}while(0);n=o+((M|0)==0?K:-K|0)|0;m=(n|0)<0?-n|0:n;do{if((m|0)>511){c[bF()>>2]=34;N=1.0;O=8;P=511;y=2882;break}else{if((m|0)==0){Q=1.0;break}else{N=1.0;O=8;P=m;y=2882;break}}}while(0);L3520:do{if((y|0)==2882){while(1){y=0;if((P&1|0)==0){R=N}else{R=N*+h[O>>3]}m=P>>1;if((m|0)==0){Q=R;break L3520}else{N=R;O=O+8|0;P=m;y=2882}}}}while(0);if((n|0)>-1){p=L;q=E*Q;break}else{p=L;q=E/Q;break}}}while(0);if((d|0)!=0){c[d>>2]=p}if((j|0)==0){S=q;return+S}S=-0.0-q;return+S}function jO(){var a=0;a=bf(4)|0;c[a>>2]=4968;aO(a|0,10648,66)}function jP(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function jQ(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2]|0;b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function jR(b,c,d){b=b|0;c=c|0;d=d|0;if((c|0)<(b|0)&(b|0)<(c+d|0)){c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b]=a[c]|0}}else{jQ(b,c,d)}}function jS(b){b=b|0;var c=0;c=b;while(a[c]|0){c=c+1|0}return c-b|0}function jT(b,c){b=b|0;c=c|0;var d=0;do{a[b+d|0]=a[c+d|0];d=d+1|0}while(a[c+(d-1)|0]|0);return b|0}function jU(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;return(L=b+d+(e>>>0<a>>>0|0)>>>0,e|0)|0}function jV(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=b-d>>>0;e=b-d-(c>>>0>a>>>0|0)>>>0;return(L=e,a-c>>>0|0)|0}function jW(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){L=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}L=a<<c-32;return 0}function jX(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){L=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}L=0;return b>>>c-32|0}function jY(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){L=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}L=(b|0)<0?-1:0;return b>>c-32|0}function jZ(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function j_(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function j$(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=ah(d,c);f=a>>>16;a=(e>>>16)+ah(d,f)|0;d=b>>>16;b=ah(d,c);return(L=((a>>>16)+ah(d,f)|0)+(((a&65535)+b|0)>>>16)|0,0|(a+b<<16|e&65535))|0}function j0(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=jV(e^a,f^b,e,f)|0;b=L;a=g^e;e=h^f;f=jV(j5(i,b,jV(g^c,h^d,g,h)|0,L,0)^a,L^e,a,e)|0;return(L=L,f)|0}function j1(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=jV(h^a,j^b,h,j)|0;b=L;j5(m,b,jV(k^d,l^e,k,l)|0,L,g);l=jV(c[g>>2]^h,c[g+4>>2]^j,h,j)|0;j=L;i=f;return(L=j,l)|0}function j2(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=j$(e,a)|0;f=L;return(L=(ah(b,a)+ah(d,e)|0)+f|f&0,0|c&-1)|0}function j3(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=j5(a,b,c,d,0)|0;return(L=L,e)|0}function j4(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;j5(a,b,d,e,g);i=f;return(L=c[g+4>>2]|0,c[g>>2]|0)|0}function j5(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(L=n,o)|0}else{if(!m){n=0;o=0;return(L=n,o)|0}c[f>>2]=a&-1;c[f+4>>2]=b&0;n=0;o=0;return(L=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(L=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(L=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=0|a&-1;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((j_(l|0)|0)>>>0);return(L=n,o)|0}p=(jZ(l|0)|0)-(jZ(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(L=n,o)|0}c[f>>2]=0|a&-1;c[f+4>>2]=h|b&0;n=0;o=0;return(L=n,o)|0}else{if(!m){r=(jZ(l|0)|0)-(jZ(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(L=n,o)|0}c[f>>2]=0|a&-1;c[f+4>>2]=h|b&0;n=0;o=0;return(L=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=((jZ(j|0)|0)+33|0)-(jZ(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=0|a&-1;return(L=n,o)|0}else{p=j_(j|0)|0;n=0|i>>>(p>>>0);o=i<<32-p|g>>>(p>>>0)|0;return(L=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;E=t;F=0;G=0}else{g=0|d&-1;d=k|e&0;e=jU(g,d,-1,-1)|0;k=L;i=w;w=v;v=u;u=t;t=s;s=0;while(1){H=w>>>31|i<<1;I=s|w<<1;j=0|(u<<1|i>>>31);a=u>>>31|v<<1|0;jV(e,k,j,a);b=L;h=b>>31|((b|0)<0?-1:0)<<1;J=h&1;K=jV(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d)|0;M=L;b=t-1|0;if((b|0)==0){break}else{i=H;w=I;v=M;u=K;t=b;s=J}}B=H;C=I;D=M;E=K;F=0;G=J}J=C;C=0;if((f|0)!=0){c[f>>2]=0|E;c[f+4>>2]=D|0}n=(0|J)>>>31|(B|C)<<1|(C<<1|J>>>31)&0|F;o=(J<<1|0>>>31)&-2|G;return(L=n,o)|0}function j6(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return bQ[a&1023](b|0,c|0,d|0)|0}function j7(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;bR[a&1023](b|0,c|0,d|0)}function j8(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;bS[a&1023](b|0,c|0,d|0,e|0,f|0)}function j9(a,b){a=a|0;b=b|0;bT[a&1023](b|0)}function ka(a,b,c){a=a|0;b=b|0;c=c|0;bU[a&1023](b|0,c|0)}function kb(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;bV[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0)}function kc(a,b){a=a|0;b=b|0;return bW[a&1023](b|0)|0}function kd(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;bX[a&1023](b|0,c|0,d|0,e|0,f|0,+g)}function ke(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;bY[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0)}function kf(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;bZ[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function kg(a){a=a|0;b_[a&1023]()}function kh(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return b$[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)|0}function ki(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return b0[a&1023](b|0,c|0,d|0,e|0)|0}function kj(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=+h;b1[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,+h)}function kk(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;b2[a&1023](b|0,c|0,d|0,e|0,f|0,g|0)}function kl(a,b,c){a=a|0;b=b|0;c=c|0;return b3[a&1023](b|0,c|0)|0}function km(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return b4[a&1023](b|0,c|0,d|0,e|0,f|0)|0}function kn(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b5[a&1023](b|0,c|0,d|0,e|0)}function ko(a,b,c){a=a|0;b=b|0;c=c|0;ai(0);return 0}function kp(a,b,c){a=a|0;b=b|0;c=c|0;ai(1)}function kq(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ai(2)}function kr(a){a=a|0;ai(3)}function ks(a,b){a=a|0;b=b|0;ai(4)}function kt(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;ai(5)}function ku(a){a=a|0;ai(6);return 0}function kv(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;ai(7)}function kw(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;ai(8)}function kx(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ai(9)}function ky(){ai(10)}function kz(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;ai(11);return 0}function kA(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ai(12);return 0}function kB(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;ai(13)}function kC(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;ai(14)}function kD(a,b){a=a|0;b=b|0;ai(15);return 0}function kE(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;ai(16);return 0}function kF(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;ai(17)}
// EMSCRIPTEN_END_FUNCS
var bQ=[ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ep,ko,ko,ko,ko,ko,ko,ko,h1,ko,ko,ko,ko,ko,h$,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,jq,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,hE,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,er,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,c6,ko,ko,ko,dK,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,dI,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,hU,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,dv,ko,ho,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,hF,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,hZ,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,dN,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,cU,ko,ko,ko,ko,ko,h3,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,hl,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,dn,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,dP,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko,ko];var bR=[kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,cT,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,em,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp,kp];var bS=[kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,jv,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,jw,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,ju,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq,kq];var bT=[kr,kr,hn,kr,et,kr,kr,kr,kr,kr,kr,kr,fp,kr,kr,kr,c5,kr,dH,kr,kr,kr,kr,kr,hH,kr,cW,kr,kr,kr,kr,kr,kr,kr,kr,kr,gS,kr,fa,kr,c1,kr,kr,kr,kr,kr,eT,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,dY,kr,ee,kr,kr,kr,jM,kr,kr,kr,hO,kr,kr,kr,kr,kr,kr,kr,hR,kr,kr,kr,kr,kr,fR,kr,eS,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,ea,kr,kr,kr,kr,kr,kr,kr,hi,kr,kr,kr,kr,kr,hP,kr,kr,kr,kr,kr,kr,kr,kr,kr,d$,kr,eo,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,gJ,kr,kr,kr,hN,kr,kr,kr,kr,kr,iI,kr,kr,kr,hT,kr,kr,kr,jc,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,iH,kr,kr,kr,dX,kr,kr,kr,cF,kr,kr,kr,kr,kr,c4,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,en,kr,kr,kr,kr,kr,kr,kr,f5,kr,kr,kr,iK,kr,kr,kr,hQ,kr,kr,kr,jB,kr,hd,kr,iG,kr,kr,kr,kr,kr,d2,kr,cE,kr,kr,kr,kr,kr,kr,kr,kr,kr,es,kr,kr,kr,kr,kr,kr,kr,c2,kr,kr,kr,i2,kr,e9,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,gd,kr,kr,kr,dR,kr,kr,kr,d8,kr,f3,kr,fT,kr,kr,kr,kr,kr,kr,kr,kr,kr,ef,kr,gF,kr,jL,kr,dG,kr,kr,kr,kr,kr,kr,kr,i4,kr,kr,kr,i5,kr,kr,kr,kr,kr,kr,kr,kr,kr,eb,kr,dM,kr,jo,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,h4,kr,kr,kr,h8,kr,kr,kr,kr,kr,d0,kr,kr,kr,ed,kr,gR,kr,cA,kr,kr,kr,gN,kr,ec,kr,kr,kr,kr,kr,kr,kr,i7,kr,kr,kr,jd,kr,kr,kr,kr,kr,iq,kr,cK,kr,kr,kr,hM,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,f4,kr,g_,kr,jk,kr,kr,kr,kr,kr,gm,kr,hb,kr,i6,kr,gB,kr,fq,kr,kr,kr,kr,kr,eh,kr,kr,kr,kr,kr,cL,kr,dZ,kr,d4,kr,da,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,g7,kr,kr,kr,g$,kr,kr,kr,kr,kr,iJ,kr,kr,kr,kr,kr,kr,kr,kr,kr,df,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,jl,kr,jp,kr,kr,kr,kr,kr,kr,kr,kr,kr,d7,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,db,kr,kr,kr,kr,kr,kr,kr,kr,kr,dQ,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,d9,kr,kr,kr,kr,kr,kr,kr,kr,kr,hk,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,dV,kr,d6,kr,cX,kr,kr,kr,kr,kr,eg,kr,gh,kr,kr,kr,kr,kr,fE,kr,f9,kr,cx,kr,kr,kr,kr,kr,ht,kr,kr,kr,kr,kr,kr,kr,g6,kr,kr,kr,kr,kr,kr,kr,d3,kr,dL,kr,kr,kr,d5,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,iF,kr,kr,kr,i3,kr,fC,kr,jn,kr,hj,kr,cw,kr,kr,kr,jb,kr,kr,kr,kr,kr,gT,kr,kr,kr,kr,kr,kr,kr,kr,kr,gl,kr,kr,kr,dc,kr,hS,kr,c3,kr,d1,kr,i8,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr];var bU=[ks,ks,ks,ks,ks,ks,iM,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,cC,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gQ,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,cO,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,iS,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gs,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,iR,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,hm,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,du,ks,gv,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gt,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gx,ks,ks,ks,ks,ks,ks,ks,gE,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gC,ks,ks,ks,ks,ks,gy,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gq,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,cQ,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gu,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,iL,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gO,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gH,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gG,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,iN,ks,ks,ks,gr,ks,gw,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,iD,ks,gp,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,dm,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,c9,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,hr,ks,ks,ks,ks,ks,gK,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,go,ks,ks,ks,ks,ks,gn,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gD,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gL,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gM,ks,ks,ks,ks,ks,ks,ks,ks,ks,gI,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,gP,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks];var bV=[kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,f_,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,fM,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt];var bW=[ku,ku,ku,ku,ku,ku,ku,ku,i1,ku,gf,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dr,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iT,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dJ,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,i$,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ga,ku,id,ku,ku,ku,ku,ku,ku,ku,ku,ku,ik,ku,ku,ku,fD,ku,ku,ku,iP,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dO,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dy,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iX,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iV,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iu,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ja,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,cS,ku,ku,ku,ku,ku,ku,ku,iC,ku,ku,ku,ku,ku,ku,ku,iz,ku,ku,ku,ku,ku,iW,ku,ku,ku,ku,ku,ij,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iA,ku,dp,ku,ku,ku,ku,ku,ku,ku,gk,ku,ku,ku,ku,ku,iY,ku,ku,ku,cY,ku,cy,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,gb,ku,ku,ku,ku,ku,ku,ku,ku,ku,h6,ku,i0,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iw,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,gi,ku,ku,ku,iO,ku,ku,ku,ku,ku,cG,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iv,ku,ku,ku,ig,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dW,ku,f8,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,cH,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iB,ku,ku,ku,dq,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dw,ku,cM,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,gc,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,hC,ku,ku,ku,hB,ku,ku,ku,ku,ku,jI,ku,ku,ku,dx,ku,f6,ku,ku,ku,ku,ku,ku,ku,iQ,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,hA,ku,f7,ku,ku,ku,ku,ku,cR,ku,ku,ku,ku,ku,ku,ku,ge,ku,ku,ku,ku,ku,gg,ku,ku,ku,ku,ku,ku,ku,iU,ku,ku,ku,ku,ku,gj,ku,ku,ku,ku,ku,ku,ku,ku,ku,fS,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,i_,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iZ,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ii,ku,cZ,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku];var bX=[kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,fB,kv,fz,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,fo,kv,fk,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv];var bY=[kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fL,kw,kw,kw,kw,kw,fU,kw,kw,kw,kw,kw,kw,kw,fX,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,hp,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fy,kw,fu,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,he,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fF,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fK,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fY,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fc,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fJ,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,eO,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,e1,kw,kw,kw,kw,kw,kw,kw,kw,kw,fV,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fj,kw,fg,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,e3,kw,e_,kw,kw,kw,e0,kw,eU,kw,e2,kw,eX,kw,eW,kw,e8,kw,e7,kw,e5,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fZ,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,eH,kw,kw,kw,kw,kw,fG,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,eL,kw,eC,kw,eF,kw,eJ,kw,ex,kw,kw,kw,eR,kw,eQ,kw,kw,kw,ew,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw];var bZ=[kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gA,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gz,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gV,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,g1,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gZ,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,g4,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx];var b_=[ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky];var b$=[kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,hx,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,ib,kz,ia,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,hy,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,ir,kz,kz,kz,is,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,h5,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,h9,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz];var b0=[kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,hV,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,hW,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,hK,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,hI,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,hX,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA];var b1=[kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,hf,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,g9,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB];var b2=[kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,jy,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,fv,kC,fr,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,jz,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,fH,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,hq,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,dD,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,fs,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,fd,kC,fh,kC,fb,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,ft,kC,kC,kC,kC,kC,jx,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,dB,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,hs,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC];var b3=[kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,h0,kD,kD,kD,kD,kD,kD,kD,c_,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,hD,kD,kD,kD,dz,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,hw,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,dt,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,cI,kD,kD,kD,kD,kD,cV,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,hY,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,h2,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,dA,kD,kD,kD,kD,kD,h_,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,ds,kD,kD,kD,cD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD];var b4=[kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,ih,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,ie,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,iE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,hz,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,hJ,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,ip,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,eq,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,hL,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,hG,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,ic,kE,d_,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,it,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE];var b5=[kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,jr,kF,kF,kF,kF,kF,js,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,dC,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,jm,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,dE,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,ev,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,eu,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF];return{_strlen:jS,_free:jB,_realloc:jC,_setup_pathfinding:cl,__GLOBAL__I_a:c0,_memset:jP,_malloc:jA,_memcpy:jQ,_clear_pathfinding:cn,_memmove:jR,_pathfind:co,_free_path:cp,_strcpy:jT,stackAlloc:b6,stackSave:b7,stackRestore:b8,setThrew:b9,setTempRet0:ca,setTempRet1:cb,setTempRet2:cc,setTempRet3:cd,setTempRet4:ce,setTempRet5:cf,setTempRet6:cg,setTempRet7:ch,setTempRet8:ci,setTempRet9:cj,dynCall_iiii:j6,dynCall_viii:j7,dynCall_viiiii:j8,dynCall_vi:j9,dynCall_vii:ka,dynCall_viiiiiiiii:kb,dynCall_ii:kc,dynCall_viiiiif:kd,dynCall_viiiiiii:ke,dynCall_viiiiiiii:kf,dynCall_v:kg,dynCall_iiiiiiiii:kh,dynCall_iiiii:ki,dynCall_viiiiiif:kj,dynCall_viiiiii:kk,dynCall_iii:kl,dynCall_iiiiii:km,dynCall_viiii:kn}})
// EMSCRIPTEN_END_ASM
({ Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array }, { abort: abort, assert: assert, asmPrintInt: asmPrintInt, asmPrintFloat: asmPrintFloat, copyTempDouble: copyTempDouble, copyTempFloat: copyTempFloat, min: Math_min, invoke_iiii: invoke_iiii, invoke_viii: invoke_viii, invoke_viiiii: invoke_viiiii, invoke_vi: invoke_vi, invoke_vii: invoke_vii, invoke_viiiiiiiii: invoke_viiiiiiiii, invoke_ii: invoke_ii, invoke_viiiiif: invoke_viiiiif, invoke_viiiiiii: invoke_viiiiiii, invoke_viiiiiiii: invoke_viiiiiiii, invoke_v: invoke_v, invoke_iiiiiiiii: invoke_iiiiiiiii, invoke_iiiii: invoke_iiiii, invoke_viiiiiif: invoke_viiiiiif, invoke_viiiiii: invoke_viiiiii, invoke_iii: invoke_iii, invoke_iiiiii: invoke_iiiiii, invoke_viiii: invoke_viiii, _llvm_va_end: _llvm_va_end, _vsnprintf: _vsnprintf, _vsscanf: _vsscanf, _sscanf: _sscanf, _snprintf: _snprintf, ___locale_mb_cur_max: ___locale_mb_cur_max, _fgetc: _fgetc, ___cxa_throw: ___cxa_throw, _strerror: _strerror, _pthread_mutex_lock: _pthread_mutex_lock, _atexit: _atexit, _abort: _abort, _llvm_eh_exception: _llvm_eh_exception, ___cxa_free_exception: ___cxa_free_exception, _isdigit: _isdigit, _pread: _pread, _fflush: _fflush, __Z8catcloseP8_nl_catd: __Z8catcloseP8_nl_catd, _sysconf: _sysconf, _llvm_lifetime_start: _llvm_lifetime_start, ___setErrNo: ___setErrNo, _fwrite: _fwrite, __Z7catgetsP8_nl_catdiiPKc: __Z7catgetsP8_nl_catdiiPKc, _sqrt: _sqrt, _isxdigit: _isxdigit, _write: _write, __scanString: __scanString, _llvm_umul_with_overflow_i32: _llvm_umul_with_overflow_i32, _exit: _exit, _sprintf: _sprintf, _llvm_lifetime_end: _llvm_lifetime_end, _asprintf: _asprintf, ___ctype_b_loc: ___ctype_b_loc, ___cxa_find_matching_catch: ___cxa_find_matching_catch, _freelocale: _freelocale, __Z7catopenPKci: __Z7catopenPKci, ___cxa_allocate_exception: ___cxa_allocate_exception, _isspace: _isspace, _strtoll: _strtoll, _strtoull: _strtoull, _sbrk: _sbrk, _vasprintf: _vasprintf, _read: _read, __formatString: __formatString, __reallyNegative: __reallyNegative, _time: _time, ___cxa_is_number_type: ___cxa_is_number_type, _pthread_cond_broadcast: _pthread_cond_broadcast, ___cxa_does_inherit: ___cxa_does_inherit, ___ctype_toupper_loc: ___ctype_toupper_loc, __ZSt9terminatev: __ZSt9terminatev, ___ctype_tolower_loc: ___ctype_tolower_loc, _pthread_mutex_unlock: _pthread_mutex_unlock, __parseInt64: __parseInt64, __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv, _pwrite: _pwrite, __isFloat: __isFloat, __ZNSt9exceptionD2Ev: __ZNSt9exceptionD2Ev, ___cxa_call_unexpected: ___cxa_call_unexpected, _strerror_r: _strerror_r, _newlocale: _newlocale, ___cxa_begin_catch: ___cxa_begin_catch, ___errno_location: ___errno_location, ___gxx_personality_v0: ___gxx_personality_v0, _pthread_cond_wait: _pthread_cond_wait, ___cxa_rethrow: ___cxa_rethrow, _uselocale: _uselocale, ___resumeException: ___resumeException, _ungetc: _ungetc, __exit: __exit, _vsprintf: _vsprintf, _strftime: _strftime, ___cxa_end_catch: ___cxa_end_catch, STACKTOP: STACKTOP, STACK_MAX: STACK_MAX, tempDoublePtr: tempDoublePtr, ABORT: ABORT, cttz_i8: cttz_i8, ctlz_i8: ctlz_i8, NaN: NaN, Infinity: Infinity, _stdin: _stdin, __ZTVN10__cxxabiv117__class_type_infoE: __ZTVN10__cxxabiv117__class_type_infoE, __ZTVN10__cxxabiv120__si_class_type_infoE: __ZTVN10__cxxabiv120__si_class_type_infoE, _stderr: _stderr, ___fsmu8: ___fsmu8, _stdout: _stdout, __ZTISt9exception: __ZTISt9exception, ___dso_handle: ___dso_handle }, buffer);
var _strlen = Module["_strlen"] = asm._strlen;
var _free = Module["_free"] = asm._free;
var _realloc = Module["_realloc"] = asm._realloc;
var _setup_pathfinding = Module["_setup_pathfinding"] = asm._setup_pathfinding;
var __GLOBAL__I_a = Module["__GLOBAL__I_a"] = asm.__GLOBAL__I_a;
var _memset = Module["_memset"] = asm._memset;
var _malloc = Module["_malloc"] = asm._malloc;
var _memcpy = Module["_memcpy"] = asm._memcpy;
var _clear_pathfinding = Module["_clear_pathfinding"] = asm._clear_pathfinding;
var _memmove = Module["_memmove"] = asm._memmove;
var _pathfind = Module["_pathfind"] = asm._pathfind;
var _free_path = Module["_free_path"] = asm._free_path;
var _strcpy = Module["_strcpy"] = asm._strcpy;
var dynCall_iiii = Module["dynCall_iiii"] = asm.dynCall_iiii;
var dynCall_viii = Module["dynCall_viii"] = asm.dynCall_viii;
var dynCall_viiiii = Module["dynCall_viiiii"] = asm.dynCall_viiiii;
var dynCall_vi = Module["dynCall_vi"] = asm.dynCall_vi;
var dynCall_vii = Module["dynCall_vii"] = asm.dynCall_vii;
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = asm.dynCall_viiiiiiiii;
var dynCall_ii = Module["dynCall_ii"] = asm.dynCall_ii;
var dynCall_viiiiif = Module["dynCall_viiiiif"] = asm.dynCall_viiiiif;
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = asm.dynCall_viiiiiii;
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = asm.dynCall_viiiiiiii;
var dynCall_v = Module["dynCall_v"] = asm.dynCall_v;
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = asm.dynCall_iiiiiiiii;
var dynCall_iiiii = Module["dynCall_iiiii"] = asm.dynCall_iiiii;
var dynCall_viiiiiif = Module["dynCall_viiiiiif"] = asm.dynCall_viiiiiif;
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm.dynCall_viiiiii;
var dynCall_iii = Module["dynCall_iii"] = asm.dynCall_iii;
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm.dynCall_iiiiii;
var dynCall_viiii = Module["dynCall_viiii"] = asm.dynCall_viiii;
Runtime.stackAlloc = function(size) { return asm.stackAlloc(size) };
Runtime.stackSave = function() { return asm.stackSave() };
Runtime.stackRestore = function(top) { asm.stackRestore(top) };
// TODO: strip out parts of this we do not need
//======= begin closure i64 code =======
// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */
var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };
  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.
    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };
  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.
  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};
  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }
    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };
  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };
  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };
  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }
    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));
    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };
  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.
  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;
  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);
  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);
  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);
  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);
  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);
  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);
  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };
  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };
  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (this.isZero()) {
      return '0';
    }
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }
    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));
    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);
      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };
  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };
  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };
  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };
  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };
  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };
  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };
  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };
  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }
    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }
    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };
  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };
  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };
  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }
    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }
    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }
    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);
      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }
      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }
      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };
  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };
  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };
  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };
  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };
  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };
  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };
  //======= begin jsbn =======
  var navigator = { appName: 'Modern Browser' }; // polyfill a little
  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/
  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */
  // Basic JavaScript BN library - subset useful for RSA encryption.
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);
  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }
  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;
  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }
  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }
  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }
  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }
  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }
  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }
  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }
  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }
  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }
  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }
  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }
  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }
  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }
  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }
  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }
  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }
  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }
  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }
  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }
  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }
  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }
  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;
  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }
  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }
  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;
  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  // jsbn2 stuff
  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }
  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }
  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }
  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }
  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }
  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }
  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;
  //======= end jsbn =======
  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();
//======= end closure i64 code =======
// === Auto-generated postamble setup entry stuff ===
Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(!Module['preRun'] || Module['preRun'].length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);
  var ret;
  var initialStackTop = STACKTOP;
  try {
    ret = Module['_main'](argc, argv, 0);
  }
  catch(e) {
    if (e.name == 'ExitStatus') {
      return e.status;
    } else if (e == 'SimulateInfiniteLoop') {
      Module['noExitRuntime'] = true;
    } else {
      throw e;
    }
  } finally {
    STACKTOP = initialStackTop;
  }
  return ret;
}
function run(args) {
  args = args || Module['arguments'];
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return 0;
  }
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    var toRun = Module['preRun'];
    Module['preRun'] = [];
    for (var i = toRun.length-1; i >= 0; i--) {
      toRun[i]();
    }
    if (runDependencies > 0) {
      // a preRun added a dependency, run will be called later
      return 0;
    }
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    var ret = 0;
    calledRun = true;
    if (Module['_main'] && shouldRunNow) {
      ret = Module.callMain(args);
      if (!Module['noExitRuntime']) {
        exitRuntime();
      }
    }
    if (Module['postRun']) {
      if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
      while (Module['postRun'].length > 0) {
        Module['postRun'].pop()();
      }
    }
    return ret;
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
    return 0;
  } else {
    return doRun();
  }
}
Module['run'] = Module.run = run;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
  // {{MODULE_ADDITIONS}}

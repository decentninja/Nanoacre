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
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    type.flatIndexes = type.fields.map(function(field) {
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = size;
      } else if (Runtime.isStructType(field)) {
        size = Types.types[field].flatSize;
        alignSize = Types.types[field].alignSize;
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else {
        throw 'Unclear type in struct: ' + field + ', in ' + type.name_ + ' :: ' + dump(Types.types[type.name_]);
      }
      alignSize = type.packed ? 1 : Math.min(alignSize, Runtime.QUANTUM_SIZE);
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
  addFunction: function (func, sig) {
    //assert(sig); // TODO: support asm
    var table = FUNCTION_TABLE; // TODO: support asm
    var ret = table.length;
    table.push(func);
    table.push(0);
    return ret;
  },
  removeFunction: function (index) {
    var table = FUNCTION_TABLE; // TODO: support asm
    table[index] = null;
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
        Runtime.dynCall(sig, func, arguments);
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
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = ((((STACKTOP)+3)>>2)<<2); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = ((((STATICTOP)+3)>>2)<<2); if (STATICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 4))*(quantum ? quantum : 4); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+(((low)>>>(0))))+((+(((high)>>>(0))))*(+(4294967296)))) : ((+(((low)>>>(0))))+((+(((high)|(0))))*(+(4294967296))))); return ret; },
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var setjmpId = 1; // Used in setjmp/longjmp
var setjmpLabels = {};
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
      case 'double': (HEAPF64[(tempDoublePtr)>>3]=value,HEAP32[((ptr)>>2)]=((HEAP32[((tempDoublePtr)>>2)])|0),HEAP32[(((ptr)+(4))>>2)]=((HEAP32[(((tempDoublePtr)+(4))>>2)])|0)); break;
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
      case 'double': return (HEAP32[((tempDoublePtr)>>2)]=HEAP32[((ptr)>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((ptr)+(4))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_NONE = 3; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
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
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
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
var STACK_ROOT, STACKTOP, STACK_MAX;
var STATICTOP;
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
STACK_ROOT = STACKTOP = Runtime.alignMemory(1);
STACK_MAX = TOTAL_STACK; // we lose a little stack here, but TOTAL_STACK is nice and round so use that as the max
var tempDoublePtr = Runtime.alignMemory(allocate(12, 'i8', ALLOC_STACK), 8);
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
STATICTOP = STACK_MAX;
assert(STATICTOP < TOTAL_MEMORY); // Stack must fit in TOTAL_MEMORY; allocations from here on may enlarge TOTAL_MEMORY
var nullString = allocate(intArrayFromString('(null)'), 'i8', ALLOC_STACK);
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
    HEAPU8.set(data, TOTAL_STACK);
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
assert(STATICTOP == STACK_MAX); assert(STACK_MAX == TOTAL_STACK);
STATICTOP += 12772;
assert(STATICTOP < TOTAL_MEMORY);
var _stdout;
var _stdin;
var _stderr;
__ATINIT__ = __ATINIT__.concat([
  { func: function() { __GLOBAL__I_a() } }
]);
var ___dso_handle;
var __ZTVN10__cxxabiv120__si_class_type_infoE;
var __ZTVN10__cxxabiv117__class_type_infoE;
var __ZTISt9exception;
var _stdout = _stdout=allocate([0,0,0,0], "i8", ALLOC_STATIC);
var _stdin = _stdin=allocate([0,0,0,0], "i8", ALLOC_STATIC);
var _stderr = _stderr=allocate([0,0,0,0], "i8", ALLOC_STATIC);
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,232,43,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,244,43,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* memory initializer */ allocate([0,0,0,0,0,0,36,64,0,0,0,0,0,0,89,64,0,0,0,0,0,136,195,64,0,0,0,0,132,215,151,65,0,128,224,55,121,195,65,67,23,110,5,181,181,184,147,70,245,249,63,233,3,79,56,77,50,29,48,249,72,119,130,90,60,191,115,127,221,79,21,117,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,74,117,108,0,74,117,110,0,65,112,114,0,77,97,114,0,70,101,98,0,74,97,110,0,68,101,99,101,109,98,101,114,0,0,0,0,78,111,118,101,109,98,101,114,0,0,0,0,79,99,116,111,98,101,114,0,83,101,112,116,101,109,98,101,114,0,0,0,117,110,115,117,112,112,111,114,116,101,100,32,108,111,99,97,108,101,32,102,111,114,32,115,116,97,110,100,97,114,100,32,105,110,112,117,116,0,0,0,65,117,103,117,115,116,0,0,74,117,108,121,0,0,0,0,74,117,110,101,0,0,0,0,77,97,121,0,65,112,114,105,108,0,0,0,77,97,114,99,104,0,0,0,70,101,98,114,117,97,114,121,0,0,0,0,98,97,115,105,99,95,115,116,114,105,110,103,0,0,0,0,74,97,110,117,97,114,121,0,68,0,0,0,101,0,0,0,99,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,111,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,83,0,0,0,101,0,0,0,112,0,0,0,116,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,117,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,121,0,0,0,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,101,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,105,0,0,0,108,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,99,0,0,0,104,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,114,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,80,77,0,0,65,77,0,0,80,0,0,0,77,0,0,0,0,0,0,0,65,0,0,0,77,0,0,0,0,0,0,0,108,111,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,37,0,0,0,97,0,0,0,32,0,0,0,37,0,0,0,98,0,0,0,32,0,0,0,37,0,0,0,100,0,0,0,32,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,89,0,0,0,0,0,0,0,37,97,32,37,98,32,37,100,32,37,72,58,37,77,58,37,83,32,37,89,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,0,0,0,0,102,0,0,0,97,0,0,0,108,0,0,0,115,0,0,0,101,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,116,0,0,0,114,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,37,112,0,0,105,111,115,95,98,97,115,101,58,58,99,108,101,97,114,0,67,0,0,0,118,101,99,116,111,114,0,0,37,46,48,76,102,0,0,0,105,111,115,116,114,101,97,109,0,0,0,0,109,111,110,101,121,95,103,101,116,32,101,114,114,111,114,0,115,116,100,58,58,98,97,100,95,99,97,115,116,0,0,0,83,97,116,0,70,114,105,0,37,76,102,0,84,104,117,0,87,101,100,0,84,117,101,0,77,111,110,0,83,117,110,0,83,97,116,117,114,100,97,121,0,0,0,0,70,114,105,100,97,121,0,0,84,104,117,114,115,100,97,121,0,0,0,0,87,101,100,110,101,115,100,97,121,0,0,0,84,117,101,115,100,97,121,0,77,111,110,100,97,121,0,0,83,117,110,100,97,121,0,0,58,32,0,0,83,0,0,0,97,0,0,0,116,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,0,0,0,0,117,110,115,112,101,99,105,102,105,101,100,32,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,84,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,117,0,0,0,114,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,114,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,110,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,68,101,99,0,78,111,118,0,79,99,116,0,83,101,112,0,65,117,103,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,48,49,50,51,52,53,54,55,56,57,0,0,37,0,0,0,89,0,0,0,45,0,0,0,37,0,0,0,109,0,0,0,45,0,0,0,37,0,0,0,100,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,72,58,37,77,58,37,83,37,72,58,37,77,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,37,89,45,37,109,45,37,100,37,109,47,37,100,47,37,121,37,72,58,37,77,58,37,83,37,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,0,0,0,0,0,0,240,191,0,0,0,0,96,38,80,0,66,0,0,0,50,1,0,0,28,2,0,0,0,0,0,0,0,0,0,0,108,38,80,0,0,2,0,0,156,1,0,0,204,0,0,0,0,0,0,0,0,0,0,0,120,38,80,0,186,0,0,0,208,2,0,0,216,0,0,0,0,0,0,0,0,0,0,0,132,38,80,0,248,0,0,0,16,0,0,0,68,2,0,0,0,0,0,0,0,0,0,0,144,38,80,0,248,0,0,0,40,0,0,0,68,2,0,0,0,0,0,0,0,0,0,0,164,38,80,0,164,1,0,0,220,0,0,0,116,0,0,0,202,1,0,0,48,0,0,0,0,0,0,0,0,0,0,0,196,38,80,0,136,2,0,0,210,1,0,0,116,0,0,0,162,2,0,0,100,0,0,0,0,0,0,0,0,0,0,0,228,38,80,0,154,1,0,0,214,1,0,0,116,0,0,0,204,1,0,0,182,2,0,0,0,0,0,0,0,0,0,0,4,39,80,0,200,2,0,0,108,1,0,0,116,0,0,0,190,1,0,0,8,2,0,0,0,0,0,0,0,0,0,0,156,39,80,0,190,2,0,0,36,0,0,0,116,0,0,0,120,0,0,0,0,0,0,0,0,0,0,0,188,39,80,0,152,1,0,0,34,1,0,0,116,0,0,0,170,0,0,0,0,0,0,0,0,0,0,0,220,39,80,0,84,0,0,0,36,1,0,0,116,0,0,0,106,2,0,0,20,0,0,0,216,1,0,0,28,0,0,0,200,0,0,0,108,2,0,0,226,0,0,0,248,255,255,255,220,39,80,0,112,0,0,0,44,0,0,0,178,0,0,0,72,0,0,0,8,0,0,0,164,0,0,0,138,2,0,0,0,0,0,0,0,0,0,0,4,40,80,0,174,2,0,0,118,2,0,0,116,0,0,0,108,0,0,0,126,0,0,0,140,2,0,0,120,1,0,0,162,0,0,0,14,0,0,0,88,2,0,0,248,255,255,255,4,40,80,0,98,1,0,0,42,2,0,0,90,2,0,0,126,2,0,0,56,1,0,0,238,0,0,0,16,1,0,0,0,0,0,0,0,0,0,0,44,40,80,0,210,0,0,0,220,1,0,0,116,0,0,0,0,1,0,0,224,0,0,0,114,0,0,0,100,1,0,0,174,1,0,0,0,0,0,0,0,0,0,0,56,40,80,0,152,0,0,0,172,0,0,0,116,0,0,0,232,0,0,0,208,1,0,0,158,0,0,0,196,1,0,0,6,0,0,0,0,0,0,0,0,0,0,0,68,40,80,0,178,2,0,0,2,0,0,0,116,0,0,0,132,1,0,0,194,2,0,0,24,2,0,0,0,0,0,0,0,0,0,0,100,40,80,0,110,0,0,0,84,2,0,0,116,0,0,0,116,2,0,0,208,0,0,0,182,0,0,0,0,0,0,0,0,0,0,0,132,40,80,0,100,2,0,0,46,1,0,0,0,0,0,0,0,0,0,0,140,40,80,0,62,0,0,0,106,1,0,0,216,0,0,0,0,0,0,0,0,0,0,0,152,40,80,0,12,0,0,0,170,1,0,0,116,0,0,0,14,2,0,0,82,0,0,0,76,0,0,0,80,0,0,0,74,0,0,0,90,0,0,0,88,0,0,0,150,0,0,0,0,0,0,0,0,0,0,0,184,40,80,0,254,0,0,0,38,0,0,0,116,0,0,0,250,1,0,0,254,1,0,0,244,1,0,0,252,1,0,0,242,1,0,0,248,1,0,0,246,1,0,0,172,1,0,0,0,0,0,0,0,0,0,0,216,40,80,0,86,0,0,0,46,0,0,0,116,0,0,0,52,2,0,0,50,2,0,0,40,2,0,0,44,2,0,0,206,1,0,0,48,2,0,0,38,2,0,0,58,2,0,0,56,2,0,0,54,2,0,0,84,1,0,0,0,0,0,0,0,0,0,0,248,40,80,0,130,0,0,0,4,0,0,0,116,0,0,0,170,2,0,0,160,2,0,0,154,2,0,0,156,2,0,0,134,2,0,0,158,2,0,0,152,2,0,0,160,1,0,0,166,2,0,0,164,2,0,0,46,2,0,0,0,0,0,0,0,0,0,0,24,41,80,0,198,0,0,0,240,0,0,0,116,0,0,0,80,1,0,0,240,1,0,0,38,1,0,0,0,0,0,0,0,0,0,0,36,41,80,0,60,0,0,0,176,1,0,0,116,0,0,0,234,1,0,0,78,2,0,0,42,0,0,0,0,0,0,0,0,0,0,0,48,41,80,0,128,2,0,0,92,1,0,0,116,0,0,0,236,1,0,0,136,0,0,0,232,1,0,0,94,0,0,0,54,1,0,0,106,0,0,0,126,1,0,0,0,0,0,0,0,0,0,0,80,41,80,0,184,1,0,0,156,0,0,0,116,0,0,0,52,0,0,0,30,1,0,0,166,0,0,0,60,2,0,0,22,2,0,0,192,1,0,0,18,2,0,0,0,0,0,0,0,0,0,0,112,41,80,0,184,1,0,0,96,1,0,0,116,0,0,0,192,2,0,0,138,0,0,0,68,0,0,0,196,2,0,0,244,0,0,0,246,0,0,0,104,0,0,0,0,0,0,0,0,0,0,0,144,41,80,0,184,1,0,0,134,1,0,0,116,0,0,0,68,1,0,0,72,1,0,0,6,2,0,0,192,0,0,0,122,1,0,0,144,0,0,0,70,1,0,0,0,0,0,0,0,0,0,0,176,41,80,0,184,1,0,0,70,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,188,41,80,0,146,0,0,0,140,1,0,0,116,0,0,0,0,0,0,0,0,0,0,0,200,41,80,0,184,1,0,0,214,0,0,0,116,0,0,0,112,1,0,0,184,0,0,0,66,1,0,0,186,2,0,0,188,0,0,0,10,2,0,0,224,1,0,0,56,0,0,0,118,0,0,0,94,2,0,0,18,1,0,0,190,0,0,0,0,0,0,0,0,0,0,0,232,41,80,0,206,2,0,0,78,0,0,0,116,0,0,0,22,0,0,0,50,0,0,0,86,1,0,0,86,2,0,0,140,0,0,0,90,1,0,0,158,1,0,0,148,1,0,0,0,0,0,0,0,0,0,0,24,42,80,0,176,0,0,0,110,2,0,0,144,1,0,0,16,2,0,0,58,1,0,0,80,2,0,0,70,2,0,0,0,0,0,0,0,0,0,0,36,42,80,0,184,1,0,0,222,0,0,0,116,0,0,0,68,1,0,0,72,1,0,0,6,2,0,0,192,0,0,0,122,1,0,0,144,0,0,0,70,1,0,0,0,0,0,0,0,0,0,0,48,42,80,0,184,1,0,0,168,2,0,0,116,0,0,0,68,1,0,0,72,1,0,0,6,2,0,0,192,0,0,0,122,1,0,0,144,0,0,0,70,1,0,0,0,0,0,0,0,0,0,0,60,42,80,0,76,1,0,0,144,2,0,0,194,0,0,0,130,1,0,0,250,0,0,0,200,1,0,0,226,1,0,0,32,2,0,0,64,2,0,0,148,0,0,0,132,0,0,0,124,0,0,0,202,2,0,0,218,1,0,0,0,0,0,0,0,0,0,0,68,42,80,0,18,0,0,0,52,1,0,0,222,1,0,0,130,2,0,0,124,2,0,0,40,1,0,0,2,1,0,0,212,1,0,0,82,1,0,0,32,0,0,0,58,0,0,0,146,2,0,0,62,1,0,0,154,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,116,42,80,0,102,0,0,0,74,2,0,0,252,255,255,255,252,255,255,255,116,42,80,0,116,1,0,0,74,1,0,0,0,0,0,0,4,0,0,0,0,0,0,0,140,42,80,0,102,2,0,0,148,2,0,0,252,255,255,255,252,255,255,255,140,42,80,0,32,1,0,0,12,2,0,0,0,0,0,0,8,0,0,0,0,0,0,0,164,42,80,0,228,0,0,0,210,2,0,0,248,255,255,255,248,255,255,255,164,42,80,0,186,1,0,0,142,2,0,0,0,0,0,0,8,0,0,0,0,0,0,0,188,42,80,0,28,1,0,0,36,2,0,0,248,255,255,255,248,255,255,255,188,42,80,0,102,1,0,0,128,0,0,0,0,0,0,0,0,0,0,0,212,42,80,0,26,2,0,0,188,1,0,0,216,0,0,0,0,0,0,0,0,0,0,0,244,42,80,0,180,2,0,0,122,2,0,0,34,0,0,0,130,1,0,0,250,0,0,0,200,1,0,0,22,1,0,0,32,2,0,0,64,2,0,0,148,0,0,0,132,0,0,0,124,0,0,0,202,2,0,0,150,2,0,0,0,0,0,0,0,0,0,0,0,43,80,0,136,1,0,0,182,1,0,0,42,1,0,0,130,2,0,0,124,2,0,0,40,1,0,0,228,1,0,0,212,1,0,0,82,1,0,0,32,0,0,0,58,0,0,0,146,2,0,0,62,1,0,0,174,0,0,0,0,0,0,0,0,0,0,0,44,43,80,0,112,2,0,0,114,1,0,0,116,0,0,0,94,1,0,0,96,2,0,0,118,1,0,0,188,2,0,0,54,0,0,0,12,1,0,0,10,1,0,0,212,0,0,0,88,1,0,0,0,0,0,0,0,0,0,0,76,43,80,0,24,1,0,0,142,0,0,0,116,0,0,0,76,2,0,0,10,0,0,0,30,2,0,0,114,2,0,0,132,2,0,0,234,0,0,0,82,2,0,0,178,1,0,0,134,0,0,0,0,0,0,0,0,0,0,0,108,43,80,0,120,2,0,0,48,1,0,0,116,0,0,0,92,0,0,0,44,1,0,0,150,1,0,0,138,1,0,0,198,2,0,0,180,1,0,0,4,2,0,0,198,1,0,0,26,1,0,0,0,0,0,0,0,0,0,0,140,43,80,0,206,0,0,0,168,1,0,0,116,0,0,0,34,2,0,0,62,2,0,0,6,1,0,0,92,2,0,0,242,0,0,0,196,0,0,0,146,1,0,0,72,2,0,0,66,2,0,0,0,0,0,0,0,0,0,0,196,43,80,0,230,0,0,0,180,0,0,0,96,0,0,0,130,1,0,0,250,0,0,0,200,1,0,0,226,1,0,0,32,2,0,0,64,2,0,0,104,1,0,0,194,1,0,0,168,0,0,0,202,2,0,0,218,1,0,0,0,0,0,0,0,0,0,0,208,43,80,0,26,0,0,0,104,2,0,0,238,1,0,0,130,2,0,0,124,2,0,0,40,1,0,0,2,1,0,0,212,1,0,0,82,1,0,0,20,1,0,0,122,0,0,0,30,0,0,0,62,1,0,0,154,0,0,0,0,0,0,0,0,0,0,0,220,43,80,0,184,2,0,0,2,2,0,0,160,0,0,0,128,1,0,0,202,0,0,0,64,0,0,0,98,2,0,0,14,1,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,83,116,56,98,97,100,95,99,97,115,116,0,83,116,49,51,114,117,110,116,105,109,101,95,101,114,114,111,114,0,0,0,83,116,49,50,108,101,110,103,116,104,95,101,114,114,111,114,0,0,0,0,83,116,49,49,108,111,103,105,99,95,101,114,114,111,114,0,78,83,116,51,95,95,49,57,116,105,109,101,95,98,97,115,101,69,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,69,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,55,102,97,105,108,117,114,101,69,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,119,69,69,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,99,69,69,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,119,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,99,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,115,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,105,99,49,48,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,102,97,99,101,116,69,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,95,95,105,109,112,69,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,119,69,69,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,99,69,69,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,119,69,69,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,99,69,69,0,0,0,78,83,116,51,95,95,49,49,57,95,95,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,69,0,0,0,78,83,116,51,95,95,49,49,55,95,95,119,105,100,101,110,95,102,114,111,109,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,78,83,116,51,95,95,49,49,54,95,95,110,97,114,114,111,119,95,116,111,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,52,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,112,117,116,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,103,101,116,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,51,109,101,115,115,97,103,101,115,95,98,97,115,101,69,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,50,115,121,115,116,101,109,95,101,114,114,111,114,69,0,0,78,83,116,51,95,95,49,49,50,99,111,100,101,99,118,116,95,98,97,115,101,69,0,0,78,83,116,51,95,95,49,49,50,95,95,100,111,95,109,101,115,115,97,103,101,69,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,49,69,69,69,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,48,69,69,69,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,49,69,69,69,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,48,69,69,69,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,99,116,121,112,101,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,116,105,109,101,95,112,117,116,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,119,69,69,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,99,69,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,104,27,80,0,0,0,0,0,120,27,80,0,0,0,0,0,0,0,0,0,136,27,80,0,0,0,0,0,0,0,0,0,148,27,80,0,0,0,0,0,0,0,0,0,168,27,80,0,144,38,80,0,0,0,0,0,188,27,80,0,0,0,0,0,0,0,0,0,204,27,80,0,68,27,80,0,224,27,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,12,43,80,0,0,0,0,0,68,27,80,0,40,28,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,20,43,80,0,0,0,0,0,68,27,80,0,112,28,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,28,43,80,0,0,0,0,0,68,27,80,0,184,28,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,36,43,80,0,0,0,0,0,0,0,0,0,0,29,80,0,132,40,80,0,0,0,0,0,44,29,80,0,132,40,80,0,68,27,80,0,88,29,80,0,0,0,0,0,1,0,0,0,92,42,80,0,0,0,0,0,68,27,80,0,112,29,80,0,0,0,0,0,1,0,0,0,92,42,80,0,0,0,0,0,68,27,80,0,136,29,80,0,0,0,0,0,1,0,0,0,100,42,80,0,0,0,0,0,68,27,80,0,160,29,80,0,0,0,0,0,1,0,0,0,100,42,80,0,0,0,0,0,68,27,80,0,184,29,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,188,43,80,0,0,8,0,0,68,27,80,0,0,30,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,188,43,80,0,0,8,0,0,68,27,80,0,72,30,80,0,0,0,0,0,3,0,0,0,176,41,80,0,2,0,0,0,156,38,80,0,2,0,0,0,8,42,80,0].concat([0,8,0,0,68,27,80,0,144,30,80,0,0,0,0,0,3,0,0,0,176,41,80,0,2,0,0,0,156,38,80,0,2,0,0,0,16,42,80,0,0,8,0,0,0,0,0,0,216,30,80,0,176,41,80,0,0,0,0,0,240,30,80,0,176,41,80,0,68,27,80,0,8,31,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,108,42,80,0,2,0,0,0,68,27,80,0,32,31,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,108,42,80,0,2,0,0,0,0,0,0,0,56,31,80,0,0,0,0,0,76,31,80,0,212,42,80,0,68,27,80,0,104,31,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,60,39,80,0,0,0,0,0,68,27,80,0,172,31,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,84,39,80,0,0,0,0,0,68,27,80,0,240,31,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,108,39,80,0,0,0,0,0,68,27,80,0,52,32,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,132,39,80,0,0,0,0,0,0,0,0,0,120,32,80,0,176,41,80,0,0,0,0,0,140,32,80,0,176,41,80,0,68,27,80,0,160,32,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,224,42,80,0,2,0,0,0,68,27,80,0,196,32,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,224,42,80,0,2,0,0,0,68,27,80,0,232,32,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,224,42,80,0,2,0,0,0,68,27,80,0,12,33,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,224,42,80,0,2,0,0,0,0,0,0,0,48,33,80,0,84,42,80,0,0,0,0,0,72,33,80,0,176,41,80,0,68,27,80,0,96,33,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,180,43,80,0,2,0,0,0,68,27,80,0,116,33,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,180,43,80,0,2,0,0,0,0,0,0,0,136,33,80,0,0,0,0,0,172,33,80,0,0,0,0,0,208,33,80,0,232,42,80,0,0,0,0,0,240,33,80,0,144,41,80,0,0,0,0,0,20,34,80,0,144,41,80,0,0,0,0,0,56,34,80,0,0,0,0,0,108,34,80,0,0,0,0,0,160,34,80,0,0,0,0,0,188,34,80,0,0,0,0,0,216,34,80,0,0,0,0,0,244,34,80,0,0,0,0,0,16,35,80,0,68,27,80,0,40,35,80,0,0,0,0,0,1,0,0,0,36,39,80,0,3,244,255,255,68,27,80,0,88,35,80,0,0,0,0,0,1,0,0,0,48,39,80,0,3,244,255,255,68,27,80,0,136,35,80,0,0,0,0,0,1,0,0,0,36,39,80,0,3,244,255,255,68,27,80,0,184,35,80,0,0,0,0,0,1,0,0,0,48,39,80,0,3,244,255,255,0,0,0,0,232,35,80,0,120,38,80,0,0,0,0,0,0,36,80,0,0,0,0,0,24,36,80,0,76,42,80,0,0,0,0,0,48,36,80,0,60,42,80,0,0,0,0,0,76,36,80,0,68,42,80,0,0,0,0,0,104,36,80,0,0,0,0,0,132,36,80,0,0,0,0,0,160,36,80,0,0,0,0,0,188,36,80,0,68,27,80,0,216,36,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,172,43,80,0,2,0,0,0,68,27,80,0,244,36,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,172,43,80,0,2,0,0,0,68,27,80,0,16,37,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,172,43,80,0,2,0,0,0,68,27,80,0,44,37,80,0,0,0,0,0,2,0,0,0,176,41,80,0,2,0,0,0,172,43,80,0,2,0,0,0,0,0,0,0,72,37,80,0,0,0,0,0,96,37,80,0,0,0,0,0,120,37,80,0,0,0,0,0,144,37,80,0,60,42,80,0,0,0,0,0,168,37,80,0,68,42,80,0,0,0,0,0,192,37,80,0,244,43,80,0,0,0,0,0,232,37,80,0,244,43,80,0,0,0,0,0,16,38,80,0,0,44,80,0,0,0,0,0,52,38,80,0,88,38,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,65,66,67,68,69,70,120,88,43,45,112,80,105,73,110,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0,,,,,0,0,0,0])
, "i8", ALLOC_NONE, TOTAL_STACK)
function runPostSets() {
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(8))>>2)]=(696);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(12))>>2)]=(334);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(16))>>2)]=(160);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(20))>>2)]=(384);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(24))>>2)]=(202);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(28))>>2)]=(98);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(32))>>2)]=(236);
HEAP32[(((__ZTVN10__cxxabiv120__si_class_type_infoE)+(36))>>2)]=(264);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(8))>>2)]=(696);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(12))>>2)]=(688);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(16))>>2)]=(160);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(20))>>2)]=(384);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(24))>>2)]=(202);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(28))>>2)]=(532);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(32))>>2)]=(260);
HEAP32[(((__ZTVN10__cxxabiv117__class_type_infoE)+(36))>>2)]=(398);
HEAP32[((5252696)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5252704)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5252712)>>2)]=__ZTISt9exception;
HEAP32[((5252716)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5252724)>>2)]=__ZTISt9exception;
HEAP32[((5252728)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5252736)>>2)]=__ZTISt9exception;
HEAP32[((5252740)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5252752)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5252760)>>2)]=__ZTISt9exception;
HEAP32[((5252764)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5252900)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5252912)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253164)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253176)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253252)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253260)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253400)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253412)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253552)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253564)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253640)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253648)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253656)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253668)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253680)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253692)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253700)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253708)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253716)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253724)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253732)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253740)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253844)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253856)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253864)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253876)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253888)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5253900)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253908)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253916)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5253924)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5254060)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5254068)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5254076)>>2)]=(((__ZTVN10__cxxabiv117__class_type_infoE+8)|0));
HEAP32[((5254084)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5254096)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5254108)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5254120)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5254132)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
HEAP32[((5254144)>>2)]=(((__ZTVN10__cxxabiv120__si_class_type_infoE+8)|0));
}
if (!awaitingMemoryInitializer) runPostSets();
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
  function ___cxa_guard_acquire(variable) {
      if (!HEAP8[(variable)]) { // ignore SAFE_HEAP stuff because llvm mixes i64 and i8 here
        HEAP8[(variable)]=1;
        return 1;
      }
      return 0;
    }
  function ___cxa_guard_abort() {}
  function ___cxa_guard_release() {}
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
  var ERRNO_CODES={E2BIG:7,EACCES:13,EADDRINUSE:98,EADDRNOTAVAIL:99,EAFNOSUPPORT:97,EAGAIN:11,EALREADY:114,EBADF:9,EBADMSG:74,EBUSY:16,ECANCELED:125,ECHILD:10,ECONNABORTED:103,ECONNREFUSED:111,ECONNRESET:104,EDEADLK:35,EDESTADDRREQ:89,EDOM:33,EDQUOT:122,EEXIST:17,EFAULT:14,EFBIG:27,EHOSTUNREACH:113,EIDRM:43,EILSEQ:84,EINPROGRESS:115,EINTR:4,EINVAL:22,EIO:5,EISCONN:106,EISDIR:21,ELOOP:40,EMFILE:24,EMLINK:31,EMSGSIZE:90,EMULTIHOP:72,ENAMETOOLONG:36,ENETDOWN:100,ENETRESET:102,ENETUNREACH:101,ENFILE:23,ENOBUFS:105,ENODATA:61,ENODEV:19,ENOENT:2,ENOEXEC:8,ENOLCK:37,ENOLINK:67,ENOMEM:12,ENOMSG:42,ENOPROTOOPT:92,ENOSPC:28,ENOSR:63,ENOSTR:60,ENOSYS:38,ENOTCONN:107,ENOTDIR:20,ENOTEMPTY:39,ENOTRECOVERABLE:131,ENOTSOCK:88,ENOTSUP:95,ENOTTY:25,ENXIO:6,EOVERFLOW:75,EOWNERDEAD:130,EPERM:1,EPIPE:32,EPROTO:71,EPROTONOSUPPORT:93,EPROTOTYPE:91,ERANGE:34,EROFS:30,ESPIPE:29,ESRCH:3,ESTALE:116,ETIME:62,ETIMEDOUT:110,ETXTBSY:26,EWOULDBLOCK:11,EXDEV:18};
  function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      if (!___setErrNo.ret) ___setErrNo.ret = allocate([0], 'i32', ALLOC_STATIC);
      HEAP32[((___setErrNo.ret)>>2)]=value
      return value;
    }
  var _stdin=allocate(1, "i32*", ALLOC_STACK);
  var _stdout=allocate(1, "i32*", ALLOC_STACK);
  var _stderr=allocate(1, "i32*", ALLOC_STACK);
  var __impure_ptr=allocate(1, "i32*", ALLOC_STACK);var FS={currentPath:"/",nextInode:2,streams:[null],ignorePermissions:true,joinPath:function (parts, forceRelative) {
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
        assert(Math.max(_stdin, _stdout, _stderr) < 128); // make sure these are low, we flatten arrays with these
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
          'void*', ALLOC_STATIC) ], 'void*', ALLOC_NONE, __impure_ptr);
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
      return ___setErrNo.ret;
    }var ___errno=___errno_location;
  Module["_strcpy"] = _strcpy;
  var ERRNO_MESSAGES={1:"Operation not permitted",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"Input/output error",6:"No such device or address",8:"Exec format error",9:"Bad file descriptor",10:"No child processes",11:"Resource temporarily unavailable",12:"Cannot allocate memory",13:"Permission denied",14:"Bad address",16:"Device or resource busy",17:"File exists",18:"Invalid cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Inappropriate ioctl for device",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read-only file system",31:"Too many links",32:"Broken pipe",33:"Numerical argument out of domain",34:"Numerical result out of range",35:"Resource deadlock avoided",36:"File name too long",37:"No locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many levels of symbolic links",42:"No message of desired type",43:"Identifier removed",60:"Device not a stream",61:"No data available",62:"Timer expired",63:"Out of streams resources",67:"Link has been severed",71:"Protocol error",72:"Multihop attempted",74:"Bad message",75:"Value too large for defined data type",84:"Invalid or incomplete multibyte or wide character",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Protocol not supported",95:"Operation not supported",97:"Address family not supported by protocol",98:"Address already in use",99:"Cannot assign requested address",100:"Network is down",101:"Network is unreachable",102:"Network dropped connection on reset",103:"Software caused connection abort",104:"Connection reset by peer",105:"No buffer space available",106:"Transport endpoint is already connected",107:"Transport endpoint is not connected",110:"Connection timed out",111:"Connection refused",113:"No route to host",114:"Operation already in progress",115:"Operation now in progress",116:"Stale NFS file handle",122:"Disk quota exceeded",125:"Operation canceled",130:"Owner died",131:"State not recoverable"};function _strerror_r(errnum, strerrbuf, buflen) {
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
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Runtime.getNativeFieldSize(type);
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
              var arg = getNextArg('i8*') || nullString;
              var argLength = _strlen(arg);
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              for (var i = 0; i < argLength; i++) {
                ret.push(HEAPU8[((arg++)|0)]);
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
  function _wmemmove() { throw 'wmemmove not implemented' }
  function _wmemset() { throw 'wmemset not implemented' }
  function _wmemcpy() { throw 'wmemcpy not implemented' }
  function _wcslen() { throw 'wcslen not implemented' }
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
          argIndex += Runtime.getNativeFieldSize('void*');
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
        // TODO: Support strings like "%5c" etc.
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'c') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getNativeFieldSize('void*');
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
          argIndex += Runtime.getNativeFieldSize('void*');
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
                (HEAPF64[(tempDoublePtr)>>3]=parseFloat(text),HEAP32[((argPtr)>>2)]=((HEAP32[((tempDoublePtr)>>2)])|0),HEAP32[(((argPtr)+(4))>>2)]=((HEAP32[(((tempDoublePtr)+(4))>>2)])|0))
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
  function _mbsrtowcs() { throw 'mbsrtowcs not implemented' }
  function _mbrlen() { throw 'mbrlen not implemented' }
  function ___locale_mb_cur_max() { throw '__locale_mb_cur_max not implemented' }
  function _mbtowc(pwc, pmb, maxx) {
      // XXX doesn't really handle multibyte at all
      if (!pmb) return 0;
      maxx = Math.min(85, maxx);
      var i;
      for (i = 0; i < maxx; i++) {
        var curr = HEAP8[(pmb)];
        if (pwc) {
          HEAP8[(pwc)]=curr;
          HEAP8[(((pwc)+(1))|0)]=0;
          pwc += 2;
        }
        pmb++;
        if (!curr) break;
      }
      return i;
    }
  function _mbrtowc() { throw 'mbrtowc not implemented' }
  function _mbsnrtowcs() { throw 'mbsnrtowcs not implemented' }
  function _wcrtomb(s, wc, ps) {
      // XXX doesn't really handle multibyte at all
      if (s) {
        HEAP8[(s)]=wc;
      }
      return 1;
    }
  function _wcsnrtombs() { throw 'wcsnrtombs not implemented' }
  function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }function _asprintf(s, format, varargs) {
      return _sprintf(-s, format, varargs);
    }var _vasprintf=_asprintf;
  function _llvm_va_end() {}
  var _vsnprintf=_snprintf;
  var _vsprintf=_sprintf;
  var _vsscanf=_sscanf;
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
      // We need to make sure no one else allocates unfreeable memory!
      // We must control this entirely. So we don't even need to do
      // unfreeable allocations - the HEAP is ours, from STATICTOP up.
      // TODO: We could in theory slice off the top of the HEAP when
      //       sbrk gets a negative increment in |bytes|...
      var self = _sbrk;
      if (!self.called) {
        STATICTOP = alignMemoryPage(STATICTOP); // make sure we start out aligned
        self.called = true;
        _sbrk.DYNAMIC_START = STATICTOP;
      }
      var ret = STATICTOP;
      if (bytes != 0) Runtime.staticAlloc(bytes);
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
___setErrNo(0);
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function(func) { Browser.requestAnimationFrame(func) };
  Module["pauseMainLoop"] = function() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function() { Browser.mainLoop.resume() };
 var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STACK);
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_STACK);
var Math_min = Math.min;
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module.dynCall_iiii(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viii(index,a1,a2,a3) {
  try {
    Module.dynCall_viii(index,a1,a2,a3);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module.dynCall_viiiii(index,a1,a2,a3,a4,a5);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_vi(index,a1) {
  try {
    Module.dynCall_vi(index,a1);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_vii(index,a1,a2) {
  try {
    Module.dynCall_vii(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    Module.dynCall_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_ii(index,a1) {
  try {
    return Module.dynCall_ii(index,a1);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiiif(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module.dynCall_viiiiif(index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module.dynCall_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    Module.dynCall_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_v(index) {
  try {
    Module.dynCall_v(index);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    return Module.dynCall_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module.dynCall_iiiii(index,a1,a2,a3,a4);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiiiif(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module.dynCall_viiiiiif(index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module.dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module.dynCall_iii(index,a1,a2);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module.dynCall_iiiiii(index,a1,a2,a3,a4,a5);
  } catch(e) {
    asm.setThrew(1);
  }
}
function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module.dynCall_viiii(index,a1,a2,a3,a4);
  } catch(e) {
    asm.setThrew(1);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env._stdin|0;var p=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var q=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var r=env._stderr|0;var s=env._stdout|0;var t=env.__ZTISt9exception|0;var u=env.___dso_handle|0;var v=+env.NaN;var w=+env.Infinity;var x=0;var y=0;var z=0,A=0,B=0,C=0,D=0.0,E=0,F=0,G=0,H=0.0;var I=0;var J=0;var K=0;var L=0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=0;var S=global.Math.floor;var T=global.Math.abs;var U=global.Math.sqrt;var V=global.Math.pow;var W=global.Math.cos;var X=global.Math.sin;var Y=global.Math.tan;var Z=global.Math.acos;var _=global.Math.asin;var $=global.Math.atan;var aa=global.Math.atan2;var ab=global.Math.exp;var ac=global.Math.log;var ad=global.Math.ceil;var ae=global.Math.imul;var af=env.abort;var ag=env.assert;var ah=env.asmPrintInt;var ai=env.asmPrintFloat;var aj=env.copyTempDouble;var ak=env.copyTempFloat;var al=env.min;var am=env.invoke_iiii;var an=env.invoke_viii;var ao=env.invoke_viiiii;var ap=env.invoke_vi;var aq=env.invoke_vii;var ar=env.invoke_viiiiiiiii;var as=env.invoke_ii;var at=env.invoke_viiiiif;var au=env.invoke_viiiiiii;var av=env.invoke_viiiiiiii;var aw=env.invoke_v;var ax=env.invoke_iiiiiiiii;var ay=env.invoke_iiiii;var az=env.invoke_viiiiiif;var aA=env.invoke_viiiiii;var aB=env.invoke_iii;var aC=env.invoke_iiiiii;var aD=env.invoke_viiii;var aE=env._llvm_lifetime_end;var aF=env.__scanString;var aG=env._pthread_mutex_lock;var aH=env._mbrlen;var aI=env.___cxa_end_catch;var aJ=env._strtoull;var aK=env.__isFloat;var aL=env._fflush;var aM=env._wcsnrtombs;var aN=env._fwrite;var aO=env._llvm_eh_exception;var aP=env._llvm_umul_with_overflow_i32;var aQ=env._isspace;var aR=env._wmemset;var aS=env._read;var aT=env.___cxa_guard_abort;var aU=env._newlocale;var aV=env.___gxx_personality_v0;var aW=env._pthread_cond_wait;var aX=env.___cxa_rethrow;var aY=env.___resumeException;var aZ=env._llvm_va_end;var a_=env._mbtowc;var a$=env._snprintf;var a0=env._fgetc;var a1=env._atexit;var a2=env.___cxa_free_exception;var a3=env._wcrtomb;var a4=env.__Z8catcloseP8_nl_catd;var a5=env.___setErrNo;var a6=env._isxdigit;var a7=env._exit;var a8=env._sprintf;var a9=env.___ctype_b_loc;var ba=env._freelocale;var bb=env.__Z7catopenPKci;var bc=env._asprintf;var bd=env.___cxa_is_number_type;var be=env.___cxa_does_inherit;var bf=env.___cxa_guard_acquire;var bg=env.___locale_mb_cur_max;var bh=env.___cxa_begin_catch;var bi=env.__parseInt64;var bj=env.__ZSt18uncaught_exceptionv;var bk=env.__ZNSt9exceptionD2Ev;var bl=env.__exit;var bm=env._strftime;var bn=env._wmemmove;var bo=env.___cxa_throw;var bp=env._pread;var bq=env._wcslen;var br=env.___cxa_find_matching_catch;var bs=env.__formatString;var bt=env._pthread_cond_broadcast;var bu=env.__ZSt9terminatev;var bv=env._mbsrtowcs;var bw=env._pthread_mutex_unlock;var bx=env.___cxa_call_unexpected;var by=env._sbrk;var bz=env.___errno_location;var bA=env._strerror;var bB=env._llvm_lifetime_start;var bC=env.___cxa_guard_release;var bD=env._ungetc;var bE=env._uselocale;var bF=env._sscanf;var bG=env._sysconf;var bH=env._mbrtowc;var bI=env._abort;var bJ=env._isdigit;var bK=env._strtoll;var bL=env._wmemcpy;var bM=env.__reallyNegative;var bN=env.__Z7catgetsP8_nl_catdiiPKc;var bO=env._sqrt;var bP=env._write;var bQ=env.___cxa_allocate_exception;var bR=env.___ctype_toupper_loc;var bS=env.___ctype_tolower_loc;var bT=env._pwrite;var bU=env._strerror_r;var bV=env._time;var bW=env._mbsnrtowcs;
// EMSCRIPTEN_START_FUNCS
function cd(a){a=a|0;var b=0;b=i;i=i+a|0;i=i+3>>2<<2;return b|0}function ce(){return i|0}function cf(a){a=a|0;i=a}function cg(a){a=a|0;x=a}function ch(a){a=a|0;I=a}function ci(a){a=a|0;J=a}function cj(a){a=a|0;K=a}function ck(a){a=a|0;L=a}function cl(a){a=a|0;M=a}function cm(a){a=a|0;N=a}function cn(a){a=a|0;O=a}function co(a){a=a|0;P=a}function cp(a){a=a|0;Q=a}function cq(a){a=a|0;R=a}function cr(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0;if((a|0)==(b|0)){h=1;return h|0}i=(f|0)==(d|0)&(g|0)==(e|0);j=f-d|0;k=g-e|0;l=k;m=(k|0)<0?-1:0;k=j;n=(j|0)<0?-1:0;j=a;L4:while(1){a=c[j>>2]|0;do{if((a|0)<(d|0)){if((c[j+8>>2]|0)<=(d|0)){break}if((c[j+4>>2]|0)>=(e|0)){break}if((c[j+20>>2]|0)>(e|0)){h=0;o=24;break L4}}}while(0);do{if((a|0)<(f|0)){if((c[j+8>>2]|0)<=(f|0)){break}if((c[j+4>>2]|0)>=(g|0)){break}if((c[j+20>>2]|0)>(g|0)){h=0;o=25;break L4}}}while(0);a=j;p=c[a>>2]|0;q=c[a+4>>2]|0;a=j+24|0;r=c[a>>2]|0;s=c[a+4>>2]|0;do{if(!((r|0)==(p|0)&(s|0)==(q|0)|i)){a=r-p|0;t=s-q|0;u=a;v=(a|0)<0?-1:0;a=j5(u,v,l,m);w=I;x=t;y=(t|0)<0?-1:0;t=j5(x,y,k,n);z=I;A=jY(a,w,t,z);B=I;if((a|0)==(t|0)&(w|0)==(z|0)){break}z=d-p|0;w=e-q|0;t=w;a=(w|0)<0?-1:0;w=j5(t,a,u,v);v=I;u=z;C=(z|0)<0?-1:0;z=j5(x,y,u,C);y=jY(w,v,z,I);z=I;v=j5(t,a,k,n);a=I;t=j5(u,C,l,m);C=jY(v,a,t,I);t=I;a=0;if((B|0)<(a|0)|(B|0)==(a|0)&A>>>0<0>>>0){a=jY(0,0,A,B);v=I;u=jY(0,0,y,z);w=I;x=jY(0,0,C,t);D=I;E=x;F=w;G=u;H=v;J=a}else{D=t;E=C;F=z;G=y;H=B;J=A}A=jY(0,0,G,F);B=I;y=-1;z=-1;C=jY(0,0,E,D);t=I;if(((H|0)>(t|0)|(H|0)==(t|0)&J>>>0>C>>>0)&(((H|0)<=(B|0)&((H|0)<(B|0)|J>>>0<=A>>>0)|((F|0)>(y|0)|(F|0)==(y|0)&G>>>0>-1>>>0)|((D|0)>(z|0)|(D|0)==(z|0)&E>>>0>-1>>>0))^1)){h=0;o=26;break L4}}}while(0);q=j+8|0;p=c[q>>2]|0;s=c[q+4>>2]|0;q=j+16|0;r=c[q>>2]|0;z=c[q+4>>2]|0;do{if(!((r|0)==(p|0)&(z|0)==(s|0)|i)){q=r-p|0;y=z-s|0;A=q;B=(q|0)<0?-1:0;q=j5(A,B,l,m);C=I;t=y;a=(y|0)<0?-1:0;y=j5(t,a,k,n);v=I;u=jY(q,C,y,v);w=I;if((q|0)==(y|0)&(C|0)==(v|0)){break}v=d-p|0;C=e-s|0;y=C;q=(C|0)<0?-1:0;C=j5(y,q,A,B);B=I;A=v;x=(v|0)<0?-1:0;v=j5(t,a,A,x);a=jY(C,B,v,I);v=I;B=j5(y,q,k,n);q=I;y=j5(A,x,l,m);x=jY(B,q,y,I);y=I;q=0;if((w|0)<(q|0)|(w|0)==(q|0)&u>>>0<0>>>0){q=jY(0,0,u,w);B=I;A=jY(0,0,a,v);C=I;t=jY(0,0,x,y);K=I;L=t;M=C;N=A;O=B;P=q}else{K=y;L=x;M=v;N=a;O=w;P=u}u=jY(0,0,N,M);w=I;a=-1;v=-1;x=jY(0,0,L,K);y=I;if(((O|0)>(y|0)|(O|0)==(y|0)&P>>>0>x>>>0)&(((O|0)<=(w|0)&((O|0)<(w|0)|P>>>0<=u>>>0)|((M|0)>(a|0)|(M|0)==(a|0)&N>>>0>-1>>>0)|((K|0)>(v|0)|(K|0)==(v|0)&L>>>0>-1>>>0))^1)){h=0;o=27;break L4}}}while(0);s=j+32|0;if((s|0)==(b|0)){h=1;o=28;break}else{j=s}}if((o|0)==24){return h|0}else if((o|0)==25){return h|0}else if((o|0)==26){return h|0}else if((o|0)==27){return h|0}else if((o|0)==28){return h|0}return 0}function cs(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0;f=i;i=i+44|0;g=f|0;h=f+32|0;j=jJ(36)|0;k=j;jS(j|0,0,36);l=(a|0)>0;L37:do{if(l){m=j+16|0;n=j+20|0;o=j+12|0;p=1;q=0;r=0;s=0;L39:while(1){t=c[b+(q<<2)>>2]|0;u=q+2|0;v=c[b+((q|1)<<2)>>2]|0;do{if((r|0)==(s|0)){w=c[o>>2]|0;x=w;y=r-x>>3;z=y+1|0;if(z>>>0>536870911){break L39}A=s-x|0;do{if(A>>3>>>0>268435454){B=536870911;C=41}else{D=A>>2;E=D>>>0<z>>>0?z:D;if((E|0)==0){F=0;G=0;break}else{B=E;C=41;break}}}while(0);if((C|0)==41){C=0;F=jJ(B<<3)|0;G=B}A=F+(y<<3)|0;if((A|0)!=0){E=A;c[E>>2]=0|t;c[E+4>>2]=v|0}E=F+(z<<3)|0;A=r-x|0;D=F+(y-(A>>3)<<3)|0;H=w;jT(D|0,H|0,A|0);c[o>>2]=D;c[m>>2]=E;c[n>>2]=F+(G<<3)|0;if((w|0)==0){I=E;break}jM(H);I=E}else{if((r|0)==0){J=r}else{E=r;c[E>>2]=0|t;c[E+4>>2]=v|0;J=c[m>>2]|0}E=J+8|0;c[m>>2]=E;I=E}}while(0);if((p|0)>=(a|0)){break L37}p=p+1|0;q=u;r=I;s=c[n>>2]|0}hC(0)}}while(0);L61:do{if((d|0)>0){I=j+4|0;J=j+8|0;G=j;F=g;B=1;b=0;n=c[I>>2]|0;L63:while(1){s=b|2;r=c[e+((b|1)<<2)>>2]|0;c[g>>2]=c[e+(b<<2)>>2]|0;c[g+4>>2]=r;r=c[e+((b|3)<<2)>>2]|0;c[g+8>>2]=c[e+(s<<2)>>2]|0;c[g+12>>2]=r;r=c[e+(s+3<<2)>>2]|0;c[g+16>>2]=c[e+(s+2<<2)>>2]|0;c[g+20>>2]=r;r=c[e+((b|7)<<2)>>2]|0;c[g+24>>2]=c[e+((b|6)<<2)>>2]|0;c[g+28>>2]=r;r=b+8|0;do{if((n|0)==(c[J>>2]|0)){s=c[G>>2]|0;q=n-s|0;p=q>>5;m=p+1|0;if(m>>>0>134217727){break L63}do{if(p>>>0>67108862){K=134217727;C=56}else{o=q>>4;v=o>>>0<m>>>0?m:o;if((v|0)==0){L=0;M=0;break}else{K=v;C=56;break}}}while(0);if((C|0)==56){C=0;L=jJ(K<<5)|0;M=K}w=L+(p<<5)|0;if((w|0)!=0){jT(w|0,F|0,32)}w=L+(m<<5)|0;y=s;jT(L|0,y|0,q|0);c[G>>2]=L;c[I>>2]=w;c[J>>2]=L+(M<<5)|0;if((s|0)==0){N=w;break}jM(y);N=w}else{if((n|0)==0){O=0}else{jT(n|0,F|0,32);O=c[I>>2]|0}w=O+32|0;c[I>>2]=w;N=w}}while(0);if((B|0)>=(d|0)){break L61}B=B+1|0;b=r;n=N}hC(0)}}while(0);N=j+24|0;d=N;O=h|0;c[O>>2]=0;M=h+4|0;c[M>>2]=0;L=h+8|0;c[L>>2]=0;do{if((a|0)!=0){if((a|0)<0){hC(0)}K=((a-1|0)>>>5)+1|0;C=jJ(K<<2)|0;g=C;c[O>>2]=g;c[L>>2]=K;c[M>>2]=a;K=a>>>5;jS(C|0,0,K<<2|0);C=K<<5;if((C|0)==(a|0)){break}e=g+(K<<2)|0;c[e>>2]=c[e>>2]&(-1>>>(((32-a|0)+C|0)>>>0)^-1)}}while(0);ct(d,a,h);h=c[O>>2]|0;if((h|0)!=0){jM(h)}if(!l){i=f;return k|0}l=c[N>>2]|0;N=j+12|0;h=j;O=j+4|0;j=0;while(1){d=l+(j*12&-1)|0;M=j>>>5;L=(c[d>>2]|0)+(M<<2)|0;C=1<<(j&31);c[L>>2]=c[L>>2]|C;L=j+1|0;L101:do{if((L|0)<(a|0)){e=c[N>>2]|0;K=e+(j<<3)|0;g=c[h>>2]|0;n=c[O>>2]|0;b=C^-1;B=L;while(1){I=e+(B<<3)|0;F=cr(g,n,c[K>>2]|0,c[K+4>>2]|0,c[I>>2]|0,c[I+4>>2]|0)|0;I=(c[d>>2]|0)+(B>>>5<<2)|0;J=1<<(B&31);G=(c[l+(B*12&-1)>>2]|0)+(M<<2)|0;u=c[G>>2]|0;w=F?u|C:u&b;c[G>>2]=w;if((w&C|0)==0){P=c[I>>2]&(J^-1)}else{P=c[I>>2]|J}c[I>>2]=P;I=B+1|0;if((I|0)==(a|0)){break L101}else{B=I}}}}while(0);if((L|0)==(a|0)){break}else{j=L}}i=f;return k|0}function ct(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=a+8|0;f=c[e>>2]|0;g=a|0;h=c[g>>2]|0;i=h;if(((f-i|0)/12&-1)>>>0>=b>>>0){j=a+4|0;k=((c[j>>2]|0)-i|0)/12&-1;i=k>>>0<b>>>0;l=i?k:b;L114:do{if((l|0)!=0){m=l;n=h;while(1){cA(n,d);o=m-1|0;if((o|0)==0){break L114}else{m=o;n=n+12|0}}}}while(0);if(!i){i=(c[g>>2]|0)+(b*12&-1)|0;l=c[j>>2]|0;if((i|0)==(l|0)){return}else{p=l}while(1){l=p-12|0;c[j>>2]=l;n=c[l>>2]|0;if((n|0)==0){q=l}else{jM(n);q=c[j>>2]|0}if((i|0)==(q|0)){break}else{p=q}}return}q=d+4|0;p=d|0;i=b-k|0;k=c[j>>2]|0;L129:while(1){do{if((k|0)!=0){n=k|0;c[n>>2]=0;l=k+4|0;c[l>>2]=0;m=k+8|0;c[m>>2]=0;o=c[q>>2]|0;if((o|0)==0){break}if((o|0)<0){r=94;break L129}s=((o-1|0)>>>5)+1|0;o=jJ(s<<2)|0;t=o;c[n>>2]=t;c[l>>2]=0;c[m>>2]=s;s=c[p>>2]|0;m=c[q>>2]|0;n=m>>>5;u=n<<5;v=u|m&31;c[l>>2]=v;if((v|0)<=0){break}jU(o|0,s|0,n<<2|0);o=v-u|0;u=t+(n<<2)|0;if((o|0)<=0){break}t=-1>>>((32-o|0)>>>0);c[u>>2]=c[u>>2]&(t^-1)|c[s+(n<<2)>>2]&t}}while(0);t=(c[j>>2]|0)+12|0;c[j>>2]=t;n=i-1|0;if((n|0)==0){r=125;break}else{i=n;k=t}}if((r|0)==125){return}else if((r|0)==94){hC(0)}}if((h|0)==0){w=f}else{f=a+4|0;k=c[f>>2]|0;if((h|0)==(k|0)){x=h}else{i=k;while(1){k=i-12|0;c[f>>2]=k;j=c[k>>2]|0;if((j|0)==0){y=k}else{jM(j);y=c[f>>2]|0}if((h|0)==(y|0)){break}else{i=y}}x=c[g>>2]|0}jM(x);c[e>>2]=0;c[f>>2]=0;c[g>>2]=0;w=0}if(b>>>0>357913941){hC(0)}f=(w|0)/12&-1;do{if(f>>>0>178956969){z=357913941}else{w=f<<1;x=w>>>0<b>>>0?b:w;if(x>>>0<=357913941){z=x;break}hC(0)}}while(0);f=jJ(z*12&-1)|0;x=a+4|0;c[x>>2]=f;c[g>>2]=f;c[e>>2]=f+(z*12&-1)|0;z=d+4|0;e=d|0;d=b;b=f;L160:while(1){do{if((b|0)!=0){f=b|0;c[f>>2]=0;g=b+4|0;c[g>>2]=0;a=b+8|0;c[a>>2]=0;w=c[z>>2]|0;if((w|0)==0){break}if((w|0)<0){r=119;break L160}y=((w-1|0)>>>5)+1|0;w=jJ(y<<2)|0;i=w;c[f>>2]=i;c[g>>2]=0;c[a>>2]=y;y=c[e>>2]|0;a=c[z>>2]|0;f=a>>>5;h=f<<5;j=h|a&31;c[g>>2]=j;if((j|0)<=0){break}jU(w|0,y|0,f<<2|0);w=j-h|0;h=i+(f<<2)|0;if((w|0)<=0){break}i=-1>>>((32-w|0)>>>0);c[h>>2]=c[h>>2]&(i^-1)|c[y+(f<<2)>>2]&i}}while(0);i=(c[x>>2]|0)+12|0;c[x>>2]=i;f=d-1|0;if((f|0)==0){r=127;break}else{d=f;b=i}}if((r|0)==127){return}else if((r|0)==119){hC(0)}}function cu(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if((a|0)==0){return}b=a+24|0;d=c[b>>2]|0;if((d|0)!=0){e=a+28|0;f=c[e>>2]|0;if((d|0)==(f|0)){g=d}else{h=f;while(1){f=h-12|0;c[e>>2]=f;i=c[f>>2]|0;if((i|0)==0){j=f}else{jM(i);j=c[e>>2]|0}if((d|0)==(j|0)){break}else{h=j}}g=c[b>>2]|0}jM(g)}g=c[a+12>>2]|0;b=g;if((g|0)!=0){j=a+16|0;h=c[j>>2]|0;if((g|0)!=(h|0)){c[j>>2]=h+((((h-8|0)+(-b|0)|0)>>>3^-1)<<3)|0}jM(g)}g=c[a>>2]|0;b=g;if((g|0)!=0){h=a+4|0;j=c[h>>2]|0;if((g|0)!=(j|0)){c[h>>2]=j+((((j-32|0)+(-b|0)|0)>>>5^-1)<<5)|0}jM(g)}jM(a);return}function cv(a,b,d,e,f,g,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=j|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0.0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0.0,al=0,am=0,an=0,ao=0,ap=0.0,aq=0,ar=0,as=0.0,at=0.0,au=0.0,av=0,aw=0.0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aQ=0;l=i;i=i+164|0;m=l|0;n=l+16|0;o=l+20|0;p=l+36|0;q=l+52|0;r=l+68|0;s=l+80|0;t=l+100|0;u=l+120|0;v=l+140|0;w=l+152|0;x=r|0;c[x>>2]=0;y=r+4|0;c[y>>2]=0;z=r+8|0;c[z>>2]=0;A=c[a+12>>2]|0;B=c[a+16>>2]|0;if((A|0)==(B|0)){C=0;D=0;E=0}else{F=s+8|0;G=s+12|0;H=s+16|0;J=s;K=A;A=0;L=0;while(1){M=K;N=c[M>>2]|0;O=c[M+4>>2]|0;c[F>>2]=0;c[G>>2]=0;c[H>>2]=0;c[J>>2]=N;c[J+4>>2]=O;if((A|0)==(L|0)){cy(r,s)}else{if((A|0)!=0){M=A;c[M>>2]=N;c[M+4>>2]=O;c[A+8>>2]=0;c[A+12>>2]=0;c[A+16>>2]=0}c[y>>2]=(c[y>>2]|0)+20|0}O=c[F>>2]|0;M=O;if((O|0)!=0){N=c[G>>2]|0;if((O|0)!=(N|0)){c[G>>2]=N+(((((N-12|0)+(-M|0)|0)>>>0)/12>>>0^-1)*12&-1)|0}jM(O)}O=K+8|0;P=c[y>>2]|0;if((O|0)==(B|0)){break}K=O;A=P;L=c[z>>2]|0}C=P;D=c[x>>2]|0;E=c[z>>2]|0}c[t>>2]=b;c[t+4>>2]=d;d=t+8|0;c[d>>2]=0;b=t+12|0;c[b>>2]=0;c[t+16>>2]=0;c[u>>2]=e;c[u+4>>2]=f;f=u+8|0;c[f>>2]=0;e=u+12|0;c[e>>2]=0;c[u+16>>2]=0;P=(C-D|0)/20&-1;D=P+1|0;if((C|0)==(E|0)){cy(r,t);Q=c[y>>2]|0}else{if((C|0)!=0){E=t;t=C;L=c[E+4>>2]|0;c[t>>2]=c[E>>2]|0;c[t+4>>2]=L;c[C+8>>2]=0;c[C+12>>2]=0;c[C+16>>2]=0}C=(c[y>>2]|0)+20|0;c[y>>2]=C;Q=C}if((Q|0)==(c[z>>2]|0)){cy(r,u);R=c[y>>2]|0}else{L233:do{if((Q|0)!=0){r=u;z=Q;C=c[r+4>>2]|0;c[z>>2]=c[r>>2]|0;c[z+4>>2]=C;C=Q+8|0;c[C>>2]=0;z=Q+12|0;c[z>>2]=0;r=Q+16|0;c[r>>2]=0;L=c[e>>2]|0;t=c[f>>2]|0;if((L|0)==(t|0)){break}E=L-t|0;A=(E|0)/12&-1;if(A>>>0>357913941){hC(0)}K=jJ(E)|0;c[z>>2]=K;c[C>>2]=K;c[r>>2]=K+(A*12&-1)|0;A=t;t=K;while(1){if((t|0)==0){S=0}else{c[t>>2]=c[A>>2]|0;K=t+4|0;r=A+4|0;T=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);h[k>>3]=T,c[K>>2]=c[k>>2]|0,c[K+4>>2]=c[k+4>>2]|0;S=c[z>>2]|0}K=S+12|0;c[z>>2]=K;r=A+12|0;if((r|0)==(L|0)){break L233}else{A=r;t=K}}}}while(0);S=(c[y>>2]|0)+20|0;c[y>>2]=S;R=S}S=c[x>>2]|0;L248:do{if((R-S|0)>0){Q=a+24|0;u=v|0;t=v+4|0;A=a|0;L=a+4|0;z=0;K=R;r=S;while(1){L252:do{if((K-r|0)>0){if((z|0)<(P|0)){V=0;W=r}else{C=0;E=r;while(1){B=E+(z*20&-1)|0;G=E+(C*20&-1)|0;do{if(cr(c[A>>2]|0,c[L>>2]|0,c[B>>2]|0,c[B+4>>2]|0,c[G>>2]|0,c[G+4>>2]|0)|0){F=c[E+(z*20&-1)+4>>2]|0;s=c[E+(C*20&-1)+4>>2]|0;J=(c[E+(z*20&-1)>>2]|0)-(c[E+(C*20&-1)>>2]|0)|0;H=ae(J,J);J=F-s|0;s=jX(ae(J,J),0,H,0);T=+U(+(+(s>>>0)+ +(I|0)*4294967296.0));c[u>>2]=C;h[k>>3]=T,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;s=E+(z*20&-1)+12|0;H=c[s>>2]|0;if((H|0)==(c[E+(z*20&-1)+16>>2]|0)){cx(E+(z*20&-1)+8|0,v);break}if((H|0)==0){X=0}else{c[H>>2]=C;J=H+4|0;h[k>>3]=T,c[J>>2]=c[k>>2]|0,c[J+4>>2]=c[k+4>>2]|0;X=c[s>>2]|0}c[s>>2]=X+12|0}}while(0);G=C+1|0;B=c[y>>2]|0;s=c[x>>2]|0;if((G|0)<((B-s|0)/20&-1|0)){C=G;E=s}else{Y=B;Z=s;break L252}}}while(1){do{if((V|0)<(P|0)){if((c[(c[(c[Q>>2]|0)+(z*12&-1)>>2]|0)+(V>>>5<<2)>>2]&1<<(V&31)|0)==0){break}else{_=198;break}}else{E=W+(z*20&-1)|0;C=W+(V*20&-1)|0;if(cr(c[A>>2]|0,c[L>>2]|0,c[E>>2]|0,c[E+4>>2]|0,c[C>>2]|0,c[C+4>>2]|0)|0){_=198;break}else{break}}}while(0);do{if((_|0)==198){_=0;C=c[W+(z*20&-1)+4>>2]|0;E=c[W+(V*20&-1)+4>>2]|0;s=(c[W+(z*20&-1)>>2]|0)-(c[W+(V*20&-1)>>2]|0)|0;B=ae(s,s);s=C-E|0;E=jX(ae(s,s),0,B,0);T=+U(+(+(E>>>0)+ +(I|0)*4294967296.0));c[u>>2]=V;h[k>>3]=T,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;E=W+(z*20&-1)+12|0;B=c[E>>2]|0;if((B|0)==(c[W+(z*20&-1)+16>>2]|0)){cx(W+(z*20&-1)+8|0,v);break}if((B|0)==0){$=0}else{c[B>>2]=V;s=B+4|0;h[k>>3]=T,c[s>>2]=c[k>>2]|0,c[s+4>>2]=c[k+4>>2]|0;$=c[E>>2]|0}c[E>>2]=$+12|0}}while(0);E=V+1|0;s=c[y>>2]|0;B=c[x>>2]|0;if((E|0)<((s-B|0)/20&-1|0)){V=E;W=B}else{Y=s;Z=B;break L252}}}else{Y=K;Z=r}}while(0);B=z+1|0;if((B|0)<((Y-Z|0)/20&-1|0)){z=B;K=Y;r=Z}else{aa=Y;ab=Z;break L248}}}else{aa=R;ab=S}}while(0);S=m;m=p;R=q;c[n>>2]=D;Z=o|0;c[Z>>2]=0;Y=o+4|0;c[Y>>2]=0;W=o+8|0;c[W>>2]=0;c[p>>2]=P;c[p+4>>2]=-1;V=p+8|0;h[k>>3]=0.0,c[V>>2]=c[k>>2]|0,c[V+4>>2]=c[k+4>>2]|0;V=(aa-ab|0)/20&-1;do{if((aa|0)==(ab|0)){ac=0;ad=o|0;_=230;break}else{if(V>>>0>268435455){hC(0)}$=jJ(V<<4)|0;v=V;X=$;while(1){if((X|0)==0){af=0}else{jT(X|0,5247456,16);af=X}a=v-1|0;if((a|0)==0){break}else{v=a;X=af+16|0}}X=c[Y>>2]|0;v=o|0;if((X|0)==(c[W>>2]|0)){ac=$;ad=v;_=230;break}if((X|0)==0){ag=0}else{jT(X|0,m|0,16);ag=c[Y>>2]|0}X=ag+16|0;c[Y>>2]=X;ah=X;ai=$;aj=v;break}}while(0);if((_|0)==230){cC(ad,p);ah=c[Y>>2]|0;ai=ac;aj=ad}ad=c[Z>>2]|0;ac=ah-ad|0;do{if((ac|0)>16){p=((ac>>4)-2|0)/2&-1;ag=ah-16|0;m=ad+(p<<4)+8|0;T=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);m=ah-16+8|0;ak=(c[k>>2]=c[m>>2]|0,c[k+4>>2]=c[m+4>>2]|0,+h[k>>3]);if(T<=ak){al=ad;am=ah;break}m=ag;o=c[m>>2]|0;af=c[m+4>>2]|0;m=p;p=ag;while(1){an=ad+(m<<4)|0;jT(p|0,an|0,16);if((m|0)==0){ao=0;break}ag=(m-1|0)/2&-1;V=ad+(ag<<4)+8|0;if((c[k>>2]=c[V>>2]|0,c[k+4>>2]=c[V+4>>2]|0,+h[k>>3])>ak){m=ag;p=an}else{ao=m;break}}m=an;c[m>>2]=o;c[m+4>>2]=af;m=ad+(ao<<4)+8|0;h[k>>3]=ak,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;al=c[Z>>2]|0;am=c[Y>>2]|0}else{al=ad;am=ah}}while(0);L312:do{if((al|0)!=(am|0)){ah=q|0;ad=q+4|0;ao=q+8|0;an=al;ac=am;while(1){m=c[an>>2]|0;p=c[an+4>>2]|0;$=an+8|0;T=(c[k>>2]=c[$>>2]|0,c[k+4>>2]=c[$+4>>2]|0,+h[k>>3]);ag=ac-an|0;do{if((ag|0)>16){V=an;jT(S|0,V|0,16);ab=ac-16|0;jT(V|0,ab|0,16);jT(ab|0,S|0,16);ab=(ag>>4)-1|0;if((ab|0)<=1){break}do{if((ab|0)==2){_=244}else{V=an+40|0;ap=(c[k>>2]=c[V>>2]|0,c[k+4>>2]=c[V+4>>2]|0,+h[k>>3]);V=an+24|0;if(ap>(c[k>>2]=c[V>>2]|0,c[k+4>>2]=c[V+4>>2]|0,+h[k>>3])){_=244;break}else{aq=2;ar=an+32|0;break}}}while(0);if((_|0)==244){_=0;aq=1;ar=an+16|0}ap=(c[k>>2]=c[$>>2]|0,c[k+4>>2]=c[$+4>>2]|0,+h[k>>3]);V=ar+8|0;if(ap<=(c[k>>2]=c[V>>2]|0,c[k+4>>2]=c[V+4>>2]|0,+h[k>>3])){break}V=an;aa=c[V>>2]|0;v=c[V+4>>2]|0;V=aq;X=ar;a=an;while(1){jT(a|0,X|0,16);r=V<<1;K=r+2|0;if((K|0)>(ab|0)){break}z=r|1;do{if((K|0)==(ab|0)){r=an+(z<<4)+8|0;as=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);_=251;break}else{r=an+(K<<4)+8|0;at=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);r=an+(z<<4)+8|0;au=(c[k>>2]=c[r>>2]|0,c[k+4>>2]=c[r+4>>2]|0,+h[k>>3]);if(at>au){as=au;_=251;break}else{av=K;aw=at;break}}}while(0);if((_|0)==251){_=0;av=z;aw=as}if(ap>aw){V=av;a=X;X=an+(av<<4)|0}else{break}}a=X;c[a>>2]=aa;c[a+4>>2]=v;a=X+8|0;h[k>>3]=ap,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0}}while(0);$=(c[Y>>2]|0)-16|0;c[Y>>2]=$;ag=ai+(m<<4)|0;L336:do{if((c[ag>>2]|0)==-1){c[ag>>2]=m;c[ai+(m<<4)+4>>2]=p;a=ai+(m<<4)+8|0;h[k>>3]=T,c[a>>2]=c[k>>2]|0,c[a+4>>2]=c[k+4>>2]|0;a=c[x>>2]|0;V=c[a+(m*20&-1)+8>>2]|0;ab=c[a+(m*20&-1)+12>>2]|0;if((V|0)==(ab|0)){ax=$;break}else{ay=V;az=$}while(1){V=c[ay>>2]|0;a=ay+4|0;at=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);c[ah>>2]=V;c[ad>>2]=m;au=T+at;h[k>>3]=au,c[ao>>2]=c[k>>2]|0,c[ao+4>>2]=c[k+4>>2]|0;if((az|0)==(c[W>>2]|0)){cC(aj,q);aA=c[Y>>2]|0}else{if((az|0)==0){aB=0}else{jT(az|0,R|0,16);aB=c[Y>>2]|0}V=aB+16|0;c[Y>>2]=V;aA=V}V=c[Z>>2]|0;a=aA-V|0;do{if((a|0)>16){K=((a>>4)-2|0)/2&-1;r=aA-16|0;t=V+(K<<4)+8|0;au=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);t=aA-16+8|0;at=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);if(au<=at){aC=aA;break}t=r;u=c[t>>2]|0;L=c[t+4>>2]|0;t=K;K=r;while(1){aD=V+(t<<4)|0;jT(K|0,aD|0,16);if((t|0)==0){aE=0;break}r=(t-1|0)/2&-1;A=V+(r<<4)+8|0;if((c[k>>2]=c[A>>2]|0,c[k+4>>2]=c[A+4>>2]|0,+h[k>>3])>at){t=r;K=aD}else{aE=t;break}}t=aD;c[t>>2]=u;c[t+4>>2]=L;t=V+(aE<<4)+8|0;h[k>>3]=at,c[t>>2]=c[k>>2]|0,c[t+4>>2]=c[k+4>>2]|0;aC=c[Y>>2]|0}else{aC=aA}}while(0);V=ay+12|0;if((V|0)==(ab|0)){ax=aC;break L336}else{ay=V;az=aC}}}else{ax=$}}while(0);$=c[Z>>2]|0;if(($|0)==(ax|0)){break L312}else{an=$;ac=ax}}}}while(0);ax=w|0;c[ax>>2]=0;aC=w+4|0;c[aC>>2]=0;az=w+8|0;c[az>>2]=0;L358:do{if((c[ai+(D<<4)>>2]|0)!=-1){ay=D;aA=0;aE=0;while(1){if((aA|0)==(aE|0)){cB(w,n);aF=c[n>>2]|0}else{if((aA|0)==0){aG=0}else{c[aA>>2]=ay;aG=c[aC>>2]|0}c[aC>>2]=aG+4|0;aF=ay}aD=c[ai+(aF<<4)+4>>2]|0;c[n>>2]=aD;if((aD|0)==(P|0)){break}ay=aD;aA=c[aC>>2]|0;aE=c[az>>2]|0}aE=c[ax>>2]|0;aA=c[aC>>2]|0;if((aE|0)==(aA|0)){break}ay=aA-4|0;if(aE>>>0<ay>>>0){aH=aE;aI=ay}else{break}while(1){ay=c[aH>>2]|0;c[aH>>2]=c[aI>>2]|0;c[aI>>2]=ay;ay=aH+4|0;aE=aI-4|0;if(ay>>>0<aE>>>0){aH=ay;aI=aE}else{break L358}}}}while(0);if((ai|0)!=0){jM(ai)}ai=c[Z>>2]|0;Z=ai;if((ai|0)!=0){aI=c[Y>>2]|0;if((ai|0)!=(aI|0)){c[Y>>2]=aI+((((aI-16|0)+(-Z|0)|0)>>>4^-1)<<4)|0}jM(ai)}ai=c[ax>>2]|0;Z=c[aC>>2]|0;do{if((ai|0)==(Z|0)){aJ=0;aK=ai}else{aI=Z-ai|0;c[g>>2]=aI>>2;Y=aP(aI>>1|0,4)|0;aI=jK(I?-1:Y)|0;c[j>>2]=aI;Y=c[ax>>2]|0;aH=c[aC>>2]|0;if((Y|0)==(aH|0)){aJ=1;aK=Y;break}else{aL=Y;aM=0;aN=aI}while(1){aI=c[aL>>2]|0;c[aN+(aM<<2)>>2]=c[(c[x>>2]|0)+(aI*20&-1)>>2]|0;c[(c[j>>2]|0)+((aM|1)<<2)>>2]=c[(c[x>>2]|0)+(aI*20&-1)+4>>2]|0;aI=aL+4|0;if((aI|0)==(aH|0)){break}aL=aI;aM=aM+2|0;aN=c[j>>2]|0}aJ=1;aK=c[ax>>2]|0}}while(0);ax=aK;if((aK|0)!=0){j=c[aC>>2]|0;if((aK|0)!=(j|0)){c[aC>>2]=j+((((j-4|0)+(-ax|0)|0)>>>2^-1)<<2)|0}jM(aK)}aK=c[f>>2]|0;f=aK;if((aK|0)!=0){ax=c[e>>2]|0;if((aK|0)!=(ax|0)){c[e>>2]=ax+(((((ax-12|0)+(-f|0)|0)>>>0)/12>>>0^-1)*12&-1)|0}jM(aK)}aK=c[d>>2]|0;d=aK;if((aK|0)!=0){f=c[b>>2]|0;if((aK|0)!=(f|0)){c[b>>2]=f+(((((f-12|0)+(-d|0)|0)>>>0)/12>>>0^-1)*12&-1)|0}jM(aK)}aK=c[x>>2]|0;if((aK|0)==0){i=l;return aJ|0}d=c[y>>2]|0;if((aK|0)==(d|0)){aO=aK}else{f=d;while(1){d=f-20|0;c[y>>2]=d;b=c[f-20+8>>2]|0;ax=b;if((b|0)==0){aQ=d}else{d=f-20+12|0;e=c[d>>2]|0;if((b|0)!=(e|0)){c[d>>2]=e+(((((e-12|0)+(-ax|0)|0)>>>0)/12>>>0^-1)*12&-1)|0}jM(b);aQ=c[y>>2]|0}if((aK|0)==(aQ|0)){break}else{f=aQ}}aO=c[x>>2]|0}jM(aO);i=l;return aJ|0}function cw(a){a=a|0;if((a|0)==0){return}jN(a);return}function cx(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0.0,r=0,s=0,t=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=((c[d>>2]|0)-f|0)/12&-1;i=g+1|0;if(i>>>0>357913941){hC(0)}j=a+8|0;a=((c[j>>2]|0)-f|0)/12&-1;do{if(a>>>0>178956969){l=357913941;m=364}else{f=a<<1;n=f>>>0<i>>>0?i:f;if((n|0)==0){o=0;p=0;break}else{l=n;m=364;break}}}while(0);if((m|0)==364){o=jJ(l*12&-1)|0;p=l}l=o+(g*12&-1)|0;m=o+(p*12&-1)|0;if((l|0)!=0){c[l>>2]=c[b>>2]|0;p=o+(g*12&-1)+4|0;a=b+4|0;q=(c[k>>2]=c[a>>2]|0,c[k+4>>2]=c[a+4>>2]|0,+h[k>>3]);h[k>>3]=q,c[p>>2]=c[k>>2]|0,c[p+4>>2]=c[k+4>>2]|0}p=o+(i*12&-1)|0;i=c[e>>2]|0;a=c[d>>2]|0;if((a|0)==(i|0)){r=i;s=l}else{b=(g-1|0)-((((a-12|0)+(-i|0)|0)>>>0)/12>>>0)|0;g=a;a=l;while(1){l=a-12|0;n=g-12|0;if((l|0)!=0){c[l>>2]=c[n>>2]|0;f=a-12+4|0;t=g-12+4|0;q=(c[k>>2]=c[t>>2]|0,c[k+4>>2]=c[t+4>>2]|0,+h[k>>3]);h[k>>3]=q,c[f>>2]=c[k>>2]|0,c[f+4>>2]=c[k+4>>2]|0}if((n|0)==(i|0)){break}else{g=n;a=l}}r=c[e>>2]|0;s=o+(b*12&-1)|0}c[e>>2]=s;c[d>>2]=p;c[j>>2]=m;if((r|0)==0){return}jM(r);return}function cy(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=((c[d>>2]|0)-f|0)/20&-1;h=g+1|0;if(h>>>0>214748364){hC(0)}i=a+8|0;a=((c[i>>2]|0)-f|0)/20&-1;do{if(a>>>0>107374181){j=214748364;k=382}else{f=a<<1;l=f>>>0<h>>>0?h:f;if((l|0)==0){m=0;n=0;break}else{j=l;k=382;break}}}while(0);if((k|0)==382){m=jJ(j*20&-1)|0;n=j}j=m+(g*20&-1)|0;k=m+(n*20&-1)|0;if((j|0)!=0){n=b;a=j;l=c[n+4>>2]|0;c[a>>2]=c[n>>2]|0;c[a+4>>2]=l;cz(m+(g*20&-1)+8|0,b+8|0)}b=m+(h*20&-1)|0;h=c[e>>2]|0;m=c[d>>2]|0;L467:do{if((m|0)==(h|0)){c[e>>2]=j;c[d>>2]=b;c[i>>2]=k;o=h}else{g=m;l=j;while(1){p=l-20|0;a=g-20|0;if((p|0)!=0){n=a;f=p;q=c[n+4>>2]|0;c[f>>2]=c[n>>2]|0;c[f+4>>2]=q;cz(l-20+8|0,g-20+8|0)}if((a|0)==(h|0)){break}else{g=a;l=p}}l=c[e>>2]|0;g=c[d>>2]|0;c[e>>2]=p;c[d>>2]=b;c[i>>2]=k;if((l|0)==(g|0)){o=l;break}else{r=g}while(1){g=r-20|0;a=c[r-20+8>>2]|0;q=a;if((a|0)!=0){f=r-20+12|0;n=c[f>>2]|0;if((a|0)!=(n|0)){c[f>>2]=n+(((((n-12|0)+(-q|0)|0)>>>0)/12>>>0^-1)*12&-1)|0}jM(a)}if((l|0)==(g|0)){o=l;break L467}else{r=g}}}}while(0);if((o|0)==0){return}jM(o);return}function cz(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0.0;d=a|0;c[d>>2]=0;e=a+4|0;c[e>>2]=0;f=a+8|0;c[f>>2]=0;a=b+4|0;g=c[a>>2]|0;i=b|0;b=c[i>>2]|0;if((g|0)==(b|0)){return}j=g-b|0;b=(j|0)/12&-1;if(b>>>0>357913941){hC(0)}g=jJ(j)|0;c[e>>2]=g;c[d>>2]=g;c[f>>2]=g+(b*12&-1)|0;b=c[i>>2]|0;i=c[a>>2]|0;if((b|0)==(i|0)){return}else{l=b;m=g}while(1){if((m|0)==0){n=0}else{c[m>>2]=c[l>>2]|0;g=m+4|0;b=l+4|0;o=(c[k>>2]=c[b>>2]|0,c[k+4>>2]=c[b+4>>2]|0,+h[k>>3]);h[k>>3]=o,c[g>>2]=c[k>>2]|0,c[g+4>>2]=c[k+4>>2]|0;n=c[e>>2]|0}g=n+12|0;c[e>>2]=g;b=l+12|0;if((b|0)==(i|0)){break}else{l=b;m=g}}return}function cA(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;if((a|0)==(b|0)){return a|0}d=b+4|0;e=c[d>>2]|0;if((e|0)==0){f=0}else{g=a+8|0;h=a|0;i=c[h>>2]|0;do{if(e>>>0>c[g>>2]<<5>>>0){if((i|0)==0){j=e}else{jM(i);c[h>>2]=0;c[g>>2]=0;c[a+4>>2]=0;j=c[d>>2]|0}if((j|0)<0){hC(0)}else{k=((j-1|0)>>>5)+1|0;l=jJ(k<<2)|0;c[h>>2]=l;c[a+4>>2]=0;c[g>>2]=k;m=c[d>>2]|0;n=l;break}}else{m=e;n=i}}while(0);jU(n|0,c[b>>2]|0,((m-1|0)>>>5<<2)+4|0);f=c[d>>2]|0}c[a+4>>2]=f;return a|0}function cB(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=(c[d>>2]|0)-f>>2;h=g+1|0;if(h>>>0>1073741823){hC(0)}i=a+8|0;a=(c[i>>2]|0)-f|0;do{if(a>>2>>>0>536870910){j=1073741823;k=446}else{f=a>>1;l=f>>>0<h>>>0?h:f;if((l|0)==0){m=0;n=0;break}else{j=l;k=446;break}}}while(0);if((k|0)==446){m=jJ(j<<2)|0;n=j}j=m+(g<<2)|0;if((j|0)!=0){c[j>>2]=c[b>>2]|0}b=c[e>>2]|0;j=(c[d>>2]|0)-b|0;k=m+(g-(j>>2)<<2)|0;g=b;jT(k|0,g|0,j|0);c[e>>2]=k;c[d>>2]=m+(h<<2)|0;c[i>>2]=m+(n<<2)|0;if((b|0)==0){return}jM(g);return}function cC(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=(c[d>>2]|0)-f>>4;h=g+1|0;if(h>>>0>268435455){hC(0)}i=a+8|0;a=(c[i>>2]|0)-f|0;do{if(a>>4>>>0>134217726){j=268435455;k=458}else{f=a>>3;l=f>>>0<h>>>0?h:f;if((l|0)==0){m=0;n=0;break}else{j=l;k=458;break}}}while(0);if((k|0)==458){m=jJ(j<<4)|0;n=j}j=m+(g<<4)|0;if((j|0)!=0){jT(j|0,b|0,16)}b=c[e>>2]|0;j=(c[d>>2]|0)-b|0;k=m+(g-(j>>4)<<4)|0;g=b;jT(k|0,g|0,j|0);c[e>>2]=k;c[d>>2]=m+(h<<4)|0;c[i>>2]=m+(n<<4)|0;if((b|0)==0){return}jM(g);return}function cD(a){a=a|0;var b=0;c7(5254400,c[o>>2]|0,5254460);c[1313824]=5249284;c[1313826]=5249304;c[1313825]=0;c[1313832]=5254400;c[1313830]=0;c[1313831]=0;c[1313827]=4098;c[1313829]=0;c[1313828]=6;jS(5255336,0,40);a=c[hW()>>2]|0;c[1313833]=a;b=a+4|0;G=c[b>>2]|0,c[b>>2]=G+1,G;c[1313844]=0;c[1313845]=-1;c5(5254304,c[s>>2]|0,5254468);c[1313761]=5249196;c[1313762]=5249216;c[1313768]=5254304;c[1313766]=0;c[1313767]=0;c[1313763]=4098;c[1313765]=0;c[1313764]=6;jS(5255080,0,40);b=c[hW()>>2]|0;c[1313769]=b;a=b+4|0;G=c[a>>2]|0,c[a>>2]=G+1,G;c[1313780]=0;c[1313781]=-1;c5(5254352,c[r>>2]|0,5254476);c[1313803]=5249196;c[1313804]=5249216;c[1313810]=5254352;c[1313808]=0;c[1313809]=0;c[1313805]=4098;c[1313807]=0;c[1313806]=6;jS(5255248,0,40);a=c[hW()>>2]|0;c[1313811]=a;b=a+4|0;G=c[b>>2]|0,c[b>>2]=G+1,G;c[1313822]=0;c[1313823]=-1;b=c[5255212+((c[(c[1313803]|0)-12>>2]|0)+24|0)>>2]|0;c[1313782]=5249196;c[1313783]=5249216;c[1313789]=b;c[1313787]=(b|0)==0&1;c[1313788]=0;c[1313784]=4098;c[1313786]=0;c[1313785]=6;jS(5255164,0,40);b=c[hW()>>2]|0;c[1313790]=b;a=b+4|0;G=c[a>>2]|0,c[a>>2]=G+1,G;c[1313801]=0;c[1313802]=-1;c[5255296+((c[(c[1313824]|0)-12>>2]|0)+72|0)>>2]=5255044;a=5255212+((c[(c[1313803]|0)-12>>2]|0)+4|0)|0;c[a>>2]=c[a>>2]|8192;c[5255212+((c[(c[1313803]|0)-12>>2]|0)+72|0)>>2]=5255044;cR(5254252,c[o>>2]|0,5254484);c[1313739]=5249240;c[1313741]=5249260;c[1313740]=0;c[1313747]=5254252;c[1313745]=0;c[1313746]=0;c[1313742]=4098;c[1313744]=0;c[1313743]=6;jS(5254996,0,40);a=c[hW()>>2]|0;c[1313748]=a;b=a+4|0;G=c[b>>2]|0,c[b>>2]=G+1,G;c[1313759]=0;c[1313760]=-1;cP(5254156,c[s>>2]|0,5254492);c[1313672]=5249152;c[1313673]=5249172;c[1313679]=5254156;c[1313677]=0;c[1313678]=0;c[1313674]=4098;c[1313676]=0;c[1313675]=6;jS(5254724,0,40);b=c[hW()>>2]|0;c[1313680]=b;a=b+4|0;G=c[a>>2]|0,c[a>>2]=G+1,G;c[1313691]=0;c[1313692]=-1;cP(5254204,c[r>>2]|0,5254500);c[1313714]=5249152;c[1313715]=5249172;c[1313721]=5254204;c[1313719]=0;c[1313720]=0;c[1313716]=4098;c[1313718]=0;c[1313717]=6;jS(5254892,0,40);a=c[hW()>>2]|0;c[1313722]=a;b=a+4|0;G=c[b>>2]|0,c[b>>2]=G+1,G;c[1313733]=0;c[1313734]=-1;b=c[5254856+((c[(c[1313714]|0)-12>>2]|0)+24|0)>>2]|0;c[1313693]=5249152;c[1313694]=5249172;c[1313700]=b;c[1313698]=(b|0)==0&1;c[1313699]=0;c[1313695]=4098;c[1313697]=0;c[1313696]=6;jS(5254808,0,40);b=c[hW()>>2]|0;c[1313701]=b;a=b+4|0;G=c[a>>2]|0,c[a>>2]=G+1,G;c[1313712]=0;c[1313713]=-1;c[5254956+((c[(c[1313739]|0)-12>>2]|0)+72|0)>>2]=5254688;a=5254856+((c[(c[1313714]|0)-12>>2]|0)+4|0)|0;c[a>>2]=c[a>>2]|8192;c[5254856+((c[(c[1313714]|0)-12>>2]|0)+72|0)>>2]=5254688;return}function cE(a){a=a|0;var b=0;c[a>>2]=5249012;b=c[a+4>>2]|0;a=b+4|0;if(((G=c[a>>2]|0,c[a>>2]=G+ -1,G)|0)!=0){return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cF(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5249012;b=c[a+4>>2]|0;d=b+4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){e=a;jM(e);return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jM(e);return}function cG(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+12|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=cb[c[(c[a>>2]|0)+20>>2]&1023](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((aN(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=498;break}if((l|0)==2){m=-1;n=499;break}else if((l|0)!=1){n=496;break}}if((n|0)==498){i=b;return m|0}else if((n|0)==499){i=b;return m|0}else if((n|0)==496){m=((aL(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}return 0}function cH(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;e=i;i=i+20|0;f=e|0;g=e+8|0;h=e+12|0;j=e+16|0;k=(d|0)==-1;if(!k){l=g+4|0;m=b+24|0;n=b+20|0;c[n>>2]=g;o=b+28|0;c[o>>2]=l;c[g>>2]=d;c[m>>2]=l;L585:do{if((a[b+44|0]&1)<<24>>24==0){p=f|0;c[h>>2]=p;q=b+36|0;r=b+40|0;s=f+8|0;t=f;u=b+32|0;v=g;w=l;while(1){x=c[q>>2]|0;y=b6[c[(c[x>>2]|0)+12>>2]&1023](x,c[r>>2]|0,v,w,j,p,s,h)|0;z=c[n>>2]|0;if((c[j>>2]|0)==(z|0)){A=-1;B=518;break}if((y|0)==3){B=507;break}if(y>>>0>=2){A=-1;B=516;break}x=(c[h>>2]|0)-t|0;if((aN(p|0,1,x|0,c[u>>2]|0)|0)!=(x|0)){A=-1;B=517;break}if((y|0)!=1){break L585}y=c[j>>2]|0;x=c[m>>2]|0;c[n>>2]=y;c[o>>2]=x;C=y+(x-y>>2<<2)|0;c[m>>2]=C;v=y;w=C}if((B|0)==516){i=e;return A|0}else if((B|0)==517){i=e;return A|0}else if((B|0)==518){i=e;return A|0}else if((B|0)==507){if((aN(z|0,1,1,c[u>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}}else{if((aN(g|0,4,1,c[b+32>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}}while(0);c[m>>2]=0;c[n>>2]=0;c[o>>2]=0}A=k?0:d;i=e;return A|0}function cI(a){a=a|0;var b=0;c[a>>2]=5249012;b=c[a+4>>2]|0;a=b+4|0;if(((G=c[a>>2]|0,c[a>>2]=G+ -1,G)|0)!=0){return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cJ(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5249012;b=c[a+4>>2]|0;d=b+4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){e=a;jM(e);return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jM(e);return}function cK(a){a=a|0;return cN(a,0)|0}function cL(a){a=a|0;return cN(a,1)|0}function cM(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;e=i;i=i+20|0;f=e|0;g=e+8|0;h=e+12|0;if((d|0)==-1){j=-1;i=e;return j|0}c[h>>2]=d;k=c[b+36>>2]|0;l=f|0;m=b6[c[(c[k>>2]|0)+12>>2]&1023](k,c[b+40>>2]|0,h,h+4|0,e+16|0,l,f+8|0,g)|0;if((m|0)==3){a[l]=d&255;c[g>>2]=f+1|0}else if((m|0)==2|(m|0)==1){j=-1;i=e;return j|0}m=b+32|0;while(1){b=c[g>>2]|0;if(b>>>0<=l>>>0){j=d;n=542;break}f=b-1|0;c[g>>2]=f;if((bD(a[f]<<24>>24|0,c[m>>2]|0)|0)==-1){j=-1;n=541;break}}if((n|0)==541){i=e;return j|0}else if((n|0)==542){i=e;return j|0}return 0}function cN(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;e=i;i=i+20|0;f=e|0;g=e+8|0;h=e+12|0;j=e+16|0;k=c[b+44>>2]|0;l=(k|0)>1?k:1;L632:do{if((l|0)>0){k=b+32|0;m=0;while(1){n=a0(c[k>>2]|0)|0;if((n|0)==-1){o=-1;break}a[f+m|0]=n&255;n=m+1|0;if((n|0)<(l|0)){m=n}else{break L632}}i=e;return o|0}}while(0);L639:do{if((a[b+48|0]&1)<<24>>24==0){m=b+40|0;k=b+36|0;n=f|0;p=g+4|0;q=b+32|0;r=l;while(1){s=c[m>>2]|0;t=s;u=c[t>>2]|0;v=c[t+4>>2]|0;t=c[k>>2]|0;w=f+r|0;x=b6[c[(c[t>>2]|0)+16>>2]&1023](t,s,n,w,h,g,p,j)|0;if((x|0)==2){o=-1;y=564;break}else if((x|0)==3){y=554;break}else if((x|0)!=1){z=r;break L639}x=c[m>>2]|0;c[x>>2]=u;c[x+4>>2]=v;if((r|0)==8){o=-1;y=565;break}v=a0(c[q>>2]|0)|0;if((v|0)==-1){o=-1;y=566;break}a[w]=v&255;r=r+1|0}if((y|0)==564){i=e;return o|0}else if((y|0)==565){i=e;return o|0}else if((y|0)==566){i=e;return o|0}else if((y|0)==554){c[g>>2]=a[n]<<24>>24;z=r;break}}else{c[g>>2]=a[f|0]<<24>>24;z=l}}while(0);L653:do{if(!d){l=b+32|0;y=z;while(1){if((y|0)<=0){break L653}j=y-1|0;if((bD(a[f+j|0]<<24>>24|0,c[l>>2]|0)|0)==-1){o=-1;break}else{y=j}}i=e;return o|0}}while(0);o=c[g>>2]|0;i=e;return o|0}function cO(a){a=a|0;eq(5255044);eq(5255128);er(5254688);er(5254772);return}function cP(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;i=i+12|0;g=f|0;h=b|0;c[h>>2]=5249012;j=b+4|0;k=c[hW()>>2]|0;c[j>>2]=k;l=k+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;jS(b+8|0,0,24);c[h>>2]=5249348;c[b+32>>2]=d;d=b+36|0;h=c[j>>2]|0;j=h+4|0;G=c[j>>2]|0,c[j>>2]=G+1,G;if((c[1313663]|0)!=-1){c[g>>2]=5254652;c[g+4>>2]=24;c[g+8>>2]=0;dn(5254652,g,252)}g=(c[1313664]|0)-1|0;l=c[h+8>>2]|0;do{if((c[h+12>>2]|0)-l>>2>>>0>g>>>0){k=c[l+(g<<2)>>2]|0;if((k|0)==0){break}m=k;if(((G=c[j>>2]|0,c[j>>2]=G+ -1,G)|0)!=0){c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=b1[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}b_[c[(c[h>>2]|0)+8>>2]&1023](h|0);c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=b1[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}}while(0);f=bQ(4)|0;c[f>>2]=5247504;bo(f|0,5252716,512)}function cQ(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+12|0;f=e|0;b1[c[(c[b>>2]|0)+24>>2]&1023](b);g=c[d>>2]|0;if((c[1313663]|0)!=-1){c[f>>2]=5254652;c[f+4>>2]=24;c[f+8>>2]=0;dn(5254652,f,252)}f=(c[1313664]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}else{h=g;c[b+36>>2]=h;a[b+44|0]=b1[c[(c[g>>2]|0)+28>>2]&1023](h)&1;i=e;return}}function cR(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+12|0;g=f|0;h=b|0;c[h>>2]=5249012;j=b+4|0;k=c[hW()>>2]|0;c[j>>2]=k;l=k+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;jS(b+8|0,0,24);c[h>>2]=5249724;c[b+32>>2]=d;c[b+40>>2]=e;e=c[j>>2]|0;j=e+4|0;G=c[j>>2]|0,c[j>>2]=G+1,G;if((c[1313663]|0)!=-1){c[g>>2]=5254652;c[g+4>>2]=24;c[g+8>>2]=0;dn(5254652,g,252)}g=(c[1313664]|0)-1|0;d=c[e+8>>2]|0;do{if((c[e+12>>2]|0)-d>>2>>>0>g>>>0){h=c[d+(g<<2)>>2]|0;if((h|0)==0){break}l=h;k=b+36|0;c[k>>2]=l;m=b+44|0;c[m>>2]=b1[c[(c[h>>2]|0)+24>>2]&1023](l)|0;l=c[k>>2]|0;a[b+48|0]=b1[c[(c[l>>2]|0)+28>>2]&1023](l)&1;if((c[m>>2]|0)<=8){if(((G=c[j>>2]|0,c[j>>2]=G+ -1,G)|0)!=0){i=f;return}b_[c[(c[e>>2]|0)+8>>2]&1023](e|0);i=f;return}m=bQ(8)|0;c[m>>2]=5247528;l=m+4|0;if((l|0)!=0){k=jK(50)|0;c[k+4>>2]=37;c[k>>2]=37;h=k+12|0;c[l>>2]=h;c[k+8>>2]=0;jT(h|0,5243044,38)}bo(m|0,5252728,186)}}while(0);f=bQ(4)|0;c[f>>2]=5247504;bo(f|0,5252716,512)}function cS(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+12|0;f=e|0;g=c[d>>2]|0;if((c[1313663]|0)!=-1){c[f>>2]=5254652;c[f+4>>2]=24;c[f+8>>2]=0;dn(5254652,f,252)}f=(c[1313664]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}h=g;j=b+36|0;c[j>>2]=h;f=b+44|0;c[f>>2]=b1[c[(c[g>>2]|0)+24>>2]&1023](h)|0;h=c[j>>2]|0;a[b+48|0]=b1[c[(c[h>>2]|0)+28>>2]&1023](h)&1;if((c[f>>2]|0)>8){g4(5243044)}else{i=e;return}}function cT(a){a=a|0;return c[a+4>>2]|0}function cU(a){a=a|0;var b=0;c[a>>2]=5249080;b=c[a+4>>2]|0;a=b+4|0;if(((G=c[a>>2]|0,c[a>>2]=G+ -1,G)|0)!=0){return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cV(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5249080;b=c[a+4>>2]|0;d=b+4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){e=a;jM(e);return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jM(e);return}function cW(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+12|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=cb[c[(c[a>>2]|0)+20>>2]&1023](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((aN(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=653;break}if((l|0)==2){m=-1;n=654;break}else if((l|0)!=1){n=650;break}}if((n|0)==650){m=((aL(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}else if((n|0)==654){i=b;return m|0}else if((n|0)==653){i=b;return m|0}return 0}function cX(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0;e=i;i=i+20|0;f=e|0;g=e+8|0;h=e+12|0;j=e+16|0;k=(d|0)==-1;if(!k){l=g+1|0;m=b+24|0;n=b+20|0;c[n>>2]=g;o=b+28|0;c[o>>2]=l;a[g]=d&255;c[m>>2]=l;L748:do{if((a[b+44|0]&1)<<24>>24==0){p=f|0;c[h>>2]=p;q=b+36|0;r=b+40|0;s=f+8|0;t=f;u=b+32|0;v=g;w=l;while(1){x=c[q>>2]|0;y=b6[c[(c[x>>2]|0)+12>>2]&1023](x,c[r>>2]|0,v,w,j,p,s,h)|0;z=c[n>>2]|0;if((c[j>>2]|0)==(z|0)){A=-1;B=669;break}if((y|0)==3){B=661;break}if(y>>>0>=2){A=-1;B=672;break}x=(c[h>>2]|0)-t|0;if((aN(p|0,1,x|0,c[u>>2]|0)|0)!=(x|0)){A=-1;B=673;break}if((y|0)!=1){break L748}y=c[j>>2]|0;x=c[m>>2]|0;c[n>>2]=y;c[o>>2]=x;C=y+(x-y|0)|0;c[m>>2]=C;v=y;w=C}if((B|0)==672){i=e;return A|0}else if((B|0)==661){if((aN(z|0,1,1,c[u>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}else if((B|0)==669){i=e;return A|0}else if((B|0)==673){i=e;return A|0}}else{if((aN(g|0,1,1,c[b+32>>2]|0)|0)==1){break}else{A=-1}i=e;return A|0}}while(0);c[m>>2]=0;c[n>>2]=0;c[o>>2]=0}A=k?0:d;i=e;return A|0}function cY(a){a=a|0;var b=0;c[a>>2]=5249080;b=c[a+4>>2]|0;a=b+4|0;if(((G=c[a>>2]|0,c[a>>2]=G+ -1,G)|0)!=0){return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function cZ(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5249080;b=c[a+4>>2]|0;d=b+4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){e=a;jM(e);return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jM(e);return}function c_(a){a=a|0;return c1(a,0)|0}function c$(a){a=a|0;return c1(a,1)|0}function c0(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;e=i;i=i+20|0;f=e|0;g=e+8|0;h=e+12|0;if((d|0)==-1){j=-1;i=e;return j|0}k=d&255;a[h]=k;l=c[b+36>>2]|0;m=f|0;n=b6[c[(c[l>>2]|0)+12>>2]&1023](l,c[b+40>>2]|0,h,h+1|0,e+16|0,m,f+8|0,g)|0;if((n|0)==2|(n|0)==1){j=-1;i=e;return j|0}else if((n|0)==3){a[m]=k;c[g>>2]=f+1|0}f=b+32|0;while(1){b=c[g>>2]|0;if(b>>>0<=m>>>0){j=d;o=696;break}k=b-1|0;c[g>>2]=k;if((bD(a[k]<<24>>24|0,c[f>>2]|0)|0)==-1){j=-1;o=695;break}}if((o|0)==696){i=e;return j|0}else if((o|0)==695){i=e;return j|0}return 0}function c1(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;f=i;i=i+20|0;g=f|0;h=f+8|0;j=f+12|0;k=f+16|0;l=c[b+44>>2]|0;m=(l|0)>1?l:1;L795:do{if((m|0)>0){l=b+32|0;n=0;while(1){o=a0(c[l>>2]|0)|0;if((o|0)==-1){p=-1;break}a[g+n|0]=o&255;o=n+1|0;if((o|0)<(m|0)){n=o}else{break L795}}i=f;return p|0}}while(0);L802:do{if((a[b+48|0]&1)<<24>>24==0){n=b+40|0;l=b+36|0;o=g|0;q=h+1|0;r=b+32|0;s=m;while(1){t=c[n>>2]|0;u=t;v=c[u>>2]|0;w=c[u+4>>2]|0;u=c[l>>2]|0;x=g+s|0;y=b6[c[(c[u>>2]|0)+16>>2]&1023](u,t,o,x,j,h,q,k)|0;if((y|0)==3){z=708;break}else if((y|0)==2){p=-1;z=721;break}else if((y|0)!=1){A=s;break L802}y=c[n>>2]|0;c[y>>2]=v;c[y+4>>2]=w;if((s|0)==8){p=-1;z=717;break}w=a0(c[r>>2]|0)|0;if((w|0)==-1){p=-1;z=716;break}a[x]=w&255;s=s+1|0}if((z|0)==708){a[h]=a[o]|0;A=s;break}else if((z|0)==716){i=f;return p|0}else if((z|0)==717){i=f;return p|0}else if((z|0)==721){i=f;return p|0}}else{a[h]=a[g|0]|0;A=m}}while(0);L816:do{if(!e){m=b+32|0;z=A;while(1){if((z|0)<=0){break L816}k=z-1|0;if((bD(d[g+k|0]|0|0,c[m>>2]|0)|0)==-1){p=-1;break}else{z=k}}i=f;return p|0}}while(0);p=d[h]|0;i=f;return p|0}function c2(){cD(0);a1(366,5255384,u|0);return}function c3(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247576;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jN(e)}}while(0);jM(a);return}function c4(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247576;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jN(d);e=a|0;return}function c5(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;f=i;i=i+12|0;g=f|0;h=b|0;c[h>>2]=5249080;j=b+4|0;k=c[hW()>>2]|0;c[j>>2]=k;l=k+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;jS(b+8|0,0,24);c[h>>2]=5249416;c[b+32>>2]=d;d=b+36|0;h=c[j>>2]|0;j=h+4|0;G=c[j>>2]|0,c[j>>2]=G+1,G;if((c[1313665]|0)!=-1){c[g>>2]=5254660;c[g+4>>2]=24;c[g+8>>2]=0;dn(5254660,g,252)}g=(c[1313666]|0)-1|0;l=c[h+8>>2]|0;do{if((c[h+12>>2]|0)-l>>2>>>0>g>>>0){k=c[l+(g<<2)>>2]|0;if((k|0)==0){break}m=k;if(((G=c[j>>2]|0,c[j>>2]=G+ -1,G)|0)!=0){c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=b1[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}b_[c[(c[h>>2]|0)+8>>2]&1023](h|0);c[d>>2]=m;n=b+40|0;c[n>>2]=e;o=b+44|0;p=k;q=c[p>>2]|0;r=q+28|0;s=c[r>>2]|0;t=b1[s&1023](m)|0;u=t&1;a[o]=u;i=f;return}}while(0);f=bQ(4)|0;c[f>>2]=5247504;bo(f|0,5252716,512)}function c6(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+12|0;f=e|0;b1[c[(c[b>>2]|0)+24>>2]&1023](b);g=c[d>>2]|0;if((c[1313665]|0)!=-1){c[f>>2]=5254660;c[f+4>>2]=24;c[f+8>>2]=0;dn(5254660,f,252)}f=(c[1313666]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}else{h=g;c[b+36>>2]=h;a[b+44|0]=b1[c[(c[g>>2]|0)+28>>2]&1023](h)&1;i=e;return}}function c7(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+12|0;g=f|0;h=b|0;c[h>>2]=5249080;j=b+4|0;k=c[hW()>>2]|0;c[j>>2]=k;l=k+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;jS(b+8|0,0,24);c[h>>2]=5249792;c[b+32>>2]=d;c[b+40>>2]=e;e=c[j>>2]|0;j=e+4|0;G=c[j>>2]|0,c[j>>2]=G+1,G;if((c[1313665]|0)!=-1){c[g>>2]=5254660;c[g+4>>2]=24;c[g+8>>2]=0;dn(5254660,g,252)}g=(c[1313666]|0)-1|0;d=c[e+8>>2]|0;do{if((c[e+12>>2]|0)-d>>2>>>0>g>>>0){h=c[d+(g<<2)>>2]|0;if((h|0)==0){break}l=h;k=b+36|0;c[k>>2]=l;m=b+44|0;c[m>>2]=b1[c[(c[h>>2]|0)+24>>2]&1023](l)|0;l=c[k>>2]|0;a[b+48|0]=b1[c[(c[l>>2]|0)+28>>2]&1023](l)&1;if((c[m>>2]|0)<=8){if(((G=c[j>>2]|0,c[j>>2]=G+ -1,G)|0)!=0){i=f;return}b_[c[(c[e>>2]|0)+8>>2]&1023](e|0);i=f;return}m=bQ(8)|0;c[m>>2]=5247528;l=m+4|0;if((l|0)!=0){k=jK(50)|0;c[k+4>>2]=37;c[k>>2]=37;h=k+12|0;c[l>>2]=h;c[k+8>>2]=0;jT(h|0,5243044,38)}bo(m|0,5252728,186)}}while(0);f=bQ(4)|0;c[f>>2]=5247504;bo(f|0,5252716,512)}function c8(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+12|0;f=e|0;g=c[d>>2]|0;if((c[1313665]|0)!=-1){c[f>>2]=5254660;c[f+4>>2]=24;c[f+8>>2]=0;dn(5254660,f,252)}f=(c[1313666]|0)-1|0;d=c[g+8>>2]|0;if((c[g+12>>2]|0)-d>>2>>>0<=f>>>0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}g=c[d+(f<<2)>>2]|0;if((g|0)==0){h=bQ(4)|0;j=h;c[j>>2]=5247504;bo(h|0,5252716,512)}h=g;j=b+36|0;c[j>>2]=h;f=b+44|0;c[f>>2]=b1[c[(c[g>>2]|0)+24>>2]&1023](h)|0;h=c[j>>2]|0;a[b+48|0]=b1[c[(c[h>>2]|0)+28>>2]&1023](h)&1;if((c[f>>2]|0)>8){g4(5243044)}else{i=e;return}}function c9(a){a=a|0;return c[a+4>>2]|0}function da(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;return}function db(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;if((c[b+4>>2]|0)!=(a|0)){e=0;return e|0}e=(c[b>>2]|0)==(d|0);return e|0}function dc(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247528;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jN(e)}}while(0);jM(a);return}function dd(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247528;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jN(d);e=a|0;return}function de(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247576;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jN(e)}}while(0);jM(a);return}function df(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;bY[c[(c[a>>2]|0)+12>>2]&1023](f,a,b);if((c[f+4>>2]|0)!=(c[d+4>>2]|0)){g=0;i=e;return g|0}g=(c[f>>2]|0)==(c[d>>2]|0);i=e;return g|0}function dg(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;h=f;j=i;i=i+12|0;k=e|0;l=c[k>>2]|0;do{if((l|0)!=0){m=d[h]|0;if((m&1|0)==0){n=m>>>1}else{n=c[f+4>>2]|0}if((n|0)==0){o=l}else{dl(f,5244232,2);o=c[k>>2]|0}m=c[e+4>>2]|0;bY[c[(c[m>>2]|0)+24>>2]&1023](j,m,o);m=j;p=a[m]|0;if((p&1)<<24>>24==0){q=j+1|0}else{q=c[j+8>>2]|0}r=p&255;if((r&1|0)==0){s=r>>>1}else{s=c[j+4>>2]|0}dl(f,q,s);if((a[m]&1)<<24>>24==0){break}jM(c[j+8>>2]|0)}}while(0);jT(b|0,h|0,12);jS(h|0,0,12);i=g;return}function dh(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247528;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jN(e)}}while(0);jM(a);return}function di(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247528;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jN(d);e=a|0;return}function dj(b){b=b|0;if((a[b]&1)<<24>>24==0){return}jM(c[b+8>>2]|0);return}function dk(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=jV(d|0)|0;f=b;g=b;h=a[g]|0;if((h&1)<<24>>24==0){i=10;j=h}else{h=c[b>>2]|0;i=(h&-2)-1|0;j=h&255}if(i>>>0<e>>>0){h=j&255;if((h&1|0)==0){k=h>>>1}else{k=c[b+4>>2]|0}dI(b,i,e-i|0,k,0,k,e,d);return b|0}if((j&1)<<24>>24==0){l=f+1|0}else{l=c[b+8>>2]|0}jU(l|0,d|0,e|0);a[l+e|0]=0;if((a[g]&1)<<24>>24==0){a[g]=e<<1&255;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function dl(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)<<24>>24==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}if((h-j|0)>>>0<e>>>0){dI(b,h,(e-h|0)+j|0,j,j,0,e,d);return b|0}if((e|0)==0){return b|0}if((i&1)<<24>>24==0){k=b+1|0}else{k=c[b+8>>2]|0}jT(k+j|0,d|0,e|0);d=j+e|0;if((a[f]&1)<<24>>24==0){a[f]=d<<1&255}else{c[b+4>>2]=d}a[k+d|0]=0;return b|0}function dm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;f=i;i=i+24|0;g=d;d=i;i=i+8|0;c[d>>2]=c[g>>2]|0;c[d+4>>2]=c[g+4>>2]|0;g=f|0;h=f+12|0;j=jV(e|0)|0;if((j|0)==-1){dp(0)}if(j>>>0<11){a[h]=j<<1&255;k=h+1|0}else{l=j+16&-16;m=jJ(l)|0;c[h+8>>2]=m;c[h>>2]=l|1;c[h+4>>2]=j;k=m}jT(k|0,e|0,j|0);a[k+j|0]=0;dg(g,d,h);j=b|0;c[j>>2]=5247528;k=b+4|0;e=g;if((k|0)!=0){if((a[e]&1)<<24>>24==0){n=g+1|0}else{n=c[g+8>>2]|0}m=jV(n|0)|0;l=jK(m+13|0)|0;c[l+4>>2]=m;c[l>>2]=m;m=l+12|0;c[k>>2]=m;c[l+8>>2]=0;jW(m|0,n|0)}if((a[e]&1)<<24>>24!=0){jM(c[g+8>>2]|0)}if((a[h]&1)<<24>>24==0){c[j>>2]=5249324;o=b+8|0;p=d;q=o;r=p|0;s=c[r>>2]|0;t=p+4|0;u=c[t>>2]|0;v=q|0;c[v>>2]=s;w=q+4|0;c[w>>2]=u;i=f;return}jM(c[h+8>>2]|0);c[j>>2]=5249324;o=b+8|0;p=d;q=o;r=p|0;s=c[r>>2]|0;t=p+4|0;u=c[t>>2]|0;v=q|0;c[v>>2]=s;w=q+4|0;c[w>>2]=u;i=f;return}function dn(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e;L1036:do{if((c[a>>2]|0)==1){while(1){aW(5254456,5254452);if((c[a>>2]|0)!=1){break L1036}}}}while(0);if((c[a>>2]|0)!=0){f;return}c[a>>2]=1;g;b_[d&1023](b);h;c[a>>2]=-1;i;bt(5254456);return}function dp(a){a=a|0;var b=0,d=0,e=0;a=bQ(8)|0;c[a>>2]=5247576;b=a+4|0;if((b|0)!=0){d=jK(25)|0;c[d+4>>2]=12;c[d>>2]=12;e=d+12|0;c[b>>2]=e;c[d+8>>2]=0;jT(e|0,5243140,13)}c[a>>2]=5247552;bo(a|0,5252740,248)}function dq(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;if((d|0)==-1){dp(0)}e=b;f=b;g=a[f]|0;if((g&1)<<24>>24==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}g=j>>>0>d>>>0?j:d;if(g>>>0<11){k=11}else{k=g+16&-16}g=k-1|0;if((g|0)==(h|0)){return}if((g|0)==10){l=e+1|0;m=c[b+8>>2]|0;n=1;o=0;p=i}else{if(g>>>0>h>>>0){q=jJ(k)|0}else{q=jJ(k)|0}h=a[f]|0;g=h&1;if(g<<24>>24==0){r=e+1|0}else{r=c[b+8>>2]|0}l=q;m=r;n=g<<24>>24!=0;o=1;p=h}h=p&255;if((h&1|0)==0){s=h>>>1}else{s=c[b+4>>2]|0}jT(l|0,m|0,s+1|0);if(n){jM(m)}if(o){c[b>>2]=k|1;c[b+4>>2]=j;c[b+8>>2]=l;return}else{a[f]=j<<1&255;return}}function dr(a,b){a=a|0;b=b|0;return}function ds(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function dt(a){a=a|0;return 0}function du(a){a=a|0;return 0}function dv(a){a=a|0;return-1|0}function dw(a,b){a=a|0;b=b|0;return-1|0}function dx(a,b){a=a|0;b=b|0;return-1|0}function dy(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function dz(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2]|0;c[d+4>>2]=c[b+4>>2]|0;c[d+8>>2]=c[b+8>>2]|0;c[d+12>>2]=c[b+12>>2]|0;b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function dA(b){b=b|0;if((a[b]&1)<<24>>24==0){return}jM(c[b+8>>2]|0);return}function dB(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)<<24>>24==0){h=1;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}if(h>>>0<e>>>0){g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}dL(b,h,e-h|0,j,0,j,e,d);return b|0}if((i&1)<<24>>24==0){k=b+4|0}else{k=c[b+8>>2]|0}bn(k|0,d|0,e|0);c[k+(e<<2)>>2]=0;if((a[f]&1)<<24>>24==0){a[f]=e<<1&255;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function dC(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5249080;b=c[a+4>>2]|0;d=b+4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){e=a;jM(e);return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jM(e);return}function dD(a){a=a|0;var b=0;c[a>>2]=5249080;b=c[a+4>>2]|0;a=b+4|0;if(((G=c[a>>2]|0,c[a>>2]=G+ -1,G)|0)!=0){return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function dE(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;f=b;if((e|0)<=0){g=0;return g|0}h=b+12|0;i=b+16|0;j=d;d=0;while(1){k=c[h>>2]|0;if(k>>>0<(c[i>>2]|0)>>>0){c[h>>2]=k+1|0;l=a[k]|0}else{k=b1[c[(c[f>>2]|0)+40>>2]&1023](b)|0;if((k|0)==-1){g=d;m=1025;break}l=k&255}a[j]=l;k=d+1|0;if((k|0)<(e|0)){j=j+1|0;d=k}else{g=k;m=1027;break}}if((m|0)==1027){return g|0}else if((m|0)==1025){return g|0}return 0}function dF(a){a=a|0;var b=0,e=0;if((b1[c[(c[a>>2]|0)+36>>2]&1023](a)|0)==-1){b=-1;return b|0}e=a+12|0;a=c[e>>2]|0;c[e>>2]=a+1|0;b=d[a]|0;return b|0}function dG(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=b;if((f|0)<=0){h=0;return h|0}i=b+24|0;j=b+28|0;k=0;l=e;while(1){e=c[i>>2]|0;if(e>>>0<(c[j>>2]|0)>>>0){m=a[l]|0;c[i>>2]=e+1|0;a[e]=m}else{if((ca[c[(c[g>>2]|0)+52>>2]&1023](b,d[l]|0)|0)==-1){h=k;n=1042;break}}m=k+1|0;if((m|0)<(f|0)){k=m;l=l+1|0}else{h=m;n=1040;break}}if((n|0)==1040){return h|0}else if((n|0)==1042){return h|0}return 0}function dH(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5249012;b=c[a+4>>2]|0;d=b+4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){e=a;jM(e);return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);e=a;jM(e);return}function dI(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((-3-d|0)>>>0<e>>>0){dp(0)}if((a[b]&1)<<24>>24==0){k=b+1|0}else{k=c[b+8>>2]|0}do{if(d>>>0<2147483631){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<11){o=11;break}o=n+16&-16}else{o=-2}}while(0);e=jJ(o)|0;if((g|0)!=0){jT(e|0,k|0,g|0)}if((i|0)!=0){jT(e+g|0,j|0,i|0)}j=f-h|0;if((j|0)!=(g|0)){jT(e+(i+g|0)|0,k+(h+g|0)|0,j-g|0)}if((d|0)==10){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}jM(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}function dJ(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((-3-d|0)>>>0<e>>>0){dp(0)}if((a[b]&1)<<24>>24==0){j=b+1|0}else{j=c[b+8>>2]|0}do{if(d>>>0<2147483631){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<11){n=11;break}n=m+16&-16}else{n=-2}}while(0);e=jJ(n)|0;if((g|0)!=0){jT(e|0,j|0,g|0)}m=f-h|0;if((m|0)!=(g|0)){jT(e+(i+g|0)|0,j+(h+g|0)|0,m-g|0)}if((d|0)==10){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}jM(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function dK(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(d>>>0>1073741822){dp(0)}e=b;f=a[e]|0;if((f&1)<<24>>24==0){g=1;h=f}else{f=c[b>>2]|0;g=(f&-2)-1|0;h=f&255}f=h&255;if((f&1|0)==0){i=f>>>1}else{i=c[b+4>>2]|0}f=i>>>0>d>>>0?i:d;if(f>>>0<2){j=2}else{j=f+4&-4}f=j-1|0;if((f|0)==(g|0)){return}if((f|0)==1){k=b+4|0;l=c[b+8>>2]|0;m=1;n=0;o=h}else{h=j<<2;if(f>>>0>g>>>0){p=jJ(h)|0}else{p=jJ(h)|0}h=a[e]|0;g=h&1;if(g<<24>>24==0){q=b+4|0}else{q=c[b+8>>2]|0}k=p;l=q;m=g<<24>>24!=0;n=1;o=h}h=o&255;if((h&1|0)==0){r=h>>>1}else{r=c[b+4>>2]|0}bL(k|0,l|0,r+1|0);if(m){jM(l)}if(n){c[b>>2]=j|1;c[b+4>>2]=i;c[b+8>>2]=k;return}else{a[e]=i<<1&255;return}}function dL(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((1073741821-d|0)>>>0<e>>>0){dp(0)}if((a[b]&1)<<24>>24==0){k=b+4|0}else{k=c[b+8>>2]|0}do{if(d>>>0<536870895){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<2){o=2;break}o=n+4&-4}else{o=1073741822}}while(0);e=jJ(o<<2)|0;if((g|0)!=0){bL(e|0,k|0,g|0)}if((i|0)!=0){n=e+(g<<2)|0;bL(n|0,j|0,i|0)}j=f-h|0;if((j|0)!=(g|0)){f=j-g|0;n=e+(i+g<<2)|0;l=k+(h+g<<2)|0;bL(n|0,l|0,f|0)}if((d|0)==1){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+(s<<2)|0;c[u>>2]=0;return}jM(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+(s<<2)|0;c[u>>2]=0;return}function dM(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((1073741821-d|0)>>>0<e>>>0){dp(0)}if((a[b]&1)<<24>>24==0){j=b+4|0}else{j=c[b+8>>2]|0}do{if(d>>>0<536870895){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<2){n=2;break}n=m+4&-4}else{n=1073741822}}while(0);e=jJ(n<<2)|0;if((g|0)!=0){bL(e|0,j|0,g|0)}m=f-h|0;if((m|0)!=(g|0)){f=m-g|0;m=e+(i+g<<2)|0;i=j+(h+g<<2)|0;bL(m|0,i|0,f|0)}if((d|0)==1){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}jM(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function dN(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;g=(c[b+24>>2]|0)==0;if(g){c[b+16>>2]=d|1}else{c[b+16>>2]=d}if(((g&1|d)&c[b+20>>2]|0)==0){i=e;return}e=bQ(16)|0;do{if(a[5255532]<<24>>24==0){if((bf(5255532)|0)==0){break}c[1311653]=5248868}}while(0);b=f;d=jZ(5246612,0,32);g=I;c[b>>2]=d&0|1;c[b+4>>2]=g&-1|0;dm(e,f,5244052);c[e>>2]=5248140;bo(e|0,5253260,62)}function dO(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;c[a>>2]=5248120;b=c[a+40>>2]|0;L1326:do{if((b|0)!=0){d=a+32|0;e=a+36|0;f=b;while(1){g=f-1|0;bY[c[(c[d>>2]|0)+(g<<2)>>2]&1023](0,a,c[(c[e>>2]|0)+(g<<2)>>2]|0);if((g|0)==0){break L1326}else{f=g}}}}while(0);b=c[a+28>>2]|0;f=b+4|0;if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[b>>2]|0)+8>>2]&1023](b)}jE(c[a+32>>2]|0);jE(c[a+36>>2]|0);jE(c[a+48>>2]|0);jE(c[a+60>>2]|0);return}function dP(a,b){a=a|0;b=b|0;return}function dQ(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function dR(a){a=a|0;return 0}function dS(a){a=a|0;return 0}function dT(a){a=a|0;return-1|0}function dU(a,b){a=a|0;b=b|0;return-1|0}function dV(a,b){a=a|0;b=b|0;return-1|0}function dW(a){a=a|0;return 5244088}function dX(a){a=a|0;return}function dY(a){a=a|0;return}function dZ(a){a=a|0;return}function d_(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function d$(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2]|0;c[d+4>>2]=c[b+4>>2]|0;c[d+8>>2]=c[b+8>>2]|0;c[d+12>>2]=c[b+12>>2]|0;b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function d0(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L1349:do{if((e|0)==(f|0)){g=c}else{b=c;h=e;while(1){if((b|0)==(d|0)){i=-1;j=1193;break}k=a[b]|0;l=a[h]|0;if(k<<24>>24<l<<24>>24){i=-1;j=1192;break}if(l<<24>>24<k<<24>>24){i=1;j=1194;break}k=b+1|0;l=h+1|0;if((l|0)==(f|0)){g=k;break L1349}else{b=k;h=l}}if((j|0)==1192){return i|0}else if((j|0)==1193){return i|0}else if((j|0)==1194){return i|0}}}while(0);i=(g|0)!=(d|0)&1;return i|0}function d1(a){a=a|0;var b=0;c[a>>2]=5249012;b=c[a+4>>2]|0;a=b+4|0;if(((G=c[a>>2]|0,c[a>>2]=G+ -1,G)|0)!=0){return}b_[c[(c[b>>2]|0)+8>>2]&1023](b|0);return}function d2(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+12|0;h=a+16|0;i=b;b=0;while(1){j=c[g>>2]|0;if(j>>>0<(c[h>>2]|0)>>>0){c[g>>2]=j+4|0;k=c[j>>2]|0}else{j=b1[c[(c[e>>2]|0)+40>>2]&1023](a)|0;if((j|0)==-1){f=b;l=1208;break}else{k=j}}c[i>>2]=k;j=b+1|0;if((j|0)<(d|0)){i=i+4|0;b=j}else{f=j;l=1207;break}}if((l|0)==1208){return f|0}else if((l|0)==1207){return f|0}return 0}function d3(a){a=a|0;var b=0,d=0;if((b1[c[(c[a>>2]|0)+36>>2]&1023](a)|0)==-1){b=-1;return b|0}d=a+12|0;a=c[d>>2]|0;c[d>>2]=a+4|0;b=c[a>>2]|0;return b|0}function d4(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+24|0;h=a+28|0;i=0;j=b;while(1){b=c[g>>2]|0;if(b>>>0<(c[h>>2]|0)>>>0){k=c[j>>2]|0;c[g>>2]=b+4|0;c[b>>2]=k}else{if((ca[c[(c[e>>2]|0)+52>>2]&1023](a,c[j>>2]|0)|0)==-1){f=i;l=1223;break}}k=i+1|0;if((k|0)<(d|0)){i=k;j=j+4|0}else{f=k;l=1222;break}}if((l|0)==1223){return f|0}else if((l|0)==1222){return f|0}return 0}function d5(a){a=a|0;dO(a+8|0);jM(a);return}function d6(a){a=a|0;dO(a+8|0);return}function d7(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dO(b+(d+8|0)|0);jM(b+d|0);return}function d8(a){a=a|0;dO(a+((c[(c[a>>2]|0)-12>>2]|0)+8|0)|0);return}function d9(a){a=a|0;dO(a+8|0);jM(a);return}function ea(a){a=a|0;dO(a+8|0);return}function eb(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dO(b+(d+8|0)|0);jM(b+d|0);return}function ec(a){a=a|0;dO(a+((c[(c[a>>2]|0)-12>>2]|0)+8|0)|0);return}function ed(a){a=a|0;dO(a+4|0);jM(a);return}function ee(a){a=a|0;dO(a+4|0);return}function ef(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dO(b+(d+4|0)|0);jM(b+d|0);return}function eg(a){a=a|0;dO(a+((c[(c[a>>2]|0)-12>>2]|0)+4|0)|0);return}function eh(a){a=a|0;dO(a+4|0);jM(a);return}function ei(a){a=a|0;dO(a+4|0);return}function ej(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;dO(b+(d+4|0)|0);jM(b+d|0);return}function ek(a){a=a|0;dO(a+((c[(c[a>>2]|0)-12>>2]|0)+4|0)|0);return}function el(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247528;b=a+4|0;d=(c[b>>2]|0)-4|0;do{if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)<0){e=(c[b>>2]|0)-12|0;if((e|0)==0){break}jN(e)}}while(0);jM(a);return}function em(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=5247528;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)-1|0)>=0){e=a|0;return}d=(c[b>>2]|0)-12|0;if((d|0)==0){e=a|0;return}jN(d);e=a|0;return}function en(a){a=a|0;dO(a);jM(a);return}function eo(a){a=a|0;jM(a);return}function ep(a){a=a|0;jM(a);return}function eq(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+8|0;e=d|0;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24|0)>>2]|0)==0){i=d;return b|0}j=e|0;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16|0)>>2]|0)==0){k=c[h+(g+72|0)>>2]|0;if((k|0)!=0){eq(k)}a[j]=1;k=c[h+((c[(c[f>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((b1[c[(c[k>>2]|0)+24>>2]&1023](k)|0)!=-1){break}k=c[(c[f>>2]|0)-12>>2]|0;dN(h+k|0,c[h+(k+16|0)>>2]|1)}}while(0);es(e);i=d;return b|0}function er(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0;d=i;i=i+8|0;e=d|0;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24|0)>>2]|0)==0){i=d;return b|0}j=e|0;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16|0)>>2]|0)==0){k=c[h+(g+72|0)>>2]|0;if((k|0)!=0){er(k)}a[j]=1;k=c[h+((c[(c[f>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((b1[c[(c[k>>2]|0)+24>>2]&1023](k)|0)!=-1){break}k=c[(c[f>>2]|0)-12>>2]|0;dN(h+k|0,c[h+(k+16|0)>>2]|1)}}while(0);et(e);i=d;return b|0}function es(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;a=c[b>>2]|0;d=c[(c[a>>2]|0)-12>>2]|0;e=a;if((c[e+(d+24|0)>>2]|0)==0){return}if((c[e+(d+16|0)>>2]|0)!=0){return}if((c[e+(d+4|0)>>2]&8192|0)==0){return}if(bj()|0){return}d=c[b>>2]|0;e=c[d+((c[(c[d>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((b1[c[(c[e>>2]|0)+24>>2]&1023](e)|0)!=-1){return}e=c[b>>2]|0;b=c[(c[e>>2]|0)-12>>2]|0;d=e;dN(d+b|0,c[d+(b+16|0)>>2]|1);return}function et(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;a=c[b>>2]|0;d=c[(c[a>>2]|0)-12>>2]|0;e=a;if((c[e+(d+24|0)>>2]|0)==0){return}if((c[e+(d+16|0)>>2]|0)!=0){return}if((c[e+(d+4|0)>>2]&8192|0)==0){return}if(bj()|0){return}d=c[b>>2]|0;e=c[d+((c[(c[d>>2]|0)-12>>2]|0)+24|0)>>2]|0;if((b1[c[(c[e>>2]|0)+24>>2]&1023](e)|0)!=-1){return}e=c[b>>2]|0;b=c[(c[e>>2]|0)-12>>2]|0;d=e;dN(d+b|0,c[d+(b+16|0)>>2]|1);return}function eu(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)==1){d=jJ(48)|0;c[b+8>>2]=d;c[b>>2]=49;c[b+4>>2]=35;jT(d|0,5244300,35);a[d+35|0]=0;return}d=bA(e|0)|0;e=jV(d|0)|0;if((e|0)==-1){dp(0)}if(e>>>0<11){a[b]=e<<1&255;f=b+1|0}else{g=e+16&-16;h=jJ(g)|0;c[b+8>>2]=h;c[b>>2]=g|1;c[b+4>>2]=e;f=h}jT(f|0,d|0,e|0);a[f+e|0]=0;return}function ev(a){a=a|0;return}function ew(a){a=a|0;return}function ex(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;if((c|0)==(d|0)){e=0;return e|0}else{f=c;g=0}while(1){c=(a[f]<<24>>24)+(g<<4)|0;b=c&-268435456;h=(b>>>24|b)^c;c=f+1|0;if((c|0)==(d|0)){e=h;break}else{f=c;g=h}}return e|0}function ey(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L1513:do{if((e|0)==(f|0)){g=b}else{a=b;h=e;while(1){if((a|0)==(d|0)){i=-1;j=1353;break}k=c[a>>2]|0;l=c[h>>2]|0;if((k|0)<(l|0)){i=-1;j=1354;break}if((l|0)<(k|0)){i=1;j=1355;break}k=a+4|0;l=h+4|0;if((l|0)==(f|0)){g=k;break L1513}else{a=k;h=l}}if((j|0)==1353){return i|0}else if((j|0)==1354){return i|0}else if((j|0)==1355){return i|0}}}while(0);i=(g|0)!=(d|0)&1;return i|0}function ez(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;if((b|0)==(d|0)){e=0;return e|0}else{f=b;g=0}while(1){b=(c[f>>2]|0)+(g<<4)|0;a=b&-268435456;h=(a>>>24|a)^b;b=f+4|0;if((b|0)==(d|0)){e=h;break}else{f=b;g=h}}return e|0}function eA(a){a=a|0;jM(a);return}function eB(a){a=a|0;jM(a);return}function eC(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;if((g|0)==-1){dp(0)}if(g>>>0<11){a[b]=g<<1&255;h=b+1|0}else{i=g+16&-16;j=jJ(i)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=g;h=j}if((e|0)==(f|0)){k=h;a[k]=0;return}j=f+(-d|0)|0;d=h;g=e;while(1){a[d]=a[g]|0;e=g+1|0;if((e|0)==(f|0)){break}else{d=d+1|0;g=e}}k=h+j|0;a[k]=0;return}function eD(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;h=g>>2;if(h>>>0>1073741822){dp(0)}if(h>>>0<2){a[b]=g>>>1&255;i=b+4|0}else{g=h+4&-4;j=jJ(g<<2)|0;c[b+8>>2]=j;c[b>>2]=g|1;c[b+4>>2]=h;i=j}if((e|0)==(f|0)){k=i;c[k>>2]=0;return}j=((f-4|0)+(-d|0)|0)>>>2;d=i;h=e;while(1){c[d>>2]=c[h>>2]|0;e=h+4|0;if((e|0)==(f|0)){break}else{d=d+4|0;h=e}}k=i+(j+1<<2)|0;c[k>>2]=0;return}function eE(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;k=i;i=i+68|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=k|0;m=k+12|0;n=k+24|0;o=k+28|0;p=k+32|0;q=k+36|0;r=k+40|0;s=k+64|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;t=c[(c[d>>2]|0)+16>>2]|0;u=e|0;c[p>>2]=c[u>>2]|0;c[q>>2]=c[f>>2]|0;b3[t&1023](o,d,p,q,g,h,n);q=c[o>>2]|0;c[u>>2]=q;u=c[n>>2]|0;if((u|0)==0){a[j]=0}else if((u|0)==1){a[j]=1}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}q=g+28|0;g=c[q>>2]|0;u=g+4|0;G=c[u>>2]|0,c[u>>2]=G+1,G;if((c[1313737]|0)!=-1){c[m>>2]=5254948;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254948,m,252)}m=(c[1313738]|0)-1|0;n=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-n>>2>>>0>m>>>0){o=c[n+(m<<2)>>2]|0;if((o|0)==0){break}p=o;if(((G=c[u>>2]|0,c[u>>2]=G+ -1,G)|0)==0){b_[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[q>>2]|0;d=o+4|0;G=c[d>>2]|0,c[d>>2]=G+1,G;if((c[1313645]|0)!=-1){c[l>>2]=5254580;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254580,l,252)}t=(c[1313646]|0)-1|0;v=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-v>>2>>>0>t>>>0){w=c[v+(t<<2)>>2]|0;if((w|0)==0){break}x=w;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)==0){b_[c[(c[o>>2]|0)+8>>2]&1023](o)}y=r|0;z=w;b$[c[(c[z>>2]|0)+24>>2]&1023](y,x);b$[c[(c[z>>2]|0)+28>>2]&1023](r+12|0,x);c[s>>2]=c[f>>2]|0;a[j]=(eG(e,s,y,r+24|0,p,h,1)|0)==(y|0)&1;c[b>>2]=c[e>>2]|0;if((a[r+12|0]&1)<<24>>24!=0){jM(c[r+20>>2]|0)}if((a[r]&1)<<24>>24==0){i=k;return}jM(c[r+8>>2]|0);i=k;return}}while(0);p=bQ(4)|0;c[p>>2]=5247504;bo(p|0,5252716,512)}}while(0);k=bQ(4)|0;c[k>>2]=5247504;bo(k|0,5252716,512)}function eF(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+256|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+28|0;n=e+32|0;o=e+44|0;p=e+84|0;q=e+88|0;r=e+248|0;s=e+252|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==64){u=8}else if((t|0)==8){u=16}else{u=10}t=l|0;eM(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L1611:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1450}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L1611}}if((b1[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1450;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L1611}}}}while(0);if((y|0)==1450){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{F=d[D]|0}if((eH(F&255,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;b1[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);c[k>>2]=eJ(h,c[p>>2]|0,j,u)|0;eI(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L1655:do{if(C){y=1481}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1481;break L1655}}while(0);if(l^(B|0)==0){break}else{y=1483;break}}}while(0);do{if((y|0)==1481){if(l){y=1483;break}else{break}}}while(0);if((y|0)==1483){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function eG(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;l=i;i=i+100|0;m=e;e=i;i=i+4|0;c[e>>2]=c[m>>2]|0;m=(g-f|0)/12&-1;n=l|0;do{if(m>>>0>100){o=jD(m)|0;if((o|0)!=0){p=o;q=o;break}o=bQ(4)|0;c[o>>2]=5247480;bo(o|0,5252704,66)}else{p=n;q=0}}while(0);n=(f|0)==(g|0);L1677:do{if(n){r=m;s=0}else{o=m;t=0;u=p;v=f;while(1){w=d[v]|0;if((w&1|0)==0){x=w>>>1}else{x=c[v+4>>2]|0}if((x|0)==0){a[u]=2;y=t+1|0;z=o-1|0}else{a[u]=1;y=t;z=o}w=v+12|0;if((w|0)==(g|0)){r=z;s=y;break L1677}else{o=z;t=y;u=u+1|0;v=w}}}}while(0);y=b|0;b=e|0;e=h;z=0;x=s;s=r;while(1){r=c[y>>2]|0;do{if((r|0)==0){A=0}else{if((c[r+12>>2]|0)!=(c[r+16>>2]|0)){A=r;break}if((b1[c[(c[r>>2]|0)+36>>2]&1023](r)|0)==-1){c[y>>2]=0;A=0;break}else{A=c[y>>2]|0;break}}}while(0);r=(A|0)==0;m=c[b>>2]|0;if((m|0)==0){B=A;C=0}else{do{if((c[m+12>>2]|0)==(c[m+16>>2]|0)){if((b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){D=m;break}c[b>>2]=0;D=0}else{D=m}}while(0);B=c[y>>2]|0;C=D}E=(C|0)==0;if(!((r^E)&(s|0)!=0)){break}m=c[B+12>>2]|0;if((m|0)==(c[B+16>>2]|0)){F=b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{F=d[m]|0}m=F&255;if(k){G=m}else{G=ca[c[(c[e>>2]|0)+12>>2]&1023](h,m)|0}L1715:do{if(n){H=x;I=s}else{m=z+1|0;L1717:do{if(k){v=s;u=x;t=p;o=0;w=f;while(1){do{if(a[t]<<24>>24==1){J=w;if((a[J]&1)<<24>>24==0){K=w+1|0}else{K=c[w+8>>2]|0}if(G<<24>>24!=a[K+z|0]<<24>>24){a[t]=0;L=o;M=u;N=v-1|0;break}O=d[J]|0;if((O&1|0)==0){P=O>>>1}else{P=c[w+4>>2]|0}if((P|0)!=(m|0)){L=1;M=u;N=v;break}a[t]=2;L=1;M=u+1|0;N=v-1|0}else{L=o;M=u;N=v}}while(0);O=w+12|0;if((O|0)==(g|0)){Q=N;R=M;S=L;break L1717}v=N;u=M;t=t+1|0;o=L;w=O}}else{w=s;o=x;t=p;u=0;v=f;while(1){do{if(a[t]<<24>>24==1){O=v;if((a[O]&1)<<24>>24==0){T=v+1|0}else{T=c[v+8>>2]|0}if(G<<24>>24!=ca[c[(c[e>>2]|0)+12>>2]&1023](h,a[T+z|0]|0)<<24>>24){a[t]=0;U=u;V=o;W=w-1|0;break}J=d[O]|0;if((J&1|0)==0){X=J>>>1}else{X=c[v+4>>2]|0}if((X|0)!=(m|0)){U=1;V=o;W=w;break}a[t]=2;U=1;V=o+1|0;W=w-1|0}else{U=u;V=o;W=w}}while(0);J=v+12|0;if((J|0)==(g|0)){Q=W;R=V;S=U;break L1717}w=W;o=V;t=t+1|0;u=U;v=J}}}while(0);if((S&1)<<24>>24==0){H=R;I=Q;break}m=c[y>>2]|0;v=m+12|0;u=c[v>>2]|0;if((u|0)==(c[m+16>>2]|0)){t=c[(c[m>>2]|0)+40>>2]|0;b1[t&1023](m)}else{c[v>>2]=u+1|0}if((R+Q|0)>>>0<2|n){H=R;I=Q;break}u=z+1|0;v=R;m=p;t=f;while(1){do{if(a[m]<<24>>24==2){o=d[t]|0;if((o&1|0)==0){Y=o>>>1}else{Y=c[t+4>>2]|0}if((Y|0)==(u|0)){Z=v;break}a[m]=0;Z=v-1|0}else{Z=v}}while(0);o=t+12|0;if((o|0)==(g|0)){H=Z;I=Q;break L1715}else{v=Z;m=m+1|0;t=o}}}}while(0);z=z+1|0;x=H;s=I}do{if((B|0)==0){_=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){_=B;break}if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[y>>2]=0;_=0;break}else{_=c[y>>2]|0;break}}}while(0);y=(_|0)==0;do{if(E){$=1581}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){if(y){break}else{$=1583;break}}if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)==-1){c[b>>2]=0;$=1581;break}else{if(y^(C|0)==0){break}else{$=1583;break}}}}while(0);do{if(($|0)==1581){if(y){$=1583;break}else{break}}}while(0);if(($|0)==1583){c[j>>2]=c[j>>2]|2}L1796:do{if(n){$=1588}else{y=f;C=p;while(1){if(a[C]<<24>>24==2){aa=y;break L1796}b=y+12|0;if((b|0)==(g|0)){$=1588;break L1796}y=b;C=C+1|0}}}while(0);if(($|0)==1588){c[j>>2]=c[j>>2]|4;aa=g}if((q|0)==0){i=l;return aa|0}jE(q);i=l;return aa|0}function eH(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=a[m+24|0]<<24>>24==b<<24>>24;if(!p){if(a[m+25|0]<<24>>24!=b<<24>>24){break}}c[g>>2]=f+1|0;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&b<<24>>24==i<<24>>24){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4|0;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+26|0;i=m;while(1){if((i|0)==(k|0)){s=k;break}if(a[i]<<24>>24==b<<24>>24){s=i;break}else{i=i+1|0}}i=s-m|0;if((i|0)>23){q=-1;return q|0}do{if((e|0)==8|(e|0)==10){if((i|0)<(e|0)){break}else{q=-1}return q|0}else if((e|0)==16){if((i|0)<22){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if(a[n-1|0]<<24>>24!=48){q=-1;return q|0}c[h>>2]=0;m=a[i+5255388|0]|0;s=c[g>>2]|0;c[g>>2]=s+1|0;a[s]=m;q=0;return q|0}}while(0);if((n-f|0)<39){f=a[i+5255388|0]|0;c[g>>2]=n+1|0;a[n]=f}c[h>>2]=(c[h>>2]|0)+1|0;q=0;return q|0}function eI(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;g=b;h=b;i=a[h]|0;j=i&255;if((j&1|0)==0){k=j>>>1}else{k=c[b+4>>2]|0}if((k|0)==0){return}do{if((d|0)==(e|0)){l=i}else{k=e-4|0;if(k>>>0>d>>>0){m=d;n=k}else{l=i;break}while(1){k=c[m>>2]|0;c[m>>2]=c[n>>2]|0;c[n>>2]=k;k=m+4|0;j=n-4|0;if(k>>>0<j>>>0){m=k;n=j}else{break}}l=a[h]|0}}while(0);if((l&1)<<24>>24==0){o=g+1|0}else{o=c[b+8>>2]|0}g=l&255;if((g&1|0)==0){p=g>>>1}else{p=c[b+4>>2]|0}b=e-4|0;e=a[o]|0;g=e<<24>>24;l=e<<24>>24<1|e<<24>>24==127;L1876:do{if(b>>>0>d>>>0){e=o+p|0;h=o;n=d;m=g;i=l;while(1){if(!i){if((m|0)!=(c[n>>2]|0)){break}}j=(e-h|0)>1?h+1|0:h;k=n+4|0;q=a[j]|0;r=q<<24>>24;s=q<<24>>24<1|q<<24>>24==127;if(k>>>0<b>>>0){h=j;n=k;m=r;i=s}else{t=r;u=s;break L1876}}c[f>>2]=4;return}else{t=g;u=l}}while(0);if(u){return}u=c[b>>2]|0;if(!(t>>>0<u>>>0|(u|0)==0)){return}c[f>>2]=4;return}function eJ(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+4|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}k=c[bz()>>2]|0;c[bz()>>2]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);l=bK(b|0,h|0,f|0,c[1311652]|0)|0;f=I;b=c[bz()>>2]|0;if((b|0)==0){c[bz()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=-1;h=0;if((b|0)==34|((f|0)<(d|0)|(f|0)==(d|0)&l>>>0<-2147483648>>>0)|((f|0)>(h|0)|(f|0)==(h|0)&l>>>0>2147483647>>>0)){c[e>>2]=4;e=0;j=(f|0)>(e|0)|(f|0)==(e|0)&l>>>0>0>>>0?2147483647:-2147483648;i=g;return j|0}else{j=l;i=g;return j|0}return 0}function eK(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+256|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+28|0;n=e+32|0;o=e+44|0;p=e+84|0;q=e+88|0;r=e+248|0;s=e+252|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==8){u=16}else if((t|0)==0){u=0}else{u=10}t=l|0;eM(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L1921:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1694}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L1921}}if((b1[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1694;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L1921}}}}while(0);if((y|0)==1694){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{F=d[D]|0}if((eH(F&255,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;b1[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);s=eL(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=I;eI(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L1965:do{if(C){y=1725}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1725;break L1965}}while(0);if(l^(B|0)==0){break}else{y=1727;break}}}while(0);do{if((y|0)==1725){if(l){y=1727;break}else{break}}}while(0);if((y|0)==1727){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function eL(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0;g=i;i=i+4|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0;i=g;return(I=j,k)|0}l=c[bz()>>2]|0;c[bz()>>2]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);m=bK(b|0,h|0,f|0,c[1311652]|0)|0;f=I;b=c[bz()>>2]|0;if((b|0)==0){c[bz()>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;i=g;return(I=j,k)|0}if((b|0)!=34){j=f;k=m;i=g;return(I=j,k)|0}c[e>>2]=4;e=0;b=(f|0)>(e|0)|(f|0)==(e|0)&m>>>0>0>>>0;j=b?2147483647:-2147483648;k=b?-1:0;i=g;return(I=j,k)|0}function eM(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;g=i;i=i+24|0;h=g|0;j=g+12|0;k=c[d+28>>2]|0;d=k+4|0;G=c[d>>2]|0,c[d>>2]=G+1,G;if((c[1313737]|0)!=-1){c[j>>2]=5254948;c[j+4>>2]=24;c[j+8>>2]=0;dn(5254948,j,252)}j=(c[1313738]|0)-1|0;l=k+12|0;m=k+8|0;n=c[m>>2]|0;do{if((c[l>>2]|0)-n>>2>>>0>j>>>0){o=c[n+(j<<2)>>2]|0;if((o|0)==0){break}b7[c[(c[o>>2]|0)+32>>2]&1023](o,5255388,5255414,e);if((c[1313645]|0)!=-1){c[h>>2]=5254580;c[h+4>>2]=24;c[h+8>>2]=0;dn(5254580,h,252)}o=(c[1313646]|0)-1|0;p=c[m>>2]|0;do{if((c[l>>2]|0)-p>>2>>>0>o>>>0){q=c[p+(o<<2)>>2]|0;if((q|0)==0){break}r=q;a[f]=b1[c[(c[q>>2]|0)+16>>2]&1023](r)|0;b$[c[(c[q>>2]|0)+20>>2]&1023](b,r);if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){i=g;return}b_[c[(c[k>>2]|0)+8>>2]&1023](k);i=g;return}}while(0);o=bQ(4)|0;c[o>>2]=5247504;bo(o|0,5252716,512)}}while(0);g=bQ(4)|0;c[g>>2]=5247504;bo(g|0,5252716,512)}function eN(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;f=i;i=i+256|0;m=g;g=i;i=i+4|0;c[g>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;c[h>>2]=c[m>>2]|0;m=f|0;n=f+28|0;o=f+32|0;p=f+44|0;q=f+84|0;r=f+88|0;s=f+248|0;t=f+252|0;u=c[j+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=m|0;eM(o,j,u,n);j=p|0;jS(j|0,0,40);c[q>>2]=j;p=r|0;c[s>>2]=p;c[t>>2]=0;m=g|0;g=h|0;h=a[n]|0;n=c[m>>2]|0;L2032:while(1){do{if((n|0)==0){w=0}else{if((c[n+12>>2]|0)!=(c[n+16>>2]|0)){w=n;break}if((b1[c[(c[n>>2]|0)+36>>2]&1023](n)|0)!=-1){w=n;break}c[m>>2]=0;w=0}}while(0);x=(w|0)==0;y=c[g>>2]|0;do{if((y|0)==0){z=1790}else{if((c[y+12>>2]|0)!=(c[y+16>>2]|0)){if(x){A=y;B=0;break}else{C=y;D=0;break L2032}}if((b1[c[(c[y>>2]|0)+36>>2]&1023](y)|0)==-1){c[g>>2]=0;z=1790;break}else{E=(y|0)==0;if(x^E){A=y;B=E;break}else{C=y;D=E;break L2032}}}}while(0);if((z|0)==1790){z=0;if(x){C=0;D=1;break}else{A=0;B=1}}y=w+12|0;E=c[y>>2]|0;F=w+16|0;if((E|0)==(c[F>>2]|0)){G=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{G=d[E]|0}if((eH(G&255,v,j,q,t,h,o,p,s,u)|0)!=0){C=A;D=B;break}E=c[y>>2]|0;if((E|0)==(c[F>>2]|0)){F=c[(c[w>>2]|0)+40>>2]|0;b1[F&1023](w);n=w;continue}else{c[y>>2]=E+1|0;n=w;continue}}n=o;B=d[n]|0;if((B&1|0)==0){H=B>>>1}else{H=c[o+4>>2]|0}do{if((H|0)!=0){B=c[s>>2]|0;if((B-r|0)>=160){break}A=c[t>>2]|0;c[s>>2]=B+4|0;c[B>>2]=A}}while(0);b[l>>1]=eO(j,c[q>>2]|0,k,v)|0;eI(o,p,c[s>>2]|0,k);do{if(x){I=0}else{if((c[w+12>>2]|0)!=(c[w+16>>2]|0)){I=w;break}if((b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0)!=-1){I=w;break}c[m>>2]=0;I=0}}while(0);m=(I|0)==0;L2076:do{if(D){z=1821}else{do{if((c[C+12>>2]|0)==(c[C+16>>2]|0)){if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)!=-1){break}c[g>>2]=0;z=1821;break L2076}}while(0);if(m^(C|0)==0){break}else{z=1823;break}}}while(0);do{if((z|0)==1821){if(m){z=1823;break}else{break}}}while(0);if((z|0)==1823){c[k>>2]=c[k>>2]|2}c[e>>2]=I;if((a[n]&1)<<24>>24==0){i=f;return}jM(c[o+8>>2]|0);i=f;return}function eO(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+4|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if(a[b]<<24>>24==45){c[e>>2]=4;j=0;i=g;return j|0}k=c[bz()>>2]|0;c[bz()>>2]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);l=aJ(b|0,h|0,f|0,c[1311652]|0)|0;f=I;b=c[bz()>>2]|0;if((b|0)==0){c[bz()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((b|0)==34|(f>>>0>d>>>0|f>>>0==d>>>0&l>>>0>65535>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=l&65535;i=g;return j|0}return 0}function eP(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+256|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+28|0;n=e+32|0;o=e+44|0;p=e+84|0;q=e+88|0;r=e+248|0;s=e+252|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==64){u=8}else if((t|0)==8){u=16}else{u=10}t=l|0;eM(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2124:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1867}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2124}}if((b1[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1867;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2124}}}}while(0);if((y|0)==1867){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{F=d[D]|0}if((eH(F&255,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;b1[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);c[k>>2]=eQ(h,c[p>>2]|0,j,u)|0;eI(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2168:do{if(C){y=1898}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1898;break L2168}}while(0);if(l^(B|0)==0){break}else{y=1900;break}}}while(0);do{if((y|0)==1898){if(l){y=1900;break}else{break}}}while(0);if((y|0)==1900){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function eQ(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+4|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if(a[b]<<24>>24==45){c[e>>2]=4;j=0;i=g;return j|0}k=c[bz()>>2]|0;c[bz()>>2]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);l=aJ(b|0,h|0,f|0,c[1311652]|0)|0;f=I;b=c[bz()>>2]|0;if((b|0)==0){c[bz()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((b|0)==34|(f>>>0>d>>>0|f>>>0==d>>>0&l>>>0>-1>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=l;i=g;return j|0}return 0}function eR(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+256|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+28|0;n=e+32|0;o=e+44|0;p=e+84|0;q=e+88|0;r=e+248|0;s=e+252|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==8){u=16}else if((t|0)==0){u=0}else{u=10}t=l|0;eM(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2216:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=1944}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2216}}if((b1[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=1944;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2216}}}}while(0);if((y|0)==1944){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{F=d[D]|0}if((eH(F&255,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;b1[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);c[k>>2]=eS(h,c[p>>2]|0,j,u)|0;eI(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2260:do{if(C){y=1975}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=1975;break L2260}}while(0);if(l^(B|0)==0){break}else{y=1977;break}}}while(0);do{if((y|0)==1975){if(l){y=1977;break}else{break}}}while(0);if((y|0)==1977){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function eS(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0;g=i;i=i+4|0;h=g|0;if((b|0)==(d|0)){c[e>>2]=4;j=0;i=g;return j|0}if(a[b]<<24>>24==45){c[e>>2]=4;j=0;i=g;return j|0}k=c[bz()>>2]|0;c[bz()>>2]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);l=aJ(b|0,h|0,f|0,c[1311652]|0)|0;f=I;b=c[bz()>>2]|0;if((b|0)==0){c[bz()>>2]=k}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;i=g;return j|0}d=0;if((b|0)==34|(f>>>0>d>>>0|f>>>0==d>>>0&l>>>0>-1>>>0)){c[e>>2]=4;j=-1;i=g;return j|0}else{j=l;i=g;return j|0}return 0}function eT(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;e=i;i=i+256|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+28|0;n=e+32|0;o=e+44|0;p=e+84|0;q=e+88|0;r=e+248|0;s=e+252|0;t=c[h+4>>2]&74;if((t|0)==64){u=8}else if((t|0)==8){u=16}else if((t|0)==0){u=0}else{u=10}t=l|0;eM(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=a[m]|0;m=c[l>>2]|0;L2308:while(1){do{if((m|0)==0){v=0}else{if((c[m+12>>2]|0)!=(c[m+16>>2]|0)){v=m;break}if((b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);w=(v|0)==0;x=c[f>>2]|0;do{if((x|0)==0){y=2021}else{if((c[x+12>>2]|0)!=(c[x+16>>2]|0)){if(w){z=x;A=0;break}else{B=x;C=0;break L2308}}if((b1[c[(c[x>>2]|0)+36>>2]&1023](x)|0)==-1){c[f>>2]=0;y=2021;break}else{D=(x|0)==0;if(w^D){z=x;A=D;break}else{B=x;C=D;break L2308}}}}while(0);if((y|0)==2021){y=0;if(w){B=0;C=1;break}else{z=0;A=1}}x=v+12|0;D=c[x>>2]|0;E=v+16|0;if((D|0)==(c[E>>2]|0)){F=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{F=d[D]|0}if((eH(F&255,u,h,p,s,g,n,o,r,t)|0)!=0){B=z;C=A;break}D=c[x>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[v>>2]|0)+40>>2]|0;b1[E&1023](v);m=v;continue}else{c[x>>2]=D+1|0;m=v;continue}}m=n;A=d[m]|0;if((A&1|0)==0){G=A>>>1}else{G=c[n+4>>2]|0}do{if((G|0)!=0){A=c[r>>2]|0;if((A-q|0)>=160){break}z=c[s>>2]|0;c[r>>2]=A+4|0;c[A>>2]=z}}while(0);s=eU(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=I;eI(n,o,c[r>>2]|0,j);do{if(w){H=0}else{if((c[v+12>>2]|0)!=(c[v+16>>2]|0)){H=v;break}if((b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0)!=-1){H=v;break}c[l>>2]=0;H=0}}while(0);l=(H|0)==0;L2352:do{if(C){y=2052}else{do{if((c[B+12>>2]|0)==(c[B+16>>2]|0)){if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)!=-1){break}c[f>>2]=0;y=2052;break L2352}}while(0);if(l^(B|0)==0){break}else{y=2054;break}}}while(0);do{if((y|0)==2052){if(l){y=2054;break}else{break}}}while(0);if((y|0)==2054){c[j>>2]=c[j>>2]|2}c[b>>2]=H;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function eU(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;g=i;i=i+4|0;h=g|0;do{if((b|0)==(d|0)){c[e>>2]=4;j=0;k=0}else{if(a[b]<<24>>24==45){c[e>>2]=4;j=0;k=0;break}l=c[bz()>>2]|0;c[bz()>>2]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);m=aJ(b|0,h|0,f|0,c[1311652]|0)|0;n=I;o=c[bz()>>2]|0;if((o|0)==0){c[bz()>>2]=l}if((c[h>>2]|0)!=(d|0)){c[e>>2]=4;j=0;k=0;break}if((o|0)!=34){j=n;k=m;break}c[e>>2]=4;j=-1;k=-1}}while(0);i=g;return(I=j,k)|0}function eV(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0;p=c[h>>2]|0;q=g;if((p-q|0)>38){r=-1;return r|0}if(b<<24>>24==i<<24>>24){if((a[e]&1)<<24>>24==0){r=-1;return r|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1|0;a[i]=46;i=d[k]|0;if((i&1|0)==0){s=i>>>1}else{s=c[k+4>>2]|0}if((s|0)==0){r=0;return r|0}s=c[m>>2]|0;if((s-l|0)>=160){r=0;return r|0}i=c[n>>2]|0;c[m>>2]=s+4|0;c[s>>2]=i;r=0;return r|0}do{if(b<<24>>24==j<<24>>24){i=d[k]|0;if((i&1|0)==0){t=i>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}if((a[e]&1)<<24>>24==0){r=-1;return r|0}i=c[m>>2]|0;if((i-l|0)>=160){r=0;return r|0}s=c[n>>2]|0;c[m>>2]=i+4|0;c[i>>2]=s;c[n>>2]=0;r=0;return r|0}}while(0);t=o+32|0;j=o;while(1){if((j|0)==(t|0)){u=t;break}if(a[j]<<24>>24==b<<24>>24){u=j;break}else{j=j+1|0}}j=u-o|0;if((j|0)>31){r=-1;return r|0}o=a[j+5255388|0]|0;do{if((j|0)==25|(j|0)==24){do{if((p|0)!=(g|0)){if((a[p-1|0]&95|0)==(a[f]&127|0)){break}else{r=-1}return r|0}}while(0);c[h>>2]=p+1|0;a[p]=o;r=0;return r|0}else if((j|0)==22|(j|0)==23){a[f]=80}else{u=a[f]|0;if((o&95|0)!=(u<<24>>24|0)){break}a[f]=u|-128;if((a[e]&1)<<24>>24==0){break}a[e]=0;u=d[k]|0;if((u&1|0)==0){v=u>>>1}else{v=c[k+4>>2]|0}if((v|0)==0){break}u=c[m>>2]|0;if((u-l|0)>=160){break}b=c[n>>2]|0;c[m>>2]=u+4|0;c[u>>2]=b}}while(0);m=c[h>>2]|0;if((m-q|0)<((a[f]<<24>>24<0?39:29)|0)){c[h>>2]=m+1|0;a[m]=o}if((j|0)>21){r=0;return r|0}c[n>>2]=(c[n>>2]|0)+1|0;r=0;return r|0}function eW(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0.0,I=0.0,J=0;e=i;i=i+276|0;m=f;f=i;i=i+4|0;c[f>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;c[h>>2]=c[m>>2]|0;m=e|0;n=e+36|0;o=e+40|0;p=e+44|0;q=e+96|0;r=e+100|0;s=e+260|0;t=e+264|0;u=e+268|0;v=e+272|0;w=e+4|0;eX(p,j,w,n,o);j=e+56|0;jS(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=h|0;h=a[n]|0;n=a[o]|0;o=c[y>>2]|0;L2457:while(1){do{if((o|0)==0){z=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){z=o;break}if((b1[c[(c[o>>2]|0)+36>>2]&1023](o)|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);A=(z|0)==0;B=c[f>>2]|0;do{if((B|0)==0){C=2140}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){if(A){break}else{break L2457}}if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[f>>2]=0;C=2140;break}else{if(A^(B|0)==0){break}else{break L2457}}}}while(0);if((C|0)==2140){C=0;if(A){break}}B=z+12|0;D=c[B>>2]|0;E=z+16|0;if((D|0)==(c[E>>2]|0)){F=b1[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{F=d[D]|0}if((eV(F&255,u,v,j,q,h,n,p,x,s,t,w)|0)!=0){break}D=c[B>>2]|0;if((D|0)==(c[E>>2]|0)){E=c[(c[z>>2]|0)+40>>2]|0;b1[E&1023](z);o=z;continue}else{c[B>>2]=D+1|0;o=z;continue}}z=p;o=d[z]|0;if((o&1|0)==0){G=o>>>1}else{G=c[p+4>>2]|0}do{if((G|0)!=0){if((a[u]&1)<<24>>24==0){break}o=c[s>>2]|0;if((o-r|0)>=160){break}w=c[t>>2]|0;c[s>>2]=o+4|0;c[o>>2]=w}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;H=0.0}else{do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);I=+jQ(j,m);if((c[m>>2]|0)==(t|0)){H=I;break}else{c[k>>2]=4;H=0.0;break}}}while(0);g[l>>2]=H;eI(p,x,c[s>>2]|0,k);s=c[y>>2]|0;do{if((s|0)==0){J=0}else{if((c[s+12>>2]|0)!=(c[s+16>>2]|0)){J=s;break}if((b1[c[(c[s>>2]|0)+36>>2]&1023](s)|0)!=-1){J=s;break}c[y>>2]=0;J=0}}while(0);y=(J|0)==0;s=c[f>>2]|0;do{if((s|0)==0){C=2182}else{if((c[s+12>>2]|0)!=(c[s+16>>2]|0)){if(y){break}else{C=2184;break}}if((b1[c[(c[s>>2]|0)+36>>2]&1023](s)|0)==-1){c[f>>2]=0;C=2182;break}else{if(y^(s|0)==0){break}else{C=2184;break}}}}while(0);do{if((C|0)==2182){if(y){C=2184;break}else{break}}}while(0);if((C|0)==2184){c[k>>2]=c[k>>2]|2}c[b>>2]=J;if((a[z]&1)<<24>>24==0){i=e;return}jM(c[p+8>>2]|0);i=e;return}function eX(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;h=i;i=i+24|0;j=h|0;k=h+12|0;l=c[d+28>>2]|0;d=l+4|0;G=c[d>>2]|0,c[d>>2]=G+1,G;if((c[1313737]|0)!=-1){c[k>>2]=5254948;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254948,k,252)}k=(c[1313738]|0)-1|0;m=l+12|0;n=l+8|0;o=c[n>>2]|0;do{if((c[m>>2]|0)-o>>2>>>0>k>>>0){p=c[o+(k<<2)>>2]|0;if((p|0)==0){break}b7[c[(c[p>>2]|0)+32>>2]&1023](p,5255388,5255420,e);if((c[1313645]|0)!=-1){c[j>>2]=5254580;c[j+4>>2]=24;c[j+8>>2]=0;dn(5254580,j,252)}p=(c[1313646]|0)-1|0;q=c[n>>2]|0;do{if((c[m>>2]|0)-q>>2>>>0>p>>>0){r=c[q+(p<<2)>>2]|0;if((r|0)==0){break}s=r;t=r;a[f]=b1[c[(c[t>>2]|0)+12>>2]&1023](s)|0;a[g]=b1[c[(c[t>>2]|0)+16>>2]&1023](s)|0;b$[c[(c[r>>2]|0)+20>>2]&1023](b,s);if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)!=0){i=h;return}b_[c[(c[l>>2]|0)+8>>2]&1023](l);i=h;return}}while(0);p=bQ(4)|0;c[p>>2]=5247504;bo(p|0,5252716,512)}}while(0);h=bQ(4)|0;c[h>>2]=5247504;bo(h|0,5252716,512)}function eY(b,e,f,g,j,l,m){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0.0,J=0.0,K=0;e=i;i=i+276|0;n=f;f=i;i=i+4|0;c[f>>2]=c[n>>2]|0;n=g;g=i;i=i+4|0;c[g>>2]=c[n>>2]|0;n=e|0;o=e+36|0;p=e+40|0;q=e+44|0;r=e+96|0;s=e+100|0;t=e+260|0;u=e+264|0;v=e+268|0;w=e+272|0;x=e+4|0;eX(q,j,x,o,p);j=e+56|0;jS(j|0,0,40);c[r>>2]=j;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;z=f|0;f=g|0;g=a[o]|0;o=a[p]|0;p=c[z>>2]|0;L2557:while(1){do{if((p|0)==0){A=0}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){A=p;break}if((b1[c[(c[p>>2]|0)+36>>2]&1023](p)|0)!=-1){A=p;break}c[z>>2]=0;A=0}}while(0);B=(A|0)==0;C=c[f>>2]|0;do{if((C|0)==0){D=2226}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){if(B){break}else{break L2557}}if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)==-1){c[f>>2]=0;D=2226;break}else{if(B^(C|0)==0){break}else{break L2557}}}}while(0);if((D|0)==2226){D=0;if(B){break}}C=A+12|0;E=c[C>>2]|0;F=A+16|0;if((E|0)==(c[F>>2]|0)){G=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{G=d[E]|0}if((eV(G&255,v,w,j,r,g,o,q,y,t,u,x)|0)!=0){break}E=c[C>>2]|0;if((E|0)==(c[F>>2]|0)){F=c[(c[A>>2]|0)+40>>2]|0;b1[F&1023](A);p=A;continue}else{c[C>>2]=E+1|0;p=A;continue}}A=q;p=d[A]|0;if((p&1|0)==0){H=p>>>1}else{H=c[q+4>>2]|0}do{if((H|0)!=0){if((a[v]&1)<<24>>24==0){break}p=c[t>>2]|0;if((p-s|0)>=160){break}x=c[u>>2]|0;c[t>>2]=p+4|0;c[p>>2]=x}}while(0);u=c[r>>2]|0;do{if((j|0)==(u|0)){c[l>>2]=4;I=0.0}else{do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);J=+jQ(j,n);if((c[n>>2]|0)==(u|0)){I=J;break}c[l>>2]=4;I=0.0}}while(0);h[k>>3]=I,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;eI(q,y,c[t>>2]|0,l);t=c[z>>2]|0;do{if((t|0)==0){K=0}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){K=t;break}if((b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0)!=-1){K=t;break}c[z>>2]=0;K=0}}while(0);z=(K|0)==0;t=c[f>>2]|0;do{if((t|0)==0){D=2267}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){if(z){break}else{D=2269;break}}if((b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0)==-1){c[f>>2]=0;D=2267;break}else{if(z^(t|0)==0){break}else{D=2269;break}}}}while(0);do{if((D|0)==2267){if(z){D=2269;break}else{break}}}while(0);if((D|0)==2269){c[l>>2]=c[l>>2]|2}c[b>>2]=K;if((a[A]&1)<<24>>24==0){i=e;return}jM(c[q+8>>2]|0);i=e;return}function eZ(b,e,f,g,j,l,m){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0.0,J=0.0,K=0;e=i;i=i+276|0;n=f;f=i;i=i+4|0;c[f>>2]=c[n>>2]|0;n=g;g=i;i=i+4|0;c[g>>2]=c[n>>2]|0;n=e|0;o=e+36|0;p=e+40|0;q=e+44|0;r=e+96|0;s=e+100|0;t=e+260|0;u=e+264|0;v=e+268|0;w=e+272|0;x=e+4|0;eX(q,j,x,o,p);j=e+56|0;jS(j|0,0,40);c[r>>2]=j;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;z=f|0;f=g|0;g=a[o]|0;o=a[p]|0;p=c[z>>2]|0;L2630:while(1){do{if((p|0)==0){A=0}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){A=p;break}if((b1[c[(c[p>>2]|0)+36>>2]&1023](p)|0)!=-1){A=p;break}c[z>>2]=0;A=0}}while(0);B=(A|0)==0;C=c[f>>2]|0;do{if((C|0)==0){D=2287}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){if(B){break}else{break L2630}}if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)==-1){c[f>>2]=0;D=2287;break}else{if(B^(C|0)==0){break}else{break L2630}}}}while(0);if((D|0)==2287){D=0;if(B){break}}C=A+12|0;E=c[C>>2]|0;F=A+16|0;if((E|0)==(c[F>>2]|0)){G=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{G=d[E]|0}if((eV(G&255,v,w,j,r,g,o,q,y,t,u,x)|0)!=0){break}E=c[C>>2]|0;if((E|0)==(c[F>>2]|0)){F=c[(c[A>>2]|0)+40>>2]|0;b1[F&1023](A);p=A;continue}else{c[C>>2]=E+1|0;p=A;continue}}A=q;p=d[A]|0;if((p&1|0)==0){H=p>>>1}else{H=c[q+4>>2]|0}do{if((H|0)!=0){if((a[v]&1)<<24>>24==0){break}p=c[t>>2]|0;if((p-s|0)>=160){break}x=c[u>>2]|0;c[t>>2]=p+4|0;c[p>>2]=x}}while(0);u=c[r>>2]|0;do{if((j|0)==(u|0)){c[l>>2]=4;I=1.1125369292536007e-308}else{do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);J=+jQ(j,n);if((c[n>>2]|0)==(u|0)){I=J;break}else{c[l>>2]=4;I=1.1125369292536007e-308;break}}}while(0);h[k>>3]=I,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;eI(q,y,c[t>>2]|0,l);t=c[z>>2]|0;do{if((t|0)==0){K=0}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){K=t;break}if((b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0)!=-1){K=t;break}c[z>>2]=0;K=0}}while(0);z=(K|0)==0;t=c[f>>2]|0;do{if((t|0)==0){D=2329}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){if(z){break}else{D=2331;break}}if((b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0)==-1){c[f>>2]=0;D=2329;break}else{if(z^(t|0)==0){break}else{D=2331;break}}}}while(0);do{if((D|0)==2329){if(z){D=2331;break}else{break}}}while(0);if((D|0)==2331){c[l>>2]=c[l>>2]|2}c[b>>2]=K;if((a[A]&1)<<24>>24==0){i=e;return}jM(c[q+8>>2]|0);i=e;return}function e_(a){a=a|0;return}function e$(a){a=a|0;jM(a);return}function e0(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+52|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+12|0;n=e+40|0;o=n;p=i;i=i+40|0;q=i;i=i+4|0;r=i;i=i+160|0;s=i;i=i+4|0;t=i;i=i+4|0;jS(o|0,0,12);u=c[h+28>>2]|0;h=u+4|0;G=c[h>>2]|0,c[h>>2]=G+1,G;if((c[1313737]|0)!=-1){c[l>>2]=5254948;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254948,l,252)}l=(c[1313738]|0)-1|0;v=c[u+8>>2]|0;do{if((c[u+12>>2]|0)-v>>2>>>0>l>>>0){w=c[v+(l<<2)>>2]|0;if((w|0)==0){break}x=m|0;b7[c[(c[w>>2]|0)+32>>2]&1023](w,5255388,5255414,x);if(((G=c[h>>2]|0,c[h>>2]=G+ -1,G)|0)==0){b_[c[(c[u>>2]|0)+8>>2]&1023](u)}w=p|0;jS(w|0,0,40);c[q>>2]=w;y=r|0;c[s>>2]=y;c[t>>2]=0;A=f|0;B=g|0;C=c[A>>2]|0;L2717:while(1){do{if((C|0)==0){D=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){D=C;break}if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)!=-1){D=C;break}c[A>>2]=0;D=0}}while(0);E=(D|0)==0;F=c[B>>2]|0;do{if((F|0)==0){H=2360}else{if((c[F+12>>2]|0)!=(c[F+16>>2]|0)){if(E){break}else{break L2717}}if((b1[c[(c[F>>2]|0)+36>>2]&1023](F)|0)==-1){c[B>>2]=0;H=2360;break}else{if(E^(F|0)==0){break}else{break L2717}}}}while(0);if((H|0)==2360){H=0;if(E){break}}F=D+12|0;I=c[F>>2]|0;J=D+16|0;if((I|0)==(c[J>>2]|0)){K=b1[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{K=d[I]|0}if((eH(K&255,16,w,q,t,0,n,y,s,x)|0)!=0){break}I=c[F>>2]|0;if((I|0)==(c[J>>2]|0)){J=c[(c[D>>2]|0)+40>>2]|0;b1[J&1023](D);C=D;continue}else{c[F>>2]=I+1|0;C=D;continue}}a[p+39|0]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);if((e1(w,c[1311652]|0,5244048,(z=i,i=i+4|0,c[z>>2]=k,z)|0)|0)!=1){c[j>>2]=4}C=c[A>>2]|0;do{if((C|0)==0){L=0}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){L=C;break}if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)!=-1){L=C;break}c[A>>2]=0;L=0}}while(0);A=(L|0)==0;C=c[B>>2]|0;do{if((C|0)==0){H=2393}else{if((c[C+12>>2]|0)!=(c[C+16>>2]|0)){if(A){break}else{H=2395;break}}if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)==-1){c[B>>2]=0;H=2393;break}else{if(A^(C|0)==0){break}else{H=2395;break}}}}while(0);do{if((H|0)==2393){if(A){H=2395;break}else{break}}}while(0);if((H|0)==2395){c[j>>2]=c[j>>2]|2}c[b>>2]=L;if((a[o]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}}while(0);e=bQ(4)|0;c[e>>2]=5247504;bo(e|0,5252716,512)}function e1(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+4|0;g=f|0;c[g>>2]=e;e=bE(b|0)|0;b=bF(a|0,d|0,c[g>>2]|0)|0;if((e|0)==0){i=f;return b|0}bE(e|0);i=f;return b|0}function e2(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;k=i;i=i+68|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=k|0;m=k+12|0;n=k+24|0;o=k+28|0;p=k+32|0;q=k+36|0;r=k+40|0;s=k+64|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;t=c[(c[d>>2]|0)+16>>2]|0;u=e|0;c[p>>2]=c[u>>2]|0;c[q>>2]=c[f>>2]|0;b3[t&1023](o,d,p,q,g,h,n);q=c[o>>2]|0;c[u>>2]=q;u=c[n>>2]|0;if((u|0)==0){a[j]=0}else if((u|0)==1){a[j]=1}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}q=g+28|0;g=c[q>>2]|0;u=g+4|0;G=c[u>>2]|0,c[u>>2]=G+1,G;if((c[1313735]|0)!=-1){c[m>>2]=5254940;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254940,m,252)}m=(c[1313736]|0)-1|0;n=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-n>>2>>>0>m>>>0){o=c[n+(m<<2)>>2]|0;if((o|0)==0){break}p=o;if(((G=c[u>>2]|0,c[u>>2]=G+ -1,G)|0)==0){b_[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[q>>2]|0;d=o+4|0;G=c[d>>2]|0,c[d>>2]=G+1,G;if((c[1313643]|0)!=-1){c[l>>2]=5254572;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254572,l,252)}t=(c[1313644]|0)-1|0;v=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-v>>2>>>0>t>>>0){w=c[v+(t<<2)>>2]|0;if((w|0)==0){break}x=w;if(((G=c[d>>2]|0,c[d>>2]=G+ -1,G)|0)==0){b_[c[(c[o>>2]|0)+8>>2]&1023](o)}y=r|0;z=w;b$[c[(c[z>>2]|0)+24>>2]&1023](y,x);b$[c[(c[z>>2]|0)+28>>2]&1023](r+12|0,x);c[s>>2]=c[f>>2]|0;a[j]=(e4(e,s,y,r+24|0,p,h,1)|0)==(y|0)&1;c[b>>2]=c[e>>2]|0;if((a[r+12|0]&1)<<24>>24!=0){jM(c[r+20>>2]|0)}if((a[r]&1)<<24>>24==0){i=k;return}jM(c[r+8>>2]|0);i=k;return}}while(0);p=bQ(4)|0;c[p>>2]=5247504;bo(p|0,5252716,512)}}while(0);k=bQ(4)|0;c[k>>2]=5247504;bo(k|0,5252716,512)}function e3(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+332|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+108|0;o=e+120|0;p=e+160|0;q=e+164|0;r=e+324|0;s=e+328|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l|0;e7(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L2834:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2474}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2474;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L2834}}}}while(0);if((z|0)==2474){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((e5(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;b1[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);c[k>>2]=eJ(h,c[p>>2]|0,j,u)|0;eI(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2507}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){L=b1[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{L=c[v>>2]|0}if((L|0)==-1){c[f>>2]=0;z=2507;break}else{if(l^(E|0)==0){break}else{z=2509;break}}}}while(0);do{if((z|0)==2507){if(l){z=2509;break}else{break}}}while(0);if((z|0)==2509){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function e4(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;l=i;i=i+100|0;m=e;e=i;i=i+4|0;c[e>>2]=c[m>>2]|0;m=(g-f|0)/12&-1;n=l|0;do{if(m>>>0>100){o=jD(m)|0;if((o|0)!=0){p=o;q=o;break}o=bQ(4)|0;c[o>>2]=5247480;bo(o|0,5252704,66)}else{p=n;q=0}}while(0);n=(f|0)==(g|0);L2906:do{if(n){r=m;s=0}else{o=m;t=0;u=p;v=f;while(1){w=d[v]|0;if((w&1|0)==0){x=w>>>1}else{x=c[v+4>>2]|0}if((x|0)==0){a[u]=2;y=t+1|0;z=o-1|0}else{a[u]=1;y=t;z=o}w=v+12|0;if((w|0)==(g|0)){r=z;s=y;break L2906}else{o=z;t=y;u=u+1|0;v=w}}}}while(0);y=b|0;b=e|0;e=h;z=0;x=s;s=r;while(1){r=c[y>>2]|0;do{if((r|0)==0){A=0}else{m=c[r+12>>2]|0;if((m|0)==(c[r+16>>2]|0)){B=b1[c[(c[r>>2]|0)+36>>2]&1023](r)|0}else{B=c[m>>2]|0}if((B|0)==-1){c[y>>2]=0;A=0;break}else{A=c[y>>2]|0;break}}}while(0);r=(A|0)==0;m=c[b>>2]|0;if((m|0)==0){C=A;D=0}else{v=c[m+12>>2]|0;if((v|0)==(c[m+16>>2]|0)){E=b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{E=c[v>>2]|0}if((E|0)==-1){c[b>>2]=0;F=0}else{F=m}C=c[y>>2]|0;D=F}G=(D|0)==0;if(!((r^G)&(s|0)!=0)){break}r=c[C+12>>2]|0;if((r|0)==(c[C+16>>2]|0)){H=b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0}else{H=c[r>>2]|0}if(k){I=H}else{I=ca[c[(c[e>>2]|0)+28>>2]&1023](h,H)|0}L2948:do{if(n){J=x;K=s}else{r=z+1|0;m=s;v=x;u=p;t=0;o=f;while(1){do{if(a[u]<<24>>24==1){w=o;if((a[w]&1)<<24>>24==0){L=o+4|0}else{L=c[o+8>>2]|0}M=c[L+(z<<2)>>2]|0;if(k){N=M}else{N=ca[c[(c[e>>2]|0)+28>>2]&1023](h,M)|0}if((I|0)!=(N|0)){a[u]=0;O=t;P=v;Q=m-1|0;break}M=d[w]|0;if((M&1|0)==0){R=M>>>1}else{R=c[o+4>>2]|0}if((R|0)!=(r|0)){O=1;P=v;Q=m;break}a[u]=2;O=1;P=v+1|0;Q=m-1|0}else{O=t;P=v;Q=m}}while(0);M=o+12|0;if((M|0)==(g|0)){break}m=Q;v=P;u=u+1|0;t=O;o=M}if((O&1)<<24>>24==0){J=P;K=Q;break}o=c[y>>2]|0;t=o+12|0;u=c[t>>2]|0;if((u|0)==(c[o+16>>2]|0)){v=c[(c[o>>2]|0)+40>>2]|0;b1[v&1023](o)}else{c[t>>2]=u+4|0}if((P+Q|0)>>>0<2|n){J=P;K=Q;break}u=z+1|0;t=P;o=p;v=f;while(1){do{if(a[o]<<24>>24==2){m=d[v]|0;if((m&1|0)==0){S=m>>>1}else{S=c[v+4>>2]|0}if((S|0)==(u|0)){T=t;break}a[o]=0;T=t-1|0}else{T=t}}while(0);m=v+12|0;if((m|0)==(g|0)){J=T;K=Q;break L2948}else{t=T;o=o+1|0;v=m}}}}while(0);z=z+1|0;x=J;s=K}do{if((C|0)==0){U=1}else{K=c[C+12>>2]|0;if((K|0)==(c[C+16>>2]|0)){V=b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0}else{V=c[K>>2]|0}if((V|0)==-1){c[y>>2]=0;U=1;break}else{U=(c[y>>2]|0)==0;break}}}while(0);do{if(G){W=2598}else{y=c[D+12>>2]|0;if((y|0)==(c[D+16>>2]|0)){X=b1[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{X=c[y>>2]|0}if((X|0)==-1){c[b>>2]=0;W=2598;break}else{if(U^(D|0)==0){break}else{W=2600;break}}}}while(0);do{if((W|0)==2598){if(U){W=2600;break}else{break}}}while(0);if((W|0)==2600){c[j>>2]=c[j>>2]|2}L3014:do{if(n){W=2605}else{U=f;D=p;while(1){if(a[D]<<24>>24==2){Y=U;break L3014}b=U+12|0;if((b|0)==(g|0)){W=2605;break L3014}U=b;D=D+1|0}}}while(0);if((W|0)==2605){c[j>>2]=c[j>>2]|4;Y=g}if((q|0)==0){i=l;return Y|0}jE(q);i=l;return Y|0}function e5(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(c[m+96>>2]|0)==(b|0);if(!p){if((c[m+100>>2]|0)!=(b|0)){break}}c[g>>2]=f+1|0;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&(b|0)==(i|0)){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4|0;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+104|0;i=m;while(1){if((i|0)==(k|0)){s=k;break}if((c[i>>2]|0)==(b|0)){s=i;break}else{i=i+4|0}}i=s-m|0;m=i>>2;if((i|0)>92){q=-1;return q|0}do{if((e|0)==8|(e|0)==10){if((m|0)<(e|0)){break}else{q=-1}return q|0}else if((e|0)==16){if((i|0)<88){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if(a[n-1|0]<<24>>24!=48){q=-1;return q|0}c[h>>2]=0;s=a[m+5255388|0]|0;b=c[g>>2]|0;c[g>>2]=b+1|0;a[b]=s;q=0;return q|0}}while(0);if((n-f|0)<39){f=a[m+5255388|0]|0;c[g>>2]=n+1|0;a[n]=f}c[h>>2]=(c[h>>2]|0)+1|0;q=0;return q|0}function e6(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,J=0,K=0,L=0,M=0;e=i;i=i+332|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+108|0;o=e+120|0;p=e+160|0;q=e+164|0;r=e+324|0;s=e+328|0;t=c[h+4>>2]&74;if((t|0)==8){u=16}else if((t|0)==0){u=0}else if((t|0)==64){u=8}else{u=10}t=l|0;e7(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3078:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2664}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2664;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3078}}}}while(0);if((z|0)==2664){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((e5(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;b1[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){J=D>>>1}else{J=c[n+4>>2]|0}do{if((J|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);s=eL(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=I;eI(n,o,c[r>>2]|0,j);do{if(y){K=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){L=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{L=c[r>>2]|0}if((L|0)!=-1){K=v;break}c[l>>2]=0;K=0}}while(0);l=(K|0)==0;do{if(F){z=2697}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){M=b1[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{M=c[v>>2]|0}if((M|0)==-1){c[f>>2]=0;z=2697;break}else{if(l^(E|0)==0){break}else{z=2699;break}}}}while(0);do{if((z|0)==2697){if(l){z=2699;break}else{break}}}while(0);if((z|0)==2699){c[j>>2]=c[j>>2]|2}c[b>>2]=K;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function e7(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=i;i=i+24|0;g=f|0;h=f+12|0;j=c[b+28>>2]|0;b=j+4|0;G=c[b>>2]|0,c[b>>2]=G+1,G;if((c[1313735]|0)!=-1){c[h>>2]=5254940;c[h+4>>2]=24;c[h+8>>2]=0;dn(5254940,h,252)}h=(c[1313736]|0)-1|0;k=j+12|0;l=j+8|0;m=c[l>>2]|0;do{if((c[k>>2]|0)-m>>2>>>0>h>>>0){n=c[m+(h<<2)>>2]|0;if((n|0)==0){break}b7[c[(c[n>>2]|0)+48>>2]&1023](n,5255388,5255414,d);if((c[1313643]|0)!=-1){c[g>>2]=5254572;c[g+4>>2]=24;c[g+8>>2]=0;dn(5254572,g,252)}n=(c[1313644]|0)-1|0;o=c[l>>2]|0;do{if((c[k>>2]|0)-o>>2>>>0>n>>>0){p=c[o+(n<<2)>>2]|0;if((p|0)==0){break}q=p;c[e>>2]=b1[c[(c[p>>2]|0)+16>>2]&1023](q)|0;b$[c[(c[p>>2]|0)+20>>2]&1023](a,q);if(((G=c[b>>2]|0,c[b>>2]=G+ -1,G)|0)!=0){i=f;return}b_[c[(c[j>>2]|0)+8>>2]&1023](j);i=f;return}}while(0);n=bQ(4)|0;c[n>>2]=5247504;bo(n|0,5252716,512)}}while(0);f=bQ(4)|0;c[f>>2]=5247504;bo(f|0,5252716,512)}function e8(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;f=i;i=i+332|0;m=g;g=i;i=i+4|0;c[g>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;c[h>>2]=c[m>>2]|0;m=f|0;n=f+104|0;o=f+108|0;p=f+120|0;q=f+160|0;r=f+164|0;s=f+324|0;t=f+328|0;u=c[j+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=m|0;e7(o,j,u,n);j=p|0;jS(j|0,0,40);c[q>>2]=j;p=r|0;c[s>>2]=p;c[t>>2]=0;m=g|0;g=h|0;h=c[n>>2]|0;n=c[m>>2]|0;L3174:while(1){do{if((n|0)==0){w=0}else{x=c[n+12>>2]|0;if((x|0)==(c[n+16>>2]|0)){y=b1[c[(c[n>>2]|0)+36>>2]&1023](n)|0}else{y=c[x>>2]|0}if((y|0)!=-1){w=n;break}c[m>>2]=0;w=0}}while(0);z=(w|0)==0;x=c[g>>2]|0;do{if((x|0)==0){A=2745}else{B=c[x+12>>2]|0;if((B|0)==(c[x+16>>2]|0)){C=b1[c[(c[x>>2]|0)+36>>2]&1023](x)|0}else{C=c[B>>2]|0}if((C|0)==-1){c[g>>2]=0;A=2745;break}else{B=(x|0)==0;if(z^B){D=x;E=B;break}else{F=x;G=B;break L3174}}}}while(0);if((A|0)==2745){A=0;if(z){F=0;G=1;break}else{D=0;E=1}}x=w+12|0;B=c[x>>2]|0;H=w+16|0;if((B|0)==(c[H>>2]|0)){I=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{I=c[B>>2]|0}if((e5(I,v,j,q,t,h,o,p,s,u)|0)!=0){F=D;G=E;break}B=c[x>>2]|0;if((B|0)==(c[H>>2]|0)){H=c[(c[w>>2]|0)+40>>2]|0;b1[H&1023](w);n=w;continue}else{c[x>>2]=B+4|0;n=w;continue}}n=o;E=d[n]|0;if((E&1|0)==0){J=E>>>1}else{J=c[o+4>>2]|0}do{if((J|0)!=0){E=c[s>>2]|0;if((E-r|0)>=160){break}D=c[t>>2]|0;c[s>>2]=E+4|0;c[E>>2]=D}}while(0);b[l>>1]=eO(j,c[q>>2]|0,k,v)|0;eI(o,p,c[s>>2]|0,k);do{if(z){K=0}else{s=c[w+12>>2]|0;if((s|0)==(c[w+16>>2]|0)){L=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{L=c[s>>2]|0}if((L|0)!=-1){K=w;break}c[m>>2]=0;K=0}}while(0);m=(K|0)==0;do{if(G){A=2778}else{w=c[F+12>>2]|0;if((w|0)==(c[F+16>>2]|0)){M=b1[c[(c[F>>2]|0)+36>>2]&1023](F)|0}else{M=c[w>>2]|0}if((M|0)==-1){c[g>>2]=0;A=2778;break}else{if(m^(F|0)==0){break}else{A=2780;break}}}}while(0);do{if((A|0)==2778){if(m){A=2780;break}else{break}}}while(0);if((A|0)==2780){c[k>>2]=c[k>>2]|2}c[e>>2]=K;if((a[n]&1)<<24>>24==0){i=f;return}jM(c[o+8>>2]|0);i=f;return}function e9(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+332|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+108|0;o=e+120|0;p=e+160|0;q=e+164|0;r=e+324|0;s=e+328|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l|0;e7(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3246:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2803}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2803;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3246}}}}while(0);if((z|0)==2803){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((e5(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;b1[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);c[k>>2]=eQ(h,c[p>>2]|0,j,u)|0;eI(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2836}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){L=b1[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{L=c[v>>2]|0}if((L|0)==-1){c[f>>2]=0;z=2836;break}else{if(l^(E|0)==0){break}else{z=2838;break}}}}while(0);do{if((z|0)==2836){if(l){z=2838;break}else{break}}}while(0);if((z|0)==2838){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function fa(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;e=i;i=i+332|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+108|0;o=e+120|0;p=e+160|0;q=e+164|0;r=e+324|0;s=e+328|0;t=c[h+4>>2]&74;if((t|0)==8){u=16}else if((t|0)==0){u=0}else if((t|0)==64){u=8}else{u=10}t=l|0;e7(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3318:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2861}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2861;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3318}}}}while(0);if((z|0)==2861){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((e5(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;b1[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){I=D>>>1}else{I=c[n+4>>2]|0}do{if((I|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);c[k>>2]=eS(h,c[p>>2]|0,j,u)|0;eI(n,o,c[r>>2]|0,j);do{if(y){J=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){K=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{K=c[r>>2]|0}if((K|0)!=-1){J=v;break}c[l>>2]=0;J=0}}while(0);l=(J|0)==0;do{if(F){z=2894}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){L=b1[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{L=c[v>>2]|0}if((L|0)==-1){c[f>>2]=0;z=2894;break}else{if(l^(E|0)==0){break}else{z=2896;break}}}}while(0);do{if((z|0)==2894){if(l){z=2896;break}else{break}}}while(0);if((z|0)==2896){c[j>>2]=c[j>>2]|2}c[b>>2]=J;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function fb(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,J=0,K=0,L=0,M=0;e=i;i=i+332|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=g;g=i;i=i+4|0;c[g>>2]=c[l>>2]|0;l=e|0;m=e+104|0;n=e+108|0;o=e+120|0;p=e+160|0;q=e+164|0;r=e+324|0;s=e+328|0;t=c[h+4>>2]&74;if((t|0)==0){u=0}else if((t|0)==8){u=16}else if((t|0)==64){u=8}else{u=10}t=l|0;e7(n,h,t,m);h=o|0;jS(h|0,0,40);c[p>>2]=h;o=q|0;c[r>>2]=o;c[s>>2]=0;l=f|0;f=g|0;g=c[m>>2]|0;m=c[l>>2]|0;L3390:while(1){do{if((m|0)==0){v=0}else{w=c[m+12>>2]|0;if((w|0)==(c[m+16>>2]|0)){x=b1[c[(c[m>>2]|0)+36>>2]&1023](m)|0}else{x=c[w>>2]|0}if((x|0)!=-1){v=m;break}c[l>>2]=0;v=0}}while(0);y=(v|0)==0;w=c[f>>2]|0;do{if((w|0)==0){z=2919}else{A=c[w+12>>2]|0;if((A|0)==(c[w+16>>2]|0)){B=b1[c[(c[w>>2]|0)+36>>2]&1023](w)|0}else{B=c[A>>2]|0}if((B|0)==-1){c[f>>2]=0;z=2919;break}else{A=(w|0)==0;if(y^A){C=w;D=A;break}else{E=w;F=A;break L3390}}}}while(0);if((z|0)==2919){z=0;if(y){E=0;F=1;break}else{C=0;D=1}}w=v+12|0;A=c[w>>2]|0;G=v+16|0;if((A|0)==(c[G>>2]|0)){H=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{H=c[A>>2]|0}if((e5(H,u,h,p,s,g,n,o,r,t)|0)!=0){E=C;F=D;break}A=c[w>>2]|0;if((A|0)==(c[G>>2]|0)){G=c[(c[v>>2]|0)+40>>2]|0;b1[G&1023](v);m=v;continue}else{c[w>>2]=A+4|0;m=v;continue}}m=n;D=d[m]|0;if((D&1|0)==0){J=D>>>1}else{J=c[n+4>>2]|0}do{if((J|0)!=0){D=c[r>>2]|0;if((D-q|0)>=160){break}C=c[s>>2]|0;c[r>>2]=D+4|0;c[D>>2]=C}}while(0);s=eU(h,c[p>>2]|0,j,u)|0;c[k>>2]=s;c[k+4>>2]=I;eI(n,o,c[r>>2]|0,j);do{if(y){K=0}else{r=c[v+12>>2]|0;if((r|0)==(c[v+16>>2]|0)){L=b1[c[(c[v>>2]|0)+36>>2]&1023](v)|0}else{L=c[r>>2]|0}if((L|0)!=-1){K=v;break}c[l>>2]=0;K=0}}while(0);l=(K|0)==0;do{if(F){z=2952}else{v=c[E+12>>2]|0;if((v|0)==(c[E+16>>2]|0)){M=b1[c[(c[E>>2]|0)+36>>2]&1023](E)|0}else{M=c[v>>2]|0}if((M|0)==-1){c[f>>2]=0;z=2952;break}else{if(l^(E|0)==0){break}else{z=2954;break}}}}while(0);do{if((z|0)==2952){if(l){z=2954;break}else{break}}}while(0);if((z|0)==2954){c[j>>2]=c[j>>2]|2}c[b>>2]=K;if((a[m]&1)<<24>>24==0){i=e;return}jM(c[n+8>>2]|0);i=e;return}function fc(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0;p=c[h>>2]|0;q=g;if((p-q|0)>38){r=-1;return r|0}if((b|0)==(i|0)){if((a[e]&1)<<24>>24==0){r=-1;return r|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1|0;a[i]=46;i=d[k]|0;if((i&1|0)==0){s=i>>>1}else{s=c[k+4>>2]|0}if((s|0)==0){r=0;return r|0}s=c[m>>2]|0;if((s-l|0)>=160){r=0;return r|0}i=c[n>>2]|0;c[m>>2]=s+4|0;c[s>>2]=i;r=0;return r|0}do{if((b|0)==(j|0)){i=d[k]|0;if((i&1|0)==0){t=i>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}if((a[e]&1)<<24>>24==0){r=-1;return r|0}i=c[m>>2]|0;if((i-l|0)>=160){r=0;return r|0}s=c[n>>2]|0;c[m>>2]=i+4|0;c[i>>2]=s;c[n>>2]=0;r=0;return r|0}}while(0);t=o+128|0;j=o;while(1){if((j|0)==(t|0)){u=t;break}if((c[j>>2]|0)==(b|0)){u=j;break}else{j=j+4|0}}j=u-o|0;o=j>>2;if((j|0)>124){r=-1;return r|0}u=a[o+5255388|0]|0;do{if((o|0)==22|(o|0)==23){a[f]=80}else if((o|0)==25|(o|0)==24){do{if((p|0)!=(g|0)){if((a[p-1|0]&95|0)==(a[f]&127|0)){break}else{r=-1}return r|0}}while(0);c[h>>2]=p+1|0;a[p]=u;r=0;return r|0}else{b=a[f]|0;if((u&95|0)!=(b<<24>>24|0)){break}a[f]=b|-128;if((a[e]&1)<<24>>24==0){break}a[e]=0;b=d[k]|0;if((b&1|0)==0){v=b>>>1}else{v=c[k+4>>2]|0}if((v|0)==0){break}b=c[m>>2]|0;if((b-l|0)>=160){break}t=c[n>>2]|0;c[m>>2]=b+4|0;c[b>>2]=t}}while(0);m=c[h>>2]|0;if((m-q|0)<((a[f]<<24>>24<0?39:29)|0)){c[h>>2]=m+1|0;a[m]=u}if((j|0)>84){r=0;return r|0}c[n>>2]=(c[n>>2]|0)+1|0;r=0;return r|0}function fd(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0.0,K=0.0,L=0,M=0,N=0;e=i;i=i+372|0;m=f;f=i;i=i+4|0;c[f>>2]=c[m>>2]|0;m=h;h=i;i=i+4|0;c[h>>2]=c[m>>2]|0;m=e|0;n=e+132|0;o=e+136|0;p=e+140|0;q=e+192|0;r=e+196|0;s=e+356|0;t=e+360|0;u=e+364|0;v=e+368|0;w=e+4|0;fe(p,j,w,n,o);j=e+152|0;jS(j|0,0,40);c[q>>2]=j;x=r|0;c[s>>2]=x;c[t>>2]=0;a[u]=1;a[v]=69;y=f|0;f=h|0;h=c[n>>2]|0;n=c[o>>2]|0;o=c[y>>2]|0;L3525:while(1){do{if((o|0)==0){z=0}else{A=c[o+12>>2]|0;if((A|0)==(c[o+16>>2]|0)){B=b1[c[(c[o>>2]|0)+36>>2]&1023](o)|0}else{B=c[A>>2]|0}if((B|0)!=-1){z=o;break}c[y>>2]=0;z=0}}while(0);A=(z|0)==0;C=c[f>>2]|0;do{if((C|0)==0){D=3025}else{E=c[C+12>>2]|0;if((E|0)==(c[C+16>>2]|0)){F=b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0}else{F=c[E>>2]|0}if((F|0)==-1){c[f>>2]=0;D=3025;break}else{if(A^(C|0)==0){break}else{break L3525}}}}while(0);if((D|0)==3025){D=0;if(A){break}}C=z+12|0;E=c[C>>2]|0;G=z+16|0;if((E|0)==(c[G>>2]|0)){H=b1[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{H=c[E>>2]|0}if((fc(H,u,v,j,q,h,n,p,x,s,t,w)|0)!=0){break}E=c[C>>2]|0;if((E|0)==(c[G>>2]|0)){G=c[(c[z>>2]|0)+40>>2]|0;b1[G&1023](z);o=z;continue}else{c[C>>2]=E+4|0;o=z;continue}}z=p;o=d[z]|0;if((o&1|0)==0){I=o>>>1}else{I=c[p+4>>2]|0}do{if((I|0)!=0){if((a[u]&1)<<24>>24==0){break}o=c[s>>2]|0;if((o-r|0)>=160){break}w=c[t>>2]|0;c[s>>2]=o+4|0;c[o>>2]=w}}while(0);t=c[q>>2]|0;do{if((j|0)==(t|0)){c[k>>2]=4;J=0.0}else{do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);K=+jQ(j,m);if((c[m>>2]|0)==(t|0)){J=K;break}else{c[k>>2]=4;J=0.0;break}}}while(0);g[l>>2]=J;eI(p,x,c[s>>2]|0,k);s=c[y>>2]|0;do{if((s|0)==0){L=0}else{x=c[s+12>>2]|0;if((x|0)==(c[s+16>>2]|0)){M=b1[c[(c[s>>2]|0)+36>>2]&1023](s)|0}else{M=c[x>>2]|0}if((M|0)!=-1){L=s;break}c[y>>2]=0;L=0}}while(0);y=(L|0)==0;s=c[f>>2]|0;do{if((s|0)==0){D=3068}else{M=c[s+12>>2]|0;if((M|0)==(c[s+16>>2]|0)){N=b1[c[(c[s>>2]|0)+36>>2]&1023](s)|0}else{N=c[M>>2]|0}if((N|0)==-1){c[f>>2]=0;D=3068;break}else{if(y^(s|0)==0){break}else{D=3070;break}}}}while(0);do{if((D|0)==3068){if(y){D=3070;break}else{break}}}while(0);if((D|0)==3070){c[k>>2]=c[k>>2]|2}c[b>>2]=L;if((a[z]&1)<<24>>24==0){i=e;return}jM(c[p+8>>2]|0);i=e;return}function fe(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;i=i+24|0;h=g|0;j=g+12|0;k=c[b+28>>2]|0;b=k+4|0;G=c[b>>2]|0,c[b>>2]=G+1,G;if((c[1313735]|0)!=-1){c[j>>2]=5254940;c[j+4>>2]=24;c[j+8>>2]=0;dn(5254940,j,252)}j=(c[1313736]|0)-1|0;l=k+12|0;m=k+8|0;n=c[m>>2]|0;do{if((c[l>>2]|0)-n>>2>>>0>j>>>0){o=c[n+(j<<2)>>2]|0;if((o|0)==0){break}b7[c[(c[o>>2]|0)+48>>2]&1023](o,5255388,5255420,d);if((c[1313643]|0)!=-1){c[h>>2]=5254572;c[h+4>>2]=24;c[h+8>>2]=0;dn(5254572,h,252)}o=(c[1313644]|0)-1|0;p=c[m>>2]|0;do{if((c[l>>2]|0)-p>>2>>>0>o>>>0){q=c[p+(o<<2)>>2]|0;if((q|0)==0){break}r=q;s=q;c[e>>2]=b1[c[(c[s>>2]|0)+12>>2]&1023](r)|0;c[f>>2]=b1[c[(c[s>>2]|0)+16>>2]&1023](r)|0;b$[c[(c[q>>2]|0)+20>>2]&1023](a,r);if(((G=c[b>>2]|0,c[b>>2]=G+ -1,G)|0)!=0){i=g;return}b_[c[(c[k>>2]|0)+8>>2]&1023](k);i=g;return}}while(0);o=bQ(4)|0;c[o>>2]=5247504;bo(o|0,5252716,512)}}while(0);g=bQ(4)|0;c[g>>2]=5247504;bo(g|0,5252716,512)}function ff(b,e,f,g,j,l,m){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0.0,L=0.0,M=0,N=0,O=0;e=i;i=i+372|0;n=f;f=i;i=i+4|0;c[f>>2]=c[n>>2]|0;n=g;g=i;i=i+4|0;c[g>>2]=c[n>>2]|0;n=e|0;o=e+132|0;p=e+136|0;q=e+140|0;r=e+192|0;s=e+196|0;t=e+356|0;u=e+360|0;v=e+364|0;w=e+368|0;x=e+4|0;fe(q,j,x,o,p);j=e+152|0;jS(j|0,0,40);c[r>>2]=j;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;z=f|0;f=g|0;g=c[o>>2]|0;o=c[p>>2]|0;p=c[z>>2]|0;L3629:while(1){do{if((p|0)==0){A=0}else{B=c[p+12>>2]|0;if((B|0)==(c[p+16>>2]|0)){C=b1[c[(c[p>>2]|0)+36>>2]&1023](p)|0}else{C=c[B>>2]|0}if((C|0)!=-1){A=p;break}c[z>>2]=0;A=0}}while(0);B=(A|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=3113}else{F=c[D+12>>2]|0;if((F|0)==(c[D+16>>2]|0)){G=b1[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[f>>2]=0;E=3113;break}else{if(B^(D|0)==0){break}else{break L3629}}}}while(0);if((E|0)==3113){E=0;if(B){break}}D=A+12|0;F=c[D>>2]|0;H=A+16|0;if((F|0)==(c[H>>2]|0)){I=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{I=c[F>>2]|0}if((fc(I,v,w,j,r,g,o,q,y,t,u,x)|0)!=0){break}F=c[D>>2]|0;if((F|0)==(c[H>>2]|0)){H=c[(c[A>>2]|0)+40>>2]|0;b1[H&1023](A);p=A;continue}else{c[D>>2]=F+4|0;p=A;continue}}A=q;p=d[A]|0;if((p&1|0)==0){J=p>>>1}else{J=c[q+4>>2]|0}do{if((J|0)!=0){if((a[v]&1)<<24>>24==0){break}p=c[t>>2]|0;if((p-s|0)>=160){break}x=c[u>>2]|0;c[t>>2]=p+4|0;c[p>>2]=x}}while(0);u=c[r>>2]|0;do{if((j|0)==(u|0)){c[l>>2]=4;K=0.0}else{do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);L=+jQ(j,n);if((c[n>>2]|0)==(u|0)){K=L;break}c[l>>2]=4;K=0.0}}while(0);h[k>>3]=K,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;eI(q,y,c[t>>2]|0,l);t=c[z>>2]|0;do{if((t|0)==0){M=0}else{y=c[t+12>>2]|0;if((y|0)==(c[t+16>>2]|0)){N=b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0}else{N=c[y>>2]|0}if((N|0)!=-1){M=t;break}c[z>>2]=0;M=0}}while(0);z=(M|0)==0;t=c[f>>2]|0;do{if((t|0)==0){E=3155}else{N=c[t+12>>2]|0;if((N|0)==(c[t+16>>2]|0)){O=b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0}else{O=c[N>>2]|0}if((O|0)==-1){c[f>>2]=0;E=3155;break}else{if(z^(t|0)==0){break}else{E=3157;break}}}}while(0);do{if((E|0)==3155){if(z){E=3157;break}else{break}}}while(0);if((E|0)==3157){c[l>>2]=c[l>>2]|2}c[b>>2]=M;if((a[A]&1)<<24>>24==0){i=e;return}jM(c[q+8>>2]|0);i=e;return}function fg(b,e,f,g,j,l,m){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0.0,L=0.0,M=0,N=0,O=0;e=i;i=i+372|0;n=f;f=i;i=i+4|0;c[f>>2]=c[n>>2]|0;n=g;g=i;i=i+4|0;c[g>>2]=c[n>>2]|0;n=e|0;o=e+132|0;p=e+136|0;q=e+140|0;r=e+192|0;s=e+196|0;t=e+356|0;u=e+360|0;v=e+364|0;w=e+368|0;x=e+4|0;fe(q,j,x,o,p);j=e+152|0;jS(j|0,0,40);c[r>>2]=j;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;z=f|0;f=g|0;g=c[o>>2]|0;o=c[p>>2]|0;p=c[z>>2]|0;L3706:while(1){do{if((p|0)==0){A=0}else{B=c[p+12>>2]|0;if((B|0)==(c[p+16>>2]|0)){C=b1[c[(c[p>>2]|0)+36>>2]&1023](p)|0}else{C=c[B>>2]|0}if((C|0)!=-1){A=p;break}c[z>>2]=0;A=0}}while(0);B=(A|0)==0;D=c[f>>2]|0;do{if((D|0)==0){E=3176}else{F=c[D+12>>2]|0;if((F|0)==(c[D+16>>2]|0)){G=b1[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{G=c[F>>2]|0}if((G|0)==-1){c[f>>2]=0;E=3176;break}else{if(B^(D|0)==0){break}else{break L3706}}}}while(0);if((E|0)==3176){E=0;if(B){break}}D=A+12|0;F=c[D>>2]|0;H=A+16|0;if((F|0)==(c[H>>2]|0)){I=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{I=c[F>>2]|0}if((fc(I,v,w,j,r,g,o,q,y,t,u,x)|0)!=0){break}F=c[D>>2]|0;if((F|0)==(c[H>>2]|0)){H=c[(c[A>>2]|0)+40>>2]|0;b1[H&1023](A);p=A;continue}else{c[D>>2]=F+4|0;p=A;continue}}A=q;p=d[A]|0;if((p&1|0)==0){J=p>>>1}else{J=c[q+4>>2]|0}do{if((J|0)!=0){if((a[v]&1)<<24>>24==0){break}p=c[t>>2]|0;if((p-s|0)>=160){break}x=c[u>>2]|0;c[t>>2]=p+4|0;c[p>>2]=x}}while(0);u=c[r>>2]|0;do{if((j|0)==(u|0)){c[l>>2]=4;K=1.1125369292536007e-308}else{do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);L=+jQ(j,n);if((c[n>>2]|0)==(u|0)){K=L;break}else{c[l>>2]=4;K=1.1125369292536007e-308;break}}}while(0);h[k>>3]=K,c[m>>2]=c[k>>2]|0,c[m+4>>2]=c[k+4>>2]|0;eI(q,y,c[t>>2]|0,l);t=c[z>>2]|0;do{if((t|0)==0){M=0}else{y=c[t+12>>2]|0;if((y|0)==(c[t+16>>2]|0)){N=b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0}else{N=c[y>>2]|0}if((N|0)!=-1){M=t;break}c[z>>2]=0;M=0}}while(0);z=(M|0)==0;t=c[f>>2]|0;do{if((t|0)==0){E=3219}else{N=c[t+12>>2]|0;if((N|0)==(c[t+16>>2]|0)){O=b1[c[(c[t>>2]|0)+36>>2]&1023](t)|0}else{O=c[N>>2]|0}if((O|0)==-1){c[f>>2]=0;E=3219;break}else{if(z^(t|0)==0){break}else{E=3221;break}}}}while(0);do{if((E|0)==3219){if(z){E=3221;break}else{break}}}while(0);if((E|0)==3221){c[l>>2]=c[l>>2]|2}c[b>>2]=M;if((a[A]&1)<<24>>24==0){i=e;return}jM(c[q+8>>2]|0);i=e;return}function fh(a){a=a|0;return}function fi(a){a=a|0;jM(a);return}function fj(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+60|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+20|0;m=d+44|0;n=d+48|0;o=d+52|0;p=d+56|0;q=j|0;jT(q|0,5247320,6);r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=k|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);v=fm(u,c[1311652]|0,q,(z=i,i=i+4|0,c[z>>2]=h,z)|0)|0;h=k+v|0;q=c[s>>2]&176;do{if((q|0)==32){w=h}else if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=3250;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=3250;break}w=k+2|0;break}else{x=3250}}while(0);if((x|0)==3250){w=u}x=l|0;l=o|0;k=c[f+28>>2]|0;c[l>>2]=k;v=k+4|0;G=c[v>>2]|0,c[v>>2]=G+1,G;fq(u,w,h,x,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((G=c[l>>2]|0,c[l>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fn(b,p,x,C,D,f,g);i=d;return}b_[c[(c[o>>2]|0)+8>>2]&1023](o|0);y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fn(b,p,x,C,D,f,g);i=d;return}function fk(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+128|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=f;f=i;i=i+4|0;c[f>>2]=c[k>>2]|0;k=d|0;l=d+12|0;m=d+116|0;n=m;o=i;i=i+40|0;p=i;i=i+4|0;q=i;i=i+160|0;r=i;i=i+4|0;s=i;i=i+4|0;jS(n|0,0,12);t=c[g+28>>2]|0;g=t+4|0;G=c[g>>2]|0,c[g>>2]=G+1,G;if((c[1313735]|0)!=-1){c[k>>2]=5254940;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254940,k,252)}k=(c[1313736]|0)-1|0;u=c[t+8>>2]|0;do{if((c[t+12>>2]|0)-u>>2>>>0>k>>>0){v=c[u+(k<<2)>>2]|0;if((v|0)==0){break}w=l|0;b7[c[(c[v>>2]|0)+48>>2]&1023](v,5255388,5255414,w);if(((G=c[g>>2]|0,c[g>>2]=G+ -1,G)|0)==0){b_[c[(c[t>>2]|0)+8>>2]&1023](t)}v=o|0;jS(v|0,0,40);c[p>>2]=v;x=q|0;c[r>>2]=x;c[s>>2]=0;y=e|0;A=f|0;B=c[y>>2]|0;L3832:while(1){do{if((B|0)==0){C=0}else{D=c[B+12>>2]|0;if((D|0)==(c[B+16>>2]|0)){E=b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{E=c[D>>2]|0}if((E|0)!=-1){C=B;break}c[y>>2]=0;C=0}}while(0);D=(C|0)==0;F=c[A>>2]|0;do{if((F|0)==0){H=3282}else{I=c[F+12>>2]|0;if((I|0)==(c[F+16>>2]|0)){J=b1[c[(c[F>>2]|0)+36>>2]&1023](F)|0}else{J=c[I>>2]|0}if((J|0)==-1){c[A>>2]=0;H=3282;break}else{if(D^(F|0)==0){break}else{break L3832}}}}while(0);if((H|0)==3282){H=0;if(D){break}}F=C+12|0;I=c[F>>2]|0;K=C+16|0;if((I|0)==(c[K>>2]|0)){L=b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0}else{L=c[I>>2]|0}if((e5(L,16,v,p,s,0,m,x,r,w)|0)!=0){break}I=c[F>>2]|0;if((I|0)==(c[K>>2]|0)){K=c[(c[C>>2]|0)+40>>2]|0;b1[K&1023](C);B=C;continue}else{c[F>>2]=I+4|0;B=C;continue}}a[o+39|0]=0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);if((e1(v,c[1311652]|0,5244048,(z=i,i=i+4|0,c[z>>2]=j,z)|0)|0)!=1){c[h>>2]=4}B=c[y>>2]|0;do{if((B|0)==0){M=0}else{w=c[B+12>>2]|0;if((w|0)==(c[B+16>>2]|0)){N=b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{N=c[w>>2]|0}if((N|0)!=-1){M=B;break}c[y>>2]=0;M=0}}while(0);y=(M|0)==0;B=c[A>>2]|0;do{if((B|0)==0){H=3316}else{v=c[B+12>>2]|0;if((v|0)==(c[B+16>>2]|0)){O=b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{O=c[v>>2]|0}if((O|0)==-1){c[A>>2]=0;H=3316;break}else{if(y^(B|0)==0){break}else{H=3318;break}}}}while(0);do{if((H|0)==3316){if(y){H=3318;break}else{break}}}while(0);if((H|0)==3318){c[h>>2]=c[h>>2]|2}c[b>>2]=M;if((a[n]&1)<<24>>24==0){i=d;return}jM(c[m+8>>2]|0);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}function fl(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;j=i;i=i+28|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+12|0;m=j+16|0;if((c[f+4>>2]&1|0)==0){n=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2]|0;b9[n&1023](b,d,l,f,g,h&1);i=j;return}g=c[f+28>>2]|0;f=g+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313645]|0)!=-1){c[k>>2]=5254580;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254580,k,252)}k=(c[1313646]|0)-1|0;l=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-l>>2>>>0>k>>>0){d=c[l+(k<<2)>>2]|0;if((d|0)==0){break}n=d;if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[d>>2]|0;if(h){b$[c[o+24>>2]&1023](m,n)}else{b$[c[o+28>>2]&1023](m,n)}n=m;o=m;d=a[o]|0;if((d&1)<<24>>24==0){p=n+1|0;q=p;r=p;s=m+8|0}else{p=m+8|0;q=c[p>>2]|0;r=n+1|0;s=p}p=e|0;n=m+4|0;t=q;u=d;while(1){v=(u&1)<<24>>24==0;if(v){w=r}else{w=c[s>>2]|0}d=u&255;if((t|0)==(w+((d&1|0)==0?d>>>1:c[n>>2]|0)|0)){break}d=a[t]|0;x=c[p>>2]|0;do{if((x|0)!=0){y=x+24|0;z=c[y>>2]|0;if((z|0)!=(c[x+28>>2]|0)){c[y>>2]=z+1|0;a[z]=d;break}if((ca[c[(c[x>>2]|0)+52>>2]&1023](x,d&255)|0)!=-1){break}c[p>>2]=0}}while(0);t=t+1|0;u=a[o]|0}c[b>>2]=c[p>>2]|0;if(v){i=j;return}jM(c[s>>2]|0);i=j;return}}while(0);j=bQ(4)|0;c[j>>2]=5247504;bo(j|0,5252716,512)}function fm(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+4|0;g=f|0;c[g>>2]=e;e=bE(b|0)|0;b=a8(a|0,d|0,c[g>>2]|0)|0;if((e|0)==0){i=f;return b|0}bE(e|0);i=f;return b|0}function fn(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;k=i;i=i+12|0;l=d;d=i;i=i+4|0;c[d>>2]=c[l>>2]|0;l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g|0;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;do{if((h|0)>0){if((bX[c[(c[d>>2]|0)+48>>2]&1023](d,e,h)|0)==(h|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){if(q>>>0<11){h=q<<1&255;e=l;a[e]=h;r=l+1|0;s=h;t=e}else{e=q+16&-16;h=jJ(e)|0;c[l+8>>2]=h;g=e|1;c[l>>2]=g;c[l+4>>2]=q;r=h;s=g&255;t=l}jS(r|0,j|0,q|0);a[r+q|0]=0;if((s&1)<<24>>24==0){u=l+1|0}else{u=c[l+8>>2]|0}if((bX[c[(c[d>>2]|0)+48>>2]&1023](d,u,q)|0)==(q|0)){if((a[t]&1)<<24>>24==0){break}jM(c[l+8>>2]|0);break}c[m>>2]=0;c[b>>2]=0;if((a[t]&1)<<24>>24==0){i=k;return}jM(c[l+8>>2]|0);i=k;return}}while(0);l=n-o|0;do{if((l|0)>0){if((bX[c[(c[d>>2]|0)+48>>2]&1023](d,f,l)|0)==(l|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function fo(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+92|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+76|0;o=d+80|0;p=d+84|0;q=d+88|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}u=v+2|0;a[v]=108;a[v+1|0]=108;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=l|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);t=fm(u,c[1311652]|0,r,(z=i,i=i+8|0,c[z>>2]=h,c[z+4>>2]=j,z)|0)|0;j=l+t|0;h=c[s>>2]&176;do{if((h|0)==32){w=j}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=3424;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=3424;break}w=l+2|0;break}else{x=3424}}while(0);if((x|0)==3424){w=u}x=m|0;m=p|0;l=c[f+28>>2]|0;c[m>>2]=l;t=l+4|0;G=c[t>>2]|0,c[t>>2]=G+1,G;fq(u,w,j,x,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((G=c[m>>2]|0,c[m>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fn(b,q,x,C,D,f,g);i=d;return}b_[c[(c[p>>2]|0)+8>>2]&1023](p|0);y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fn(b,q,x,C,D,f,g);i=d;return}function fp(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+60|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+20|0;m=d+44|0;n=d+48|0;o=d+52|0;p=d+56|0;q=j|0;jT(q|0,5247320,6);r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=k|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);t=fm(u,c[1311652]|0,q,(z=i,i=i+4|0,c[z>>2]=h,z)|0)|0;h=k+t|0;q=c[s>>2]&176;do{if((q|0)==32){w=h}else if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=3455;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=3455;break}w=k+2|0;break}else{x=3455}}while(0);if((x|0)==3455){w=u}x=l|0;l=o|0;k=c[f+28>>2]|0;c[l>>2]=k;t=k+4|0;G=c[t>>2]|0,c[t>>2]=G+1,G;fq(u,w,h,x,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((G=c[l>>2]|0,c[l>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fn(b,p,x,C,D,f,g);i=d;return}b_[c[(c[o>>2]|0)+8>>2]&1023](o|0);y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fn(b,p,x,C,D,f,g);i=d;return}function fq(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+36|0;m=l|0;n=l+12|0;o=l+24|0;p=k|0;k=c[p>>2]|0;if((c[1313737]|0)!=-1){c[n>>2]=5254948;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254948,n,252)}n=(c[1313738]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}r=k;s=c[p>>2]|0;if((c[1313645]|0)!=-1){c[m>>2]=5254580;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254580,m,252)}m=(c[1313646]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}t=s;b$[c[(c[s>>2]|0)+20>>2]&1023](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}L4077:do{if((v|0)==0){p=c[(c[k>>2]|0)+32>>2]|0;b7[p&1023](r,b,f,g);c[j>>2]=g+(f-b|0)|0}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=ca[c[(c[k>>2]|0)+28>>2]&1023](r,p)|0;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=n;w=b+1|0}else{w=b}do{if((f-w|0)>1){if(a[w]<<24>>24!=48){x=w;break}n=w+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){x=w;break}p=k;q=ca[c[(c[p>>2]|0)+28>>2]&1023](r,48)|0;y=c[j>>2]|0;c[j>>2]=y+1|0;a[y]=q;q=ca[c[(c[p>>2]|0)+28>>2]&1023](r,a[n]|0)|0;n=c[j>>2]|0;c[j>>2]=n+1|0;a[n]=q;x=w+2|0}else{x=w}}while(0);L4090:do{if((x|0)!=(f|0)){q=f-1|0;if(x>>>0<q>>>0){z=x;A=q}else{break}while(1){q=a[z]|0;a[z]=a[A]|0;a[A]=q;q=z+1|0;n=A-1|0;if(q>>>0<n>>>0){z=q;A=n}else{break L4090}}}}while(0);n=b1[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L4096:do{if(x>>>0<f>>>0){q=u+1|0;p=k;y=o+4|0;B=o+8|0;C=0;D=0;E=x;while(1){F=(a[m]&1)<<24>>24==0;do{if(a[(F?q:c[B>>2]|0)+D|0]<<24>>24==0){G=D;H=C}else{if((C|0)!=(a[(F?q:c[B>>2]|0)+D|0]<<24>>24|0)){G=D;H=C;break}I=c[j>>2]|0;c[j>>2]=I+1|0;a[I]=n;I=d[m]|0;G=(D>>>0<(((I&1|0)==0?I>>>1:c[y>>2]|0)-1|0)>>>0&1)+D|0;H=0}}while(0);F=ca[c[(c[p>>2]|0)+28>>2]&1023](r,a[E]|0)|0;I=c[j>>2]|0;c[j>>2]=I+1|0;a[I]=F;F=E+1|0;if(F>>>0<f>>>0){C=H+1|0;D=G;E=F}else{break L4096}}}}while(0);n=g+(x-b|0)|0;E=c[j>>2]|0;if((n|0)==(E|0)){break}D=E-1|0;if(n>>>0<D>>>0){J=n;K=D}else{break}while(1){D=a[J]|0;a[J]=a[K]|0;a[K]=D;D=J+1|0;n=K-1|0;if(D>>>0<n>>>0){J=D;K=n}else{break L4077}}}}while(0);if((e|0)==(f|0)){L=c[j>>2]|0}else{L=g+(e-b|0)|0}c[h>>2]=L;if((a[m]&1)<<24>>24==0){i=l;return}jM(c[o+8>>2]|0);i=l;return}function fr(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+92|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+76|0;o=d+80|0;p=d+84|0;q=d+88|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}u=v+2|0;a[v]=108;a[v+1|0]=108;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=l|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);v=fm(u,c[1311652]|0,r,(z=i,i=i+8|0,c[z>>2]=h,c[z+4>>2]=j,z)|0)|0;j=l+v|0;h=c[s>>2]&176;do{if((h|0)==32){w=j}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=3542;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=3542;break}w=l+2|0;break}else{x=3542}}while(0);if((x|0)==3542){w=u}x=m|0;m=p|0;l=c[f+28>>2]|0;c[m>>2]=l;v=l+4|0;G=c[v>>2]|0,c[v>>2]=G+1,G;fq(u,w,j,x,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((G=c[m>>2]|0,c[m>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fn(b,q,x,C,D,f,g);i=d;return}b_[c[(c[p>>2]|0)+8>>2]&1023](p|0);y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fn(b,q,x,C,D,f,g);i=d;return}function fs(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0;d=i;i=i+124|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=d|0;m=d+8|0;n=d+40|0;o=d+44|0;p=d+104|0;q=d+108|0;r=d+112|0;s=d+116|0;t=d+120|0;c[l>>2]=37;c[l+4>>2]=0;u=l;l=u+1|0;v=f+4|0;w=c[v>>2]|0;if((w&2048|0)==0){x=l}else{a[l]=43;x=u+2|0}if((w&1024|0)==0){y=x}else{a[x]=35;y=x+1|0}x=w&260;l=w>>>14;do{if((x|0)==260){if((l&1|0)==0){a[y]=97;A=0;break}else{a[y]=65;A=0;break}}else{a[y]=46;w=y+2|0;a[y+1|0]=42;if((x|0)==4){if((l&1|0)==0){a[w]=102;A=1;break}else{a[w]=70;A=1;break}}else if((x|0)==256){if((l&1|0)==0){a[w]=101;A=1;break}else{a[w]=69;A=1;break}}else{if((l&1|0)==0){a[w]=103;A=1;break}else{a[w]=71;A=1;break}}}}while(0);l=m|0;c[n>>2]=l;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);m=c[1311652]|0;if(A){B=ft(l,30,m,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{B=ft(l,30,m,u,(z=i,i=i+8|0,h[k>>3]=j,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0}do{if((B|0)>29){m=a[5255524]<<24>>24==0;if(A){do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}m=c[n>>2]|0;if((m|0)!=0){D=C;E=m;F=m;break}m=bQ(4)|0;c[m>>2]=5247480;bo(m|0,5252704,66)}else{D=B;E=0;F=c[n>>2]|0}}while(0);B=F+D|0;C=c[v>>2]&176;do{if((C|0)==16){v=a[F]|0;if((v<<24>>24|0)==45|(v<<24>>24|0)==43){H=F+1|0;break}if(!((D|0)>1&v<<24>>24==48)){I=3604;break}v=a[F+1|0]|0;if(!((v<<24>>24|0)==120|(v<<24>>24|0)==88)){I=3604;break}H=F+2|0;break}else if((C|0)==32){H=B}else{I=3604}}while(0);if((I|0)==3604){H=F}do{if((F|0)==(l|0)){J=o|0;K=0;L=l}else{I=jD(D<<1)|0;if((I|0)!=0){J=I;K=I;L=c[n>>2]|0;break}I=bQ(4)|0;c[I>>2]=5247480;bo(I|0,5252704,66)}}while(0);n=r|0;D=c[f+28>>2]|0;c[n>>2]=D;l=D+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;fv(L,H,B,J,p,q,r);r=c[n>>2]|0;n=r+4|0;if(((G=c[n>>2]|0,c[n>>2]=G+ -1,G)|0)==0){b_[c[(c[r>>2]|0)+8>>2]&1023](r|0)}r=e|0;c[t>>2]=c[r>>2]|0;fn(s,t,J,c[p>>2]|0,c[q>>2]|0,f,g);g=c[s>>2]|0;c[r>>2]=g;c[b>>2]=g;if((K|0)!=0){jE(K)}if((E|0)==0){i=d;return}jE(E);i=d;return}function ft(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;g=i;i=i+4|0;h=g|0;c[h>>2]=f;f=bE(d|0)|0;d=a$(a|0,b|0,e|0,c[h>>2]|0)|0;if((f|0)==0){i=g;return d|0}bE(f|0);i=g;return d|0}function fu(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+4|0;g=f|0;c[g>>2]=e;e=bE(b|0)|0;b=bc(a|0,d|0,c[g>>2]|0)|0;if((e|0)==0){i=f;return b|0}bE(e|0);i=f;return b|0}function fv(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;l=i;i=i+36|0;m=l|0;n=l+12|0;o=l+24|0;p=k|0;k=c[p>>2]|0;if((c[1313737]|0)!=-1){c[n>>2]=5254948;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254948,n,252)}n=(c[1313738]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}r=k;s=c[p>>2]|0;if((c[1313645]|0)!=-1){c[m>>2]=5254580;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254580,m,252)}m=(c[1313646]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}t=s;b$[c[(c[s>>2]|0)+20>>2]&1023](o,t);c[j>>2]=g;u=a[b]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=ca[c[(c[k>>2]|0)+28>>2]&1023](r,u)|0;u=c[j>>2]|0;c[j>>2]=u+1|0;a[u]=m;v=b+1|0}else{v=b}m=f;L4274:do{if((m-v|0)>1){if(a[v]<<24>>24!=48){w=v;x=3681;break}u=v+1|0;p=a[u]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=v;x=3681;break}p=k;n=ca[c[(c[p>>2]|0)+28>>2]&1023](r,48)|0;q=c[j>>2]|0;c[j>>2]=q+1|0;a[q]=n;n=v+2|0;q=ca[c[(c[p>>2]|0)+28>>2]&1023](r,a[u]|0)|0;u=c[j>>2]|0;c[j>>2]=u+1|0;a[u]=q;q=n;while(1){if(q>>>0>=f>>>0){y=q;z=n;break L4274}u=a[q]|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);if((a6(u<<24>>24|0,c[1311652]|0)|0)==0){y=q;z=n;break L4274}else{q=q+1|0}}}else{w=v;x=3681}}while(0);L4289:do{if((x|0)==3681){while(1){x=0;if(w>>>0>=f>>>0){y=w;z=v;break L4289}q=a[w]|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);if((bJ(q<<24>>24|0,c[1311652]|0)|0)==0){y=w;z=v;break L4289}else{w=w+1|0;x=3681}}}}while(0);x=o;w=o;v=d[w]|0;if((v&1|0)==0){A=v>>>1}else{A=c[o+4>>2]|0}L4304:do{if((A|0)==0){v=c[j>>2]|0;u=c[(c[k>>2]|0)+32>>2]|0;b7[u&1023](r,z,y,v);c[j>>2]=(c[j>>2]|0)+(y-z|0)|0}else{L4308:do{if((z|0)!=(y|0)){v=y-1|0;if(z>>>0<v>>>0){B=z;C=v}else{break}while(1){v=a[B]|0;a[B]=a[C]|0;a[C]=v;v=B+1|0;u=C-1|0;if(v>>>0<u>>>0){B=v;C=u}else{break L4308}}}}while(0);q=b1[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L4314:do{if(z>>>0<y>>>0){u=x+1|0;v=o+4|0;n=o+8|0;p=k;D=0;E=0;F=z;while(1){G=(a[w]&1)<<24>>24==0;do{if(a[(G?u:c[n>>2]|0)+E|0]<<24>>24>0){if((D|0)!=(a[(G?u:c[n>>2]|0)+E|0]<<24>>24|0)){H=E;I=D;break}J=c[j>>2]|0;c[j>>2]=J+1|0;a[J]=q;J=d[w]|0;H=(E>>>0<(((J&1|0)==0?J>>>1:c[v>>2]|0)-1|0)>>>0&1)+E|0;I=0}else{H=E;I=D}}while(0);G=ca[c[(c[p>>2]|0)+28>>2]&1023](r,a[F]|0)|0;J=c[j>>2]|0;c[j>>2]=J+1|0;a[J]=G;G=F+1|0;if(G>>>0<y>>>0){D=I+1|0;E=H;F=G}else{break L4314}}}}while(0);q=g+(z-b|0)|0;F=c[j>>2]|0;if((q|0)==(F|0)){break}E=F-1|0;if(q>>>0<E>>>0){K=q;L=E}else{break}while(1){E=a[K]|0;a[K]=a[L]|0;a[L]=E;E=K+1|0;q=L-1|0;if(E>>>0<q>>>0){K=E;L=q}else{break L4304}}}}while(0);L4328:do{if(y>>>0<f>>>0){L=k;K=y;while(1){z=a[K]|0;if(z<<24>>24==46){break}H=ca[c[(c[L>>2]|0)+28>>2]&1023](r,z)|0;z=c[j>>2]|0;c[j>>2]=z+1|0;a[z]=H;H=K+1|0;if(H>>>0<f>>>0){K=H}else{M=H;break L4328}}L=b1[c[(c[s>>2]|0)+12>>2]&1023](t)|0;H=c[j>>2]|0;c[j>>2]=H+1|0;a[H]=L;M=K+1|0}else{M=y}}while(0);b7[c[(c[k>>2]|0)+32>>2]&1023](r,M,f,c[j>>2]|0);r=(c[j>>2]|0)+(m-M|0)|0;c[j>>2]=r;if((e|0)==(f|0)){N=r}else{N=g+(e-b|0)|0}c[h>>2]=N;if((a[w]&1)<<24>>24==0){i=l;return}jM(c[o+8>>2]|0);i=l;return}function fw(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0;d=i;i=i+124|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=d|0;m=d+8|0;n=d+40|0;o=d+44|0;p=d+104|0;q=d+108|0;r=d+112|0;s=d+116|0;t=d+120|0;c[l>>2]=37;c[l+4>>2]=0;u=l;l=u+1|0;v=f+4|0;w=c[v>>2]|0;if((w&2048|0)==0){x=l}else{a[l]=43;x=u+2|0}if((w&1024|0)==0){y=x}else{a[x]=35;y=x+1|0}x=w&260;l=w>>>14;do{if((x|0)==260){a[y]=76;w=y+1|0;if((l&1|0)==0){a[w]=97;A=0;break}else{a[w]=65;A=0;break}}else{a[y]=46;a[y+1|0]=42;a[y+2|0]=76;w=y+3|0;if((x|0)==4){if((l&1|0)==0){a[w]=102;A=1;break}else{a[w]=70;A=1;break}}else if((x|0)==256){if((l&1|0)==0){a[w]=101;A=1;break}else{a[w]=69;A=1;break}}else{if((l&1|0)==0){a[w]=103;A=1;break}else{a[w]=71;A=1;break}}}}while(0);l=m|0;c[n>>2]=l;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);m=c[1311652]|0;if(A){B=ft(l,30,m,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{B=ft(l,30,m,u,(z=i,i=i+8|0,h[k>>3]=j,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0}do{if((B|0)>29){m=a[5255524]<<24>>24==0;if(A){do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+8|0,h[k>>3]=j,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0}m=c[n>>2]|0;if((m|0)!=0){D=C;E=m;F=m;break}m=bQ(4)|0;c[m>>2]=5247480;bo(m|0,5252704,66)}else{D=B;E=0;F=c[n>>2]|0}}while(0);B=F+D|0;C=c[v>>2]&176;do{if((C|0)==16){v=a[F]|0;if((v<<24>>24|0)==45|(v<<24>>24|0)==43){H=F+1|0;break}if(!((D|0)>1&v<<24>>24==48)){I=3780;break}v=a[F+1|0]|0;if(!((v<<24>>24|0)==120|(v<<24>>24|0)==88)){I=3780;break}H=F+2|0;break}else if((C|0)==32){H=B}else{I=3780}}while(0);if((I|0)==3780){H=F}do{if((F|0)==(l|0)){J=o|0;K=0;L=l}else{I=jD(D<<1)|0;if((I|0)!=0){J=I;K=I;L=c[n>>2]|0;break}I=bQ(4)|0;c[I>>2]=5247480;bo(I|0,5252704,66)}}while(0);n=r|0;D=c[f+28>>2]|0;c[n>>2]=D;l=D+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;fv(L,H,B,J,p,q,r);r=c[n>>2]|0;n=r+4|0;if(((G=c[n>>2]|0,c[n>>2]=G+ -1,G)|0)==0){b_[c[(c[r>>2]|0)+8>>2]&1023](r|0)}r=e|0;c[t>>2]=c[r>>2]|0;fn(s,t,J,c[p>>2]|0,c[q>>2]|0,f,g);g=c[s>>2]|0;c[r>>2]=g;c[b>>2]=g;if((K|0)!=0){jE(K)}if((E|0)==0){i=d;return}jE(E);i=d;return}function fx(a){a=a|0;return}function fy(a){a=a|0;jM(a);return}function fz(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+120|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+20|0;m=d+104|0;n=d+108|0;o=d+112|0;p=d+116|0;q=j|0;jT(q|0,5247320,6);r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=k|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);t=fm(u,c[1311652]|0,q,(z=i,i=i+4|0,c[z>>2]=h,z)|0)|0;h=k+t|0;q=c[s>>2]&176;do{if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=24;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=24;break}w=k+2|0;break}else if((q|0)==32){w=h}else{x=24}}while(0);if((x|0)==24){w=u}x=l|0;l=o|0;q=c[f+28>>2]|0;c[l>>2]=q;k=q+4|0;G=c[k>>2]|0,c[k>>2]=G+1,G;fE(u,w,h,x,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((G=c[l>>2]|0,c[l>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fF(b,p,x,C,D,f,g);i=d;return}b_[c[(c[o>>2]|0)+8>>2]&1023](o|0);y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fF(b,p,x,C,D,f,g);i=d;return}function fA(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;d=i;i=i+84|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=d|0;k=d+20|0;l=d+40|0;m=d+80|0;n=d+12|0;jT(n|0,5247328,6);o=k|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);p=fm(o,c[1311652]|0,n,(z=i,i=i+4|0,c[z>>2]=h,z)|0)|0;h=k+p|0;n=c[f+4>>2]&176;do{if((n|0)==16){q=a[o]|0;if((q<<24>>24|0)==45|(q<<24>>24|0)==43){r=k+1|0;break}if(!((p|0)>1&q<<24>>24==48)){s=45;break}q=a[k+1|0]|0;if(!((q<<24>>24|0)==120|(q<<24>>24|0)==88)){s=45;break}r=k+2|0;break}else if((n|0)==32){r=h}else{s=45}}while(0);if((s|0)==45){r=o}s=c[f+28>>2]|0;n=s+4|0;G=c[n>>2]|0,c[n>>2]=G+1,G;if((c[1313737]|0)!=-1){c[j>>2]=5254948;c[j+4>>2]=24;c[j+8>>2]=0;dn(5254948,j,252)}j=(c[1313738]|0)-1|0;q=c[s+8>>2]|0;do{if((c[s+12>>2]|0)-q>>2>>>0>j>>>0){t=c[q+(j<<2)>>2]|0;if((t|0)==0){break}if(((G=c[n>>2]|0,c[n>>2]=G+ -1,G)|0)==0){b_[c[(c[s>>2]|0)+8>>2]&1023](s)}u=l|0;b7[c[(c[t>>2]|0)+32>>2]&1023](t,o,h,u);t=l+p|0;if((r|0)==(h|0)){v=t;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;fn(b,m,u,v,t,f,g);i=d;return}v=l+(r-k|0)|0;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;fn(b,m,u,v,t,f,g);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}function fB(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;j=i;i=i+28|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+12|0;m=j+16|0;if((c[f+4>>2]&1|0)==0){n=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2]|0;b9[n&1023](b,d,l,f,g,h&1);i=j;return}g=c[f+28>>2]|0;f=g+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313643]|0)!=-1){c[k>>2]=5254572;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254572,k,252)}k=(c[1313644]|0)-1|0;l=c[g+8>>2]|0;do{if((c[g+12>>2]|0)-l>>2>>>0>k>>>0){d=c[l+(k<<2)>>2]|0;if((d|0)==0){break}n=d;if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[g>>2]|0)+8>>2]&1023](g)}o=c[d>>2]|0;if(h){b$[c[o+24>>2]&1023](m,n)}else{b$[c[o+28>>2]&1023](m,n)}n=m;o=a[n]|0;if((o&1)<<24>>24==0){d=m+4|0;p=d;q=d;r=m+8|0}else{d=m+8|0;p=c[d>>2]|0;q=m+4|0;r=d}d=e|0;s=p;t=o;while(1){u=(t&1)<<24>>24==0;if(u){v=q}else{v=c[r>>2]|0}o=t&255;if((o&1|0)==0){w=o>>>1}else{w=c[q>>2]|0}if((s|0)==(v+(w<<2)|0)){break}o=c[s>>2]|0;x=c[d>>2]|0;do{if((x|0)!=0){y=x+24|0;z=c[y>>2]|0;if((z|0)==(c[x+28>>2]|0)){A=ca[c[(c[x>>2]|0)+52>>2]&1023](x,o)|0}else{c[y>>2]=z+4|0;c[z>>2]=o;A=o}if((A|0)!=-1){break}c[d>>2]=0}}while(0);s=s+4|0;t=a[n]|0}c[b>>2]=c[d>>2]|0;if(u){i=j;return}jM(c[r>>2]|0);i=j;return}}while(0);j=bQ(4)|0;c[j>>2]=5247504;bo(j|0,5252716,512)}function fC(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+212|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+196|0;o=d+200|0;p=d+204|0;q=d+208|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}u=v+2|0;a[v]=108;a[v+1|0]=108;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=l|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);t=fm(u,c[1311652]|0,r,(z=i,i=i+8|0,c[z>>2]=h,c[z+4>>2]=j,z)|0)|0;j=l+t|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=124;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=124;break}w=l+2|0;break}else if((h|0)==32){w=j}else{x=124}}while(0);if((x|0)==124){w=u}x=m|0;m=p|0;h=c[f+28>>2]|0;c[m>>2]=h;l=h+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;fE(u,w,j,x,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((G=c[m>>2]|0,c[m>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fF(b,q,x,C,D,f,g);i=d;return}b_[c[(c[p>>2]|0)+8>>2]&1023](p|0);y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fF(b,q,x,C,D,f,g);i=d;return}function fD(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+120|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=d|0;k=d+8|0;l=d+20|0;m=d+104|0;n=d+108|0;o=d+112|0;p=d+116|0;q=j|0;jT(q|0,5247320,6);r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=k|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);t=fm(u,c[1311652]|0,q,(z=i,i=i+4|0,c[z>>2]=h,z)|0)|0;h=k+t|0;q=c[s>>2]&176;do{if((q|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=155;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=155;break}w=k+2|0;break}else if((q|0)==32){w=h}else{x=155}}while(0);if((x|0)==155){w=u}x=l|0;l=o|0;q=c[f+28>>2]|0;c[l>>2]=q;k=q+4|0;G=c[k>>2]|0,c[k>>2]=G+1,G;fE(u,w,h,x,m,n,o);o=c[l>>2]|0;l=o+4|0;if(((G=c[l>>2]|0,c[l>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fF(b,p,x,C,D,f,g);i=d;return}b_[c[(c[o>>2]|0)+8>>2]&1023](o|0);y=e|0;A=c[y>>2]|0;B=p|0;c[B>>2]=A;C=c[m>>2]|0;D=c[n>>2]|0;fF(b,p,x,C,D,f,g);i=d;return}function fE(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;l=i;i=i+36|0;m=l|0;n=l+12|0;o=l+24|0;p=k|0;k=c[p>>2]|0;if((c[1313735]|0)!=-1){c[n>>2]=5254940;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254940,n,252)}n=(c[1313736]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}r=k;s=c[p>>2]|0;if((c[1313643]|0)!=-1){c[m>>2]=5254572;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254572,m,252)}m=(c[1313644]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}t=s;b$[c[(c[s>>2]|0)+20>>2]&1023](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}L208:do{if((v|0)==0){p=c[(c[k>>2]|0)+48>>2]|0;b7[p&1023](r,b,f,g);c[j>>2]=g+(f-b<<2)|0}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=ca[c[(c[k>>2]|0)+44>>2]&1023](r,p)|0;p=c[j>>2]|0;c[j>>2]=p+4|0;c[p>>2]=n;w=b+1|0}else{w=b}do{if((f-w|0)>1){if(a[w]<<24>>24!=48){x=w;break}n=w+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){x=w;break}p=k;q=ca[c[(c[p>>2]|0)+44>>2]&1023](r,48)|0;y=c[j>>2]|0;c[j>>2]=y+4|0;c[y>>2]=q;q=ca[c[(c[p>>2]|0)+44>>2]&1023](r,a[n]|0)|0;n=c[j>>2]|0;c[j>>2]=n+4|0;c[n>>2]=q;x=w+2|0}else{x=w}}while(0);L221:do{if((x|0)!=(f|0)){q=f-1|0;if(x>>>0<q>>>0){z=x;A=q}else{break}while(1){q=a[z]|0;a[z]=a[A]|0;a[A]=q;q=z+1|0;n=A-1|0;if(q>>>0<n>>>0){z=q;A=n}else{break L221}}}}while(0);n=b1[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L227:do{if(x>>>0<f>>>0){q=u+1|0;p=k;y=o+4|0;B=o+8|0;C=0;D=0;E=x;while(1){F=(a[m]&1)<<24>>24==0;do{if(a[(F?q:c[B>>2]|0)+D|0]<<24>>24==0){G=D;H=C}else{if((C|0)!=(a[(F?q:c[B>>2]|0)+D|0]<<24>>24|0)){G=D;H=C;break}I=c[j>>2]|0;c[j>>2]=I+4|0;c[I>>2]=n;I=d[m]|0;G=(D>>>0<(((I&1|0)==0?I>>>1:c[y>>2]|0)-1|0)>>>0&1)+D|0;H=0}}while(0);F=ca[c[(c[p>>2]|0)+44>>2]&1023](r,a[E]|0)|0;I=c[j>>2]|0;c[j>>2]=I+4|0;c[I>>2]=F;F=E+1|0;if(F>>>0<f>>>0){C=H+1|0;D=G;E=F}else{break L227}}}}while(0);n=g+(x-b<<2)|0;E=c[j>>2]|0;if((n|0)==(E|0)){break}D=E-4|0;if(n>>>0<D>>>0){J=n;K=D}else{break}while(1){D=c[J>>2]|0;c[J>>2]=c[K>>2]|0;c[K>>2]=D;D=J+4|0;n=K-4|0;if(D>>>0<n>>>0){J=D;K=n}else{break L208}}}}while(0);if((e|0)==(f|0)){L=c[j>>2]|0}else{L=g+(e-b<<2)|0}c[h>>2]=L;if((a[m]&1)<<24>>24==0){i=l;return}jM(c[o+8>>2]|0);i=l;return}function fF(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;k=i;i=i+12|0;l=d;d=i;i=i+4|0;c[d>>2]=c[l>>2]|0;l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g>>2;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;g=h>>2;do{if((h|0)>0){if((bX[c[(c[d>>2]|0)+48>>2]&1023](d,e,g)|0)==(g|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){if(q>>>0>1073741822){dp(0)}if(q>>>0<2){g=l;a[g]=q<<1&255;r=l+4|0;s=g}else{g=q+4&-4;e=jJ(g<<2)|0;c[l+8>>2]=e;c[l>>2]=g|1;c[l+4>>2]=q;r=e;s=l}aR(r|0,j|0,q|0);c[r+(q<<2)>>2]=0;if((a[s]&1)<<24>>24==0){t=l+4|0}else{t=c[l+8>>2]|0}if((bX[c[(c[d>>2]|0)+48>>2]&1023](d,t,q)|0)==(q|0)){if((a[s]&1)<<24>>24==0){break}jM(c[l+8>>2]|0);break}c[m>>2]=0;c[b>>2]=0;if((a[s]&1)<<24>>24==0){i=k;return}jM(c[l+8>>2]|0);i=k;return}}while(0);l=n-o|0;o=l>>2;do{if((l|0)>0){if((bX[c[(c[d>>2]|0)+48>>2]&1023](d,f,o)|0)==(o|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function fG(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+220|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=d|0;l=d+8|0;m=d+32|0;n=d+204|0;o=d+208|0;p=d+212|0;q=d+216|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}u=v+2|0;a[v]=108;a[v+1|0]=108;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=l|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);t=fm(u,c[1311652]|0,r,(z=i,i=i+8|0,c[z>>2]=h,c[z+4>>2]=j,z)|0)|0;j=l+t|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=276;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=276;break}w=l+2|0;break}else if((h|0)==32){w=j}else{x=276}}while(0);if((x|0)==276){w=u}x=m|0;m=p|0;h=c[f+28>>2]|0;c[m>>2]=h;l=h+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;fE(u,w,j,x,n,o,p);p=c[m>>2]|0;m=p+4|0;if(((G=c[m>>2]|0,c[m>>2]=G+ -1,G)|0)!=0){y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fF(b,q,x,C,D,f,g);i=d;return}b_[c[(c[p>>2]|0)+8>>2]&1023](p|0);y=e|0;A=c[y>>2]|0;B=q|0;c[B>>2]=A;C=c[n>>2]|0;D=c[o>>2]|0;fF(b,q,x,C,D,f,g);i=d;return}function fH(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0;d=i;i=i+292|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=d|0;m=d+8|0;n=d+40|0;o=d+44|0;p=d+272|0;q=d+276|0;r=d+280|0;s=d+284|0;t=d+288|0;c[l>>2]=37;c[l+4>>2]=0;u=l;l=u+1|0;v=f+4|0;w=c[v>>2]|0;if((w&2048|0)==0){x=l}else{a[l]=43;x=u+2|0}if((w&1024|0)==0){y=x}else{a[x]=35;y=x+1|0}x=w&260;l=w>>>14;do{if((x|0)==260){if((l&1|0)==0){a[y]=97;A=0;break}else{a[y]=65;A=0;break}}else{a[y]=46;w=y+2|0;a[y+1|0]=42;if((x|0)==4){if((l&1|0)==0){a[w]=102;A=1;break}else{a[w]=70;A=1;break}}else if((x|0)==256){if((l&1|0)==0){a[w]=101;A=1;break}else{a[w]=69;A=1;break}}else{if((l&1|0)==0){a[w]=103;A=1;break}else{a[w]=71;A=1;break}}}}while(0);l=m|0;c[n>>2]=l;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);m=c[1311652]|0;if(A){B=ft(l,30,m,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{B=ft(l,30,m,u,(z=i,i=i+8|0,h[k>>3]=j,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0}do{if((B|0)>29){m=a[5255524]<<24>>24==0;if(A){do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}m=c[n>>2]|0;if((m|0)!=0){D=C;E=m;F=m;break}m=bQ(4)|0;c[m>>2]=5247480;bo(m|0,5252704,66)}else{D=B;E=0;F=c[n>>2]|0}}while(0);B=F+D|0;C=c[v>>2]&176;do{if((C|0)==16){v=a[F]|0;if((v<<24>>24|0)==45|(v<<24>>24|0)==43){H=F+1|0;break}if(!((D|0)>1&v<<24>>24==48)){I=338;break}v=a[F+1|0]|0;if(!((v<<24>>24|0)==120|(v<<24>>24|0)==88)){I=338;break}H=F+2|0;break}else if((C|0)==32){H=B}else{I=338}}while(0);if((I|0)==338){H=F}do{if((F|0)==(l|0)){J=o|0;K=0;L=l}else{I=jD(D<<3)|0;C=I;if((I|0)!=0){J=C;K=C;L=c[n>>2]|0;break}C=bQ(4)|0;c[C>>2]=5247480;bo(C|0,5252704,66)}}while(0);n=r|0;D=c[f+28>>2]|0;c[n>>2]=D;l=D+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;fI(L,H,B,J,p,q,r);r=c[n>>2]|0;n=r+4|0;if(((G=c[n>>2]|0,c[n>>2]=G+ -1,G)|0)==0){b_[c[(c[r>>2]|0)+8>>2]&1023](r|0)}r=e|0;c[t>>2]=c[r>>2]|0;fF(s,t,J,c[p>>2]|0,c[q>>2]|0,f,g);g=c[s>>2]|0;c[r>>2]=g;c[b>>2]=g;if((K|0)!=0){jE(K)}if((E|0)==0){i=d;return}jE(E);i=d;return}function fI(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;l=i;i=i+36|0;m=l|0;n=l+12|0;o=l+24|0;p=k|0;k=c[p>>2]|0;if((c[1313735]|0)!=-1){c[n>>2]=5254940;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254940,n,252)}n=(c[1313736]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=bQ(4)|0;s=r;c[s>>2]=5247504;bo(r|0,5252716,512)}r=k;s=c[p>>2]|0;if((c[1313643]|0)!=-1){c[m>>2]=5254572;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254572,m,252)}m=(c[1313644]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=bQ(4)|0;u=t;c[u>>2]=5247504;bo(t|0,5252716,512)}t=s;b$[c[(c[s>>2]|0)+20>>2]&1023](o,t);c[j>>2]=g;u=a[b]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=ca[c[(c[k>>2]|0)+44>>2]&1023](r,u)|0;u=c[j>>2]|0;c[j>>2]=u+4|0;c[u>>2]=m;v=b+1|0}else{v=b}m=f;L433:do{if((m-v|0)>1){if(a[v]<<24>>24!=48){w=v;x=398;break}u=v+1|0;p=a[u]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=v;x=398;break}p=k;n=ca[c[(c[p>>2]|0)+44>>2]&1023](r,48)|0;q=c[j>>2]|0;c[j>>2]=q+4|0;c[q>>2]=n;n=v+2|0;q=ca[c[(c[p>>2]|0)+44>>2]&1023](r,a[u]|0)|0;u=c[j>>2]|0;c[j>>2]=u+4|0;c[u>>2]=q;q=n;while(1){if(q>>>0>=f>>>0){y=q;z=n;break L433}u=a[q]|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);if((a6(u<<24>>24|0,c[1311652]|0)|0)==0){y=q;z=n;break L433}else{q=q+1|0}}}else{w=v;x=398}}while(0);L448:do{if((x|0)==398){while(1){x=0;if(w>>>0>=f>>>0){y=w;z=v;break L448}q=a[w]|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);if((bJ(q<<24>>24|0,c[1311652]|0)|0)==0){y=w;z=v;break L448}else{w=w+1|0;x=398}}}}while(0);x=o;w=o;v=d[w]|0;if((v&1|0)==0){A=v>>>1}else{A=c[o+4>>2]|0}L463:do{if((A|0)==0){v=c[j>>2]|0;u=c[(c[k>>2]|0)+48>>2]|0;b7[u&1023](r,z,y,v);c[j>>2]=(c[j>>2]|0)+(y-z<<2)|0}else{L467:do{if((z|0)!=(y|0)){v=y-1|0;if(z>>>0<v>>>0){B=z;C=v}else{break}while(1){v=a[B]|0;a[B]=a[C]|0;a[C]=v;v=B+1|0;u=C-1|0;if(v>>>0<u>>>0){B=v;C=u}else{break L467}}}}while(0);q=b1[c[(c[s>>2]|0)+16>>2]&1023](t)|0;L473:do{if(z>>>0<y>>>0){u=x+1|0;v=o+4|0;n=o+8|0;p=k;D=0;E=0;F=z;while(1){G=(a[w]&1)<<24>>24==0;do{if(a[(G?u:c[n>>2]|0)+E|0]<<24>>24>0){if((D|0)!=(a[(G?u:c[n>>2]|0)+E|0]<<24>>24|0)){H=E;I=D;break}J=c[j>>2]|0;c[j>>2]=J+4|0;c[J>>2]=q;J=d[w]|0;H=(E>>>0<(((J&1|0)==0?J>>>1:c[v>>2]|0)-1|0)>>>0&1)+E|0;I=0}else{H=E;I=D}}while(0);G=ca[c[(c[p>>2]|0)+44>>2]&1023](r,a[F]|0)|0;J=c[j>>2]|0;c[j>>2]=J+4|0;c[J>>2]=G;G=F+1|0;if(G>>>0<y>>>0){D=I+1|0;E=H;F=G}else{break L473}}}}while(0);q=g+(z-b<<2)|0;F=c[j>>2]|0;if((q|0)==(F|0)){break}E=F-4|0;if(q>>>0<E>>>0){K=q;L=E}else{break}while(1){E=c[K>>2]|0;c[K>>2]=c[L>>2]|0;c[L>>2]=E;E=K+4|0;q=L-4|0;if(E>>>0<q>>>0){K=E;L=q}else{break L463}}}}while(0);L487:do{if(y>>>0<f>>>0){L=k;K=y;while(1){z=a[K]|0;if(z<<24>>24==46){break}H=ca[c[(c[L>>2]|0)+44>>2]&1023](r,z)|0;z=c[j>>2]|0;c[j>>2]=z+4|0;c[z>>2]=H;H=K+1|0;if(H>>>0<f>>>0){K=H}else{M=H;break L487}}L=b1[c[(c[s>>2]|0)+12>>2]&1023](t)|0;H=c[j>>2]|0;c[j>>2]=H+4|0;c[H>>2]=L;M=K+1|0}else{M=y}}while(0);b7[c[(c[k>>2]|0)+48>>2]&1023](r,M,f,c[j>>2]|0);r=(c[j>>2]|0)+(m-M<<2)|0;c[j>>2]=r;if((e|0)==(f|0)){N=r}else{N=g+(e-b<<2)|0}c[h>>2]=N;if((a[w]&1)<<24>>24==0){i=l;return}jM(c[o+8>>2]|0);i=l;return}function fJ(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0;d=i;i=i+292|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=d|0;m=d+8|0;n=d+40|0;o=d+44|0;p=d+272|0;q=d+276|0;r=d+280|0;s=d+284|0;t=d+288|0;c[l>>2]=37;c[l+4>>2]=0;u=l;l=u+1|0;v=f+4|0;w=c[v>>2]|0;if((w&2048|0)==0){x=l}else{a[l]=43;x=u+2|0}if((w&1024|0)==0){y=x}else{a[x]=35;y=x+1|0}x=w&260;l=w>>>14;do{if((x|0)==260){a[y]=76;w=y+1|0;if((l&1|0)==0){a[w]=97;A=0;break}else{a[w]=65;A=0;break}}else{a[y]=46;a[y+1|0]=42;a[y+2|0]=76;w=y+3|0;if((x|0)==4){if((l&1|0)==0){a[w]=102;A=1;break}else{a[w]=70;A=1;break}}else if((x|0)==256){if((l&1|0)==0){a[w]=101;A=1;break}else{a[w]=69;A=1;break}}else{if((l&1|0)==0){a[w]=103;A=1;break}else{a[w]=71;A=1;break}}}}while(0);l=m|0;c[n>>2]=l;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);m=c[1311652]|0;if(A){B=ft(l,30,m,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{B=ft(l,30,m,u,(z=i,i=i+8|0,h[k>>3]=j,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0}do{if((B|0)>29){m=a[5255524]<<24>>24==0;if(A){do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+12|0,c[z>>2]=c[f+8>>2]|0,h[k>>3]=j,c[z+4>>2]=c[k>>2]|0,c[z+8>>2]=c[k+4>>2]|0,z)|0)|0}else{do{if(m){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);C=fu(n,c[1311652]|0,u,(z=i,i=i+8|0,h[k>>3]=j,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0}m=c[n>>2]|0;if((m|0)!=0){D=C;E=m;F=m;break}m=bQ(4)|0;c[m>>2]=5247480;bo(m|0,5252704,66)}else{D=B;E=0;F=c[n>>2]|0}}while(0);B=F+D|0;C=c[v>>2]&176;do{if((C|0)==16){v=a[F]|0;if((v<<24>>24|0)==45|(v<<24>>24|0)==43){H=F+1|0;break}if(!((D|0)>1&v<<24>>24==48)){I=497;break}v=a[F+1|0]|0;if(!((v<<24>>24|0)==120|(v<<24>>24|0)==88)){I=497;break}H=F+2|0;break}else if((C|0)==32){H=B}else{I=497}}while(0);if((I|0)==497){H=F}do{if((F|0)==(l|0)){J=o|0;K=0;L=l}else{I=jD(D<<3)|0;C=I;if((I|0)!=0){J=C;K=C;L=c[n>>2]|0;break}C=bQ(4)|0;c[C>>2]=5247480;bo(C|0,5252704,66)}}while(0);n=r|0;D=c[f+28>>2]|0;c[n>>2]=D;l=D+4|0;G=c[l>>2]|0,c[l>>2]=G+1,G;fI(L,H,B,J,p,q,r);r=c[n>>2]|0;n=r+4|0;if(((G=c[n>>2]|0,c[n>>2]=G+ -1,G)|0)==0){b_[c[(c[r>>2]|0)+8>>2]&1023](r|0)}r=e|0;c[t>>2]=c[r>>2]|0;fF(s,t,J,c[p>>2]|0,c[q>>2]|0,f,g);g=c[s>>2]|0;c[r>>2]=g;c[b>>2]=g;if((K|0)!=0){jE(K)}if((E|0)==0){i=d;return}jE(E);i=d;return}function fK(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;d=i;i=i+192|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=d|0;k=d+20|0;l=d+40|0;m=d+188|0;n=d+12|0;jT(n|0,5247328,6);o=k|0;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);p=fm(o,c[1311652]|0,n,(z=i,i=i+4|0,c[z>>2]=h,z)|0)|0;h=k+p|0;n=c[f+4>>2]&176;do{if((n|0)==16){q=a[o]|0;if((q<<24>>24|0)==45|(q<<24>>24|0)==43){r=k+1|0;break}if(!((p|0)>1&q<<24>>24==48)){s=533;break}q=a[k+1|0]|0;if(!((q<<24>>24|0)==120|(q<<24>>24|0)==88)){s=533;break}r=k+2|0;break}else if((n|0)==32){r=h}else{s=533}}while(0);if((s|0)==533){r=o}s=c[f+28>>2]|0;n=s+4|0;G=c[n>>2]|0,c[n>>2]=G+1,G;if((c[1313735]|0)!=-1){c[j>>2]=5254940;c[j+4>>2]=24;c[j+8>>2]=0;dn(5254940,j,252)}j=(c[1313736]|0)-1|0;q=c[s+8>>2]|0;do{if((c[s+12>>2]|0)-q>>2>>>0>j>>>0){t=c[q+(j<<2)>>2]|0;if((t|0)==0){break}if(((G=c[n>>2]|0,c[n>>2]=G+ -1,G)|0)==0){b_[c[(c[s>>2]|0)+8>>2]&1023](s)}u=l|0;b7[c[(c[t>>2]|0)+48>>2]&1023](t,o,h,u);t=l+(p<<2)|0;if((r|0)==(h|0)){v=t;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;fF(b,m,u,v,t,f,g);i=d;return}v=l+(r-k<<2)|0;w=e|0;x=c[w>>2]|0;y=m|0;c[y>>2]=x;fF(b,m,u,v,t,f,g);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}function fL(a){a=a|0;return}function fM(a){a=a|0;return 2}function fN(a){a=a|0;jM(a);return}function fO(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+8|0;k=d;d=i;i=i+4|0;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+4|0;c[k>>2]=c[d>>2]|0;c[l>>2]=c[e>>2]|0;fQ(a,b,k,l,f,g,h,5247312,5247320);i=j;return}function fP(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+8|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=k|0;m=k+4|0;n=d+8|0;o=b1[c[(c[n>>2]|0)+20>>2]&1023](n)|0;c[l>>2]=c[e>>2]|0;c[m>>2]=c[f>>2]|0;f=o;e=a[o]|0;if((e&1)<<24>>24==0){p=f+1|0;q=f+1|0}else{f=c[o+8>>2]|0;p=f;q=f}f=e&255;if((f&1|0)==0){r=f>>>1}else{r=c[o+4>>2]|0}fQ(b,d,l,m,g,h,j,q,p+r|0);i=k;return}function fQ(e,f,g,h,j,k,l,m,n){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;var o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0;o=i;i=i+24|0;p=g;g=i;i=i+4|0;c[g>>2]=c[p>>2]|0;p=h;h=i;i=i+4|0;c[h>>2]=c[p>>2]|0;p=o|0;q=o+12|0;r=o+16|0;s=o+20|0;t=c[j+28>>2]|0;u=t+4|0;G=c[u>>2]|0,c[u>>2]=G+1,G;if((c[1313737]|0)!=-1){c[p>>2]=5254948;c[p+4>>2]=24;c[p+8>>2]=0;dn(5254948,p,252)}p=(c[1313738]|0)-1|0;v=c[t+8>>2]|0;do{if((c[t+12>>2]|0)-v>>2>>>0>p>>>0){w=c[v+(p<<2)>>2]|0;if((w|0)==0){break}x=w;if(((G=c[u>>2]|0,c[u>>2]=G+ -1,G)|0)==0){b_[c[(c[t>>2]|0)+8>>2]&1023](t)}c[k>>2]=0;y=g|0;L643:do{if((m|0)==(n|0)){z=631}else{A=h|0;B=w;C=w+8|0;D=w;E=f;F=r|0;H=s|0;I=q|0;J=m;K=0;L645:while(1){L=K;while(1){if((L|0)!=0){z=631;break L643}M=c[y>>2]|0;do{if((M|0)==0){N=0}else{if((c[M+12>>2]|0)!=(c[M+16>>2]|0)){N=M;break}if((b1[c[(c[M>>2]|0)+36>>2]&1023](M)|0)!=-1){N=M;break}c[y>>2]=0;N=0}}while(0);M=(N|0)==0;O=c[A>>2]|0;L655:do{if((O|0)==0){z=582}else{do{if((c[O+12>>2]|0)==(c[O+16>>2]|0)){if((b1[c[(c[O>>2]|0)+36>>2]&1023](O)|0)!=-1){break}c[A>>2]=0;z=582;break L655}}while(0);if(M){P=O;break}else{z=583;break L645}}}while(0);if((z|0)==582){z=0;if(M){z=583;break L645}else{P=0}}if(bX[c[(c[B>>2]|0)+36>>2]&1023](x,a[J]|0,0)<<24>>24==37){z=588;break}O=a[J]|0;if(O<<24>>24>-1){Q=c[C>>2]|0;if((b[Q+(O<<24>>24<<1)>>1]&8192)<<16>>16!=0){R=J;z=599;break}}S=N+12|0;O=c[S>>2]|0;T=N+16|0;if((O|0)==(c[T>>2]|0)){U=b1[c[(c[N>>2]|0)+36>>2]&1023](N)|0}else{U=d[O]|0}O=ca[c[(c[D>>2]|0)+12>>2]&1023](x,U&255)|0;if(O<<24>>24==ca[c[(c[D>>2]|0)+12>>2]&1023](x,a[J]|0)<<24>>24){z=626;break}c[k>>2]=4;L=4}L673:do{if((z|0)==626){z=0;L=c[S>>2]|0;if((L|0)==(c[T>>2]|0)){O=c[(c[N>>2]|0)+40>>2]|0;b1[O&1023](N)}else{c[S>>2]=L+1|0}V=J+1|0}else if((z|0)==588){z=0;L=J+1|0;if((L|0)==(n|0)){z=589;break L645}O=bX[c[(c[B>>2]|0)+36>>2]&1023](x,a[L]|0,0)|0;if((O<<24>>24|0)==69|(O<<24>>24|0)==48){W=J+2|0;if((W|0)==(n|0)){z=592;break L645}X=O;Y=bX[c[(c[B>>2]|0)+36>>2]&1023](x,a[W]|0,0)|0;Z=W}else{X=0;Y=O;Z=L}L=c[(c[E>>2]|0)+36>>2]|0;c[F>>2]=N;c[H>>2]=P;b0[L&1023](q,f,r,s,j,k,l,Y,X);c[y>>2]=c[I>>2]|0;V=Z+1|0}else if((z|0)==599){while(1){z=0;L=R+1|0;if((L|0)==(n|0)){_=n;break}O=a[L]|0;if(O<<24>>24<=-1){_=L;break}if((b[Q+(O<<24>>24<<1)>>1]&8192)<<16>>16==0){_=L;break}else{R=L;z=599}}M=N;L=P;while(1){do{if((M|0)==0){$=0}else{if((c[M+12>>2]|0)!=(c[M+16>>2]|0)){$=M;break}if((b1[c[(c[M>>2]|0)+36>>2]&1023](M)|0)!=-1){$=M;break}c[y>>2]=0;$=0}}while(0);O=($|0)==0;do{if((L|0)==0){z=612}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){if(O){aa=L;break}else{V=_;break L673}}if((b1[c[(c[L>>2]|0)+36>>2]&1023](L)|0)==-1){c[A>>2]=0;z=612;break}else{if(O^(L|0)==0){aa=L;break}else{V=_;break L673}}}}while(0);if((z|0)==612){z=0;if(O){V=_;break L673}else{aa=0}}W=$+12|0;ab=c[W>>2]|0;ac=$+16|0;if((ab|0)==(c[ac>>2]|0)){ad=b1[c[(c[$>>2]|0)+36>>2]&1023]($)|0}else{ad=d[ab]|0}ab=ad<<24>>24;if(ab>>>0>=128){V=_;break L673}if((b[(c[C>>2]|0)+(ab<<1)>>1]&8192)<<16>>16==0){V=_;break L673}ab=c[W>>2]|0;if((ab|0)==(c[ac>>2]|0)){ac=c[(c[$>>2]|0)+40>>2]|0;b1[ac&1023]($);M=$;L=aa;continue}else{c[W>>2]=ab+1|0;M=$;L=aa;continue}}}}while(0);if((V|0)==(n|0)){z=631;break L643}J=V;K=c[k>>2]|0}if((z|0)==589){c[k>>2]=4;ae=N;break}else if((z|0)==592){c[k>>2]=4;ae=N;break}else if((z|0)==583){c[k>>2]=4;ae=N;break}}}while(0);if((z|0)==631){ae=c[y>>2]|0}x=g|0;do{if((ae|0)!=0){if((c[ae+12>>2]|0)!=(c[ae+16>>2]|0)){break}if((b1[c[(c[ae>>2]|0)+36>>2]&1023](ae)|0)!=-1){break}c[x>>2]=0}}while(0);y=c[x>>2]|0;w=(y|0)==0;K=h|0;J=c[K>>2]|0;L731:do{if((J|0)==0){z=641}else{do{if((c[J+12>>2]|0)==(c[J+16>>2]|0)){if((b1[c[(c[J>>2]|0)+36>>2]&1023](J)|0)!=-1){break}c[K>>2]=0;z=641;break L731}}while(0);if(!w){break}af=e|0;c[af>>2]=y;i=o;return}}while(0);do{if((z|0)==641){if(w){break}af=e|0;c[af>>2]=y;i=o;return}}while(0);c[k>>2]=c[k>>2]|2;af=e|0;c[af>>2]=y;i=o;return}}while(0);o=bQ(4)|0;c[o>>2]=5247504;bo(o|0,5252716,512)}function fR(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+4|0;m=c[f+28>>2]|0;f=m+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313737]|0)!=-1){c[l>>2]=5254948;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254948,l,252)}l=(c[1313738]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=b1[c[c[q>>2]>>2]&1023](q)|0;c[k>>2]=p;p=(eG(d,k,r,r+168|0,o,g,0)|0)-r|0;if((p|0)>=168){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+24>>2]=((p|0)/12&-1|0)%7;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bQ(4)|0;c[j>>2]=5247504;bo(j|0,5252716,512)}function fS(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+4|0;m=c[f+28>>2]|0;f=m+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313737]|0)!=-1){c[l>>2]=5254948;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254948,l,252)}l=(c[1313738]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=b1[c[(c[q>>2]|0)+4>>2]&1023](q)|0;c[k>>2]=p;p=(eG(d,k,r,r+288|0,o,g,0)|0)-r|0;if((p|0)>=288){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+16>>2]=((p|0)/12&-1|0)%12;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bQ(4)|0;c[j>>2]=5247504;bo(j|0,5252716,512)}function fT(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;c[d>>2]=c[j>>2]|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=b|0;k=b+4|0;l=c[f+28>>2]|0;f=l+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313737]|0)!=-1){c[k>>2]=5254948;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254948,k,252)}k=(c[1313738]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[l>>2]|0)+8>>2]&1023](l)}c[j>>2]=c[e>>2]|0;o=fY(d,j,g,n,4)|0;if((c[g>>2]&4|0)!=0){p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}if((o|0)<69){s=o+2e3|0}else{s=(o-69|0)>>>0<31?o+1900|0:o}c[h+20>>2]=s-1900|0;p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}}while(0);b=bQ(4)|0;c[b>>2]=5247504;bo(b|0,5252716,512)}function fU(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0;l=i;i=i+164|0;m=e;e=i;i=i+4|0;c[e>>2]=c[m>>2]|0;m=f;f=i;i=i+4|0;c[f>>2]=c[m>>2]|0;m=l|0;n=l+4|0;o=l+8|0;p=l+12|0;q=l+16|0;r=l+20|0;s=l+24|0;t=l+28|0;u=l+32|0;v=l+36|0;w=l+40|0;x=l+44|0;y=l+48|0;z=l+60|0;A=l+64|0;B=l+68|0;C=l+72|0;D=l+76|0;E=l+80|0;F=l+84|0;H=l+88|0;I=l+92|0;J=l+96|0;K=l+100|0;L=l+104|0;M=l+108|0;N=l+112|0;O=l+116|0;P=l+120|0;Q=l+124|0;R=l+128|0;S=l+132|0;T=l+136|0;U=l+140|0;V=l+144|0;W=l+148|0;X=l+152|0;Y=l+156|0;Z=l+160|0;c[h>>2]=0;_=c[g+28>>2]|0;$=_+4|0;G=c[$>>2]|0,c[$>>2]=G+1,G;if((c[1313737]|0)!=-1){c[y>>2]=5254948;c[y+4>>2]=24;c[y+8>>2]=0;dn(5254948,y,252)}y=(c[1313738]|0)-1|0;aa=c[_+8>>2]|0;do{if((c[_+12>>2]|0)-aa>>2>>>0>y>>>0){ab=c[aa+(y<<2)>>2]|0;if((ab|0)==0){break}ac=ab;if(((G=c[$>>2]|0,c[$>>2]=G+ -1,G)|0)==0){b_[c[(c[_>>2]|0)+8>>2]&1023](_)}ab=k<<24>>24;L807:do{if((ab|0)==121){c[n>>2]=c[f>>2]|0;ad=fY(e,n,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}if((ad|0)<69){ae=ad+2e3|0}else{ae=(ad-69|0)>>>0<31?ad+1900|0:ad}c[j+20>>2]=ae-1900|0}else if((ab|0)==89){c[m>>2]=c[f>>2]|0;ad=fY(e,m,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}c[j+20>>2]=ad-1900|0}else if((ab|0)==37){c[Z>>2]=c[f>>2]|0;fX(0,e,Z,h,ac)}else if((ab|0)==99){ad=d+8|0;af=b1[c[(c[ad>>2]|0)+12>>2]&1023](ad)|0;ad=e|0;c[A>>2]=c[ad>>2]|0;c[B>>2]=c[f>>2]|0;ag=af;ah=a[af]|0;if((ah&1)<<24>>24==0){ai=ag+1|0;aj=ag+1|0}else{ag=c[af+8>>2]|0;ai=ag;aj=ag}ag=ah&255;if((ag&1|0)==0){ak=ag>>>1}else{ak=c[af+4>>2]|0}fQ(z,d,A,B,g,h,j,aj,ai+ak|0);c[ad>>2]=c[z>>2]|0}else if((ab|0)==98|(ab|0)==66|(ab|0)==104){ad=c[f>>2]|0;af=d+8|0;ag=b1[c[(c[af>>2]|0)+4>>2]&1023](af)|0;c[w>>2]=ad;ad=(eG(e,w,ag,ag+288|0,ac,h,0)|0)-ag|0;if((ad|0)>=288){break}c[j+16>>2]=((ad|0)/12&-1|0)%12}else if((ab|0)==120){ad=c[(c[d>>2]|0)+20>>2]|0;c[U>>2]=c[e>>2]|0;c[V>>2]=c[f>>2]|0;b3[ad&1023](b,d,U,V,g,h,j);i=l;return}else if((ab|0)==88){ad=d+8|0;ag=b1[c[(c[ad>>2]|0)+24>>2]&1023](ad)|0;ad=e|0;c[X>>2]=c[ad>>2]|0;c[Y>>2]=c[f>>2]|0;af=ag;ah=a[ag]|0;if((ah&1)<<24>>24==0){al=af+1|0;am=af+1|0}else{af=c[ag+8>>2]|0;al=af;am=af}af=ah&255;if((af&1|0)==0){an=af>>>1}else{an=c[ag+4>>2]|0}fQ(W,d,X,Y,g,h,j,am,al+an|0);c[ad>>2]=c[W>>2]|0}else if((ab|0)==100|(ab|0)==101){ad=j+12|0;c[v>>2]=c[f>>2]|0;ag=fY(e,v,h,ac,2)|0;af=c[h>>2]|0;do{if((af&4|0)==0){if((ag-1|0)>>>0>=31){break}c[ad>>2]=ag;break L807}}while(0);c[h>>2]=af|4}else if((ab|0)==110|(ab|0)==116){c[J>>2]=c[f>>2]|0;fV(0,e,J,h,ac)}else if((ab|0)==112){c[K>>2]=c[f>>2]|0;fW(d,j+8|0,e,K,h,ac)}else if((ab|0)==114){ag=e|0;c[M>>2]=c[ag>>2]|0;c[N>>2]=c[f>>2]|0;fQ(L,d,M,N,g,h,j,5247284,5247295);c[ag>>2]=c[L>>2]|0}else if((ab|0)==82){ag=e|0;c[P>>2]=c[ag>>2]|0;c[Q>>2]=c[f>>2]|0;fQ(O,d,P,Q,g,h,j,5247276,5247281);c[ag>>2]=c[O>>2]|0}else if((ab|0)==83){c[p>>2]=c[f>>2]|0;ag=fY(e,p,h,ac,2)|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ag|0)<61){c[j>>2]=ag;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==84){ad=e|0;c[S>>2]=c[ad>>2]|0;c[T>>2]=c[f>>2]|0;fQ(R,d,S,T,g,h,j,5247268,5247276);c[ad>>2]=c[R>>2]|0}else if((ab|0)==119){c[o>>2]=c[f>>2]|0;ad=fY(e,o,h,ac,1)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ad|0)<7){c[j+24>>2]=ad;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==109){c[r>>2]=c[f>>2]|0;ag=(fY(e,r,h,ac,2)|0)-1|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ag|0)<12){c[j+16>>2]=ag;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==77){c[q>>2]=c[f>>2]|0;ad=fY(e,q,h,ac,2)|0;ag=c[h>>2]|0;if((ag&4|0)==0&(ad|0)<60){c[j+4>>2]=ad;break}else{c[h>>2]=ag|4;break}}else if((ab|0)==68){ag=e|0;c[D>>2]=c[ag>>2]|0;c[E>>2]=c[f>>2]|0;fQ(C,d,D,E,g,h,j,5247304,5247312);c[ag>>2]=c[C>>2]|0}else if((ab|0)==70){ag=e|0;c[H>>2]=c[ag>>2]|0;c[I>>2]=c[f>>2]|0;fQ(F,d,H,I,g,h,j,5247296,5247304);c[ag>>2]=c[F>>2]|0}else if((ab|0)==72){c[u>>2]=c[f>>2]|0;ag=fY(e,u,h,ac,2)|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ag|0)<24){c[j+8>>2]=ag;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==73){ad=j+8|0;c[t>>2]=c[f>>2]|0;ag=fY(e,t,h,ac,2)|0;ah=c[h>>2]|0;do{if((ah&4|0)==0){if((ag-1|0)>>>0>=12){break}c[ad>>2]=ag;break L807}}while(0);c[h>>2]=ah|4}else if((ab|0)==97|(ab|0)==65){ag=c[f>>2]|0;ad=d+8|0;af=b1[c[c[ad>>2]>>2]&1023](ad)|0;c[x>>2]=ag;ag=(eG(e,x,af,af+168|0,ac,h,0)|0)-af|0;if((ag|0)>=168){break}c[j+24>>2]=((ag|0)/12&-1|0)%7}else if((ab|0)==106){c[s>>2]=c[f>>2]|0;ag=fY(e,s,h,ac,3)|0;af=c[h>>2]|0;if((af&4|0)==0&(ag|0)<366){c[j+28>>2]=ag;break}else{c[h>>2]=af|4;break}}else{c[h>>2]=c[h>>2]|4}}while(0);c[b>>2]=c[e>>2]|0;i=l;return}}while(0);l=bQ(4)|0;c[l>>2]=5247504;bo(l|0,5252716,512)}function fV(a,e,f,g,h){a=a|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;a=i;j=f;f=i;i=i+4|0;c[f>>2]=c[j>>2]|0;j=h+8|0;h=e|0;e=f|0;L888:while(1){f=c[h>>2]|0;do{if((f|0)==0){k=0}else{if((c[f+12>>2]|0)!=(c[f+16>>2]|0)){k=f;break}if((b1[c[(c[f>>2]|0)+36>>2]&1023](f)|0)==-1){c[h>>2]=0;k=0;break}else{k=c[h>>2]|0;break}}}while(0);f=(k|0)==0;l=c[e>>2]|0;L897:do{if((l|0)==0){m=786}else{do{if((c[l+12>>2]|0)==(c[l+16>>2]|0)){if((b1[c[(c[l>>2]|0)+36>>2]&1023](l)|0)!=-1){break}c[e>>2]=0;m=786;break L897}}while(0);if(f){n=l;o=0;break}else{p=l;q=0;break L888}}}while(0);if((m|0)==786){m=0;if(f){p=0;q=1;break}else{n=0;o=1}}l=c[h>>2]|0;r=c[l+12>>2]|0;if((r|0)==(c[l+16>>2]|0)){s=b1[c[(c[l>>2]|0)+36>>2]&1023](l)|0}else{s=d[r]|0}r=s<<24>>24;if(r>>>0>=128){p=n;q=o;break}if((b[(c[j>>2]|0)+(r<<1)>>1]&8192)<<16>>16==0){p=n;q=o;break}r=c[h>>2]|0;l=r+12|0;t=c[l>>2]|0;if((t|0)==(c[r+16>>2]|0)){u=c[(c[r>>2]|0)+40>>2]|0;b1[u&1023](r);continue}else{c[l>>2]=t+1|0;continue}}o=c[h>>2]|0;do{if((o|0)==0){v=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){v=o;break}if((b1[c[(c[o>>2]|0)+36>>2]&1023](o)|0)==-1){c[h>>2]=0;v=0;break}else{v=c[h>>2]|0;break}}}while(0);h=(v|0)==0;do{if(q){m=805}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){if(!(h^(p|0)==0)){break}i=a;return}if((b1[c[(c[p>>2]|0)+36>>2]&1023](p)|0)==-1){c[e>>2]=0;m=805;break}if(!h){break}i=a;return}}while(0);do{if((m|0)==805){if(h){break}i=a;return}}while(0);c[g>>2]=c[g>>2]|2;i=a;return}function fW(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+4|0;k=f;f=i;i=i+4|0;c[f>>2]=c[k>>2]|0;k=j|0;l=a+8|0;a=b1[c[(c[l>>2]|0)+8>>2]&1023](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2]|0;f=eG(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12|0;i=j;return}function fX(a,b,e,f,g){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;a=i;h=e;e=i;i=i+4|0;c[e>>2]=c[h>>2]|0;h=b|0;b=c[h>>2]|0;do{if((b|0)==0){j=0}else{if((c[b+12>>2]|0)!=(c[b+16>>2]|0)){j=b;break}if((b1[c[(c[b>>2]|0)+36>>2]&1023](b)|0)==-1){c[h>>2]=0;j=0;break}else{j=c[h>>2]|0;break}}}while(0);b=(j|0)==0;j=e|0;e=c[j>>2]|0;L971:do{if((e|0)==0){k=843}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((b1[c[(c[e>>2]|0)+36>>2]&1023](e)|0)!=-1){break}c[j>>2]=0;k=843;break L971}}while(0);if(b){l=e;m=0;break}else{k=844;break}}}while(0);do{if((k|0)==843){if(b){k=844;break}else{l=0;m=1;break}}}while(0);if((k|0)==844){c[f>>2]=c[f>>2]|6;i=a;return}b=c[h>>2]|0;e=c[b+12>>2]|0;if((e|0)==(c[b+16>>2]|0)){n=b1[c[(c[b>>2]|0)+36>>2]&1023](b)|0}else{n=d[e]|0}if(bX[c[(c[g>>2]|0)+36>>2]&1023](g,n&255,0)<<24>>24!=37){c[f>>2]=c[f>>2]|4;i=a;return}n=c[h>>2]|0;g=n+12|0;e=c[g>>2]|0;if((e|0)==(c[n+16>>2]|0)){b=c[(c[n>>2]|0)+40>>2]|0;b1[b&1023](n)}else{c[g>>2]=e+1|0}e=c[h>>2]|0;do{if((e|0)==0){o=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){o=e;break}if((b1[c[(c[e>>2]|0)+36>>2]&1023](e)|0)==-1){c[h>>2]=0;o=0;break}else{o=c[h>>2]|0;break}}}while(0);h=(o|0)==0;do{if(m){k=863}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){if(!(h^(l|0)==0)){break}i=a;return}if((b1[c[(c[l>>2]|0)+36>>2]&1023](l)|0)==-1){c[j>>2]=0;k=863;break}if(!h){break}i=a;return}}while(0);do{if((k|0)==863){if(h){break}i=a;return}}while(0);c[f>>2]=c[f>>2]|2;i=a;return}function fY(a,e,f,g,h){a=a|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;j=i;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=a|0;a=c[k>>2]|0;do{if((a|0)==0){l=0}else{if((c[a+12>>2]|0)!=(c[a+16>>2]|0)){l=a;break}if((b1[c[(c[a>>2]|0)+36>>2]&1023](a)|0)==-1){c[k>>2]=0;l=0;break}else{l=c[k>>2]|0;break}}}while(0);a=(l|0)==0;l=e|0;e=c[l>>2]|0;L1025:do{if((e|0)==0){m=883}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((b1[c[(c[e>>2]|0)+36>>2]&1023](e)|0)!=-1){break}c[l>>2]=0;m=883;break L1025}}while(0);if(a){n=e;break}else{m=884;break}}}while(0);do{if((m|0)==883){if(a){m=884;break}else{n=0;break}}}while(0);if((m|0)==884){c[f>>2]=c[f>>2]|6;o=0;i=j;return o|0}a=c[k>>2]|0;e=c[a+12>>2]|0;if((e|0)==(c[a+16>>2]|0)){p=b1[c[(c[a>>2]|0)+36>>2]&1023](a)|0}else{p=d[e]|0}e=p&255;a=p<<24>>24;do{if(a>>>0<128){p=g+8|0;if((b[(c[p>>2]|0)+(a<<1)>>1]&2048)<<16>>16==0){break}q=g;r=bX[c[(c[q>>2]|0)+36>>2]&1023](g,e,0)<<24>>24;s=c[k>>2]|0;t=s+12|0;u=c[t>>2]|0;do{if((u|0)==(c[s+16>>2]|0)){v=c[(c[s>>2]|0)+40>>2]|0;b1[v&1023](s);w=r;x=h;y=n;break}else{c[t>>2]=u+1|0;w=r;x=h;y=n;break}}while(0);while(1){z=w-48|0;r=x-1|0;u=c[k>>2]|0;do{if((u|0)==0){A=0}else{if((c[u+12>>2]|0)!=(c[u+16>>2]|0)){A=u;break}if((b1[c[(c[u>>2]|0)+36>>2]&1023](u)|0)==-1){c[k>>2]=0;A=0;break}else{A=c[k>>2]|0;break}}}while(0);u=(A|0)==0;if((y|0)==0){B=A;C=0}else{do{if((c[y+12>>2]|0)==(c[y+16>>2]|0)){if((b1[c[(c[y>>2]|0)+36>>2]&1023](y)|0)!=-1){D=y;break}c[l>>2]=0;D=0}else{D=y}}while(0);B=c[k>>2]|0;C=D}E=(C|0)==0;if(!((u^E)&(r|0)>0)){m=913;break}t=c[B+12>>2]|0;if((t|0)==(c[B+16>>2]|0)){F=b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0}else{F=d[t]|0}t=F<<24>>24;if(t>>>0>=128){o=z;m=930;break}if((b[(c[p>>2]|0)+(t<<1)>>1]&2048)<<16>>16==0){o=z;m=926;break}t=(bX[c[(c[q>>2]|0)+36>>2]&1023](g,F&255,0)<<24>>24)+(z*10&-1)|0;s=c[k>>2]|0;v=s+12|0;G=c[v>>2]|0;if((G|0)==(c[s+16>>2]|0)){H=c[(c[s>>2]|0)+40>>2]|0;b1[H&1023](s);w=t;x=r;y=C;continue}else{c[v>>2]=G+1|0;w=t;x=r;y=C;continue}}if((m|0)==930){i=j;return o|0}else if((m|0)==913){do{if((B|0)==0){I=0}else{if((c[B+12>>2]|0)!=(c[B+16>>2]|0)){I=B;break}if((b1[c[(c[B>>2]|0)+36>>2]&1023](B)|0)==-1){c[k>>2]=0;I=0;break}else{I=c[k>>2]|0;break}}}while(0);q=(I|0)==0;L1083:do{if(E){m=923}else{do{if((c[C+12>>2]|0)==(c[C+16>>2]|0)){if((b1[c[(c[C>>2]|0)+36>>2]&1023](C)|0)!=-1){break}c[l>>2]=0;m=923;break L1083}}while(0);if(q){o=z}else{break}i=j;return o|0}}while(0);do{if((m|0)==923){if(q){break}else{o=z}i=j;return o|0}}while(0);c[f>>2]=c[f>>2]|2;o=z;i=j;return o|0}else if((m|0)==926){i=j;return o|0}}}while(0);c[f>>2]=c[f>>2]|4;o=0;i=j;return o|0}function fZ(a){a=a|0;return}function f_(a){a=a|0;return 2}function f$(a){a=a|0;jM(a);return}function f0(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+8|0;k=d;d=i;i=i+4|0;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+4|0;c[k>>2]=c[d>>2]|0;c[l>>2]=c[e>>2]|0;f2(a,b,k,l,f,g,h,5247236,5247268);i=j;return}function f1(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+8|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=k|0;m=k+4|0;n=d+8|0;o=b1[c[(c[n>>2]|0)+20>>2]&1023](n)|0;c[l>>2]=c[e>>2]|0;c[m>>2]=c[f>>2]|0;f=a[o]|0;if((f&1)<<24>>24==0){p=o+4|0;q=o+4|0}else{e=c[o+8>>2]|0;p=e;q=e}e=f&255;if((e&1|0)==0){r=e>>>1}else{r=c[o+4>>2]|0}f2(b,d,l,m,g,h,j,q,p+(r<<2)|0);i=k;return}function f2(a,b,d,e,f,g,h,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0;l=i;i=i+24|0;m=d;d=i;i=i+4|0;c[d>>2]=c[m>>2]|0;m=e;e=i;i=i+4|0;c[e>>2]=c[m>>2]|0;m=l|0;n=l+12|0;o=l+16|0;p=l+20|0;q=c[f+28>>2]|0;r=q+4|0;G=c[r>>2]|0,c[r>>2]=G+1,G;if((c[1313735]|0)!=-1){c[m>>2]=5254940;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254940,m,252)}m=(c[1313736]|0)-1|0;s=c[q+8>>2]|0;do{if((c[q+12>>2]|0)-s>>2>>>0>m>>>0){t=c[s+(m<<2)>>2]|0;if((t|0)==0){break}u=t;if(((G=c[r>>2]|0,c[r>>2]=G+ -1,G)|0)==0){b_[c[(c[q>>2]|0)+8>>2]&1023](q)}c[g>>2]=0;v=d|0;L1121:do{if((j|0)==(k|0)){w=1018}else{x=e|0;y=t;z=t;A=t;B=b;C=o|0;D=p|0;E=n|0;F=j;H=0;L1123:while(1){I=H;while(1){if((I|0)!=0){w=1018;break L1121}J=c[v>>2]|0;do{if((J|0)==0){K=0}else{L=c[J+12>>2]|0;if((L|0)==(c[J+16>>2]|0)){M=b1[c[(c[J>>2]|0)+36>>2]&1023](J)|0}else{M=c[L>>2]|0}if((M|0)!=-1){K=J;break}c[v>>2]=0;K=0}}while(0);J=(K|0)==0;L=c[x>>2]|0;do{if((L|0)==0){w=968}else{N=c[L+12>>2]|0;if((N|0)==(c[L+16>>2]|0)){O=b1[c[(c[L>>2]|0)+36>>2]&1023](L)|0}else{O=c[N>>2]|0}if((O|0)==-1){c[x>>2]=0;w=968;break}else{if(J^(L|0)==0){P=L;break}else{w=970;break L1123}}}}while(0);if((w|0)==968){w=0;if(J){w=970;break L1123}else{P=0}}if(bX[c[(c[y>>2]|0)+52>>2]&1023](u,c[F>>2]|0,0)<<24>>24==37){w=975;break}if(bX[c[(c[z>>2]|0)+12>>2]&1023](u,8192,c[F>>2]|0)|0){Q=F;w=985;break}R=K+12|0;L=c[R>>2]|0;S=K+16|0;if((L|0)==(c[S>>2]|0)){T=b1[c[(c[K>>2]|0)+36>>2]&1023](K)|0}else{T=c[L>>2]|0}L=ca[c[(c[A>>2]|0)+28>>2]&1023](u,T)|0;if((L|0)==(ca[c[(c[A>>2]|0)+28>>2]&1023](u,c[F>>2]|0)|0)){w=1013;break}c[g>>2]=4;I=4}L1155:do{if((w|0)==975){w=0;I=F+4|0;if((I|0)==(k|0)){w=976;break L1123}L=bX[c[(c[y>>2]|0)+52>>2]&1023](u,c[I>>2]|0,0)|0;if((L<<24>>24|0)==69|(L<<24>>24|0)==48){N=F+8|0;if((N|0)==(k|0)){w=979;break L1123}U=L;V=bX[c[(c[y>>2]|0)+52>>2]&1023](u,c[N>>2]|0,0)|0;W=N}else{U=0;V=L;W=I}I=c[(c[B>>2]|0)+36>>2]|0;c[C>>2]=K;c[D>>2]=P;b0[I&1023](n,b,o,p,f,g,h,V,U);c[v>>2]=c[E>>2]|0;X=W+4|0}else if((w|0)==985){while(1){w=0;I=Q+4|0;if((I|0)==(k|0)){Y=k;break}if(bX[c[(c[z>>2]|0)+12>>2]&1023](u,8192,c[I>>2]|0)|0){Q=I;w=985}else{Y=I;break}}J=K;I=P;while(1){do{if((J|0)==0){Z=0}else{L=c[J+12>>2]|0;if((L|0)==(c[J+16>>2]|0)){_=b1[c[(c[J>>2]|0)+36>>2]&1023](J)|0}else{_=c[L>>2]|0}if((_|0)!=-1){Z=J;break}c[v>>2]=0;Z=0}}while(0);L=(Z|0)==0;do{if((I|0)==0){w=1e3}else{N=c[I+12>>2]|0;if((N|0)==(c[I+16>>2]|0)){$=b1[c[(c[I>>2]|0)+36>>2]&1023](I)|0}else{$=c[N>>2]|0}if(($|0)==-1){c[x>>2]=0;w=1e3;break}else{if(L^(I|0)==0){aa=I;break}else{X=Y;break L1155}}}}while(0);if((w|0)==1e3){w=0;if(L){X=Y;break L1155}else{aa=0}}N=Z+12|0;ab=c[N>>2]|0;ac=Z+16|0;if((ab|0)==(c[ac>>2]|0)){ad=b1[c[(c[Z>>2]|0)+36>>2]&1023](Z)|0}else{ad=c[ab>>2]|0}if(!(bX[c[(c[z>>2]|0)+12>>2]&1023](u,8192,ad)|0)){X=Y;break L1155}ab=c[N>>2]|0;if((ab|0)==(c[ac>>2]|0)){ac=c[(c[Z>>2]|0)+40>>2]|0;b1[ac&1023](Z);J=Z;I=aa;continue}else{c[N>>2]=ab+4|0;J=Z;I=aa;continue}}}else if((w|0)==1013){w=0;I=c[R>>2]|0;if((I|0)==(c[S>>2]|0)){J=c[(c[K>>2]|0)+40>>2]|0;b1[J&1023](K)}else{c[R>>2]=I+4|0}X=F+4|0}}while(0);if((X|0)==(k|0)){w=1018;break L1121}F=X;H=c[g>>2]|0}if((w|0)==970){c[g>>2]=4;ae=K;break}else if((w|0)==976){c[g>>2]=4;ae=K;break}else if((w|0)==979){c[g>>2]=4;ae=K;break}}}while(0);if((w|0)==1018){ae=c[v>>2]|0}u=d|0;do{if((ae|0)!=0){t=c[ae+12>>2]|0;if((t|0)==(c[ae+16>>2]|0)){af=b1[c[(c[ae>>2]|0)+36>>2]&1023](ae)|0}else{af=c[t>>2]|0}if((af|0)!=-1){break}c[u>>2]=0}}while(0);v=c[u>>2]|0;t=(v|0)==0;H=e|0;F=c[H>>2]|0;do{if((F|0)==0){w=1031}else{z=c[F+12>>2]|0;if((z|0)==(c[F+16>>2]|0)){ag=b1[c[(c[F>>2]|0)+36>>2]&1023](F)|0}else{ag=c[z>>2]|0}if((ag|0)==-1){c[H>>2]=0;w=1031;break}if(!(t^(F|0)==0)){break}ah=a|0;c[ah>>2]=v;i=l;return}}while(0);do{if((w|0)==1031){if(t){break}ah=a|0;c[ah>>2]=v;i=l;return}}while(0);c[g>>2]=c[g>>2]|2;ah=a|0;c[ah>>2]=v;i=l;return}}while(0);l=bQ(4)|0;c[l>>2]=5247504;bo(l|0,5252716,512)}function f3(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+4|0;m=c[f+28>>2]|0;f=m+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313735]|0)!=-1){c[l>>2]=5254940;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254940,l,252)}l=(c[1313736]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=b1[c[c[q>>2]>>2]&1023](q)|0;c[k>>2]=p;p=(e4(d,k,r,r+168|0,o,g,0)|0)-r|0;if((p|0)>=168){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+24>>2]=((p|0)/12&-1|0)%7;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bQ(4)|0;c[j>>2]=5247504;bo(j|0,5252716,512)}function f4(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;c[d>>2]=c[k>>2]|0;k=e;e=i;i=i+4|0;c[e>>2]=c[k>>2]|0;k=j|0;l=j+4|0;m=c[f+28>>2]|0;f=m+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313735]|0)!=-1){c[l>>2]=5254940;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254940,l,252)}l=(c[1313736]|0)-1|0;n=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-n>>2>>>0>l>>>0){o=c[n+(l<<2)>>2]|0;if((o|0)==0){break}if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[m>>2]|0)+8>>2]&1023](m)}p=c[e>>2]|0;q=b+8|0;r=b1[c[(c[q>>2]|0)+4>>2]&1023](q)|0;c[k>>2]=p;p=(e4(d,k,r,r+288|0,o,g,0)|0)-r|0;if((p|0)>=288){s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}c[h+16>>2]=((p|0)/12&-1|0)%12;s=d|0;t=c[s>>2]|0;u=a|0;c[u>>2]=t;i=j;return}}while(0);j=bQ(4)|0;c[j>>2]=5247504;bo(j|0,5252716,512)}function f5(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;c[d>>2]=c[j>>2]|0;j=e;e=i;i=i+4|0;c[e>>2]=c[j>>2]|0;j=b|0;k=b+4|0;l=c[f+28>>2]|0;f=l+4|0;G=c[f>>2]|0,c[f>>2]=G+1,G;if((c[1313735]|0)!=-1){c[k>>2]=5254940;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254940,k,252)}k=(c[1313736]|0)-1|0;m=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-m>>2>>>0>k>>>0){n=c[m+(k<<2)>>2]|0;if((n|0)==0){break}if(((G=c[f>>2]|0,c[f>>2]=G+ -1,G)|0)==0){b_[c[(c[l>>2]|0)+8>>2]&1023](l)}c[j>>2]=c[e>>2]|0;o=ga(d,j,g,n,4)|0;if((c[g>>2]&4|0)!=0){p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}if((o|0)<69){s=o+2e3|0}else{s=(o-69|0)>>>0<31?o+1900|0:o}c[h+20>>2]=s-1900|0;p=d|0;q=c[p>>2]|0;r=a|0;c[r>>2]=q;i=b;return}}while(0);b=bQ(4)|0;c[b>>2]=5247504;bo(b|0,5252716,512)}function f6(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0;l=i;i=i+164|0;m=e;e=i;i=i+4|0;c[e>>2]=c[m>>2]|0;m=f;f=i;i=i+4|0;c[f>>2]=c[m>>2]|0;m=l|0;n=l+4|0;o=l+8|0;p=l+12|0;q=l+16|0;r=l+20|0;s=l+24|0;t=l+28|0;u=l+32|0;v=l+36|0;w=l+40|0;x=l+44|0;y=l+48|0;z=l+60|0;A=l+64|0;B=l+68|0;C=l+72|0;D=l+76|0;E=l+80|0;F=l+84|0;H=l+88|0;I=l+92|0;J=l+96|0;K=l+100|0;L=l+104|0;M=l+108|0;N=l+112|0;O=l+116|0;P=l+120|0;Q=l+124|0;R=l+128|0;S=l+132|0;T=l+136|0;U=l+140|0;V=l+144|0;W=l+148|0;X=l+152|0;Y=l+156|0;Z=l+160|0;c[h>>2]=0;_=c[g+28>>2]|0;$=_+4|0;G=c[$>>2]|0,c[$>>2]=G+1,G;if((c[1313735]|0)!=-1){c[y>>2]=5254940;c[y+4>>2]=24;c[y+8>>2]=0;dn(5254940,y,252)}y=(c[1313736]|0)-1|0;aa=c[_+8>>2]|0;do{if((c[_+12>>2]|0)-aa>>2>>>0>y>>>0){ab=c[aa+(y<<2)>>2]|0;if((ab|0)==0){break}ac=ab;if(((G=c[$>>2]|0,c[$>>2]=G+ -1,G)|0)==0){b_[c[(c[_>>2]|0)+8>>2]&1023](_)}ab=k<<24>>24;L1297:do{if((ab|0)==72){c[u>>2]=c[f>>2]|0;ad=ga(e,u,h,ac,2)|0;ae=c[h>>2]|0;if((ae&4|0)==0&(ad|0)<24){c[j+8>>2]=ad;break}else{c[h>>2]=ae|4;break}}else if((ab|0)==121){c[n>>2]=c[f>>2]|0;ae=ga(e,n,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}if((ae|0)<69){af=ae+2e3|0}else{af=(ae-69|0)>>>0<31?ae+1900|0:ae}c[j+20>>2]=af-1900|0}else if((ab|0)==68){ae=e|0;c[D>>2]=c[ae>>2]|0;c[E>>2]=c[f>>2]|0;f2(C,d,D,E,g,h,j,5247204,5247236);c[ae>>2]=c[C>>2]|0}else if((ab|0)==70){ae=e|0;c[H>>2]=c[ae>>2]|0;c[I>>2]=c[f>>2]|0;f2(F,d,H,I,g,h,j,5247076,5247108);c[ae>>2]=c[F>>2]|0}else if((ab|0)==37){c[Z>>2]=c[f>>2]|0;f9(0,e,Z,h,ac)}else if((ab|0)==84){ae=e|0;c[S>>2]=c[ae>>2]|0;c[T>>2]=c[f>>2]|0;f2(R,d,S,T,g,h,j,5247108,5247140);c[ae>>2]=c[R>>2]|0}else if((ab|0)==119){c[o>>2]=c[f>>2]|0;ae=ga(e,o,h,ac,1)|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ae|0)<7){c[j+24>>2]=ae;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==89){c[m>>2]=c[f>>2]|0;ad=ga(e,m,h,ac,4)|0;if((c[h>>2]&4|0)!=0){break}c[j+20>>2]=ad-1900|0}else if((ab|0)==106){c[s>>2]=c[f>>2]|0;ad=ga(e,s,h,ac,3)|0;ae=c[h>>2]|0;if((ae&4|0)==0&(ad|0)<366){c[j+28>>2]=ad;break}else{c[h>>2]=ae|4;break}}else if((ab|0)==110|(ab|0)==116){c[J>>2]=c[f>>2]|0;f7(0,e,J,h,ac)}else if((ab|0)==77){c[q>>2]=c[f>>2]|0;ae=ga(e,q,h,ac,2)|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ae|0)<60){c[j+4>>2]=ae;break}else{c[h>>2]=ad|4;break}}else if((ab|0)==109){c[r>>2]=c[f>>2]|0;ad=(ga(e,r,h,ac,2)|0)-1|0;ae=c[h>>2]|0;if((ae&4|0)==0&(ad|0)<12){c[j+16>>2]=ad;break}else{c[h>>2]=ae|4;break}}else if((ab|0)==99){ae=d+8|0;ad=b1[c[(c[ae>>2]|0)+12>>2]&1023](ae)|0;ae=e|0;c[A>>2]=c[ae>>2]|0;c[B>>2]=c[f>>2]|0;ag=a[ad]|0;if((ag&1)<<24>>24==0){ah=ad+4|0;ai=ad+4|0}else{aj=c[ad+8>>2]|0;ah=aj;ai=aj}aj=ag&255;if((aj&1|0)==0){ak=aj>>>1}else{ak=c[ad+4>>2]|0}f2(z,d,A,B,g,h,j,ai,ah+(ak<<2)|0);c[ae>>2]=c[z>>2]|0}else if((ab|0)==73){ae=j+8|0;c[t>>2]=c[f>>2]|0;ad=ga(e,t,h,ac,2)|0;aj=c[h>>2]|0;do{if((aj&4|0)==0){if((ad-1|0)>>>0>=12){break}c[ae>>2]=ad;break L1297}}while(0);c[h>>2]=aj|4}else if((ab|0)==98|(ab|0)==66|(ab|0)==104){ad=c[f>>2]|0;ae=d+8|0;ag=b1[c[(c[ae>>2]|0)+4>>2]&1023](ae)|0;c[w>>2]=ad;ad=(e4(e,w,ag,ag+288|0,ac,h,0)|0)-ag|0;if((ad|0)>=288){break}c[j+16>>2]=((ad|0)/12&-1|0)%12}else if((ab|0)==97|(ab|0)==65){ad=c[f>>2]|0;ag=d+8|0;ae=b1[c[c[ag>>2]>>2]&1023](ag)|0;c[x>>2]=ad;ad=(e4(e,x,ae,ae+168|0,ac,h,0)|0)-ae|0;if((ad|0)>=168){break}c[j+24>>2]=((ad|0)/12&-1|0)%7}else if((ab|0)==112){c[K>>2]=c[f>>2]|0;f8(d,j+8|0,e,K,h,ac)}else if((ab|0)==114){ad=e|0;c[M>>2]=c[ad>>2]|0;c[N>>2]=c[f>>2]|0;f2(L,d,M,N,g,h,j,5247160,5247204);c[ad>>2]=c[L>>2]|0}else if((ab|0)==82){ad=e|0;c[P>>2]=c[ad>>2]|0;c[Q>>2]=c[f>>2]|0;f2(O,d,P,Q,g,h,j,5247140,5247160);c[ad>>2]=c[O>>2]|0}else if((ab|0)==100|(ab|0)==101){ad=j+12|0;c[v>>2]=c[f>>2]|0;ae=ga(e,v,h,ac,2)|0;ag=c[h>>2]|0;do{if((ag&4|0)==0){if((ae-1|0)>>>0>=31){break}c[ad>>2]=ae;break L1297}}while(0);c[h>>2]=ag|4}else if((ab|0)==120){ae=c[(c[d>>2]|0)+20>>2]|0;c[U>>2]=c[e>>2]|0;c[V>>2]=c[f>>2]|0;b3[ae&1023](b,d,U,V,g,h,j);i=l;return}else if((ab|0)==88){ae=d+8|0;ad=b1[c[(c[ae>>2]|0)+24>>2]&1023](ae)|0;ae=e|0;c[X>>2]=c[ae>>2]|0;c[Y>>2]=c[f>>2]|0;aj=a[ad]|0;if((aj&1)<<24>>24==0){al=ad+4|0;am=ad+4|0}else{an=c[ad+8>>2]|0;al=an;am=an}an=aj&255;if((an&1|0)==0){ao=an>>>1}else{ao=c[ad+4>>2]|0}f2(W,d,X,Y,g,h,j,am,al+(ao<<2)|0);c[ae>>2]=c[W>>2]|0}else if((ab|0)==83){c[p>>2]=c[f>>2]|0;ae=ga(e,p,h,ac,2)|0;ad=c[h>>2]|0;if((ad&4|0)==0&(ae|0)<61){c[j>>2]=ae;break}else{c[h>>2]=ad|4;break}}else{c[h>>2]=c[h>>2]|4}}while(0);c[b>>2]=c[e>>2]|0;i=l;return}}while(0);l=bQ(4)|0;c[l>>2]=5247504;bo(l|0,5252716,512)}function f7(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;a=i;g=d;d=i;i=i+4|0;c[d>>2]=c[g>>2]|0;g=b|0;b=d|0;d=f;L1378:while(1){h=c[g>>2]|0;do{if((h|0)==0){j=1}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){l=b1[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[g>>2]=0;j=1;break}else{j=(c[g>>2]|0)==0;break}}}while(0);h=c[b>>2]|0;do{if((h|0)==0){m=1180}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){n=b1[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{n=c[k>>2]|0}if((n|0)==-1){c[b>>2]=0;m=1180;break}else{k=(h|0)==0;if(j^k){o=h;p=k;break}else{q=h;r=k;break L1378}}}}while(0);if((m|0)==1180){m=0;if(j){q=0;r=1;break}else{o=0;p=1}}h=c[g>>2]|0;k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){s=b1[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{s=c[k>>2]|0}if(!(bX[c[(c[d>>2]|0)+12>>2]&1023](f,8192,s)|0)){q=o;r=p;break}k=c[g>>2]|0;h=k+12|0;t=c[h>>2]|0;if((t|0)==(c[k+16>>2]|0)){u=c[(c[k>>2]|0)+40>>2]|0;b1[u&1023](k);continue}else{c[h>>2]=t+4|0;continue}}p=c[g>>2]|0;do{if((p|0)==0){v=1}else{o=c[p+12>>2]|0;if((o|0)==(c[p+16>>2]|0)){w=b1[c[(c[p>>2]|0)+36>>2]&1023](p)|0}else{w=c[o>>2]|0}if((w|0)==-1){c[g>>2]=0;v=1;break}else{v=(c[g>>2]|0)==0;break}}}while(0);do{if(r){m=1202}else{g=c[q+12>>2]|0;if((g|0)==(c[q+16>>2]|0)){x=b1[c[(c[q>>2]|0)+36>>2]&1023](q)|0}else{x=c[g>>2]|0}if((x|0)==-1){c[b>>2]=0;m=1202;break}if(!(v^(q|0)==0)){break}i=a;return}}while(0);do{if((m|0)==1202){if(v){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function f8(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+4|0;k=f;f=i;i=i+4|0;c[f>>2]=c[k>>2]|0;k=j|0;l=a+8|0;a=b1[c[(c[l>>2]|0)+8>>2]&1023](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2]|0;f=e4(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12|0;i=j;return}function f9(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;a=i;g=d;d=i;i=i+4|0;c[d>>2]=c[g>>2]|0;g=b|0;b=c[g>>2]|0;do{if((b|0)==0){h=1}else{j=c[b+12>>2]|0;if((j|0)==(c[b+16>>2]|0)){k=b1[c[(c[b>>2]|0)+36>>2]&1023](b)|0}else{k=c[j>>2]|0}if((k|0)==-1){c[g>>2]=0;h=1;break}else{h=(c[g>>2]|0)==0;break}}}while(0);k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=1242}else{b=c[d+12>>2]|0;if((b|0)==(c[d+16>>2]|0)){m=b1[c[(c[d>>2]|0)+36>>2]&1023](d)|0}else{m=c[b>>2]|0}if((m|0)==-1){c[k>>2]=0;l=1242;break}else{b=(d|0)==0;if(h^b){n=d;o=b;break}else{l=1244;break}}}}while(0);do{if((l|0)==1242){if(h){l=1244;break}else{n=0;o=1;break}}}while(0);if((l|0)==1244){c[e>>2]=c[e>>2]|6;i=a;return}h=c[g>>2]|0;d=c[h+12>>2]|0;if((d|0)==(c[h+16>>2]|0)){p=b1[c[(c[h>>2]|0)+36>>2]&1023](h)|0}else{p=c[d>>2]|0}if(bX[c[(c[f>>2]|0)+52>>2]&1023](f,p,0)<<24>>24!=37){c[e>>2]=c[e>>2]|4;i=a;return}p=c[g>>2]|0;f=p+12|0;d=c[f>>2]|0;if((d|0)==(c[p+16>>2]|0)){h=c[(c[p>>2]|0)+40>>2]|0;b1[h&1023](p)}else{c[f>>2]=d+4|0}d=c[g>>2]|0;do{if((d|0)==0){q=1}else{f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0)){r=b1[c[(c[d>>2]|0)+36>>2]&1023](d)|0}else{r=c[f>>2]|0}if((r|0)==-1){c[g>>2]=0;q=1;break}else{q=(c[g>>2]|0)==0;break}}}while(0);do{if(o){l=1266}else{g=c[n+12>>2]|0;if((g|0)==(c[n+16>>2]|0)){s=b1[c[(c[n>>2]|0)+36>>2]&1023](n)|0}else{s=c[g>>2]|0}if((s|0)==-1){c[k>>2]=0;l=1266;break}if(!(q^(n|0)==0)){break}i=a;return}}while(0);do{if((l|0)==1266){if(q){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function ga(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;g=i;h=b;b=i;i=i+4|0;c[b>>2]=c[h>>2]|0;h=a|0;a=c[h>>2]|0;do{if((a|0)==0){j=1}else{k=c[a+12>>2]|0;if((k|0)==(c[a+16>>2]|0)){l=b1[c[(c[a>>2]|0)+36>>2]&1023](a)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[h>>2]=0;j=1;break}else{j=(c[h>>2]|0)==0;break}}}while(0);l=b|0;b=c[l>>2]|0;do{if((b|0)==0){m=1288}else{a=c[b+12>>2]|0;if((a|0)==(c[b+16>>2]|0)){n=b1[c[(c[b>>2]|0)+36>>2]&1023](b)|0}else{n=c[a>>2]|0}if((n|0)==-1){c[l>>2]=0;m=1288;break}else{if(j^(b|0)==0){o=b;break}else{m=1290;break}}}}while(0);do{if((m|0)==1288){if(j){m=1290;break}else{o=0;break}}}while(0);if((m|0)==1290){c[d>>2]=c[d>>2]|6;p=0;i=g;return p|0}j=c[h>>2]|0;b=c[j+12>>2]|0;if((b|0)==(c[j+16>>2]|0)){q=b1[c[(c[j>>2]|0)+36>>2]&1023](j)|0}else{q=c[b>>2]|0}b=e;if(!(bX[c[(c[b>>2]|0)+12>>2]&1023](e,2048,q)|0)){c[d>>2]=c[d>>2]|4;p=0;i=g;return p|0}j=e;n=bX[c[(c[j>>2]|0)+52>>2]&1023](e,q,0)<<24>>24;q=c[h>>2]|0;a=q+12|0;k=c[a>>2]|0;do{if((k|0)==(c[q+16>>2]|0)){r=c[(c[q>>2]|0)+40>>2]|0;b1[r&1023](q);s=n;t=f;u=o;break}else{c[a>>2]=k+4|0;s=n;t=f;u=o;break}}while(0);while(1){v=s-48|0;o=t-1|0;f=c[h>>2]|0;do{if((f|0)==0){w=0}else{n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0)){x=b1[c[(c[f>>2]|0)+36>>2]&1023](f)|0}else{x=c[n>>2]|0}if((x|0)==-1){c[h>>2]=0;w=0;break}else{w=c[h>>2]|0;break}}}while(0);f=(w|0)==0;if((u|0)==0){y=w;z=0}else{n=c[u+12>>2]|0;if((n|0)==(c[u+16>>2]|0)){A=b1[c[(c[u>>2]|0)+36>>2]&1023](u)|0}else{A=c[n>>2]|0}if((A|0)==-1){c[l>>2]=0;B=0}else{B=u}y=c[h>>2]|0;z=B}C=(z|0)==0;if(!((f^C)&(o|0)>0)){break}f=c[y+12>>2]|0;if((f|0)==(c[y+16>>2]|0)){D=b1[c[(c[y>>2]|0)+36>>2]&1023](y)|0}else{D=c[f>>2]|0}if(!(bX[c[(c[b>>2]|0)+12>>2]&1023](e,2048,D)|0)){p=v;m=1340;break}f=(bX[c[(c[j>>2]|0)+52>>2]&1023](e,D,0)<<24>>24)+(v*10&-1)|0;n=c[h>>2]|0;k=n+12|0;a=c[k>>2]|0;if((a|0)==(c[n+16>>2]|0)){q=c[(c[n>>2]|0)+40>>2]|0;b1[q&1023](n);s=f;t=o;u=z;continue}else{c[k>>2]=a+4|0;s=f;t=o;u=z;continue}}if((m|0)==1340){i=g;return p|0}do{if((y|0)==0){E=1}else{u=c[y+12>>2]|0;if((u|0)==(c[y+16>>2]|0)){F=b1[c[(c[y>>2]|0)+36>>2]&1023](y)|0}else{F=c[u>>2]|0}if((F|0)==-1){c[h>>2]=0;E=1;break}else{E=(c[h>>2]|0)==0;break}}}while(0);do{if(C){m=1334}else{h=c[z+12>>2]|0;if((h|0)==(c[z+16>>2]|0)){G=b1[c[(c[z>>2]|0)+36>>2]&1023](z)|0}else{G=c[h>>2]|0}if((G|0)==-1){c[l>>2]=0;m=1334;break}if(E^(z|0)==0){p=v}else{break}i=g;return p|0}}while(0);do{if((m|0)==1334){if(E){break}else{p=v}i=g;return p|0}}while(0);c[d>>2]=c[d>>2]|2;p=v;i=g;return p|0}function gb(a){a=a|0;var b=0,d=0;b=a;d=c[a+8>>2]|0;if((d|0)==0){jM(b);return}ba(d|0);jM(b);return}function gc(a){a=a|0;var b=0;b=c[a+8>>2]|0;if((b|0)==0){return}ba(b|0);return}function gd(a){a=a|0;return}function ge(a){a=a|0;return 127}function gf(a){a=a|0;return 127}function gg(a){a=a|0;return 0}function gh(a){a=a|0;return}function gi(a){a=a|0;return 127}function gj(a){a=a|0;return 127}function gk(a){a=a|0;return 0}function gl(a){a=a|0;return}function gm(a){a=a|0;return 2147483647}function gn(a){a=a|0;return 2147483647}function go(a){a=a|0;return 0}function gp(a){a=a|0;return}function gq(a){a=a|0;return 2147483647}function gr(a){a=a|0;return 2147483647}function gs(a){a=a|0;return 0}function gt(a){a=a|0;return}function gu(a){a=a|0;return}function gv(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gw(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gx(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gy(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gz(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gA(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gB(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gC(b,c){b=b|0;c=c|0;c=b;A=67109634;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;return}function gD(b,c){b=b|0;c=c|0;c=b;a[b]=2;a[c+1|0]=45;a[c+2|0]=0;return}function gE(b,c){b=b|0;c=c|0;c=b;a[b]=2;a[c+1|0]=45;a[c+2|0]=0;return}function gF(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+104|0;f=e;e=i;i=i+4|0;c[e>>2]=c[f>>2]|0;f=g|0;l=g+4|0;m=l|0;n=f|0;a[n]=37;o=f+1|0;a[o]=j;p=f+2|0;a[p]=k;a[f+3|0]=0;if(k<<24>>24!=0){a[o]=k;a[p]=j}j=bm(m|0,100,n|0,h|0,c[d+8>>2]|0)|0;d=l+j|0;l=c[e>>2]|0;if((j|0)==0){q=l;r=b|0;c[r>>2]=q;i=g;return}else{s=l;t=m}while(1){m=a[t]|0;if((s|0)==0){u=0}else{l=s+24|0;j=c[l>>2]|0;if((j|0)==(c[s+28>>2]|0)){v=ca[c[(c[s>>2]|0)+52>>2]&1023](s,m&255)|0}else{c[l>>2]=j+1|0;a[j]=m;v=m&255}u=(v|0)==-1?0:s}m=t+1|0;if((m|0)==(d|0)){q=u;break}else{s=u;t=m}}r=b|0;c[r>>2]=q;i=g;return}function gG(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+404|0;e=d;d=i;i=i+4|0;c[d>>2]=c[e>>2]|0;e=f|0;k=f+400|0;l=e|0;c[k>>2]=e+400|0;g0(b+8|0,l,k,g,h,j);j=c[k>>2]|0;k=c[d>>2]|0;if((l|0)==(j|0)){m=k;n=a|0;c[n>>2]=m;i=f;return}else{o=k;p=l}while(1){l=c[p>>2]|0;if((o|0)==0){q=0}else{k=o+24|0;d=c[k>>2]|0;if((d|0)==(c[o+28>>2]|0)){r=ca[c[(c[o>>2]|0)+52>>2]&1023](o,l)|0}else{c[k>>2]=d+4|0;c[d>>2]=l;r=l}q=(r|0)==-1?0:o}l=p+4|0;if((l|0)==(j|0)){m=q;break}else{o=q;p=l}}n=a|0;c[n>>2]=m;i=f;return}function gH(a){a=a|0;jM(a);return}function gI(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gJ(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gK(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gL(a){a=a|0;jM(a);return}function gM(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gN(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gO(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gP(a){a=a|0;jM(a);return}function gQ(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gR(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gS(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gT(b,d){b=b|0;d=d|0;a[b]=2;d=b+4|0;aR(d|0,45,1);c[d+4>>2]=0;return}function gU(a){a=a|0;jM(a);return}function gV(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gW(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gX(a,b){a=a|0;b=b|0;jS(a|0,0,12);return}function gY(b,d){b=b|0;d=d|0;a[b]=2;d=b+4|0;aR(d|0,45,1);c[d+4>>2]=0;return}function gZ(a){a=a|0;jM(a);return}function g_(a){a=a|0;var b=0,d=0;b=a;d=c[a+8>>2]|0;if((d|0)==0){jM(b);return}ba(d|0);jM(b);return}function g$(a){a=a|0;var b=0;b=c[a+8>>2]|0;if((b|0)==0){return}ba(b|0);return}function g0(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+116|0;k=j|0;l=j+104|0;m=j+112|0;n=j+4|0;o=k|0;a[o]=37;p=k+1|0;a[p]=g;q=k+2|0;a[q]=h;a[k+3|0]=0;if(h<<24>>24!=0){a[p]=h;a[q]=g}g=b|0;bm(n|0,100,o|0,f|0,c[g>>2]|0);f=l;c[f>>2]=0;c[f+4>>2]=0;c[m>>2]=n;n=(c[e>>2]|0)-d>>2;f=bE(c[g>>2]|0)|0;g=bv(d|0,m|0,n|0,l|0)|0;if((f|0)!=0){bE(f|0)}if((g|0)==-1){g4(5243716)}else{c[e>>2]=d+(g<<2)|0;i=j;return}}function g1(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;d=i;i=i+248|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=d|0;m=d+12|0;n=d+112|0;o=d+120|0;p=d+124|0;q=d+128|0;r=d+132|0;s=d+136|0;t=d+148|0;u=n|0;c[u>>2]=m|0;v=n+4|0;c[v>>2]=418;w=p|0;x=c[h+28>>2]|0;c[w>>2]=x;y=x+4|0;G=c[y>>2]|0,c[y>>2]=G+1,G;y=c[w>>2]|0;if((c[1313737]|0)!=-1){c[l>>2]=5254948;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254948,l,252)}l=(c[1313738]|0)-1|0;x=c[y+8>>2]|0;do{if((c[y+12>>2]|0)-x>>2>>>0>l>>>0){A=c[x+(l<<2)>>2]|0;if((A|0)==0){break}B=A;a[q]=0;C=f|0;c[r>>2]=c[C>>2]|0;do{if(g2(e,r,g,p,c[h+4>>2]|0,j,q,B,n,o,m+100|0)|0){D=s|0;E=c[(c[A>>2]|0)+32>>2]|0;b7[E&1023](B,5247064,5247074,D);E=t|0;F=c[o>>2]|0;H=c[u>>2]|0;I=F-H|0;do{if((I|0)>98){J=jD(I+2|0)|0;if((J|0)!=0){K=J;L=J;break}J=bQ(4)|0;c[J>>2]=5247480;bo(J|0,5252704,66)}else{K=E;L=0}}while(0);if((a[q]&1)<<24>>24==0){M=K}else{a[K]=45;M=K+1|0}L1746:do{if(H>>>0<F>>>0){I=s+10|0;J=s;N=M;O=H;while(1){P=D;while(1){if((P|0)==(I|0)){Q=I;break}if(a[P]<<24>>24==a[O]<<24>>24){Q=P;break}else{P=P+1|0}}a[N]=a[5247064+(Q-J|0)|0]|0;P=O+1|0;R=N+1|0;if(P>>>0<(c[o>>2]|0)>>>0){N=R;O=P}else{S=R;break L1746}}}else{S=M}}while(0);a[S]=0;if((bF(E|0,5244140,(z=i,i=i+4|0,c[z>>2]=k,z)|0)|0)!=1){g4(5244100)}if((L|0)==0){break}jE(L)}}while(0);B=e|0;A=c[B>>2]|0;do{if((A|0)==0){T=0}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){T=A;break}if((b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0)!=-1){T=A;break}c[B>>2]=0;T=0}}while(0);B=(T|0)==0;A=c[C>>2]|0;do{if((A|0)==0){U=1490}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){if(B){break}else{U=1492;break}}if((b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0)==-1){c[C>>2]=0;U=1490;break}else{if(B^(A|0)==0){break}else{U=1492;break}}}}while(0);do{if((U|0)==1490){if(B){U=1492;break}else{break}}}while(0);if((U|0)==1492){c[j>>2]=c[j>>2]|2}c[b>>2]=T;B=c[w>>2]|0;A=B+4|0;if(((G=c[A>>2]|0,c[A>>2]=G+ -1,G)|0)==0){b_[c[(c[B>>2]|0)+8>>2]&1023](B|0)}B=c[u>>2]|0;c[u>>2]=0;if((B|0)==0){i=d;return}b_[c[v>>2]&1023](B);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}
function g2(e,f,g,h,j,k,l,m,n,o,p){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0,bO=0,bP=0,bQ=0,bR=0,bS=0;q=i;i=i+424|0;r=f;f=i;i=i+4|0;c[f>>2]=c[r>>2]|0;r=q|0;s=q+400|0;t=q+404|0;u=q+408|0;v=q+412|0;w=v;x=i;i=i+12|0;y=i;i=i+12|0;z=i;i=i+12|0;A=i;i=i+12|0;B=i;i=i+4|0;C=i;i=i+4|0;D=r|0;jS(w|0,0,12);E=x;F=y;G=z;H=A;jS(E|0,0,12);jS(F|0,0,12);jS(G|0,0,12);jS(H|0,0,12);g8(g,h,s,t,u,v,x,y,z,B);h=n|0;c[o>>2]=c[h>>2]|0;g=e|0;e=f|0;f=m+8|0;m=A+1|0;I=A+8|0;J=A|0;K=A+4|0;A=z+1|0;L=z+4|0;M=z+8|0;N=y+1|0;O=y+4|0;P=y+8|0;Q=(j&512|0)!=0;j=x+1|0;R=x+4|0;S=x+8|0;x=s+3|0;T=n+4|0;n=v+4|0;U=p;p=418;V=D;W=D;D=r+400|0;r=0;X=0;L1791:while(1){Y=c[g>>2]|0;do{if((Y|0)==0){Z=0}else{if((c[Y+12>>2]|0)!=(c[Y+16>>2]|0)){Z=Y;break}if((b1[c[(c[Y>>2]|0)+36>>2]&1023](Y)|0)==-1){c[g>>2]=0;Z=0;break}else{Z=c[g>>2]|0;break}}}while(0);Y=(Z|0)==0;_=c[e>>2]|0;do{if((_|0)==0){$=1521}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){if(Y){aa=_;break}else{ab=p;ac=V;ad=W;ae=r;$=1810;break L1791}}if((b1[c[(c[_>>2]|0)+36>>2]&1023](_)|0)==-1){c[e>>2]=0;$=1521;break}else{if(Y){aa=_;break}else{ab=p;ac=V;ad=W;ae=r;$=1810;break L1791}}}}while(0);if(($|0)==1521){$=0;if(Y){ab=p;ac=V;ad=W;ae=r;$=1810;break}else{aa=0}}_=a[s+X|0]<<24>>24;do{if((_|0)==2){if(!((r|0)!=0|X>>>0<2)){if((X|0)==2){af=a[x]<<24>>24!=0}else{af=0}if(!(Q|af)){ag=0;ah=D;ai=W;aj=V;ak=p;al=U;break}}am=a[E]|0;an=(am&1)<<24>>24==0?j:c[S>>2]|0;L1821:do{if((X|0)==0){ao=an}else{if((d[s+(X-1|0)|0]|0)>=2){ao=an;break}ap=am&255;aq=an+((ap&1|0)==0?ap>>>1:c[R>>2]|0)|0;ap=an;while(1){if((ap|0)==(aq|0)){ar=aq;break}as=a[ap]|0;if(as<<24>>24<=-1){ar=ap;break}if((b[(c[f>>2]|0)+(as<<24>>24<<1)>>1]&8192)<<16>>16==0){ar=ap;break}else{ap=ap+1|0}}ap=ar-an|0;aq=a[H]|0;as=aq&255;at=(as&1|0)==0?as>>>1:c[K>>2]|0;if(ap>>>0>at>>>0){ao=an;break}as=(aq&1)<<24>>24==0?m:c[I>>2]|0;aq=as+at|0;if((ar|0)==(an|0)){ao=an;break}au=an;av=as+(at-ap|0)|0;while(1){if(a[av]<<24>>24!=a[au]<<24>>24){ao=an;break L1821}ap=av+1|0;if((ap|0)==(aq|0)){ao=ar;break L1821}else{au=au+1|0;av=ap}}}}while(0);av=am&255;L1835:do{if((ao|0)==(an+((av&1|0)==0?av>>>1:c[R>>2]|0)|0)){aw=ao}else{au=aa;aq=ao;while(1){ap=c[g>>2]|0;do{if((ap|0)==0){ax=0}else{if((c[ap+12>>2]|0)!=(c[ap+16>>2]|0)){ax=ap;break}if((b1[c[(c[ap>>2]|0)+36>>2]&1023](ap)|0)==-1){c[g>>2]=0;ax=0;break}else{ax=c[g>>2]|0;break}}}while(0);ap=(ax|0)==0;do{if((au|0)==0){$=1680}else{if((c[au+12>>2]|0)!=(c[au+16>>2]|0)){if(ap){ay=au;break}else{aw=aq;break L1835}}if((b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0)==-1){c[e>>2]=0;$=1680;break}else{if(ap){ay=au;break}else{aw=aq;break L1835}}}}while(0);if(($|0)==1680){$=0;if(ap){aw=aq;break L1835}else{ay=0}}at=c[g>>2]|0;as=c[at+12>>2]|0;if((as|0)==(c[at+16>>2]|0)){az=b1[c[(c[at>>2]|0)+36>>2]&1023](at)|0}else{az=d[as]|0}if((az<<24>>24|0)!=(a[aq]<<24>>24|0)){aw=aq;break L1835}as=c[g>>2]|0;at=as+12|0;aA=c[at>>2]|0;if((aA|0)==(c[as+16>>2]|0)){aB=c[(c[as>>2]|0)+40>>2]|0;b1[aB&1023](as)}else{c[at>>2]=aA+1|0}aA=aq+1|0;at=a[E]|0;as=at&255;if((aA|0)==(((at&1)<<24>>24==0?j:c[S>>2]|0)+((as&1|0)==0?as>>>1:c[R>>2]|0)|0)){aw=aA;break L1835}else{au=ay;aq=aA}}}}while(0);if(!Q){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break}av=a[E]|0;an=av&255;if((aw|0)==(((av&1)<<24>>24==0?j:c[S>>2]|0)+((an&1|0)==0?an>>>1:c[R>>2]|0)|0)){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break}else{$=1692;break L1791}}else if((_|0)==0){$=1572}else if((_|0)==4){an=a[u]<<24>>24;av=0;am=D;aq=W;au=V;aA=p;as=U;L1870:while(1){at=c[g>>2]|0;do{if((at|0)==0){aC=0}else{if((c[at+12>>2]|0)!=(c[at+16>>2]|0)){aC=at;break}if((b1[c[(c[at>>2]|0)+36>>2]&1023](at)|0)==-1){c[g>>2]=0;aC=0;break}else{aC=c[g>>2]|0;break}}}while(0);at=(aC|0)==0;aB=c[e>>2]|0;do{if((aB|0)==0){$=1705}else{if((c[aB+12>>2]|0)!=(c[aB+16>>2]|0)){if(at){break}else{break L1870}}if((b1[c[(c[aB>>2]|0)+36>>2]&1023](aB)|0)==-1){c[e>>2]=0;$=1705;break}else{if(at){break}else{break L1870}}}}while(0);if(($|0)==1705){$=0;if(at){break}}aB=c[g>>2]|0;aD=c[aB+12>>2]|0;if((aD|0)==(c[aB+16>>2]|0)){aE=b1[c[(c[aB>>2]|0)+36>>2]&1023](aB)|0}else{aE=d[aD]|0}aD=aE&255;aB=aE<<24>>24;do{if(aB>>>0<128){if((b[(c[f>>2]|0)+(aB<<1)>>1]&2048)<<16>>16==0){$=1724;break}aF=c[o>>2]|0;if((aF|0)==(as|0)){aG=(c[T>>2]|0)!=418;aH=c[h>>2]|0;aI=as-aH|0;aJ=aI>>>0<2147483647?aI<<1:-1;aK=jF(aG?aH:0,aJ)|0;if((aK|0)==0){$=1714;break L1791}do{if(aG){c[h>>2]=aK;aL=aK}else{aH=c[h>>2]|0;c[h>>2]=aK;if((aH|0)==0){aL=aK;break}b_[c[T>>2]&1023](aH);aL=c[h>>2]|0}}while(0);c[T>>2]=218;aK=aL+aI|0;c[o>>2]=aK;aM=(c[h>>2]|0)+aJ|0;aN=aK}else{aM=as;aN=aF}c[o>>2]=aN+1|0;a[aN]=aD;aO=av+1|0;aP=am;aQ=aq;aR=au;aS=aA;aT=aM;break}else{$=1724}}while(0);if(($|0)==1724){$=0;aD=d[w]|0;if(!((av|0)!=0&(((aD&1|0)==0?aD>>>1:c[n>>2]|0)|0)!=0&(aB|0)==(an|0))){break}if((aq|0)==(am|0)){aD=aq-au|0;at=aD>>>0<2147483647?aD<<1:-1;if((aA|0)==418){aU=0}else{aU=au}aK=jF(aU,at)|0;aG=aK;if((aK|0)==0){$=1729;break L1791}aV=aG+(at>>>2<<2)|0;aW=aG+(aD>>2<<2)|0;aX=aG;aY=218}else{aV=am;aW=aq;aX=au;aY=aA}c[aW>>2]=av;aO=0;aP=aV;aQ=aW+4|0;aR=aX;aS=aY;aT=as}aG=c[g>>2]|0;aD=aG+12|0;at=c[aD>>2]|0;if((at|0)==(c[aG+16>>2]|0)){aK=c[(c[aG>>2]|0)+40>>2]|0;b1[aK&1023](aG);av=aO;am=aP;aq=aQ;au=aR;aA=aS;as=aT;continue}else{c[aD>>2]=at+1|0;av=aO;am=aP;aq=aQ;au=aR;aA=aS;as=aT;continue}}if((au|0)==(aq|0)|(av|0)==0){aZ=am;a_=aq;a$=au;a0=aA}else{if((aq|0)==(am|0)){an=aq-au|0;at=an>>>0<2147483647?an<<1:-1;if((aA|0)==418){a1=0}else{a1=au}aD=jF(a1,at)|0;aG=aD;if((aD|0)==0){$=1741;break L1791}a2=aG+(at>>>2<<2)|0;a3=aG+(an>>2<<2)|0;a4=aG;a5=218}else{a2=am;a3=aq;a4=au;a5=aA}c[a3>>2]=av;aZ=a2;a_=a3+4|0;a$=a4;a0=a5}aG=c[B>>2]|0;L1934:do{if((aG|0)>0){an=c[g>>2]|0;do{if((an|0)==0){a6=0}else{if((c[an+12>>2]|0)!=(c[an+16>>2]|0)){a6=an;break}if((b1[c[(c[an>>2]|0)+36>>2]&1023](an)|0)==-1){c[g>>2]=0;a6=0;break}else{a6=c[g>>2]|0;break}}}while(0);an=(a6|0)==0;aB=c[e>>2]|0;do{if((aB|0)==0){$=1758}else{if((c[aB+12>>2]|0)!=(c[aB+16>>2]|0)){if(an){a7=aB;break}else{$=1764;break L1791}}if((b1[c[(c[aB>>2]|0)+36>>2]&1023](aB)|0)==-1){c[e>>2]=0;$=1758;break}else{if(an){a7=aB;break}else{$=1764;break L1791}}}}while(0);if(($|0)==1758){$=0;if(an){$=1764;break L1791}else{a7=0}}aB=c[g>>2]|0;at=c[aB+12>>2]|0;if((at|0)==(c[aB+16>>2]|0)){a8=b1[c[(c[aB>>2]|0)+36>>2]&1023](aB)|0}else{a8=d[at]|0}if((a8<<24>>24|0)!=(a[t]<<24>>24|0)){$=1764;break L1791}at=c[g>>2]|0;aB=at+12|0;aD=c[aB>>2]|0;do{if((aD|0)==(c[at+16>>2]|0)){aK=c[(c[at>>2]|0)+40>>2]|0;b1[aK&1023](at);a9=as;ba=a7;bb=aG;break}else{c[aB>>2]=aD+1|0;a9=as;ba=a7;bb=aG;break}}while(0);while(1){aD=c[g>>2]|0;do{if((aD|0)==0){bc=0}else{if((c[aD+12>>2]|0)!=(c[aD+16>>2]|0)){bc=aD;break}if((b1[c[(c[aD>>2]|0)+36>>2]&1023](aD)|0)==-1){c[g>>2]=0;bc=0;break}else{bc=c[g>>2]|0;break}}}while(0);aD=(bc|0)==0;do{if((ba|0)==0){$=1780}else{if((c[ba+12>>2]|0)!=(c[ba+16>>2]|0)){if(aD){bd=ba;break}else{$=1787;break L1791}}if((b1[c[(c[ba>>2]|0)+36>>2]&1023](ba)|0)==-1){c[e>>2]=0;$=1780;break}else{if(aD){bd=ba;break}else{$=1787;break L1791}}}}while(0);if(($|0)==1780){$=0;if(aD){$=1787;break L1791}else{bd=0}}aF=c[g>>2]|0;aJ=c[aF+12>>2]|0;if((aJ|0)==(c[aF+16>>2]|0)){be=b1[c[(c[aF>>2]|0)+36>>2]&1023](aF)|0}else{be=d[aJ]|0}aJ=be<<24>>24;if(aJ>>>0>=128){$=1787;break L1791}if((b[(c[f>>2]|0)+(aJ<<1)>>1]&2048)<<16>>16==0){$=1787;break L1791}aJ=c[o>>2]|0;if((aJ|0)==(a9|0)){aF=(c[T>>2]|0)!=418;aI=c[h>>2]|0;aB=a9-aI|0;at=aB>>>0<2147483647?aB<<1:-1;an=jF(aF?aI:0,at)|0;if((an|0)==0){$=1790;break L1791}do{if(aF){c[h>>2]=an;bf=an}else{aI=c[h>>2]|0;c[h>>2]=an;if((aI|0)==0){bf=an;break}b_[c[T>>2]&1023](aI);bf=c[h>>2]|0}}while(0);c[T>>2]=218;an=bf+aB|0;c[o>>2]=an;bg=(c[h>>2]|0)+at|0;bh=an}else{bg=a9;bh=aJ}an=c[g>>2]|0;aF=c[an+12>>2]|0;if((aF|0)==(c[an+16>>2]|0)){aD=b1[c[(c[an>>2]|0)+36>>2]&1023](an)|0;bi=aD;bj=c[o>>2]|0}else{bi=d[aF]|0;bj=bh}c[o>>2]=bj+1|0;a[bj]=bi&255;aF=bb-1|0;c[B>>2]=aF;aD=c[g>>2]|0;an=aD+12|0;aI=c[an>>2]|0;if((aI|0)==(c[aD+16>>2]|0)){aK=c[(c[aD>>2]|0)+40>>2]|0;b1[aK&1023](aD)}else{c[an>>2]=aI+1|0}if((aF|0)>0){a9=bg;ba=bd;bb=aF}else{bk=bg;break L1934}}}else{bk=as}}while(0);if((c[o>>2]|0)==(c[h>>2]|0)){$=1808;break L1791}else{ag=r;ah=aZ;ai=a_;aj=a$;ak=a0;al=bk;break}}else if((_|0)==1){if((X|0)==3){ab=p;ac=V;ad=W;ae=r;$=1810;break L1791}as=c[g>>2]|0;aG=c[as+12>>2]|0;if((aG|0)==(c[as+16>>2]|0)){bl=b1[c[(c[as>>2]|0)+36>>2]&1023](as)|0}else{bl=d[aG]|0}aG=bl<<24>>24;if(aG>>>0>=128){$=1571;break L1791}if((b[(c[f>>2]|0)+(aG<<1)>>1]&8192)<<16>>16==0){$=1571;break L1791}aG=c[g>>2]|0;as=aG+12|0;av=c[as>>2]|0;if((av|0)==(c[aG+16>>2]|0)){bm=b1[c[(c[aG>>2]|0)+40>>2]&1023](aG)|0}else{c[as>>2]=av+1|0;bm=d[av]|0}av=bm&255;as=a[H]|0;if((as&1)<<24>>24==0){bn=10;bo=as}else{as=c[J>>2]|0;bn=(as&-2)-1|0;bo=as&255}as=bo&255;aG=(as&1|0)==0?as>>>1:c[K>>2]|0;if((aG|0)==(bn|0)){if((bn|0)==-3){$=1559;break L1791}as=(bo&1)<<24>>24==0?m:c[I>>2]|0;do{if(bn>>>0<2147483631){aA=bn+1|0;au=bn<<1;aq=aA>>>0<au>>>0?au:aA;if(aq>>>0<11){bp=11;break}bp=aq+16&-16}else{bp=-2}}while(0);aq=jJ(bp)|0;jT(aq|0,as|0,bn|0);if((bn|0)!=10){jM(as)}c[I>>2]=aq;aA=bp|1;c[J>>2]=aA;bq=aA&255;br=aq}else{bq=bo;br=c[I>>2]|0}aq=(bq&1)<<24>>24==0?m:br;a[aq+aG|0]=av;aA=aG+1|0;a[aq+aA|0]=0;if((a[H]&1)<<24>>24==0){a[H]=aA<<1&255;$=1572;break}else{c[K>>2]=aA;$=1572;break}}else if((_|0)==3){aA=a[F]|0;aq=aA&255;au=(aq&1|0)==0?aq>>>1:c[O>>2]|0;aq=a[G]|0;am=aq&255;aF=(am&1|0)==0?am>>>1:c[L>>2]|0;if((au|0)==(-aF|0)){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break}am=(au|0)==0;au=c[g>>2]|0;aI=c[au+12>>2]|0;an=c[au+16>>2]|0;aD=(aI|0)==(an|0);if(!(am|(aF|0)==0)){if(aD){aF=b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0;aK=c[g>>2]|0;bs=aF;bt=a[F]|0;bu=aK;bv=c[aK+12>>2]|0;bw=c[aK+16>>2]|0}else{bs=d[aI]|0;bt=aA;bu=au;bv=aI;bw=an}an=bu+12|0;aK=(bv|0)==(bw|0);if((bs<<24>>24|0)==(a[(bt&1)<<24>>24==0?N:c[P>>2]|0]<<24>>24|0)){if(aK){aF=c[(c[bu>>2]|0)+40>>2]|0;b1[aF&1023](bu)}else{c[an>>2]=bv+1|0}an=d[F]|0;ag=((an&1|0)==0?an>>>1:c[O>>2]|0)>>>0>1?y:r;ah=D;ai=W;aj=V;ak=p;al=U;break}if(aK){bx=b1[c[(c[bu>>2]|0)+36>>2]&1023](bu)|0}else{bx=d[bv]|0}if((bx<<24>>24|0)!=(a[(a[G]&1)<<24>>24==0?A:c[M>>2]|0]<<24>>24|0)){$=1651;break L1791}aK=c[g>>2]|0;an=aK+12|0;aF=c[an>>2]|0;if((aF|0)==(c[aK+16>>2]|0)){ap=c[(c[aK>>2]|0)+40>>2]|0;b1[ap&1023](aK)}else{c[an>>2]=aF+1|0}a[l]=1;aF=d[G]|0;ag=((aF&1|0)==0?aF>>>1:c[L>>2]|0)>>>0>1?z:r;ah=D;ai=W;aj=V;ak=p;al=U;break}if(am){if(aD){am=b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0;by=am;bz=a[G]|0}else{by=d[aI]|0;bz=aq}if((by<<24>>24|0)!=(a[(bz&1)<<24>>24==0?A:c[M>>2]|0]<<24>>24|0)){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break}aq=c[g>>2]|0;am=aq+12|0;aF=c[am>>2]|0;if((aF|0)==(c[aq+16>>2]|0)){an=c[(c[aq>>2]|0)+40>>2]|0;b1[an&1023](aq)}else{c[am>>2]=aF+1|0}a[l]=1;aF=d[G]|0;ag=((aF&1|0)==0?aF>>>1:c[L>>2]|0)>>>0>1?z:r;ah=D;ai=W;aj=V;ak=p;al=U;break}if(aD){aD=b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0;bA=aD;bB=a[F]|0}else{bA=d[aI]|0;bB=aA}if((bA<<24>>24|0)!=(a[(bB&1)<<24>>24==0?N:c[P>>2]|0]<<24>>24|0)){a[l]=1;ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break}aA=c[g>>2]|0;aI=aA+12|0;aD=c[aI>>2]|0;if((aD|0)==(c[aA+16>>2]|0)){au=c[(c[aA>>2]|0)+40>>2]|0;b1[au&1023](aA)}else{c[aI>>2]=aD+1|0}aD=d[F]|0;ag=((aD&1|0)==0?aD>>>1:c[O>>2]|0)>>>0>1?y:r;ah=D;ai=W;aj=V;ak=p;al=U;break}else{ag=r;ah=D;ai=W;aj=V;ak=p;al=U}}while(0);L2094:do{if(($|0)==1572){$=0;if((X|0)==3){ab=p;ac=V;ad=W;ae=r;$=1810;break L1791}else{bC=aa}while(1){_=c[g>>2]|0;do{if((_|0)==0){bD=0}else{if((c[_+12>>2]|0)!=(c[_+16>>2]|0)){bD=_;break}if((b1[c[(c[_>>2]|0)+36>>2]&1023](_)|0)==-1){c[g>>2]=0;bD=0;break}else{bD=c[g>>2]|0;break}}}while(0);_=(bD|0)==0;do{if((bC|0)==0){$=1585}else{if((c[bC+12>>2]|0)!=(c[bC+16>>2]|0)){if(_){bE=bC;break}else{ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break L2094}}if((b1[c[(c[bC>>2]|0)+36>>2]&1023](bC)|0)==-1){c[e>>2]=0;$=1585;break}else{if(_){bE=bC;break}else{ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break L2094}}}}while(0);if(($|0)==1585){$=0;if(_){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break L2094}else{bE=0}}Y=c[g>>2]|0;aD=c[Y+12>>2]|0;if((aD|0)==(c[Y+16>>2]|0)){bF=b1[c[(c[Y>>2]|0)+36>>2]&1023](Y)|0}else{bF=d[aD]|0}aD=bF<<24>>24;if(aD>>>0>=128){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break L2094}if((b[(c[f>>2]|0)+(aD<<1)>>1]&8192)<<16>>16==0){ag=r;ah=D;ai=W;aj=V;ak=p;al=U;break L2094}aD=c[g>>2]|0;Y=aD+12|0;aI=c[Y>>2]|0;if((aI|0)==(c[aD+16>>2]|0)){bG=b1[c[(c[aD>>2]|0)+40>>2]&1023](aD)|0}else{c[Y>>2]=aI+1|0;bG=d[aI]|0}aI=bG&255;Y=a[H]|0;if((Y&1)<<24>>24==0){bH=10;bI=Y}else{Y=c[J>>2]|0;bH=(Y&-2)-1|0;bI=Y&255}Y=bI&255;aD=(Y&1|0)==0?Y>>>1:c[K>>2]|0;if((aD|0)==(bH|0)){if((bH|0)==-3){$=1600;break L1791}Y=(bI&1)<<24>>24==0?m:c[I>>2]|0;do{if(bH>>>0<2147483631){aA=bH+1|0;au=bH<<1;aF=aA>>>0<au>>>0?au:aA;if(aF>>>0<11){bJ=11;break}bJ=aF+16&-16}else{bJ=-2}}while(0);_=jJ(bJ)|0;jT(_|0,Y|0,bH|0);if((bH|0)!=10){jM(Y)}c[I>>2]=_;aF=bJ|1;c[J>>2]=aF;bK=aF&255;bL=_}else{bK=bI;bL=c[I>>2]|0}_=(bK&1)<<24>>24==0?m:bL;a[_+aD|0]=aI;aF=aD+1|0;a[_+aF|0]=0;if((a[H]&1)<<24>>24==0){a[H]=aF<<1&255;bC=bE;continue}else{c[K>>2]=aF;bC=bE;continue}}}}while(0);aG=X+1|0;if(aG>>>0<4){U=al;p=ak;V=aj;W=ai;D=ah;r=ag;X=aG}else{ab=ak;ac=aj;ad=ai;ae=ag;$=1810;break}}L2148:do{if(($|0)==1651){c[k>>2]=c[k>>2]|4;bM=0;bN=V;bO=p}else if(($|0)==1571){c[k>>2]=c[k>>2]|4;bM=0;bN=V;bO=p}else if(($|0)==1559){dp(0)}else if(($|0)==1600){dp(0)}else if(($|0)==1692){c[k>>2]=c[k>>2]|4;bM=0;bN=V;bO=p}else if(($|0)==1714){jR()}else if(($|0)==1729){jR()}else if(($|0)==1741){jR()}else if(($|0)==1764){c[k>>2]=c[k>>2]|4;bM=0;bN=a$;bO=a0}else if(($|0)==1787){c[k>>2]=c[k>>2]|4;bM=0;bN=a$;bO=a0}else if(($|0)==1790){jR()}else if(($|0)==1808){c[k>>2]=c[k>>2]|4;bM=0;bN=a$;bO=a0}else if(($|0)==1810){L2168:do{if((ae|0)!=0){ag=ae;ai=ae+1|0;aj=ae+8|0;ak=ae+4|0;X=1;L2170:while(1){r=d[ag]|0;if((r&1|0)==0){bP=r>>>1}else{bP=c[ak>>2]|0}if(X>>>0>=bP>>>0){break L2168}r=c[g>>2]|0;do{if((r|0)==0){bQ=0}else{if((c[r+12>>2]|0)!=(c[r+16>>2]|0)){bQ=r;break}if((b1[c[(c[r>>2]|0)+36>>2]&1023](r)|0)==-1){c[g>>2]=0;bQ=0;break}else{bQ=c[g>>2]|0;break}}}while(0);r=(bQ|0)==0;aD=c[e>>2]|0;do{if((aD|0)==0){$=1828}else{if((c[aD+12>>2]|0)!=(c[aD+16>>2]|0)){if(r){break}else{break L2170}}if((b1[c[(c[aD>>2]|0)+36>>2]&1023](aD)|0)==-1){c[e>>2]=0;$=1828;break}else{if(r){break}else{break L2170}}}}while(0);if(($|0)==1828){$=0;if(r){break}}aD=c[g>>2]|0;aI=c[aD+12>>2]|0;if((aI|0)==(c[aD+16>>2]|0)){bR=b1[c[(c[aD>>2]|0)+36>>2]&1023](aD)|0}else{bR=d[aI]|0}if((a[ag]&1)<<24>>24==0){bS=ai}else{bS=c[aj>>2]|0}if((bR<<24>>24|0)!=(a[bS+X|0]<<24>>24|0)){break}aI=X+1|0;aD=c[g>>2]|0;Y=aD+12|0;ah=c[Y>>2]|0;if((ah|0)==(c[aD+16>>2]|0)){D=c[(c[aD>>2]|0)+40>>2]|0;b1[D&1023](aD);X=aI;continue}else{c[Y>>2]=ah+1|0;X=aI;continue}}c[k>>2]=c[k>>2]|4;bM=0;bN=ac;bO=ab;break L2148}}while(0);if((ac|0)==(ad|0)){bM=1;bN=ad;bO=ab;break}c[C>>2]=0;eI(v,ac,ad,C);if((c[C>>2]|0)==0){bM=1;bN=ac;bO=ab;break}c[k>>2]=c[k>>2]|4;bM=0;bN=ac;bO=ab}}while(0);if((a[H]&1)<<24>>24!=0){jM(c[I>>2]|0)}if((a[G]&1)<<24>>24!=0){jM(c[M>>2]|0)}if((a[F]&1)<<24>>24!=0){jM(c[P>>2]|0)}if((a[E]&1)<<24>>24!=0){jM(c[S>>2]|0)}if((a[w]&1)<<24>>24!=0){jM(c[v+8>>2]|0)}if((bN|0)==0){i=q;return bM|0}b_[bO&1023](bN);i=q;return bM|0}function g3(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)<<24>>24==0){k=10;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g|0;if((e|0)==(d|0)){return b|0}if((k-j|0)>>>0<h>>>0){dJ(b,k,(j+h|0)-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)<<24>>24==0){n=b+1|0}else{n=c[b+8>>2]|0}m=e+(j-g|0)|0;g=d;d=n+j|0;while(1){a[d]=a[g]|0;l=g+1|0;if((l|0)==(e|0)){break}else{g=l;d=d+1|0}}a[n+m|0]=0;m=j+h|0;if((a[f]&1)<<24>>24==0){a[f]=m<<1&255;return b|0}else{c[b+4>>2]=m;return b|0}return 0}function g4(a){a=a|0;var b=0,d=0,e=0,f=0;b=bQ(8)|0;c[b>>2]=5247528;d=b+4|0;if((d|0)==0){bo(b|0,5252728,186)}e=jV(a|0)|0;f=jK(e+13|0)|0;c[f+4>>2]=e;c[f>>2]=e;e=f+12|0;c[d>>2]=e;c[f+8>>2]=0;jW(e|0,a|0);bo(b|0,5252728,186)}function g5(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0;d=i;i=i+136|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=d|0;m=d+12|0;n=d+112|0;o=d+120|0;p=d+124|0;q=d+128|0;r=d+132|0;s=n|0;c[s>>2]=m|0;t=n+4|0;c[t>>2]=418;u=p|0;v=c[h+28>>2]|0;c[u>>2]=v;w=v+4|0;G=c[w>>2]|0,c[w>>2]=G+1,G;w=c[u>>2]|0;if((c[1313737]|0)!=-1){c[l>>2]=5254948;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254948,l,252)}l=(c[1313738]|0)-1|0;v=c[w+8>>2]|0;do{if((c[w+12>>2]|0)-v>>2>>>0>l>>>0){x=c[v+(l<<2)>>2]|0;if((x|0)==0){break}y=x;a[q]=0;z=f|0;A=c[z>>2]|0;c[r>>2]=A;if(g2(e,r,g,p,c[h+4>>2]|0,j,q,y,n,o,m+100|0)|0){B=k;if((a[B]&1)<<24>>24==0){a[k+1|0]=0;a[B]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}C=x;do{if((a[q]&1)<<24>>24!=0){x=ca[c[(c[C>>2]|0)+28>>2]&1023](y,45)|0;D=a[B]|0;if((D&1)<<24>>24==0){E=10;F=D}else{D=c[k>>2]|0;E=(D&-2)-1|0;F=D&255}D=F&255;if((D&1|0)==0){H=D>>>1}else{H=c[k+4>>2]|0}if((H|0)==(E|0)){dJ(k,E,1,E,E,0,0);I=a[B]|0}else{I=F}if((I&1)<<24>>24==0){J=k+1|0}else{J=c[k+8>>2]|0}a[J+H|0]=x;x=H+1|0;a[J+x|0]=0;if((a[B]&1)<<24>>24==0){a[B]=x<<1&255;break}else{c[k+4>>2]=x;break}}}while(0);B=ca[c[(c[C>>2]|0)+28>>2]&1023](y,48)|0;x=c[o>>2]|0;D=x-1|0;K=c[s>>2]|0;while(1){if(K>>>0>=D>>>0){break}if(a[K]<<24>>24==B<<24>>24){K=K+1|0}else{break}}g3(k,K,x)}B=e|0;D=c[B>>2]|0;do{if((D|0)==0){L=0}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){L=D;break}if((b1[c[(c[D>>2]|0)+36>>2]&1023](D)|0)!=-1){L=D;break}c[B>>2]=0;L=0}}while(0);B=(L|0)==0;do{if((A|0)==0){M=1933}else{if((c[A+12>>2]|0)!=(c[A+16>>2]|0)){if(B){break}else{M=1935;break}}if((b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0)==-1){c[z>>2]=0;M=1933;break}else{if(B^(A|0)==0){break}else{M=1935;break}}}}while(0);do{if((M|0)==1933){if(B){M=1935;break}else{break}}}while(0);if((M|0)==1935){c[j>>2]=c[j>>2]|2}c[b>>2]=L;B=c[u>>2]|0;A=B+4|0;if(((G=c[A>>2]|0,c[A>>2]=G+ -1,G)|0)==0){b_[c[(c[B>>2]|0)+8>>2]&1023](B|0)}B=c[s>>2]|0;c[s>>2]=0;if((B|0)==0){i=d;return}b_[c[t>>2]&1023](B);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}function g6(a){a=a|0;return}function g7(a){a=a|0;jM(a);return}function g8(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;n=i;i=i+40|0;o=n|0;p=n+12|0;q=n+24|0;r=n+28|0;s=r;t=i;i=i+12|0;u=t;v=i;i=i+12|0;w=v;x=i;i=i+12|0;y=x;z=i;i=i+4|0;B=i;i=i+12|0;C=B;D=i;i=i+12|0;E=D;F=i;i=i+12|0;G=F;H=i;i=i+12|0;I=H;if(b){b=c[d>>2]|0;if((c[1313860]|0)!=-1){c[p>>2]=5255440;c[p+4>>2]=24;c[p+8>>2]=0;dn(5255440,p,252)}p=(c[1313861]|0)-1|0;J=c[b+8>>2]|0;if((c[b+12>>2]|0)-J>>2>>>0<=p>>>0){K=bQ(4)|0;L=K;c[L>>2]=5247504;bo(K|0,5252716,512)}b=c[J+(p<<2)>>2]|0;if((b|0)==0){K=bQ(4)|0;L=K;c[L>>2]=5247504;bo(K|0,5252716,512)}K=b;b$[c[(c[b>>2]|0)+44>>2]&1023](q,K);L=e;A=c[q>>2]|0;a[L]=A&255;A=A>>8;a[L+1|0]=A&255;A=A>>8;a[L+2|0]=A&255;A=A>>8;a[L+3|0]=A&255;L=b;b$[c[(c[L>>2]|0)+32>>2]&1023](r,K);r=l;if((a[r]&1)<<24>>24==0){a[l+1|0]=0;a[r]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dq(l,0);jT(r|0,s|0,12);jS(s|0,0,12);b$[c[(c[L>>2]|0)+28>>2]&1023](t,K);t=k;if((a[t]&1)<<24>>24==0){a[k+1|0]=0;a[t]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dq(k,0);jT(t|0,u|0,12);jS(u|0,0,12);u=b;a[f]=b1[c[(c[u>>2]|0)+12>>2]&1023](K)|0;a[g]=b1[c[(c[u>>2]|0)+16>>2]&1023](K)|0;b$[c[(c[L>>2]|0)+20>>2]&1023](v,K);v=h;if((a[v]&1)<<24>>24==0){a[h+1|0]=0;a[v]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dq(h,0);jT(v|0,w|0,12);jS(w|0,0,12);b$[c[(c[L>>2]|0)+24>>2]&1023](x,K);x=j;if((a[x]&1)<<24>>24==0){a[j+1|0]=0;a[x]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dq(j,0);jT(x|0,y|0,12);jS(y|0,0,12);y=b1[c[(c[b>>2]|0)+36>>2]&1023](K)|0;c[m>>2]=y;i=n;return}else{K=c[d>>2]|0;if((c[1313862]|0)!=-1){c[o>>2]=5255448;c[o+4>>2]=24;c[o+8>>2]=0;dn(5255448,o,252)}o=(c[1313863]|0)-1|0;d=c[K+8>>2]|0;if((c[K+12>>2]|0)-d>>2>>>0<=o>>>0){M=bQ(4)|0;N=M;c[N>>2]=5247504;bo(M|0,5252716,512)}K=c[d+(o<<2)>>2]|0;if((K|0)==0){M=bQ(4)|0;N=M;c[N>>2]=5247504;bo(M|0,5252716,512)}M=K;b$[c[(c[K>>2]|0)+44>>2]&1023](z,M);N=e;A=c[z>>2]|0;a[N]=A&255;A=A>>8;a[N+1|0]=A&255;A=A>>8;a[N+2|0]=A&255;A=A>>8;a[N+3|0]=A&255;N=K;b$[c[(c[N>>2]|0)+32>>2]&1023](B,M);B=l;if((a[B]&1)<<24>>24==0){a[l+1|0]=0;a[B]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dq(l,0);jT(B|0,C|0,12);jS(C|0,0,12);b$[c[(c[N>>2]|0)+28>>2]&1023](D,M);D=k;if((a[D]&1)<<24>>24==0){a[k+1|0]=0;a[D]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dq(k,0);jT(D|0,E|0,12);jS(E|0,0,12);E=K;a[f]=b1[c[(c[E>>2]|0)+12>>2]&1023](M)|0;a[g]=b1[c[(c[E>>2]|0)+16>>2]&1023](M)|0;b$[c[(c[N>>2]|0)+20>>2]&1023](F,M);F=h;if((a[F]&1)<<24>>24==0){a[h+1|0]=0;a[F]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dq(h,0);jT(F|0,G|0,12);jS(G|0,0,12);b$[c[(c[N>>2]|0)+24>>2]&1023](H,M);H=j;if((a[H]&1)<<24>>24==0){a[j+1|0]=0;a[H]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dq(j,0);jT(H|0,I|0,12);jS(I|0,0,12);y=b1[c[(c[K>>2]|0)+36>>2]&1023](M)|0;c[m>>2]=y;i=n;return}}function g9(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0;d=i;i=i+576|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=d|0;m=d+12|0;n=d+412|0;o=d+420|0;p=d+424|0;q=d+428|0;r=d+432|0;s=d+436|0;t=d+476|0;u=n|0;c[u>>2]=m|0;v=n+4|0;c[v>>2]=418;w=p|0;x=c[h+28>>2]|0;c[w>>2]=x;y=x+4|0;G=c[y>>2]|0,c[y>>2]=G+1,G;y=c[w>>2]|0;if((c[1313735]|0)!=-1){c[l>>2]=5254940;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254940,l,252)}l=(c[1313736]|0)-1|0;x=c[y+8>>2]|0;do{if((c[y+12>>2]|0)-x>>2>>>0>l>>>0){A=c[x+(l<<2)>>2]|0;if((A|0)==0){break}B=A;a[q]=0;C=f|0;c[r>>2]=c[C>>2]|0;do{if(ha(e,r,g,p,c[h+4>>2]|0,j,q,B,n,o,m+400|0)|0){D=s|0;E=c[(c[A>>2]|0)+48>>2]|0;b7[E&1023](B,5247052,5247062,D);E=t|0;F=c[o>>2]|0;H=c[u>>2]|0;I=F-H|0;do{if((I|0)>392){J=jD((I>>2)+2|0)|0;if((J|0)!=0){K=J;L=J;break}J=bQ(4)|0;c[J>>2]=5247480;bo(J|0,5252704,66)}else{K=E;L=0}}while(0);if((a[q]&1)<<24>>24==0){M=K}else{a[K]=45;M=K+1|0}L2420:do{if(H>>>0<F>>>0){I=s+40|0;J=s;N=M;O=H;while(1){P=D;while(1){if((P|0)==(I|0)){Q=I;break}if((c[P>>2]|0)==(c[O>>2]|0)){Q=P;break}else{P=P+4|0}}a[N]=a[5247052+(Q-J>>2)|0]|0;P=O+4|0;R=N+1|0;if(P>>>0<(c[o>>2]|0)>>>0){N=R;O=P}else{S=R;break L2420}}}else{S=M}}while(0);a[S]=0;if((bF(E|0,5244140,(z=i,i=i+4|0,c[z>>2]=k,z)|0)|0)!=1){g4(5244100)}if((L|0)==0){break}jE(L)}}while(0);B=e|0;A=c[B>>2]|0;do{if((A|0)==0){T=0}else{D=c[A+12>>2]|0;if((D|0)==(c[A+16>>2]|0)){U=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{U=c[D>>2]|0}if((U|0)!=-1){T=A;break}c[B>>2]=0;T=0}}while(0);B=(T|0)==0;A=c[C>>2]|0;do{if((A|0)==0){V=2050}else{D=c[A+12>>2]|0;if((D|0)==(c[A+16>>2]|0)){W=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{W=c[D>>2]|0}if((W|0)==-1){c[C>>2]=0;V=2050;break}else{if(B^(A|0)==0){break}else{V=2052;break}}}}while(0);do{if((V|0)==2050){if(B){V=2052;break}else{break}}}while(0);if((V|0)==2052){c[j>>2]=c[j>>2]|2}c[b>>2]=T;B=c[w>>2]|0;A=B+4|0;if(((G=c[A>>2]|0,c[A>>2]=G+ -1,G)|0)==0){b_[c[(c[B>>2]|0)+8>>2]&1023](B|0)}B=c[u>>2]|0;c[u>>2]=0;if((B|0)==0){i=d;return}b_[c[v>>2]&1023](B);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}function ha(b,e,f,g,h,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bj=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0;p=i;i=i+428|0;q=e;e=i;i=i+4|0;c[e>>2]=c[q>>2]|0;q=p|0;r=p+4|0;s=p+404|0;t=p+408|0;u=p+412|0;v=p+416|0;w=v;x=i;i=i+12|0;y=i;i=i+12|0;z=i;i=i+12|0;A=i;i=i+12|0;B=i;i=i+4|0;C=i;i=i+4|0;c[q>>2]=o;o=r|0;jS(w|0,0,12);D=x;E=y;F=z;G=A;jS(D|0,0,12);jS(E|0,0,12);jS(F|0,0,12);jS(G|0,0,12);hd(f,g,s,t,u,v,x,y,z,B);g=m|0;c[n>>2]=c[g>>2]|0;f=b|0;b=e|0;e=l;H=A+4|0;I=A+8|0;J=A|0;K=z+4|0;L=z+8|0;M=y+4|0;N=y+8|0;O=(h&512|0)!=0;h=x+4|0;P=x+8|0;x=s+3|0;Q=v+4|0;R=418;S=o;T=o;o=r+400|0;r=0;U=0;L2467:while(1){V=c[f>>2]|0;do{if((V|0)==0){W=1}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){Y=b1[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{Y=c[X>>2]|0}if((Y|0)==-1){c[f>>2]=0;W=1;break}else{W=(c[f>>2]|0)==0;break}}}while(0);V=c[b>>2]|0;do{if((V|0)==0){Z=2082}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){_=b1[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{_=c[X>>2]|0}if((_|0)==-1){c[b>>2]=0;Z=2082;break}else{if(W^(V|0)==0){$=V;break}else{aa=R;ab=S;ac=T;ad=r;Z=2348;break L2467}}}}while(0);if((Z|0)==2082){Z=0;if(W){aa=R;ab=S;ac=T;ad=r;Z=2348;break}else{$=0}}V=a[s+U|0]<<24>>24;L2491:do{if((V|0)==1){if((U|0)==3){aa=R;ab=S;ac=T;ad=r;Z=2348;break L2467}X=c[f>>2]|0;ae=c[X+12>>2]|0;if((ae|0)==(c[X+16>>2]|0)){af=b1[c[(c[X>>2]|0)+36>>2]&1023](X)|0}else{af=c[ae>>2]|0}if(!(bX[c[(c[e>>2]|0)+12>>2]&1023](l,8192,af)|0)){Z=2123;break L2467}ae=c[f>>2]|0;X=ae+12|0;ag=c[X>>2]|0;if((ag|0)==(c[ae+16>>2]|0)){ah=b1[c[(c[ae>>2]|0)+40>>2]&1023](ae)|0}else{c[X>>2]=ag+4|0;ah=c[ag>>2]|0}ag=a[G]|0;if((ag&1)<<24>>24==0){ai=1;aj=ag}else{ag=c[J>>2]|0;ai=(ag&-2)-1|0;aj=ag&255}ag=aj&255;X=(ag&1|0)==0?ag>>>1:c[H>>2]|0;if((X|0)==(ai|0)){dM(A,ai,1,ai,ai,0,0);ak=a[G]|0}else{ak=aj}ag=(ak&1)<<24>>24==0?H:c[I>>2]|0;c[ag+(X<<2)>>2]=ah;ae=X+1|0;c[ag+(ae<<2)>>2]=0;if((a[G]&1)<<24>>24==0){a[G]=ae<<1&255;Z=2124;break}else{c[H>>2]=ae;Z=2124;break}}else if((V|0)==0){Z=2124}else if((V|0)==3){ae=a[E]|0;ag=ae&255;X=(ag&1|0)==0;al=a[F]|0;am=al&255;an=(am&1|0)==0;if(((X?ag>>>1:c[M>>2]|0)|0)==(-(an?am>>>1:c[K>>2]|0)|0)){ao=r;ap=o;aq=T;ar=S;as=R;break}do{if(((X?ag>>>1:c[M>>2]|0)|0)!=0){if(((an?am>>>1:c[K>>2]|0)|0)==0){break}at=c[f>>2]|0;au=c[at+12>>2]|0;if((au|0)==(c[at+16>>2]|0)){av=b1[c[(c[at>>2]|0)+36>>2]&1023](at)|0;aw=av;ax=a[E]|0}else{aw=c[au>>2]|0;ax=ae}au=c[f>>2]|0;av=au+12|0;at=c[av>>2]|0;ay=(at|0)==(c[au+16>>2]|0);if((aw|0)==(c[((ax&1)<<24>>24==0?M:c[N>>2]|0)>>2]|0)){if(ay){az=c[(c[au>>2]|0)+40>>2]|0;b1[az&1023](au)}else{c[av>>2]=at+4|0}av=d[E]|0;ao=((av&1|0)==0?av>>>1:c[M>>2]|0)>>>0>1?y:r;ap=o;aq=T;ar=S;as=R;break L2491}if(ay){aA=b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0}else{aA=c[at>>2]|0}if((aA|0)!=(c[((a[F]&1)<<24>>24==0?K:c[L>>2]|0)>>2]|0)){Z=2196;break L2467}at=c[f>>2]|0;au=at+12|0;ay=c[au>>2]|0;if((ay|0)==(c[at+16>>2]|0)){av=c[(c[at>>2]|0)+40>>2]|0;b1[av&1023](at)}else{c[au>>2]=ay+4|0}a[k]=1;ay=d[F]|0;ao=((ay&1|0)==0?ay>>>1:c[K>>2]|0)>>>0>1?z:r;ap=o;aq=T;ar=S;as=R;break L2491}}while(0);am=c[f>>2]|0;an=c[am+12>>2]|0;ay=(an|0)==(c[am+16>>2]|0);if(((X?ag>>>1:c[M>>2]|0)|0)==0){if(ay){au=b1[c[(c[am>>2]|0)+36>>2]&1023](am)|0;aB=au;aC=a[F]|0}else{aB=c[an>>2]|0;aC=al}if((aB|0)!=(c[((aC&1)<<24>>24==0?K:c[L>>2]|0)>>2]|0)){ao=r;ap=o;aq=T;ar=S;as=R;break}au=c[f>>2]|0;at=au+12|0;av=c[at>>2]|0;if((av|0)==(c[au+16>>2]|0)){az=c[(c[au>>2]|0)+40>>2]|0;b1[az&1023](au)}else{c[at>>2]=av+4|0}a[k]=1;av=d[F]|0;ao=((av&1|0)==0?av>>>1:c[K>>2]|0)>>>0>1?z:r;ap=o;aq=T;ar=S;as=R;break}if(ay){ay=b1[c[(c[am>>2]|0)+36>>2]&1023](am)|0;aD=ay;aE=a[E]|0}else{aD=c[an>>2]|0;aE=ae}if((aD|0)!=(c[((aE&1)<<24>>24==0?M:c[N>>2]|0)>>2]|0)){a[k]=1;ao=r;ap=o;aq=T;ar=S;as=R;break}an=c[f>>2]|0;ay=an+12|0;am=c[ay>>2]|0;if((am|0)==(c[an+16>>2]|0)){av=c[(c[an>>2]|0)+40>>2]|0;b1[av&1023](an)}else{c[ay>>2]=am+4|0}am=d[E]|0;ao=((am&1|0)==0?am>>>1:c[M>>2]|0)>>>0>1?y:r;ap=o;aq=T;ar=S;as=R;break}else if((V|0)==2){if(!((r|0)!=0|U>>>0<2)){if((U|0)==2){aF=a[x]<<24>>24!=0}else{aF=0}if(!(O|aF)){ao=0;ap=o;aq=T;ar=S;as=R;break}}am=a[D]|0;ay=(am&1)<<24>>24==0?h:c[P>>2]|0;L2573:do{if((U|0)==0){aG=ay;aH=am;aI=$}else{if((d[s+(U-1|0)|0]|0)<2){aJ=ay;aK=am}else{aG=ay;aH=am;aI=$;break}while(1){an=aK&255;if((aJ|0)==(((aK&1)<<24>>24==0?h:c[P>>2]|0)+(((an&1|0)==0?an>>>1:c[h>>2]|0)<<2)|0)){aL=aK;break}if(!(bX[c[(c[e>>2]|0)+12>>2]&1023](l,8192,c[aJ>>2]|0)|0)){Z=2207;break}aJ=aJ+4|0;aK=a[D]|0}if((Z|0)==2207){Z=0;aL=a[D]|0}an=(aL&1)<<24>>24==0;av=aJ-(an?h:c[P>>2]|0)>>2;at=a[G]|0;au=at&255;az=(au&1|0)==0;L2583:do{if(av>>>0<=(az?au>>>1:c[H>>2]|0)>>>0){aM=(at&1)<<24>>24==0;aN=(aM?H:c[I>>2]|0)+((az?au>>>1:c[H>>2]|0)-av<<2)|0;aO=(aM?H:c[I>>2]|0)+((az?au>>>1:c[H>>2]|0)<<2)|0;if((aN|0)==(aO|0)){aG=aJ;aH=aL;aI=$;break L2573}else{aP=aN;aQ=an?h:c[P>>2]|0}while(1){if((c[aP>>2]|0)!=(c[aQ>>2]|0)){break L2583}aN=aP+4|0;if((aN|0)==(aO|0)){aG=aJ;aH=aL;aI=$;break L2573}aP=aN;aQ=aQ+4|0}}}while(0);aG=an?h:c[P>>2]|0;aH=aL;aI=$;break}}while(0);L2590:while(1){am=aH&255;if((aG|0)==(((aH&1)<<24>>24==0?h:c[P>>2]|0)+(((am&1|0)==0?am>>>1:c[h>>2]|0)<<2)|0)){break}am=c[f>>2]|0;do{if((am|0)==0){aR=1}else{ay=c[am+12>>2]|0;if((ay|0)==(c[am+16>>2]|0)){aS=b1[c[(c[am>>2]|0)+36>>2]&1023](am)|0}else{aS=c[ay>>2]|0}if((aS|0)==-1){c[f>>2]=0;aR=1;break}else{aR=(c[f>>2]|0)==0;break}}}while(0);do{if((aI|0)==0){Z=2228}else{am=c[aI+12>>2]|0;if((am|0)==(c[aI+16>>2]|0)){aT=b1[c[(c[aI>>2]|0)+36>>2]&1023](aI)|0}else{aT=c[am>>2]|0}if((aT|0)==-1){c[b>>2]=0;Z=2228;break}else{if(aR^(aI|0)==0){aU=aI;break}else{break L2590}}}}while(0);if((Z|0)==2228){Z=0;if(aR){break}else{aU=0}}am=c[f>>2]|0;an=c[am+12>>2]|0;if((an|0)==(c[am+16>>2]|0)){aV=b1[c[(c[am>>2]|0)+36>>2]&1023](am)|0}else{aV=c[an>>2]|0}if((aV|0)!=(c[aG>>2]|0)){break}an=c[f>>2]|0;am=an+12|0;ay=c[am>>2]|0;if((ay|0)==(c[an+16>>2]|0)){ae=c[(c[an>>2]|0)+40>>2]|0;b1[ae&1023](an)}else{c[am>>2]=ay+4|0}aG=aG+4|0;aH=a[D]|0;aI=aU}if(!O){ao=r;ap=o;aq=T;ar=S;as=R;break}ay=a[D]|0;am=ay&255;if((aG|0)==(((ay&1)<<24>>24==0?h:c[P>>2]|0)+(((am&1|0)==0?am>>>1:c[h>>2]|0)<<2)|0)){ao=r;ap=o;aq=T;ar=S;as=R;break}else{Z=2240;break L2467}}else if((V|0)==4){am=0;ay=o;an=T;ae=S;al=R;L2626:while(1){ag=c[f>>2]|0;do{if((ag|0)==0){aW=1}else{X=c[ag+12>>2]|0;if((X|0)==(c[ag+16>>2]|0)){aX=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{aX=c[X>>2]|0}if((aX|0)==-1){c[f>>2]=0;aW=1;break}else{aW=(c[f>>2]|0)==0;break}}}while(0);ag=c[b>>2]|0;do{if((ag|0)==0){Z=2254}else{X=c[ag+12>>2]|0;if((X|0)==(c[ag+16>>2]|0)){aY=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{aY=c[X>>2]|0}if((aY|0)==-1){c[b>>2]=0;Z=2254;break}else{if(aW^(ag|0)==0){break}else{break L2626}}}}while(0);if((Z|0)==2254){Z=0;if(aW){break}}ag=c[f>>2]|0;X=c[ag+12>>2]|0;if((X|0)==(c[ag+16>>2]|0)){aZ=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{aZ=c[X>>2]|0}if(bX[c[(c[e>>2]|0)+12>>2]&1023](l,2048,aZ)|0){X=c[n>>2]|0;if((X|0)==(c[q>>2]|0)){hg(m,n,q);a_=c[n>>2]|0}else{a_=X}c[n>>2]=a_+4|0;c[a_>>2]=aZ;a$=am+1|0;a0=ay;a1=an;a2=ae;a3=al}else{X=d[w]|0;if((((X&1|0)==0?X>>>1:c[Q>>2]|0)|0)==0|(am|0)==0){break}if((aZ|0)!=(c[u>>2]|0)){break}if((an|0)==(ay|0)){X=(al|0)!=418;ag=an-ae|0;au=ag>>>0<2147483647?ag<<1:-1;if(X){a4=ae}else{a4=0}X=jF(a4,au)|0;az=X;if((X|0)==0){Z=2271;break L2467}a5=az+(au>>>2<<2)|0;a6=az+(ag>>2<<2)|0;a7=az;a8=218}else{a5=ay;a6=an;a7=ae;a8=al}c[a6>>2]=am;a$=0;a0=a5;a1=a6+4|0;a2=a7;a3=a8}az=c[f>>2]|0;ag=az+12|0;au=c[ag>>2]|0;if((au|0)==(c[az+16>>2]|0)){X=c[(c[az>>2]|0)+40>>2]|0;b1[X&1023](az);am=a$;ay=a0;an=a1;ae=a2;al=a3;continue}else{c[ag>>2]=au+4|0;am=a$;ay=a0;an=a1;ae=a2;al=a3;continue}}if((ae|0)==(an|0)|(am|0)==0){a9=ay;ba=an;bb=ae;bc=al}else{if((an|0)==(ay|0)){au=(al|0)!=418;ag=an-ae|0;az=ag>>>0<2147483647?ag<<1:-1;if(au){bd=ae}else{bd=0}au=jF(bd,az)|0;X=au;if((au|0)==0){Z=2285;break L2467}be=X+(az>>>2<<2)|0;bf=X+(ag>>2<<2)|0;bg=X;bh=218}else{be=ay;bf=an;bg=ae;bh=al}c[bf>>2]=am;a9=be;ba=bf+4|0;bb=bg;bc=bh}X=c[B>>2]|0;L2692:do{if((X|0)>0){ag=c[f>>2]|0;do{if((ag|0)==0){bi=1}else{az=c[ag+12>>2]|0;if((az|0)==(c[ag+16>>2]|0)){bj=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bj=c[az>>2]|0}if((bj|0)==-1){c[f>>2]=0;bi=1;break}else{bi=(c[f>>2]|0)==0;break}}}while(0);ag=c[b>>2]|0;do{if((ag|0)==0){Z=2305}else{az=c[ag+12>>2]|0;if((az|0)==(c[ag+16>>2]|0)){bk=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bk=c[az>>2]|0}if((bk|0)==-1){c[b>>2]=0;Z=2305;break}else{if(bi^(ag|0)==0){bl=ag;break}else{Z=2311;break L2467}}}}while(0);if((Z|0)==2305){Z=0;if(bi){Z=2311;break L2467}else{bl=0}}ag=c[f>>2]|0;az=c[ag+12>>2]|0;if((az|0)==(c[ag+16>>2]|0)){bm=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bm=c[az>>2]|0}if((bm|0)!=(c[t>>2]|0)){Z=2311;break L2467}az=c[f>>2]|0;ag=az+12|0;au=c[ag>>2]|0;do{if((au|0)==(c[az+16>>2]|0)){av=c[(c[az>>2]|0)+40>>2]|0;b1[av&1023](az);bn=bl;bo=X;break}else{c[ag>>2]=au+4|0;bn=bl;bo=X;break}}while(0);while(1){au=c[f>>2]|0;do{if((au|0)==0){bp=1}else{ag=c[au+12>>2]|0;if((ag|0)==(c[au+16>>2]|0)){bq=b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0}else{bq=c[ag>>2]|0}if((bq|0)==-1){c[f>>2]=0;bp=1;break}else{bp=(c[f>>2]|0)==0;break}}}while(0);do{if((bn|0)==0){Z=2328}else{au=c[bn+12>>2]|0;if((au|0)==(c[bn+16>>2]|0)){br=b1[c[(c[bn>>2]|0)+36>>2]&1023](bn)|0}else{br=c[au>>2]|0}if((br|0)==-1){c[b>>2]=0;Z=2328;break}else{if(bp^(bn|0)==0){bs=bn;break}else{Z=2335;break L2467}}}}while(0);if((Z|0)==2328){Z=0;if(bp){Z=2335;break L2467}else{bs=0}}au=c[f>>2]|0;ag=c[au+12>>2]|0;if((ag|0)==(c[au+16>>2]|0)){bt=b1[c[(c[au>>2]|0)+36>>2]&1023](au)|0}else{bt=c[ag>>2]|0}if(!(bX[c[(c[e>>2]|0)+12>>2]&1023](l,2048,bt)|0)){Z=2335;break L2467}if((c[n>>2]|0)==(c[q>>2]|0)){hg(m,n,q)}ag=c[f>>2]|0;au=c[ag+12>>2]|0;if((au|0)==(c[ag+16>>2]|0)){bu=b1[c[(c[ag>>2]|0)+36>>2]&1023](ag)|0}else{bu=c[au>>2]|0}au=c[n>>2]|0;c[n>>2]=au+4|0;c[au>>2]=bu;au=bo-1|0;c[B>>2]=au;ag=c[f>>2]|0;az=ag+12|0;av=c[az>>2]|0;if((av|0)==(c[ag+16>>2]|0)){at=c[(c[ag>>2]|0)+40>>2]|0;b1[at&1023](ag)}else{c[az>>2]=av+4|0}if((au|0)>0){bn=bs;bo=au}else{break L2692}}}}while(0);if((c[n>>2]|0)==(c[g>>2]|0)){Z=2346;break L2467}else{ao=r;ap=a9;aq=ba;ar=bb;as=bc;break}}else{ao=r;ap=o;aq=T;ar=S;as=R}}while(0);L2766:do{if((Z|0)==2124){Z=0;if((U|0)==3){aa=R;ab=S;ac=T;ad=r;Z=2348;break L2467}else{bv=$}while(1){V=c[f>>2]|0;do{if((V|0)==0){bw=1}else{X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){bx=b1[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{bx=c[X>>2]|0}if((bx|0)==-1){c[f>>2]=0;bw=1;break}else{bw=(c[f>>2]|0)==0;break}}}while(0);do{if((bv|0)==0){Z=2138}else{V=c[bv+12>>2]|0;if((V|0)==(c[bv+16>>2]|0)){by=b1[c[(c[bv>>2]|0)+36>>2]&1023](bv)|0}else{by=c[V>>2]|0}if((by|0)==-1){c[b>>2]=0;Z=2138;break}else{if(bw^(bv|0)==0){bz=bv;break}else{ao=r;ap=o;aq=T;ar=S;as=R;break L2766}}}}while(0);if((Z|0)==2138){Z=0;if(bw){ao=r;ap=o;aq=T;ar=S;as=R;break L2766}else{bz=0}}V=c[f>>2]|0;X=c[V+12>>2]|0;if((X|0)==(c[V+16>>2]|0)){bA=b1[c[(c[V>>2]|0)+36>>2]&1023](V)|0}else{bA=c[X>>2]|0}if(!(bX[c[(c[e>>2]|0)+12>>2]&1023](l,8192,bA)|0)){ao=r;ap=o;aq=T;ar=S;as=R;break L2766}X=c[f>>2]|0;V=X+12|0;am=c[V>>2]|0;if((am|0)==(c[X+16>>2]|0)){bB=b1[c[(c[X>>2]|0)+40>>2]&1023](X)|0}else{c[V>>2]=am+4|0;bB=c[am>>2]|0}am=a[G]|0;if((am&1)<<24>>24==0){bC=1;bD=am}else{am=c[J>>2]|0;bC=(am&-2)-1|0;bD=am&255}am=bD&255;V=(am&1|0)==0?am>>>1:c[H>>2]|0;if((V|0)==(bC|0)){dM(A,bC,1,bC,bC,0,0);bE=a[G]|0}else{bE=bD}am=(bE&1)<<24>>24==0?H:c[I>>2]|0;c[am+(V<<2)>>2]=bB;X=V+1|0;c[am+(X<<2)>>2]=0;if((a[G]&1)<<24>>24==0){a[G]=X<<1&255;bv=bz;continue}else{c[H>>2]=X;bv=bz;continue}}}}while(0);X=U+1|0;if(X>>>0<4){R=as;S=ar;T=aq;o=ap;r=ao;U=X}else{aa=as;ab=ar;ac=aq;ad=ao;Z=2348;break}}L2813:do{if((Z|0)==2123){c[j>>2]=c[j>>2]|4;bF=0;bG=S;bH=R}else if((Z|0)==2196){c[j>>2]=c[j>>2]|4;bF=0;bG=S;bH=R}else if((Z|0)==2240){c[j>>2]=c[j>>2]|4;bF=0;bG=S;bH=R}else if((Z|0)==2271){jR()}else if((Z|0)==2285){jR()}else if((Z|0)==2311){c[j>>2]=c[j>>2]|4;bF=0;bG=bb;bH=bc}else if((Z|0)==2335){c[j>>2]=c[j>>2]|4;bF=0;bG=bb;bH=bc}else if((Z|0)==2346){c[j>>2]=c[j>>2]|4;bF=0;bG=bb;bH=bc}else if((Z|0)==2348){L2825:do{if((ad|0)!=0){ao=ad;aq=ad+4|0;ar=ad+8|0;as=1;L2827:while(1){U=d[ao]|0;if((U&1|0)==0){bI=U>>>1}else{bI=c[aq>>2]|0}if(as>>>0>=bI>>>0){break L2825}U=c[f>>2]|0;do{if((U|0)==0){bJ=1}else{r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bK=b1[c[(c[U>>2]|0)+36>>2]&1023](U)|0}else{bK=c[r>>2]|0}if((bK|0)==-1){c[f>>2]=0;bJ=1;break}else{bJ=(c[f>>2]|0)==0;break}}}while(0);U=c[b>>2]|0;do{if((U|0)==0){Z=2367}else{r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bL=b1[c[(c[U>>2]|0)+36>>2]&1023](U)|0}else{bL=c[r>>2]|0}if((bL|0)==-1){c[b>>2]=0;Z=2367;break}else{if(bJ^(U|0)==0){break}else{break L2827}}}}while(0);if((Z|0)==2367){Z=0;if(bJ){break}}U=c[f>>2]|0;r=c[U+12>>2]|0;if((r|0)==(c[U+16>>2]|0)){bM=b1[c[(c[U>>2]|0)+36>>2]&1023](U)|0}else{bM=c[r>>2]|0}if((a[ao]&1)<<24>>24==0){bN=aq}else{bN=c[ar>>2]|0}if((bM|0)!=(c[bN+(as<<2)>>2]|0)){break}r=as+1|0;U=c[f>>2]|0;ap=U+12|0;o=c[ap>>2]|0;if((o|0)==(c[U+16>>2]|0)){T=c[(c[U>>2]|0)+40>>2]|0;b1[T&1023](U);as=r;continue}else{c[ap>>2]=o+4|0;as=r;continue}}c[j>>2]=c[j>>2]|4;bF=0;bG=ab;bH=aa;break L2813}}while(0);if((ab|0)==(ac|0)){bF=1;bG=ac;bH=aa;break}c[C>>2]=0;eI(v,ab,ac,C);if((c[C>>2]|0)==0){bF=1;bG=ab;bH=aa;break}c[j>>2]=c[j>>2]|4;bF=0;bG=ab;bH=aa}}while(0);if((a[G]&1)<<24>>24!=0){jM(c[I>>2]|0)}if((a[F]&1)<<24>>24!=0){jM(c[L>>2]|0)}if((a[E]&1)<<24>>24!=0){jM(c[N>>2]|0)}if((a[D]&1)<<24>>24!=0){jM(c[P>>2]|0)}if((a[w]&1)<<24>>24!=0){jM(c[v+8>>2]|0)}if((bG|0)==0){i=p;return bF|0}b_[bH&1023](bG);i=p;return bF|0}function hb(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)<<24>>24==0){k=1;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g>>2;if((h|0)==0){return b|0}if((k-j|0)>>>0<h>>>0){dM(b,k,(j+h|0)-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)<<24>>24==0){n=b+4|0}else{n=c[b+8>>2]|0}m=n+(j<<2)|0;if((d|0)==(e|0)){o=m}else{l=(j+(((e-4|0)+(-g|0)|0)>>>2)|0)+1|0;g=d;d=m;while(1){c[d>>2]=c[g>>2]|0;m=g+4|0;if((m|0)==(e|0)){break}else{g=m;d=d+4|0}}o=n+(l<<2)|0}c[o>>2]=0;o=j+h|0;if((a[f]&1)<<24>>24==0){a[f]=o<<1&255;return b|0}else{c[b+4>>2]=o;return b|0}return 0}function hc(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;d=i;i=i+436|0;l=e;e=i;i=i+4|0;c[e>>2]=c[l>>2]|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=d|0;m=d+12|0;n=d+412|0;o=d+420|0;p=d+424|0;q=d+428|0;r=d+432|0;s=n|0;c[s>>2]=m|0;t=n+4|0;c[t>>2]=418;u=p|0;v=c[h+28>>2]|0;c[u>>2]=v;w=v+4|0;G=c[w>>2]|0,c[w>>2]=G+1,G;w=c[u>>2]|0;if((c[1313735]|0)!=-1){c[l>>2]=5254940;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254940,l,252)}l=(c[1313736]|0)-1|0;v=c[w+8>>2]|0;do{if((c[w+12>>2]|0)-v>>2>>>0>l>>>0){x=c[v+(l<<2)>>2]|0;if((x|0)==0){break}y=x;a[q]=0;z=f|0;A=c[z>>2]|0;c[r>>2]=A;if(ha(e,r,g,p,c[h+4>>2]|0,j,q,y,n,o,m+400|0)|0){B=k;if((a[B]&1)<<24>>24==0){c[k+4>>2]=0;a[B]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}C=x;do{if((a[q]&1)<<24>>24!=0){x=ca[c[(c[C>>2]|0)+44>>2]&1023](y,45)|0;D=a[B]|0;if((D&1)<<24>>24==0){E=1;F=D}else{D=c[k>>2]|0;E=(D&-2)-1|0;F=D&255}D=F&255;if((D&1|0)==0){H=D>>>1}else{H=c[k+4>>2]|0}if((H|0)==(E|0)){dM(k,E,1,E,E,0,0);I=a[B]|0}else{I=F}if((I&1)<<24>>24==0){J=k+4|0}else{J=c[k+8>>2]|0}c[J+(H<<2)>>2]=x;x=H+1|0;c[J+(x<<2)>>2]=0;if((a[B]&1)<<24>>24==0){a[B]=x<<1&255;break}else{c[k+4>>2]=x;break}}}while(0);B=ca[c[(c[C>>2]|0)+44>>2]&1023](y,48)|0;x=c[o>>2]|0;D=x-4|0;K=c[s>>2]|0;while(1){if(K>>>0>=D>>>0){break}if((c[K>>2]|0)==(B|0)){K=K+4|0}else{break}}hb(k,K,x)}B=e|0;D=c[B>>2]|0;do{if((D|0)==0){L=0}else{y=c[D+12>>2]|0;if((y|0)==(c[D+16>>2]|0)){M=b1[c[(c[D>>2]|0)+36>>2]&1023](D)|0}else{M=c[y>>2]|0}if((M|0)!=-1){L=D;break}c[B>>2]=0;L=0}}while(0);B=(L|0)==0;do{if((A|0)==0){N=2468}else{D=c[A+12>>2]|0;if((D|0)==(c[A+16>>2]|0)){O=b1[c[(c[A>>2]|0)+36>>2]&1023](A)|0}else{O=c[D>>2]|0}if((O|0)==-1){c[z>>2]=0;N=2468;break}else{if(B^(A|0)==0){break}else{N=2470;break}}}}while(0);do{if((N|0)==2468){if(B){N=2470;break}else{break}}}while(0);if((N|0)==2470){c[j>>2]=c[j>>2]|2}c[b>>2]=L;B=c[u>>2]|0;A=B+4|0;if(((G=c[A>>2]|0,c[A>>2]=G+ -1,G)|0)==0){b_[c[(c[B>>2]|0)+8>>2]&1023](B|0)}B=c[s>>2]|0;c[s>>2]=0;if((B|0)==0){i=d;return}b_[c[t>>2]&1023](B);i=d;return}}while(0);d=bQ(4)|0;c[d>>2]=5247504;bo(d|0,5252716,512)}function hd(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;n=i;i=i+40|0;o=n|0;p=n+12|0;q=n+24|0;r=n+28|0;s=r;t=i;i=i+12|0;u=t;v=i;i=i+12|0;w=v;x=i;i=i+12|0;y=x;z=i;i=i+4|0;B=i;i=i+12|0;C=B;D=i;i=i+12|0;E=D;F=i;i=i+12|0;G=F;H=i;i=i+12|0;I=H;if(b){b=c[d>>2]|0;if((c[1313856]|0)!=-1){c[p>>2]=5255424;c[p+4>>2]=24;c[p+8>>2]=0;dn(5255424,p,252)}p=(c[1313857]|0)-1|0;J=c[b+8>>2]|0;if((c[b+12>>2]|0)-J>>2>>>0<=p>>>0){K=bQ(4)|0;L=K;c[L>>2]=5247504;bo(K|0,5252716,512)}b=c[J+(p<<2)>>2]|0;if((b|0)==0){K=bQ(4)|0;L=K;c[L>>2]=5247504;bo(K|0,5252716,512)}K=b;b$[c[(c[b>>2]|0)+44>>2]&1023](q,K);L=e;A=c[q>>2]|0;a[L]=A&255;A=A>>8;a[L+1|0]=A&255;A=A>>8;a[L+2|0]=A&255;A=A>>8;a[L+3|0]=A&255;L=b;b$[c[(c[L>>2]|0)+32>>2]&1023](r,K);r=l;if((a[r]&1)<<24>>24==0){c[l+4>>2]=0;a[r]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dK(l,0);jT(r|0,s|0,12);jS(s|0,0,12);b$[c[(c[L>>2]|0)+28>>2]&1023](t,K);t=k;if((a[t]&1)<<24>>24==0){c[k+4>>2]=0;a[t]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dK(k,0);jT(t|0,u|0,12);jS(u|0,0,12);u=b;c[f>>2]=b1[c[(c[u>>2]|0)+12>>2]&1023](K)|0;c[g>>2]=b1[c[(c[u>>2]|0)+16>>2]&1023](K)|0;b$[c[(c[b>>2]|0)+20>>2]&1023](v,K);v=h;if((a[v]&1)<<24>>24==0){a[h+1|0]=0;a[v]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dq(h,0);jT(v|0,w|0,12);jS(w|0,0,12);b$[c[(c[L>>2]|0)+24>>2]&1023](x,K);x=j;if((a[x]&1)<<24>>24==0){c[j+4>>2]=0;a[x]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}dK(j,0);jT(x|0,y|0,12);jS(y|0,0,12);y=b1[c[(c[u>>2]|0)+36>>2]&1023](K)|0;c[m>>2]=y;i=n;return}else{K=c[d>>2]|0;if((c[1313858]|0)!=-1){c[o>>2]=5255432;c[o+4>>2]=24;c[o+8>>2]=0;dn(5255432,o,252)}o=(c[1313859]|0)-1|0;d=c[K+8>>2]|0;if((c[K+12>>2]|0)-d>>2>>>0<=o>>>0){M=bQ(4)|0;N=M;c[N>>2]=5247504;bo(M|0,5252716,512)}K=c[d+(o<<2)>>2]|0;if((K|0)==0){M=bQ(4)|0;N=M;c[N>>2]=5247504;bo(M|0,5252716,512)}M=K;b$[c[(c[K>>2]|0)+44>>2]&1023](z,M);N=e;A=c[z>>2]|0;a[N]=A&255;A=A>>8;a[N+1|0]=A&255;A=A>>8;a[N+2|0]=A&255;A=A>>8;a[N+3|0]=A&255;N=K;b$[c[(c[N>>2]|0)+32>>2]&1023](B,M);B=l;if((a[B]&1)<<24>>24==0){c[l+4>>2]=0;a[B]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dK(l,0);jT(B|0,C|0,12);jS(C|0,0,12);b$[c[(c[N>>2]|0)+28>>2]&1023](D,M);D=k;if((a[D]&1)<<24>>24==0){c[k+4>>2]=0;a[D]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dK(k,0);jT(D|0,E|0,12);jS(E|0,0,12);E=K;c[f>>2]=b1[c[(c[E>>2]|0)+12>>2]&1023](M)|0;c[g>>2]=b1[c[(c[E>>2]|0)+16>>2]&1023](M)|0;b$[c[(c[K>>2]|0)+20>>2]&1023](F,M);F=h;if((a[F]&1)<<24>>24==0){a[h+1|0]=0;a[F]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}dq(h,0);jT(F|0,G|0,12);jS(G|0,0,12);b$[c[(c[N>>2]|0)+24>>2]&1023](H,M);H=j;if((a[H]&1)<<24>>24==0){c[j+4>>2]=0;a[H]=0}else{c[c[j+8>>2]>>2]=0;c[j+4>>2]=0}dK(j,0);jT(H|0,I|0,12);jS(I|0,0,12);y=b1[c[(c[E>>2]|0)+36>>2]&1023](M)|0;c[m>>2]=y;i=n;return}}function he(a){a=a|0;return}function hf(a){a=a|0;jM(a);return}function hg(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a+4|0;f=(c[e>>2]|0)!=418;g=a|0;a=c[g>>2]|0;h=a;i=(c[d>>2]|0)-h|0;j=i>>>0<2147483647?i<<1:-1;i=(c[b>>2]|0)-h>>2;if(f){k=a}else{k=0}a=jF(k,j)|0;k=a;if((a|0)==0){jR()}do{if(f){c[g>>2]=k;l=k}else{a=c[g>>2]|0;c[g>>2]=k;if((a|0)==0){l=k;break}b_[c[e>>2]&1023](a);l=c[g>>2]|0}}while(0);c[e>>2]=218;c[b>>2]=l+(i<<2)|0;c[d>>2]=(c[g>>2]|0)+(j>>>2<<2)|0;return}function hh(b,e,f,g,j,l,m){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;m=+m;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;e=i;i=i+244|0;n=f;f=i;i=i+4|0;c[f>>2]=c[n>>2]|0;n=e|0;o=e+112|0;p=e+216|0;q=e+220|0;r=e+224|0;s=e+228|0;t=e+232|0;u=t;v=i;i=i+12|0;w=v;x=i;i=i+12|0;y=x;A=i;i=i+4|0;B=i;i=i+100|0;C=i;i=i+4|0;D=i;i=i+4|0;E=i;i=i+4|0;F=e+12|0;c[o>>2]=F;H=e+116|0;I=a$(F|0,100,5244080,(z=i,i=i+8|0,h[k>>3]=m,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0;do{if(I>>>0>99){do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);F=fu(o,c[1311652]|0,5244080,(z=i,i=i+8|0,h[k>>3]=m,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0;J=c[o>>2]|0;if((J|0)==0){K=bQ(4)|0;c[K>>2]=5247480;bo(K|0,5252704,66)}K=jD(F)|0;if((K|0)!=0){L=K;M=F;N=J;O=K;break}K=bQ(4)|0;c[K>>2]=5247480;bo(K|0,5252704,66)}else{L=H;M=I;N=0;O=0}}while(0);I=p|0;H=c[j+28>>2]|0;c[I>>2]=H;K=H+4|0;G=c[K>>2]|0,c[K>>2]=G+1,G;K=c[I>>2]|0;if((c[1313737]|0)!=-1){c[n>>2]=5254948;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254948,n,252)}n=(c[1313738]|0)-1|0;H=c[K+8>>2]|0;do{if((c[K+12>>2]|0)-H>>2>>>0>n>>>0){J=c[H+(n<<2)>>2]|0;if((J|0)==0){break}F=J;P=c[o>>2]|0;b7[c[(c[J>>2]|0)+32>>2]&1023](F,P,P+M|0,L);if((M|0)==0){Q=0}else{Q=a[c[o>>2]|0]<<24>>24==45}jS(u|0,0,12);jS(w|0,0,12);jS(y|0,0,12);hi(g,Q,p,q,r,s,t,v,x,A);P=B|0;J=c[A>>2]|0;if((M|0)>(J|0)){R=d[y]|0;if((R&1|0)==0){S=R>>>1}else{S=c[x+4>>2]|0}R=d[w]|0;if((R&1|0)==0){T=R>>>1}else{T=c[v+4>>2]|0}U=((M-J<<1|1)+S|0)+T|0}else{R=d[y]|0;if((R&1|0)==0){V=R>>>1}else{V=c[x+4>>2]|0}R=d[w]|0;if((R&1|0)==0){W=R>>>1}else{W=c[v+4>>2]|0}U=(V+2|0)+W|0}R=U+J|0;do{if(R>>>0>100){X=jD(R)|0;if((X|0)!=0){Y=X;Z=X;break}X=bQ(4)|0;c[X>>2]=5247480;bo(X|0,5252704,66)}else{Y=P;Z=0}}while(0);hk(Y,C,D,c[j+4>>2]|0,L,L+M|0,F,Q,q,a[r]|0,a[s]|0,t,v,x,J);c[E>>2]=c[f>>2]|0;fn(b,E,Y,c[C>>2]|0,c[D>>2]|0,j,l);if((Z|0)!=0){jE(Z)}if((a[y]&1)<<24>>24!=0){jM(c[x+8>>2]|0)}if((a[w]&1)<<24>>24!=0){jM(c[v+8>>2]|0)}if((a[u]&1)<<24>>24!=0){jM(c[t+8>>2]|0)}P=c[I>>2]|0;R=P+4|0;if(((G=c[R>>2]|0,c[R>>2]=G+ -1,G)|0)==0){b_[c[(c[P>>2]|0)+8>>2]&1023](P|0)}if((O|0)!=0){jE(O)}if((N|0)==0){i=e;return}jE(N);i=e;return}}while(0);e=bQ(4)|0;c[e>>2]=5247504;bo(e|0,5252716,512)}function hi(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;n=i;i=i+28|0;o=n|0;p=n+12|0;q=n+24|0;r=q;s=i;i=i+12|0;t=s;u=i;i=i+4|0;v=u;w=i;i=i+12|0;x=w;y=i;i=i+12|0;z=y;B=i;i=i+12|0;C=B;D=i;i=i+4|0;E=D;F=i;i=i+12|0;G=F;H=i;i=i+4|0;I=H;J=i;i=i+12|0;K=J;L=i;i=i+12|0;M=L;N=i;i=i+12|0;O=N;P=c[e>>2]|0;if(b){if((c[1313860]|0)!=-1){c[p>>2]=5255440;c[p+4>>2]=24;c[p+8>>2]=0;dn(5255440,p,252)}p=(c[1313861]|0)-1|0;b=c[P+8>>2]|0;if((c[P+12>>2]|0)-b>>2>>>0<=p>>>0){Q=bQ(4)|0;R=Q;c[R>>2]=5247504;bo(Q|0,5252716,512)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){Q=bQ(4)|0;R=Q;c[R>>2]=5247504;bo(Q|0,5252716,512)}Q=e;R=c[e>>2]|0;if(d){b$[c[R+44>>2]&1023](r,Q);r=f;A=c[q>>2]|0;a[r]=A&255;A=A>>8;a[r+1|0]=A&255;A=A>>8;a[r+2|0]=A&255;A=A>>8;a[r+3|0]=A&255;b$[c[(c[e>>2]|0)+32>>2]&1023](s,Q);s=l;if((a[s]&1)<<24>>24==0){a[l+1|0]=0;a[s]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dq(l,0);jT(s|0,t|0,12);jS(t|0,0,12)}else{b$[c[R+40>>2]&1023](v,Q);v=f;A=c[u>>2]|0;a[v]=A&255;A=A>>8;a[v+1|0]=A&255;A=A>>8;a[v+2|0]=A&255;A=A>>8;a[v+3|0]=A&255;b$[c[(c[e>>2]|0)+28>>2]&1023](w,Q);w=l;if((a[w]&1)<<24>>24==0){a[l+1|0]=0;a[w]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dq(l,0);jT(w|0,x|0,12);jS(x|0,0,12)}x=e;a[g]=b1[c[(c[x>>2]|0)+12>>2]&1023](Q)|0;a[h]=b1[c[(c[x>>2]|0)+16>>2]&1023](Q)|0;x=e;b$[c[(c[x>>2]|0)+20>>2]&1023](y,Q);y=j;if((a[y]&1)<<24>>24==0){a[j+1|0]=0;a[y]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dq(j,0);jT(y|0,z|0,12);jS(z|0,0,12);b$[c[(c[x>>2]|0)+24>>2]&1023](B,Q);B=k;if((a[B]&1)<<24>>24==0){a[k+1|0]=0;a[B]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dq(k,0);jT(B|0,C|0,12);jS(C|0,0,12);C=b1[c[(c[e>>2]|0)+36>>2]&1023](Q)|0;c[m>>2]=C;i=n;return}else{if((c[1313862]|0)!=-1){c[o>>2]=5255448;c[o+4>>2]=24;c[o+8>>2]=0;dn(5255448,o,252)}o=(c[1313863]|0)-1|0;Q=c[P+8>>2]|0;if((c[P+12>>2]|0)-Q>>2>>>0<=o>>>0){S=bQ(4)|0;T=S;c[T>>2]=5247504;bo(S|0,5252716,512)}P=c[Q+(o<<2)>>2]|0;if((P|0)==0){S=bQ(4)|0;T=S;c[T>>2]=5247504;bo(S|0,5252716,512)}S=P;T=c[P>>2]|0;if(d){b$[c[T+44>>2]&1023](E,S);E=f;A=c[D>>2]|0;a[E]=A&255;A=A>>8;a[E+1|0]=A&255;A=A>>8;a[E+2|0]=A&255;A=A>>8;a[E+3|0]=A&255;b$[c[(c[P>>2]|0)+32>>2]&1023](F,S);F=l;if((a[F]&1)<<24>>24==0){a[l+1|0]=0;a[F]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dq(l,0);jT(F|0,G|0,12);jS(G|0,0,12)}else{b$[c[T+40>>2]&1023](I,S);I=f;A=c[H>>2]|0;a[I]=A&255;A=A>>8;a[I+1|0]=A&255;A=A>>8;a[I+2|0]=A&255;A=A>>8;a[I+3|0]=A&255;b$[c[(c[P>>2]|0)+28>>2]&1023](J,S);J=l;if((a[J]&1)<<24>>24==0){a[l+1|0]=0;a[J]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}dq(l,0);jT(J|0,K|0,12);jS(K|0,0,12)}K=P;a[g]=b1[c[(c[K>>2]|0)+12>>2]&1023](S)|0;a[h]=b1[c[(c[K>>2]|0)+16>>2]&1023](S)|0;K=P;b$[c[(c[K>>2]|0)+20>>2]&1023](L,S);L=j;if((a[L]&1)<<24>>24==0){a[j+1|0]=0;a[L]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dq(j,0);jT(L|0,M|0,12);jS(M|0,0,12);b$[c[(c[K>>2]|0)+24>>2]&1023](N,S);N=k;if((a[N]&1)<<24>>24==0){a[k+1|0]=0;a[N]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}dq(k,0);jT(N|0,O|0,12);jS(O|0,0,12);C=b1[c[(c[P>>2]|0)+36>>2]&1023](S)|0;c[m>>2]=C;i=n;return}}function hj(a){a=a|0;return}function hk(d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;r=r|0;var s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0;c[f>>2]=d;s=j;t=q;u=q+1|0;v=q+8|0;w=q+4|0;q=p;x=(g&512|0)==0;y=p+1|0;z=p+4|0;A=p+8|0;p=j+8|0;B=(r|0)>0;C=o;D=o+1|0;E=o+8|0;F=o+4|0;o=-r|0;G=h;h=0;while(1){H=a[l+h|0]<<24>>24;L3226:do{if((H|0)==3){I=a[t]|0;J=I&255;if((J&1|0)==0){K=J>>>1}else{K=c[w>>2]|0}if((K|0)==0){L=G;break}if((I&1)<<24>>24==0){M=u}else{M=c[v>>2]|0}I=a[M]|0;J=c[f>>2]|0;c[f>>2]=J+1|0;a[J]=I;L=G}else if((H|0)==0){c[e>>2]=c[f>>2]|0;L=G}else if((H|0)==4){I=c[f>>2]|0;J=k?G+1|0:G;N=J;while(1){if(N>>>0>=i>>>0){break}O=a[N]|0;if(O<<24>>24<=-1){break}if((b[(c[p>>2]|0)+(O<<24>>24<<1)>>1]&2048)<<16>>16==0){break}else{N=N+1|0}}O=N;if(B){do{if(N>>>0>J>>>0){P=J+(-O|0)|0;Q=P>>>0<o>>>0?o:P;P=Q+r|0;R=N;S=r;T=I;while(1){U=R-1|0;V=a[U]|0;c[f>>2]=T+1|0;a[T]=V;V=S-1|0;W=(V|0)>0;if(!(U>>>0>J>>>0&W)){break}R=U;S=V;T=c[f>>2]|0}T=N+Q|0;if(W){X=P;Y=T;Z=2736;break}else{_=0;$=P;aa=T;break}}else{X=r;Y=N;Z=2736}}while(0);if((Z|0)==2736){Z=0;_=ca[c[(c[s>>2]|0)+28>>2]&1023](j,48)|0;$=X;aa=Y}O=c[f>>2]|0;c[f>>2]=O+1|0;L3254:do{if(($|0)>0){T=$;S=O;while(1){a[S]=_;R=T-1|0;V=c[f>>2]|0;c[f>>2]=V+1|0;if((R|0)>0){T=R;S=V}else{ab=V;break L3254}}}else{ab=O}}while(0);a[ab]=m;ac=aa}else{ac=N}L3259:do{if((ac|0)==(J|0)){O=ca[c[(c[s>>2]|0)+28>>2]&1023](j,48)|0;S=c[f>>2]|0;c[f>>2]=S+1|0;a[S]=O}else{O=a[C]|0;S=O&255;if((S&1|0)==0){ad=S>>>1}else{ad=c[F>>2]|0}do{if((ad|0)==0){ae=ac;af=0;ag=0;ah=-1}else{if((O&1)<<24>>24==0){ai=D}else{ai=c[E>>2]|0}ae=ac;af=0;ag=0;ah=a[ai]<<24>>24;break}}while(0);while(1){do{if((af|0)==(ah|0)){O=c[f>>2]|0;c[f>>2]=O+1|0;a[O]=n;O=ag+1|0;S=a[C]|0;T=S&255;if((T&1|0)==0){aj=T>>>1}else{aj=c[F>>2]|0}if(O>>>0>=aj>>>0){ak=ah;al=O;am=0;break}T=(S&1)<<24>>24==0;if(T){an=D}else{an=c[E>>2]|0}if(a[an+O|0]<<24>>24==127){ak=-1;al=O;am=0;break}if(T){ao=D}else{ao=c[E>>2]|0}ak=a[ao+O|0]<<24>>24;al=O;am=0}else{ak=ah;al=ag;am=af}}while(0);O=ae-1|0;T=a[O]|0;S=c[f>>2]|0;c[f>>2]=S+1|0;a[S]=T;if((O|0)==(J|0)){break L3259}else{ae=O;af=am+1|0;ag=al;ah=ak}}}}while(0);N=c[f>>2]|0;if((I|0)==(N|0)){L=J;break}O=N-1|0;if(I>>>0<O>>>0){ap=I;aq=O}else{L=J;break}while(1){O=a[ap]|0;a[ap]=a[aq]|0;a[aq]=O;O=ap+1|0;N=aq-1|0;if(O>>>0<N>>>0){ap=O;aq=N}else{L=J;break L3226}}}else if((H|0)==1){c[e>>2]=c[f>>2]|0;J=ca[c[(c[s>>2]|0)+28>>2]&1023](j,32)|0;I=c[f>>2]|0;c[f>>2]=I+1|0;a[I]=J;L=G}else if((H|0)==2){J=a[q]|0;I=J&255;N=(I&1|0)==0;if(N){ar=I>>>1}else{ar=c[z>>2]|0}if((ar|0)==0|x){L=G;break}if((J&1)<<24>>24==0){as=y;at=y}else{J=c[A>>2]|0;as=J;at=J}if(N){au=I>>>1}else{au=c[z>>2]|0}I=as+au|0;N=c[f>>2]|0;L3306:do{if((at|0)==(I|0)){av=N}else{J=at;O=N;while(1){a[O]=a[J]|0;T=J+1|0;S=O+1|0;if((T|0)==(I|0)){av=S;break L3306}else{J=T;O=S}}}}while(0);c[f>>2]=av;L=G}else{L=G}}while(0);H=h+1|0;if((H|0)==4){break}else{G=L;h=H}}h=a[t]|0;t=h&255;L=(t&1|0)==0;if(L){aw=t>>>1}else{aw=c[w>>2]|0}if(aw>>>0>1){if((h&1)<<24>>24==0){ax=u;ay=u}else{u=c[v>>2]|0;ax=u;ay=u}if(L){az=t>>>1}else{az=c[w>>2]|0}w=ax+az|0;az=c[f>>2]|0;ax=ay+1|0;L3325:do{if((ax|0)==(w|0)){aA=az}else{ay=az;t=ax;while(1){a[ay]=a[t]|0;L=ay+1|0;u=t+1|0;if((u|0)==(w|0)){aA=L;break L3325}else{ay=L;t=u}}}}while(0);c[f>>2]=aA}aA=g&176;if((aA|0)==32){c[e>>2]=c[f>>2]|0;return}else if((aA|0)==16){return}else{c[e>>2]=d;return}}function hl(a){a=a|0;jM(a);return}function hm(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;e=i;i=i+40|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=e|0;m=e+12|0;n=e+16|0;o=e+20|0;p=e+24|0;q=e+28|0;r=q;s=i;i=i+12|0;t=s;u=i;i=i+12|0;v=u;w=i;i=i+4|0;x=i;i=i+100|0;y=i;i=i+4|0;z=i;i=i+4|0;A=i;i=i+4|0;B=m|0;C=c[h+28>>2]|0;c[B>>2]=C;D=C+4|0;G=c[D>>2]|0,c[D>>2]=G+1,G;D=c[B>>2]|0;if((c[1313737]|0)!=-1){c[l>>2]=5254948;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254948,l,252)}l=(c[1313738]|0)-1|0;C=c[D+8>>2]|0;do{if((c[D+12>>2]|0)-C>>2>>>0>l>>>0){E=c[C+(l<<2)>>2]|0;if((E|0)==0){break}F=E;H=k;I=k;J=a[I]|0;K=J&255;if((K&1|0)==0){L=K>>>1}else{L=c[k+4>>2]|0}if((L|0)==0){M=0}else{if((J&1)<<24>>24==0){N=H+1|0}else{N=c[k+8>>2]|0}J=a[N]|0;M=J<<24>>24==ca[c[(c[E>>2]|0)+28>>2]&1023](F,45)<<24>>24}jS(r|0,0,12);jS(t|0,0,12);jS(v|0,0,12);hi(g,M,m,n,o,p,q,s,u,w);E=x|0;J=a[I]|0;K=J&255;O=(K&1|0)==0;if(O){P=K>>>1}else{P=c[k+4>>2]|0}Q=c[w>>2]|0;if((P|0)>(Q|0)){if(O){R=K>>>1}else{R=c[k+4>>2]|0}K=d[v]|0;if((K&1|0)==0){S=K>>>1}else{S=c[u+4>>2]|0}K=d[t]|0;if((K&1|0)==0){T=K>>>1}else{T=c[s+4>>2]|0}U=((R-Q<<1|1)+S|0)+T|0}else{K=d[v]|0;if((K&1|0)==0){V=K>>>1}else{V=c[u+4>>2]|0}K=d[t]|0;if((K&1|0)==0){W=K>>>1}else{W=c[s+4>>2]|0}U=(V+2|0)+W|0}K=U+Q|0;do{if(K>>>0>100){O=jD(K)|0;if((O|0)!=0){X=O;Y=O;Z=a[I]|0;break}O=bQ(4)|0;c[O>>2]=5247480;bo(O|0,5252704,66)}else{X=E;Y=0;Z=J}}while(0);if((Z&1)<<24>>24==0){_=H+1|0;$=H+1|0}else{J=c[k+8>>2]|0;_=J;$=J}J=Z&255;if((J&1|0)==0){aa=J>>>1}else{aa=c[k+4>>2]|0}hk(X,y,z,c[h+4>>2]|0,$,_+aa|0,F,M,n,a[o]|0,a[p]|0,q,s,u,Q);c[A>>2]=c[f>>2]|0;fn(b,A,X,c[y>>2]|0,c[z>>2]|0,h,j);if((Y|0)!=0){jE(Y)}if((a[v]&1)<<24>>24!=0){jM(c[u+8>>2]|0)}if((a[t]&1)<<24>>24!=0){jM(c[s+8>>2]|0)}if((a[r]&1)<<24>>24!=0){jM(c[q+8>>2]|0)}J=c[B>>2]|0;E=J+4|0;if(((G=c[E>>2]|0,c[E>>2]=G+ -1,G)|0)!=0){i=e;return}b_[c[(c[J>>2]|0)+8>>2]&1023](J|0);i=e;return}}while(0);e=bQ(4)|0;c[e>>2]=5247504;bo(e|0,5252716,512)}function hn(b,e,f,g,j,l,m){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;l=l|0;m=+m;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;e=i;i=i+544|0;n=f;f=i;i=i+4|0;c[f>>2]=c[n>>2]|0;n=e|0;o=e+112|0;p=e+516|0;q=e+520|0;r=e+524|0;s=e+528|0;t=e+532|0;u=t;v=i;i=i+12|0;w=v;x=i;i=i+12|0;y=x;A=i;i=i+4|0;B=i;i=i+400|0;C=i;i=i+4|0;D=i;i=i+4|0;E=i;i=i+4|0;F=e+12|0;c[o>>2]=F;H=e+116|0;I=a$(F|0,100,5244080,(z=i,i=i+8|0,h[k>>3]=m,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0;do{if(I>>>0>99){do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);F=fu(o,c[1311652]|0,5244080,(z=i,i=i+8|0,h[k>>3]=m,c[z>>2]=c[k>>2]|0,c[z+4>>2]=c[k+4>>2]|0,z)|0)|0;J=c[o>>2]|0;if((J|0)==0){K=bQ(4)|0;c[K>>2]=5247480;bo(K|0,5252704,66)}K=jD(F<<2)|0;L=K;if((K|0)!=0){M=L;N=F;O=J;P=L;break}L=bQ(4)|0;c[L>>2]=5247480;bo(L|0,5252704,66)}else{M=H;N=I;O=0;P=0}}while(0);I=p|0;H=c[j+28>>2]|0;c[I>>2]=H;L=H+4|0;G=c[L>>2]|0,c[L>>2]=G+1,G;L=c[I>>2]|0;if((c[1313735]|0)!=-1){c[n>>2]=5254940;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254940,n,252)}n=(c[1313736]|0)-1|0;H=c[L+8>>2]|0;do{if((c[L+12>>2]|0)-H>>2>>>0>n>>>0){J=c[H+(n<<2)>>2]|0;if((J|0)==0){break}F=J;K=c[o>>2]|0;b7[c[(c[J>>2]|0)+48>>2]&1023](F,K,K+N|0,M);if((N|0)==0){Q=0}else{Q=a[c[o>>2]|0]<<24>>24==45}jS(u|0,0,12);jS(w|0,0,12);jS(y|0,0,12);ho(g,Q,p,q,r,s,t,v,x,A);K=B|0;J=c[A>>2]|0;if((N|0)>(J|0)){R=d[y]|0;if((R&1|0)==0){S=R>>>1}else{S=c[x+4>>2]|0}R=d[w]|0;if((R&1|0)==0){T=R>>>1}else{T=c[v+4>>2]|0}U=((N-J<<1|1)+S|0)+T|0}else{R=d[y]|0;if((R&1|0)==0){V=R>>>1}else{V=c[x+4>>2]|0}R=d[w]|0;if((R&1|0)==0){W=R>>>1}else{W=c[v+4>>2]|0}U=(V+2|0)+W|0}R=U+J|0;do{if(R>>>0>100){X=jD(R<<2)|0;Y=X;if((X|0)!=0){Z=Y;_=Y;break}Y=bQ(4)|0;c[Y>>2]=5247480;bo(Y|0,5252704,66)}else{Z=K;_=0}}while(0);hp(Z,C,D,c[j+4>>2]|0,M,M+(N<<2)|0,F,Q,q,c[r>>2]|0,c[s>>2]|0,t,v,x,J);c[E>>2]=c[f>>2]|0;fF(b,E,Z,c[C>>2]|0,c[D>>2]|0,j,l);if((_|0)!=0){jE(_)}if((a[y]&1)<<24>>24!=0){jM(c[x+8>>2]|0)}if((a[w]&1)<<24>>24!=0){jM(c[v+8>>2]|0)}if((a[u]&1)<<24>>24!=0){jM(c[t+8>>2]|0)}K=c[I>>2]|0;R=K+4|0;if(((G=c[R>>2]|0,c[R>>2]=G+ -1,G)|0)==0){b_[c[(c[K>>2]|0)+8>>2]&1023](K|0)}if((P|0)!=0){jE(P)}if((O|0)==0){i=e;return}jE(O);i=e;return}}while(0);e=bQ(4)|0;c[e>>2]=5247504;bo(e|0,5252716,512)}function ho(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0;n=i;i=i+28|0;o=n|0;p=n+12|0;q=n+24|0;r=q;s=i;i=i+12|0;t=s;u=i;i=i+4|0;v=u;w=i;i=i+12|0;x=w;y=i;i=i+12|0;z=y;B=i;i=i+12|0;C=B;D=i;i=i+4|0;E=D;F=i;i=i+12|0;G=F;H=i;i=i+4|0;I=H;J=i;i=i+12|0;K=J;L=i;i=i+12|0;M=L;N=i;i=i+12|0;O=N;P=c[e>>2]|0;if(b){if((c[1313856]|0)!=-1){c[p>>2]=5255424;c[p+4>>2]=24;c[p+8>>2]=0;dn(5255424,p,252)}p=(c[1313857]|0)-1|0;b=c[P+8>>2]|0;if((c[P+12>>2]|0)-b>>2>>>0<=p>>>0){Q=bQ(4)|0;R=Q;c[R>>2]=5247504;bo(Q|0,5252716,512)}e=c[b+(p<<2)>>2]|0;if((e|0)==0){Q=bQ(4)|0;R=Q;c[R>>2]=5247504;bo(Q|0,5252716,512)}Q=e;R=c[e>>2]|0;if(d){b$[c[R+44>>2]&1023](r,Q);r=f;A=c[q>>2]|0;a[r]=A&255;A=A>>8;a[r+1|0]=A&255;A=A>>8;a[r+2|0]=A&255;A=A>>8;a[r+3|0]=A&255;b$[c[(c[e>>2]|0)+32>>2]&1023](s,Q);s=l;if((a[s]&1)<<24>>24==0){c[l+4>>2]=0;a[s]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dK(l,0);jT(s|0,t|0,12);jS(t|0,0,12)}else{b$[c[R+40>>2]&1023](v,Q);v=f;A=c[u>>2]|0;a[v]=A&255;A=A>>8;a[v+1|0]=A&255;A=A>>8;a[v+2|0]=A&255;A=A>>8;a[v+3|0]=A&255;b$[c[(c[e>>2]|0)+28>>2]&1023](w,Q);w=l;if((a[w]&1)<<24>>24==0){c[l+4>>2]=0;a[w]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dK(l,0);jT(w|0,x|0,12);jS(x|0,0,12)}x=e;c[g>>2]=b1[c[(c[x>>2]|0)+12>>2]&1023](Q)|0;c[h>>2]=b1[c[(c[x>>2]|0)+16>>2]&1023](Q)|0;b$[c[(c[e>>2]|0)+20>>2]&1023](y,Q);y=j;if((a[y]&1)<<24>>24==0){a[j+1|0]=0;a[y]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dq(j,0);jT(y|0,z|0,12);jS(z|0,0,12);b$[c[(c[e>>2]|0)+24>>2]&1023](B,Q);B=k;if((a[B]&1)<<24>>24==0){c[k+4>>2]=0;a[B]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dK(k,0);jT(B|0,C|0,12);jS(C|0,0,12);C=b1[c[(c[x>>2]|0)+36>>2]&1023](Q)|0;c[m>>2]=C;i=n;return}else{if((c[1313858]|0)!=-1){c[o>>2]=5255432;c[o+4>>2]=24;c[o+8>>2]=0;dn(5255432,o,252)}o=(c[1313859]|0)-1|0;Q=c[P+8>>2]|0;if((c[P+12>>2]|0)-Q>>2>>>0<=o>>>0){S=bQ(4)|0;T=S;c[T>>2]=5247504;bo(S|0,5252716,512)}P=c[Q+(o<<2)>>2]|0;if((P|0)==0){S=bQ(4)|0;T=S;c[T>>2]=5247504;bo(S|0,5252716,512)}S=P;T=c[P>>2]|0;if(d){b$[c[T+44>>2]&1023](E,S);E=f;A=c[D>>2]|0;a[E]=A&255;A=A>>8;a[E+1|0]=A&255;A=A>>8;a[E+2|0]=A&255;A=A>>8;a[E+3|0]=A&255;b$[c[(c[P>>2]|0)+32>>2]&1023](F,S);F=l;if((a[F]&1)<<24>>24==0){c[l+4>>2]=0;a[F]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dK(l,0);jT(F|0,G|0,12);jS(G|0,0,12)}else{b$[c[T+40>>2]&1023](I,S);I=f;A=c[H>>2]|0;a[I]=A&255;A=A>>8;a[I+1|0]=A&255;A=A>>8;a[I+2|0]=A&255;A=A>>8;a[I+3|0]=A&255;b$[c[(c[P>>2]|0)+28>>2]&1023](J,S);J=l;if((a[J]&1)<<24>>24==0){c[l+4>>2]=0;a[J]=0}else{c[c[l+8>>2]>>2]=0;c[l+4>>2]=0}dK(l,0);jT(J|0,K|0,12);jS(K|0,0,12)}K=P;c[g>>2]=b1[c[(c[K>>2]|0)+12>>2]&1023](S)|0;c[h>>2]=b1[c[(c[K>>2]|0)+16>>2]&1023](S)|0;b$[c[(c[P>>2]|0)+20>>2]&1023](L,S);L=j;if((a[L]&1)<<24>>24==0){a[j+1|0]=0;a[L]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}dq(j,0);jT(L|0,M|0,12);jS(M|0,0,12);b$[c[(c[P>>2]|0)+24>>2]&1023](N,S);N=k;if((a[N]&1)<<24>>24==0){c[k+4>>2]=0;a[N]=0}else{c[c[k+8>>2]>>2]=0;c[k+4>>2]=0}dK(k,0);jT(N|0,O|0,12);jS(O|0,0,12);C=b1[c[(c[K>>2]|0)+36>>2]&1023](S)|0;c[m>>2]=C;i=n;return}}function hp(b,d,e,f,g,h,i,j,k,l,m,n,o,p,q){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;q=q|0;var r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0;c[e>>2]=b;r=i;s=p;t=p+4|0;u=p+8|0;p=o;v=(f&512|0)==0;w=o+4|0;x=o+8|0;o=i;y=(q|0)>0;z=n;A=n+1|0;B=n+8|0;C=n+4|0;n=g;g=0;while(1){D=a[k+g|0]<<24>>24;L3573:do{if((D|0)==4){E=c[e>>2]|0;F=j?n+4|0:n;G=F;while(1){if(G>>>0>=h>>>0){break}if(bX[c[(c[o>>2]|0)+12>>2]&1023](i,2048,c[G>>2]|0)|0){G=G+4|0}else{break}}if(y){do{if(G>>>0>F>>>0){H=G;I=q;while(1){J=H-4|0;K=c[J>>2]|0;L=c[e>>2]|0;c[e>>2]=L+4|0;c[L>>2]=K;M=I-1|0;N=(M|0)>0;if(J>>>0>F>>>0&N){H=J;I=M}else{break}}if(N){O=M;P=J;Q=3042;break}else{R=0;S=M;T=J;break}}else{O=q;P=G;Q=3042}}while(0);if((Q|0)==3042){Q=0;R=ca[c[(c[r>>2]|0)+44>>2]&1023](i,48)|0;S=O;T=P}I=c[e>>2]|0;c[e>>2]=I+4|0;L3588:do{if((S|0)>0){H=S;K=I;while(1){c[K>>2]=R;L=H-1|0;U=c[e>>2]|0;c[e>>2]=U+4|0;if((L|0)>0){H=L;K=U}else{V=U;break L3588}}}else{V=I}}while(0);c[V>>2]=l;W=T}else{W=G}L3593:do{if((W|0)==(F|0)){I=ca[c[(c[r>>2]|0)+44>>2]&1023](i,48)|0;K=c[e>>2]|0;c[e>>2]=K+4|0;c[K>>2]=I}else{I=a[z]|0;K=I&255;if((K&1|0)==0){X=K>>>1}else{X=c[C>>2]|0}do{if((X|0)==0){Y=W;Z=0;_=0;$=-1}else{if((I&1)<<24>>24==0){aa=A}else{aa=c[B>>2]|0}Y=W;Z=0;_=0;$=a[aa]<<24>>24;break}}while(0);while(1){do{if((Z|0)==($|0)){I=c[e>>2]|0;c[e>>2]=I+4|0;c[I>>2]=m;I=_+1|0;K=a[z]|0;H=K&255;if((H&1|0)==0){ab=H>>>1}else{ab=c[C>>2]|0}if(I>>>0>=ab>>>0){ac=$;ad=I;ae=0;break}H=(K&1)<<24>>24==0;if(H){af=A}else{af=c[B>>2]|0}if(a[af+I|0]<<24>>24==127){ac=-1;ad=I;ae=0;break}if(H){ag=A}else{ag=c[B>>2]|0}ac=a[ag+I|0]<<24>>24;ad=I;ae=0}else{ac=$;ad=_;ae=Z}}while(0);I=Y-4|0;H=c[I>>2]|0;K=c[e>>2]|0;c[e>>2]=K+4|0;c[K>>2]=H;if((I|0)==(F|0)){break L3593}else{Y=I;Z=ae+1|0;_=ad;$=ac}}}}while(0);G=c[e>>2]|0;if((E|0)==(G|0)){ah=F;break}I=G-4|0;if(E>>>0<I>>>0){ai=E;aj=I}else{ah=F;break}while(1){I=c[ai>>2]|0;c[ai>>2]=c[aj>>2]|0;c[aj>>2]=I;I=ai+4|0;G=aj-4|0;if(I>>>0<G>>>0){ai=I;aj=G}else{ah=F;break L3573}}}else if((D|0)==0){c[d>>2]=c[e>>2]|0;ah=n}else if((D|0)==1){c[d>>2]=c[e>>2]|0;F=ca[c[(c[r>>2]|0)+44>>2]&1023](i,32)|0;E=c[e>>2]|0;c[e>>2]=E+4|0;c[E>>2]=F;ah=n}else if((D|0)==2){F=a[p]|0;E=F&255;G=(E&1|0)==0;if(G){ak=E>>>1}else{ak=c[w>>2]|0}if((ak|0)==0|v){ah=n;break}if((F&1)<<24>>24==0){al=w;am=w;an=w}else{F=c[x>>2]|0;al=F;am=F;an=F}if(G){ao=E>>>1}else{ao=c[w>>2]|0}E=al+(ao<<2)|0;G=c[e>>2]|0;if((am|0)==(E|0)){ap=G}else{F=((al+(ao-1<<2)|0)+(-an|0)|0)>>>2;I=am;H=G;while(1){c[H>>2]=c[I>>2]|0;K=I+4|0;if((K|0)==(E|0)){break}I=K;H=H+4|0}ap=G+(F+1<<2)|0}c[e>>2]=ap;ah=n}else if((D|0)==3){H=a[s]|0;I=H&255;if((I&1|0)==0){aq=I>>>1}else{aq=c[t>>2]|0}if((aq|0)==0){ah=n;break}if((H&1)<<24>>24==0){ar=t}else{ar=c[u>>2]|0}H=c[ar>>2]|0;I=c[e>>2]|0;c[e>>2]=I+4|0;c[I>>2]=H;ah=n}else{ah=n}}while(0);D=g+1|0;if((D|0)==4){break}else{n=ah;g=D}}g=a[s]|0;s=g&255;ah=(s&1|0)==0;if(ah){as=s>>>1}else{as=c[t>>2]|0}if(as>>>0>1){if((g&1)<<24>>24==0){at=t;au=t;av=t}else{g=c[u>>2]|0;at=g;au=g;av=g}if(ah){aw=s>>>1}else{aw=c[t>>2]|0}t=at+(aw<<2)|0;s=c[e>>2]|0;ah=au+4|0;if((ah|0)==(t|0)){ax=s}else{au=(((at+(aw-2<<2)|0)+(-av|0)|0)>>>2)+1|0;av=s;aw=ah;while(1){c[av>>2]=c[aw>>2]|0;ah=aw+4|0;if((ah|0)==(t|0)){break}else{av=av+4|0;aw=ah}}ax=s+(au<<2)|0}c[e>>2]=ax}ax=f&176;if((ax|0)==32){c[d>>2]=c[e>>2]|0;return}else if((ax|0)==16){return}else{c[d>>2]=b;return}}function hq(a){a=a|0;return}function hr(a){a=a|0;return}function hs(a){a=a|0;jM(a);return}function ht(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((a[d]&1)<<24>>24==0){f=d+1|0}else{f=c[d+8>>2]|0}d=bb(f|0,200)|0;return d>>>(((d|0)!=-1&1)>>>0)|0}function hu(a,b){a=a|0;b=b|0;a4(((b|0)==-1?-1:b<<1)|0);return}function hv(a){a=a|0;jM(a);return}function hw(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;if((a[d]&1)<<24>>24==0){f=d+1|0}else{f=c[d+8>>2]|0}d=bb(f|0,200)|0;return d>>>(((d|0)!=-1&1)>>>0)|0}function hx(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0;e=i;i=i+40|0;l=f;f=i;i=i+4|0;c[f>>2]=c[l>>2]|0;l=e|0;m=e+12|0;n=e+16|0;o=e+20|0;p=e+24|0;q=e+28|0;r=q;s=i;i=i+12|0;t=s;u=i;i=i+12|0;v=u;w=i;i=i+4|0;x=i;i=i+400|0;y=i;i=i+4|0;z=i;i=i+4|0;A=i;i=i+4|0;B=m|0;C=c[h+28>>2]|0;c[B>>2]=C;D=C+4|0;G=c[D>>2]|0,c[D>>2]=G+1,G;D=c[B>>2]|0;if((c[1313735]|0)!=-1){c[l>>2]=5254940;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254940,l,252)}l=(c[1313736]|0)-1|0;C=c[D+8>>2]|0;do{if((c[D+12>>2]|0)-C>>2>>>0>l>>>0){E=c[C+(l<<2)>>2]|0;if((E|0)==0){break}F=E;H=k;I=a[H]|0;J=I&255;if((J&1|0)==0){K=J>>>1}else{K=c[k+4>>2]|0}if((K|0)==0){L=0}else{if((I&1)<<24>>24==0){M=k+4|0}else{M=c[k+8>>2]|0}I=c[M>>2]|0;L=(I|0)==(ca[c[(c[E>>2]|0)+44>>2]&1023](F,45)|0)}jS(r|0,0,12);jS(t|0,0,12);jS(v|0,0,12);ho(g,L,m,n,o,p,q,s,u,w);E=x|0;I=a[H]|0;J=I&255;N=(J&1|0)==0;if(N){O=J>>>1}else{O=c[k+4>>2]|0}P=c[w>>2]|0;if((O|0)>(P|0)){if(N){Q=J>>>1}else{Q=c[k+4>>2]|0}J=d[v]|0;if((J&1|0)==0){R=J>>>1}else{R=c[u+4>>2]|0}J=d[t]|0;if((J&1|0)==0){S=J>>>1}else{S=c[s+4>>2]|0}T=((Q-P<<1|1)+R|0)+S|0}else{J=d[v]|0;if((J&1|0)==0){U=J>>>1}else{U=c[u+4>>2]|0}J=d[t]|0;if((J&1|0)==0){V=J>>>1}else{V=c[s+4>>2]|0}T=(U+2|0)+V|0}J=T+P|0;do{if(J>>>0>100){N=jD(J<<2)|0;W=N;if((N|0)!=0){X=W;Y=W;Z=a[H]|0;break}W=bQ(4)|0;c[W>>2]=5247480;bo(W|0,5252704,66)}else{X=E;Y=0;Z=I}}while(0);if((Z&1)<<24>>24==0){_=k+4|0;$=k+4|0}else{I=c[k+8>>2]|0;_=I;$=I}I=Z&255;if((I&1|0)==0){aa=I>>>1}else{aa=c[k+4>>2]|0}hp(X,y,z,c[h+4>>2]|0,$,_+(aa<<2)|0,F,L,n,c[o>>2]|0,c[p>>2]|0,q,s,u,P);c[A>>2]=c[f>>2]|0;fF(b,A,X,c[y>>2]|0,c[z>>2]|0,h,j);if((Y|0)!=0){jE(Y)}if((a[v]&1)<<24>>24!=0){jM(c[u+8>>2]|0)}if((a[t]&1)<<24>>24!=0){jM(c[s+8>>2]|0)}if((a[r]&1)<<24>>24!=0){jM(c[q+8>>2]|0)}I=c[B>>2]|0;E=I+4|0;if(((G=c[E>>2]|0,c[E>>2]=G+ -1,G)|0)!=0){i=e;return}b_[c[(c[I>>2]|0)+8>>2]&1023](I|0);i=e;return}}while(0);e=bQ(4)|0;c[e>>2]=5247504;bo(e|0,5252716,512)}function hy(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0;d=i;i=i+12|0;j=d|0;k=j;jS(k|0,0,12);l=b;m=h;n=a[h]|0;if((n&1)<<24>>24==0){o=m+1|0;p=m+1|0}else{m=c[h+8>>2]|0;o=m;p=m}m=n&255;if((m&1|0)==0){q=m>>>1}else{q=c[h+4>>2]|0}h=o+q|0;do{if(p>>>0<h>>>0){q=j+1|0;o=j+8|0;m=j|0;n=j+4|0;r=p;s=0;while(1){t=a[r]|0;if((s&1)<<24>>24==0){u=10;v=s}else{w=c[m>>2]|0;u=(w&-2)-1|0;v=w&255}w=v&255;x=(w&1|0)==0?w>>>1:c[n>>2]|0;if((x|0)==(u|0)){if((u|0)==-3){y=3195;break}w=(v&1)<<24>>24==0?q:c[o>>2]|0;do{if(u>>>0<2147483631){z=u+1|0;A=u<<1;B=z>>>0<A>>>0?A:z;if(B>>>0<11){C=11;break}C=B+16&-16}else{C=-2}}while(0);B=jJ(C)|0;jT(B|0,w|0,u|0);if((u|0)!=10){jM(w)}c[o>>2]=B;B=C|1;c[m>>2]=B;D=B&255}else{D=v}B=(D&1)<<24>>24==0?q:c[o>>2]|0;a[B+x|0]=t;z=x+1|0;a[B+z|0]=0;B=a[k]|0;if((B&1)<<24>>24==0){A=z<<1&255;a[k]=A;E=A}else{c[n>>2]=z;E=B}B=r+1|0;if(B>>>0<h>>>0){r=B;s=E}else{y=3208;break}}if((y|0)==3195){dp(0)}else if((y|0)==3208){s=(e|0)==-1?-1:e<<1;if((E&1)<<24>>24==0){F=s;y=3213;break}G=c[j+8>>2]|0;H=s;break}}else{F=(e|0)==-1?-1:e<<1;y=3213;break}}while(0);if((y|0)==3213){G=j+1|0;H=F}F=bN(H|0,f|0,g|0,G|0)|0;jS(l|0,0,12);G=jV(F|0)|0;g=F+G|0;L3827:do{if((G|0)>0){f=b+1|0;H=b+4|0;y=b+8|0;e=b|0;E=F;h=0;while(1){D=a[E]|0;if((h&1)<<24>>24==0){I=10;J=h}else{v=c[e>>2]|0;I=(v&-2)-1|0;J=v&255}v=J&255;if((v&1|0)==0){K=v>>>1}else{K=c[H>>2]|0}if((K|0)==(I|0)){dJ(b,I,1,I,I,0,0);L=a[l]|0}else{L=J}if((L&1)<<24>>24==0){M=f}else{M=c[y>>2]|0}a[M+K|0]=D;D=K+1|0;a[M+D|0]=0;v=a[l]|0;if((v&1)<<24>>24==0){C=D<<1&255;a[l]=C;N=C}else{c[H>>2]=D;N=v}v=E+1|0;if(v>>>0<g>>>0){E=v;h=N}else{break L3827}}}}while(0);if((a[k]&1)<<24>>24==0){i=d;return}jM(c[j+8>>2]|0);i=d;return}function hz(a,b){a=a|0;b=b|0;a4(((b|0)==-1?-1:b<<1)|0);return}function hA(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;d=i;i=i+204|0;j=d|0;k=d+8|0;l=d+40|0;m=d+44|0;n=d+48|0;o=d+56|0;p=d+184|0;q=d+188|0;r=d+192|0;s=r;t=i;i=i+8|0;u=i;i=i+8|0;jS(s|0,0,12);v=b;w=t|0;c[t+4>>2]=0;c[t>>2]=5248960;x=a[h]|0;if((x&1)<<24>>24==0){y=h+4|0;z=h+4|0}else{A=c[h+8>>2]|0;y=A;z=A}A=x&255;if((A&1|0)==0){B=A>>>1}else{B=c[h+4>>2]|0}h=y+(B<<2)|0;do{if(z>>>0<h>>>0){B=t;y=k|0;A=k+32|0;x=r+1|0;C=r+8|0;D=r|0;E=r+4|0;F=z;G=5248960;L13:while(1){c[m>>2]=F;H=(b6[c[G+12>>2]&1023](w,j,F,h,m,y,A,l)|0)==2;if(H|(c[m>>2]|0)==(F|0)){g4(5243716)}L19:do{if(y>>>0<(c[l>>2]|0)>>>0){I=y;J=a[s]|0;while(1){K=a[I]|0;if((J&1)<<24>>24==0){L=10;M=J}else{N=c[D>>2]|0;L=(N&-2)-1|0;M=N&255}N=M&255;O=(N&1|0)==0?N>>>1:c[E>>2]|0;if((O|0)==(L|0)){if((L|0)==-3){P=20;break L13}N=(M&1)<<24>>24==0?x:c[C>>2]|0;do{if(L>>>0<2147483631){Q=L+1|0;R=L<<1;S=Q>>>0<R>>>0?R:Q;if(S>>>0<11){T=11;break}T=S+16&-16}else{T=-2}}while(0);S=jJ(T)|0;jT(S|0,N|0,L|0);if((L|0)!=10){jM(N)}c[C>>2]=S;S=T|1;c[D>>2]=S;U=S&255}else{U=M}S=(U&1)<<24>>24==0?x:c[C>>2]|0;a[S+O|0]=K;Q=O+1|0;a[S+Q|0]=0;S=a[s]|0;if((S&1)<<24>>24==0){R=Q<<1&255;a[s]=R;V=R}else{c[E>>2]=Q;V=S}S=I+1|0;if(S>>>0<(c[l>>2]|0)>>>0){I=S;J=V}else{break L19}}}}while(0);J=c[m>>2]|0;if(J>>>0>=h>>>0|H){P=35;break}F=J;G=c[B>>2]|0}if((P|0)==20){dp(0)}else if((P|0)==35){B=(e|0)==-1?-1:e<<1;if((a[s]&1)<<24>>24==0){W=B;P=42;break}X=c[r+8>>2]|0;Y=B;break}}else{W=(e|0)==-1?-1:e<<1;P=42;break}}while(0);if((P|0)==42){X=r+1|0;Y=W}W=bN(Y|0,f|0,g|0,X|0)|0;jS(v|0,0,12);X=u|0;c[u+4>>2]=0;c[u>>2]=5248908;g=jV(W|0)|0;f=W+g|0;L53:do{if((g|0)>=1){Y=u;P=f;e=o|0;h=o+128|0;m=b+4|0;V=b+8|0;l=b|0;U=W;M=5248908;while(1){c[q>>2]=U;T=(b6[c[M+16>>2]&1023](X,n,U,(P-U|0)>32?U+32|0:f,q,e,h,p)|0)==2;if(T|(c[q>>2]|0)==(U|0)){g4(5243716)}L61:do{if(e>>>0<(c[p>>2]|0)>>>0){L=e;j=a[v]|0;while(1){w=c[L>>2]|0;if((j&1)<<24>>24==0){Z=1;_=j}else{z=c[l>>2]|0;Z=(z&-2)-1|0;_=z&255}z=_&255;if((z&1|0)==0){$=z>>>1}else{$=c[m>>2]|0}if(($|0)==(Z|0)){dM(b,Z,1,Z,Z,0,0);aa=a[v]|0}else{aa=_}if((aa&1)<<24>>24==0){ab=m}else{ab=c[V>>2]|0}c[ab+($<<2)>>2]=w;w=$+1|0;c[ab+(w<<2)>>2]=0;z=a[v]|0;if((z&1)<<24>>24==0){k=w<<1&255;a[v]=k;ac=k}else{c[m>>2]=w;ac=z}z=L+4|0;if(z>>>0<(c[p>>2]|0)>>>0){L=z;j=ac}else{break L61}}}}while(0);H=c[q>>2]|0;if(H>>>0>=f>>>0|T){break L53}U=H;M=c[Y>>2]|0}}}while(0);if((a[s]&1)<<24>>24==0){i=d;return}jM(c[r+8>>2]|0);i=d;return}function hB(a){a=a|0;var b=0;c[a>>2]=5248484;b=c[a+8>>2]|0;if((b|0)==0){return}ba(b|0);return}function hC(a){a=a|0;var b=0,d=0,e=0;a=bQ(8)|0;c[a>>2]=5247576;b=a+4|0;if((b|0)!=0){d=jK(19)|0;c[d+4>>2]=6;c[d>>2]=6;e=d+12|0;c[b>>2]=e;c[d+8>>2]=0;jT(e|0,5244072,7)}c[a>>2]=5247552;bo(a|0,5252740,248)}function hD(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0;e=i;i=i+336|0;f=e|0;g=e+12|0;h=e+24|0;j=e+36|0;k=e+48|0;l=e+60|0;m=e+72|0;n=e+84|0;o=e+96|0;p=e+108|0;q=e+120|0;r=e+132|0;s=e+144|0;t=e+156|0;u=e+168|0;v=e+180|0;w=e+192|0;x=e+204|0;y=e+216|0;z=e+228|0;A=e+240|0;B=e+252|0;C=e+264|0;D=e+276|0;E=e+288|0;F=e+300|0;H=e+312|0;I=e+324|0;c[b+4>>2]=d-1|0;c[b>>2]=5248716;d=b+8|0;J=d|0;K=b+12|0;a[b+132|0]=1;L=b+20|0;M=L;c[K>>2]=M;c[J>>2]=M;c[b+16>>2]=L+112|0;L=28;N=M;while(1){if((N|0)==0){O=0}else{c[N>>2]=0;O=c[K>>2]|0}P=O+4|0;c[K>>2]=P;M=L-1|0;if((M|0)==0){break}else{L=M;N=P}}N=b+136|0;b=N;a[N]=2;a[b+1|0]=67;a[b+2|0]=0;b=c[J>>2]|0;if((b|0)!=(P|0)){c[K>>2]=O+(-((O+(-b|0)|0)>>>2)<<2)|0}c[1311702]=0;c[1311701]=5248448;if((c[1313661]|0)!=-1){c[I>>2]=5254644;c[I+4>>2]=24;c[I+8>>2]=0;dn(5254644,I,252)}I=c[1313662]|0;b=I-1|0;G=c[1311702]|0,c[1311702]=G+1,G;O=c[K>>2]|0;P=c[J>>2]|0;N=O-P>>2;do{if(N>>>0>b>>>0){Q=P}else{if(N>>>0<I>>>0){js(d,I-N|0);Q=c[J>>2]|0;break}if(N>>>0<=I>>>0){Q=P;break}L=P+(I<<2)|0;if((L|0)==(O|0)){Q=P;break}c[K>>2]=O+((((O-4|0)+(-L|0)|0)>>>2^-1)<<2)|0;Q=P}}while(0);P=c[Q+(b<<2)>>2]|0;do{if((P|0)!=0){Q=P+4|0;if(((G=c[Q>>2]|0,c[Q>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[P>>2]|0)+8>>2]&1023](P|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246804;c[1311700]=0;c[1311699]=5248412;if((c[1313659]|0)!=-1){c[H>>2]=5254636;c[H+4>>2]=24;c[H+8>>2]=0;dn(5254636,H,252)}H=c[1313660]|0;b=H-1|0;G=c[1311700]|0,c[1311700]=G+1,G;P=c[K>>2]|0;Q=c[J>>2]|0;O=P-Q>>2;do{if(O>>>0>b>>>0){R=Q}else{if(O>>>0<H>>>0){js(d,H-O|0);R=c[J>>2]|0;break}if(O>>>0<=H>>>0){R=Q;break}I=Q+(H<<2)|0;if((I|0)==(P|0)){R=Q;break}c[K>>2]=P+((((P-4|0)+(-I|0)|0)>>>2^-1)<<2)|0;R=Q}}while(0);Q=c[R+(b<<2)>>2]|0;do{if((Q|0)!=0){R=Q+4|0;if(((G=c[R>>2]|0,c[R>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[Q>>2]|0)+8>>2]&1023](Q|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246796;c[1311752]=0;c[1311751]=5248812;c[1311753]=0;a[5247016]=0;c[1311753]=c[a9()>>2]|0;if((c[1313737]|0)!=-1){c[F>>2]=5254948;c[F+4>>2]=24;c[F+8>>2]=0;dn(5254948,F,252)}F=c[1313738]|0;b=F-1|0;G=c[1311752]|0,c[1311752]=G+1,G;Q=c[K>>2]|0;R=c[J>>2]|0;P=Q-R>>2;do{if(P>>>0>b>>>0){S=R}else{if(P>>>0<F>>>0){js(d,F-P|0);S=c[J>>2]|0;break}if(P>>>0<=F>>>0){S=R;break}H=R+(F<<2)|0;if((H|0)==(Q|0)){S=R;break}c[K>>2]=Q+((((Q-4|0)+(-H|0)|0)>>>2^-1)<<2)|0;S=R}}while(0);R=c[S+(b<<2)>>2]|0;do{if((R|0)!=0){S=R+4|0;if(((G=c[S>>2]|0,c[S>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[R>>2]|0)+8>>2]&1023](R|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5247004;c[1311750]=0;c[1311749]=5248740;if((c[1313735]|0)!=-1){c[E>>2]=5254940;c[E+4>>2]=24;c[E+8>>2]=0;dn(5254940,E,252)}E=c[1313736]|0;b=E-1|0;G=c[1311750]|0,c[1311750]=G+1,G;R=c[K>>2]|0;S=c[J>>2]|0;Q=R-S>>2;do{if(Q>>>0>b>>>0){T=S}else{if(Q>>>0<E>>>0){js(d,E-Q|0);T=c[J>>2]|0;break}if(Q>>>0<=E>>>0){T=S;break}F=S+(E<<2)|0;if((F|0)==(R|0)){T=S;break}c[K>>2]=R+((((R-4|0)+(-F|0)|0)>>>2^-1)<<2)|0;T=S}}while(0);S=c[T+(b<<2)>>2]|0;do{if((S|0)!=0){T=S+4|0;if(((G=c[T>>2]|0,c[T>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[S>>2]|0)+8>>2]&1023](S|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246996;c[1311707]=0;c[1311706]=5248536;if((c[1313665]|0)!=-1){c[D>>2]=5254660;c[D+4>>2]=24;c[D+8>>2]=0;dn(5254660,D,252)}D=c[1313666]|0;b=D-1|0;G=c[1311707]|0,c[1311707]=G+1,G;S=c[K>>2]|0;T=c[J>>2]|0;R=S-T>>2;do{if(R>>>0>b>>>0){U=T}else{if(R>>>0<D>>>0){js(d,D-R|0);U=c[J>>2]|0;break}if(R>>>0<=D>>>0){U=T;break}E=T+(D<<2)|0;if((E|0)==(S|0)){U=T;break}c[K>>2]=S+((((S-4|0)+(-E|0)|0)>>>2^-1)<<2)|0;U=T}}while(0);T=c[U+(b<<2)>>2]|0;do{if((T|0)!=0){U=T+4|0;if(((G=c[U>>2]|0,c[U>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[T>>2]|0)+8>>2]&1023](T|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246824;c[1311704]=0;c[1311703]=5248484;c[1311705]=0;if((c[1313663]|0)!=-1){c[C>>2]=5254652;c[C+4>>2]=24;c[C+8>>2]=0;dn(5254652,C,252)}C=c[1313664]|0;b=C-1|0;G=c[1311704]|0,c[1311704]=G+1,G;T=c[K>>2]|0;U=c[J>>2]|0;S=T-U>>2;do{if(S>>>0>b>>>0){V=U}else{if(S>>>0<C>>>0){js(d,C-S|0);V=c[J>>2]|0;break}if(S>>>0<=C>>>0){V=U;break}D=U+(C<<2)|0;if((D|0)==(T|0)){V=U;break}c[K>>2]=T+((((T-4|0)+(-D|0)|0)>>>2^-1)<<2)|0;V=U}}while(0);U=c[V+(b<<2)>>2]|0;do{if((U|0)!=0){V=U+4|0;if(((G=c[V>>2]|0,c[V>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[U>>2]|0)+8>>2]&1023](U|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246812;c[1311709]=0;c[1311708]=5248588;if((c[1313667]|0)!=-1){c[B>>2]=5254668;c[B+4>>2]=24;c[B+8>>2]=0;dn(5254668,B,252)}B=c[1313668]|0;b=B-1|0;G=c[1311709]|0,c[1311709]=G+1,G;U=c[K>>2]|0;V=c[J>>2]|0;T=U-V>>2;do{if(T>>>0>b>>>0){W=V}else{if(T>>>0<B>>>0){js(d,B-T|0);W=c[J>>2]|0;break}if(T>>>0<=B>>>0){W=V;break}C=V+(B<<2)|0;if((C|0)==(U|0)){W=V;break}c[K>>2]=U+((((U-4|0)+(-C|0)|0)>>>2^-1)<<2)|0;W=V}}while(0);V=c[W+(b<<2)>>2]|0;do{if((V|0)!=0){W=V+4|0;if(((G=c[W>>2]|0,c[W>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[V>>2]|0)+8>>2]&1023](V|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246832;c[1311711]=0;c[1311710]=5248640;if((c[1313669]|0)!=-1){c[A>>2]=5254676;c[A+4>>2]=24;c[A+8>>2]=0;dn(5254676,A,252)}A=c[1313670]|0;b=A-1|0;G=c[1311711]|0,c[1311711]=G+1,G;V=c[K>>2]|0;W=c[J>>2]|0;U=V-W>>2;do{if(U>>>0>b>>>0){X=W}else{if(U>>>0<A>>>0){js(d,A-U|0);X=c[J>>2]|0;break}if(U>>>0<=A>>>0){X=W;break}B=W+(A<<2)|0;if((B|0)==(V|0)){X=W;break}c[K>>2]=V+((((V-4|0)+(-B|0)|0)>>>2^-1)<<2)|0;X=W}}while(0);W=c[X+(b<<2)>>2]|0;do{if((W|0)!=0){X=W+4|0;if(((G=c[X>>2]|0,c[X>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[W>>2]|0)+8>>2]&1023](W|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246840;c[1311682]=0;c[1311681]=5248004;a[5246732]=46;a[5246733]=44;jS(5246736,0,12);if((c[1313645]|0)!=-1){c[z>>2]=5254580;c[z+4>>2]=24;c[z+8>>2]=0;dn(5254580,z,252)}z=c[1313646]|0;b=z-1|0;G=c[1311682]|0,c[1311682]=G+1,G;W=c[K>>2]|0;X=c[J>>2]|0;V=W-X>>2;do{if(V>>>0>b>>>0){Y=X}else{if(V>>>0<z>>>0){js(d,z-V|0);Y=c[J>>2]|0;break}if(V>>>0<=z>>>0){Y=X;break}A=X+(z<<2)|0;if((A|0)==(W|0)){Y=X;break}c[K>>2]=W+((((W-4|0)+(-A|0)|0)>>>2^-1)<<2)|0;Y=X}}while(0);X=c[Y+(b<<2)>>2]|0;do{if((X|0)!=0){Y=X+4|0;if(((G=c[Y>>2]|0,c[Y>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[X>>2]|0)+8>>2]&1023](X|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246724;c[1311675]=0;c[1311674]=5247960;c[1311676]=46;c[1311677]=44;jS(5246712,0,12);if((c[1313643]|0)!=-1){c[y>>2]=5254572;c[y+4>>2]=24;c[y+8>>2]=0;dn(5254572,y,252)}y=c[1313644]|0;b=y-1|0;G=c[1311675]|0,c[1311675]=G+1,G;X=c[K>>2]|0;Y=c[J>>2]|0;W=X-Y>>2;do{if(W>>>0>b>>>0){Z=Y}else{if(W>>>0<y>>>0){js(d,y-W|0);Z=c[J>>2]|0;break}if(W>>>0<=y>>>0){Z=Y;break}z=Y+(y<<2)|0;if((z|0)==(X|0)){Z=Y;break}c[K>>2]=X+((((X-4|0)+(-z|0)|0)>>>2^-1)<<2)|0;Z=Y}}while(0);Y=c[Z+(b<<2)>>2]|0;do{if((Y|0)!=0){Z=Y+4|0;if(((G=c[Z>>2]|0,c[Z>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[Y>>2]|0)+8>>2]&1023](Y|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246696;c[1311698]=0;c[1311697]=5248344;if((c[1313657]|0)!=-1){c[x>>2]=5254628;c[x+4>>2]=24;c[x+8>>2]=0;dn(5254628,x,252)}x=c[1313658]|0;b=x-1|0;G=c[1311698]|0,c[1311698]=G+1,G;Y=c[K>>2]|0;Z=c[J>>2]|0;X=Y-Z>>2;do{if(X>>>0>b>>>0){_=Z}else{if(X>>>0<x>>>0){js(d,x-X|0);_=c[J>>2]|0;break}if(X>>>0<=x>>>0){_=Z;break}y=Z+(x<<2)|0;if((y|0)==(Y|0)){_=Z;break}c[K>>2]=Y+((((Y-4|0)+(-y|0)|0)>>>2^-1)<<2)|0;_=Z}}while(0);Z=c[_+(b<<2)>>2]|0;do{if((Z|0)!=0){_=Z+4|0;if(((G=c[_>>2]|0,c[_>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[Z>>2]|0)+8>>2]&1023](Z|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246788;c[1311696]=0;c[1311695]=5248276;if((c[1313655]|0)!=-1){c[w>>2]=5254620;c[w+4>>2]=24;c[w+8>>2]=0;dn(5254620,w,252)}w=c[1313656]|0;b=w-1|0;G=c[1311696]|0,c[1311696]=G+1,G;Z=c[K>>2]|0;_=c[J>>2]|0;Y=Z-_>>2;do{if(Y>>>0>b>>>0){$=_}else{if(Y>>>0<w>>>0){js(d,w-Y|0);$=c[J>>2]|0;break}if(Y>>>0<=w>>>0){$=_;break}x=_+(w<<2)|0;if((x|0)==(Z|0)){$=_;break}c[K>>2]=Z+((((Z-4|0)+(-x|0)|0)>>>2^-1)<<2)|0;$=_}}while(0);_=c[$+(b<<2)>>2]|0;do{if((_|0)!=0){$=_+4|0;if(((G=c[$>>2]|0,c[$>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[_>>2]|0)+8>>2]&1023](_|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246780;c[1311694]=0;c[1311693]=5248220;if((c[1313653]|0)!=-1){c[v>>2]=5254612;c[v+4>>2]=24;c[v+8>>2]=0;dn(5254612,v,252)}v=c[1313654]|0;b=v-1|0;G=c[1311694]|0,c[1311694]=G+1,G;_=c[K>>2]|0;$=c[J>>2]|0;Z=_-$>>2;do{if(Z>>>0>b>>>0){aa=$}else{if(Z>>>0<v>>>0){js(d,v-Z|0);aa=c[J>>2]|0;break}if(Z>>>0<=v>>>0){aa=$;break}w=$+(v<<2)|0;if((w|0)==(_|0)){aa=$;break}c[K>>2]=_+((((_-4|0)+(-w|0)|0)>>>2^-1)<<2)|0;aa=$}}while(0);$=c[aa+(b<<2)>>2]|0;do{if(($|0)!=0){aa=$+4|0;if(((G=c[aa>>2]|0,c[aa>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[$>>2]|0)+8>>2]&1023]($|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246772;c[1311692]=0;c[1311691]=5248164;if((c[1313651]|0)!=-1){c[u>>2]=5254604;c[u+4>>2]=24;c[u+8>>2]=0;dn(5254604,u,252)}u=c[1313652]|0;b=u-1|0;G=c[1311692]|0,c[1311692]=G+1,G;$=c[K>>2]|0;aa=c[J>>2]|0;_=$-aa>>2;do{if(_>>>0>b>>>0){ab=aa}else{if(_>>>0<u>>>0){js(d,u-_|0);ab=c[J>>2]|0;break}if(_>>>0<=u>>>0){ab=aa;break}v=aa+(u<<2)|0;if((v|0)==($|0)){ab=aa;break}c[K>>2]=$+(((($-4|0)+(-v|0)|0)>>>2^-1)<<2)|0;ab=aa}}while(0);aa=c[ab+(b<<2)>>2]|0;do{if((aa|0)!=0){ab=aa+4|0;if(((G=c[ab>>2]|0,c[ab>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[aa>>2]|0)+8>>2]&1023](aa|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246764;c[1311762]=0;c[1311761]=5249664;if((c[1313862]|0)!=-1){c[t>>2]=5255448;c[t+4>>2]=24;c[t+8>>2]=0;dn(5255448,t,252)}t=c[1313863]|0;b=t-1|0;G=c[1311762]|0,c[1311762]=G+1,G;aa=c[K>>2]|0;ab=c[J>>2]|0;$=aa-ab>>2;do{if($>>>0>b>>>0){ac=ab}else{if($>>>0<t>>>0){js(d,t-$|0);ac=c[J>>2]|0;break}if($>>>0<=t>>>0){ac=ab;break}u=ab+(t<<2)|0;if((u|0)==(aa|0)){ac=ab;break}c[K>>2]=aa+((((aa-4|0)+(-u|0)|0)>>>2^-1)<<2)|0;ac=ab}}while(0);ab=c[ac+(b<<2)>>2]|0;do{if((ab|0)!=0){ac=ab+4|0;if(((G=c[ac>>2]|0,c[ac>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ab>>2]|0)+8>>2]&1023](ab|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5247044;c[1311760]=0;c[1311759]=5249604;if((c[1313860]|0)!=-1){c[s>>2]=5255440;c[s+4>>2]=24;c[s+8>>2]=0;dn(5255440,s,252)}s=c[1313861]|0;b=s-1|0;G=c[1311760]|0,c[1311760]=G+1,G;ab=c[K>>2]|0;ac=c[J>>2]|0;aa=ab-ac>>2;do{if(aa>>>0>b>>>0){ad=ac}else{if(aa>>>0<s>>>0){js(d,s-aa|0);ad=c[J>>2]|0;break}if(aa>>>0<=s>>>0){ad=ac;break}t=ac+(s<<2)|0;if((t|0)==(ab|0)){ad=ac;break}c[K>>2]=ab+((((ab-4|0)+(-t|0)|0)>>>2^-1)<<2)|0;ad=ac}}while(0);ac=c[ad+(b<<2)>>2]|0;do{if((ac|0)!=0){ad=ac+4|0;if(((G=c[ad>>2]|0,c[ad>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ac>>2]|0)+8>>2]&1023](ac|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5247036;c[1311758]=0;c[1311757]=5249544;if((c[1313858]|0)!=-1){c[r>>2]=5255432;c[r+4>>2]=24;c[r+8>>2]=0;dn(5255432,r,252)}r=c[1313859]|0;b=r-1|0;G=c[1311758]|0,c[1311758]=G+1,G;ac=c[K>>2]|0;ad=c[J>>2]|0;ab=ac-ad>>2;do{if(ab>>>0>b>>>0){ae=ad}else{if(ab>>>0<r>>>0){js(d,r-ab|0);ae=c[J>>2]|0;break}if(ab>>>0<=r>>>0){ae=ad;break}s=ad+(r<<2)|0;if((s|0)==(ac|0)){ae=ad;break}c[K>>2]=ac+((((ac-4|0)+(-s|0)|0)>>>2^-1)<<2)|0;ae=ad}}while(0);ad=c[ae+(b<<2)>>2]|0;do{if((ad|0)!=0){ae=ad+4|0;if(((G=c[ae>>2]|0,c[ae>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ad>>2]|0)+8>>2]&1023](ad|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5247028;c[1311756]=0;c[1311755]=5249484;if((c[1313856]|0)!=-1){c[q>>2]=5255424;c[q+4>>2]=24;c[q+8>>2]=0;dn(5255424,q,252)}q=c[1313857]|0;b=q-1|0;G=c[1311756]|0,c[1311756]=G+1,G;ad=c[K>>2]|0;ae=c[J>>2]|0;ac=ad-ae>>2;do{if(ac>>>0>b>>>0){af=ae}else{if(ac>>>0<q>>>0){js(d,q-ac|0);af=c[J>>2]|0;break}if(ac>>>0<=q>>>0){af=ae;break}r=ae+(q<<2)|0;if((r|0)==(ad|0)){af=ae;break}c[K>>2]=ad+((((ad-4|0)+(-r|0)|0)>>>2^-1)<<2)|0;af=ae}}while(0);ae=c[af+(b<<2)>>2]|0;do{if((ae|0)!=0){af=ae+4|0;if(((G=c[af>>2]|0,c[af>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ae>>2]|0)+8>>2]&1023](ae|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5247020;c[1311661]=0;c[1311660]=5247696;if((c[1313633]|0)!=-1){c[p>>2]=5254532;c[p+4>>2]=24;c[p+8>>2]=0;dn(5254532,p,252)}p=c[1313634]|0;b=p-1|0;G=c[1311661]|0,c[1311661]=G+1,G;ae=c[K>>2]|0;af=c[J>>2]|0;ad=ae-af>>2;do{if(ad>>>0>b>>>0){ag=af}else{if(ad>>>0<p>>>0){js(d,p-ad|0);ag=c[J>>2]|0;break}if(ad>>>0<=p>>>0){ag=af;break}q=af+(p<<2)|0;if((q|0)==(ae|0)){ag=af;break}c[K>>2]=ae+((((ae-4|0)+(-q|0)|0)>>>2^-1)<<2)|0;ag=af}}while(0);af=c[ag+(b<<2)>>2]|0;do{if((af|0)!=0){ag=af+4|0;if(((G=c[ag>>2]|0,c[ag>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[af>>2]|0)+8>>2]&1023](af|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246640;c[1311659]=0;c[1311658]=5247664;if((c[1313631]|0)!=-1){c[o>>2]=5254524;c[o+4>>2]=24;c[o+8>>2]=0;dn(5254524,o,252)}o=c[1313632]|0;b=o-1|0;G=c[1311659]|0,c[1311659]=G+1,G;af=c[K>>2]|0;ag=c[J>>2]|0;ae=af-ag>>2;do{if(ae>>>0>b>>>0){ah=ag}else{if(ae>>>0<o>>>0){js(d,o-ae|0);ah=c[J>>2]|0;break}if(ae>>>0<=o>>>0){ah=ag;break}p=ag+(o<<2)|0;if((p|0)==(af|0)){ah=ag;break}c[K>>2]=af+((((af-4|0)+(-p|0)|0)>>>2^-1)<<2)|0;ah=ag}}while(0);ag=c[ah+(b<<2)>>2]|0;do{if((ag|0)!=0){ah=ag+4|0;if(((G=c[ah>>2]|0,c[ah>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ag>>2]|0)+8>>2]&1023](ag|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246632;c[1311657]=0;c[1311656]=5247632;if((c[1313629]|0)!=-1){c[n>>2]=5254516;c[n+4>>2]=24;c[n+8>>2]=0;dn(5254516,n,252)}n=c[1313630]|0;b=n-1|0;G=c[1311657]|0,c[1311657]=G+1,G;ag=c[K>>2]|0;ah=c[J>>2]|0;af=ag-ah>>2;do{if(af>>>0>b>>>0){ai=ah}else{if(af>>>0<n>>>0){js(d,n-af|0);ai=c[J>>2]|0;break}if(af>>>0<=n>>>0){ai=ah;break}o=ah+(n<<2)|0;if((o|0)==(ag|0)){ai=ah;break}c[K>>2]=ag+((((ag-4|0)+(-o|0)|0)>>>2^-1)<<2)|0;ai=ah}}while(0);ah=c[ai+(b<<2)>>2]|0;do{if((ah|0)!=0){ai=ah+4|0;if(((G=c[ai>>2]|0,c[ai>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ah>>2]|0)+8>>2]&1023](ah|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246624;c[1311655]=0;c[1311654]=5247600;if((c[1313627]|0)!=-1){c[m>>2]=5254508;c[m+4>>2]=24;c[m+8>>2]=0;dn(5254508,m,252)}m=c[1313628]|0;b=m-1|0;G=c[1311655]|0,c[1311655]=G+1,G;ah=c[K>>2]|0;ai=c[J>>2]|0;ag=ah-ai>>2;do{if(ag>>>0>b>>>0){aj=ai}else{if(ag>>>0<m>>>0){js(d,m-ag|0);aj=c[J>>2]|0;break}if(ag>>>0<=m>>>0){aj=ai;break}n=ai+(m<<2)|0;if((n|0)==(ah|0)){aj=ai;break}c[K>>2]=ah+((((ah-4|0)+(-n|0)|0)>>>2^-1)<<2)|0;aj=ai}}while(0);ai=c[aj+(b<<2)>>2]|0;do{if((ai|0)!=0){aj=ai+4|0;if(((G=c[aj>>2]|0,c[aj>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ai>>2]|0)+8>>2]&1023](ai|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246616;c[1311672]=0;c[1311671]=5247872;c[1311673]=5247920;if((c[1313641]|0)!=-1){c[l>>2]=5254564;c[l+4>>2]=24;c[l+8>>2]=0;dn(5254564,l,252)}l=c[1313642]|0;b=l-1|0;G=c[1311672]|0,c[1311672]=G+1,G;ai=c[K>>2]|0;aj=c[J>>2]|0;ah=ai-aj>>2;do{if(ah>>>0>b>>>0){ak=aj}else{if(ah>>>0<l>>>0){js(d,l-ah|0);ak=c[J>>2]|0;break}if(ah>>>0<=l>>>0){ak=aj;break}m=aj+(l<<2)|0;if((m|0)==(ai|0)){ak=aj;break}c[K>>2]=ai+((((ai-4|0)+(-m|0)|0)>>>2^-1)<<2)|0;ak=aj}}while(0);aj=c[ak+(b<<2)>>2]|0;do{if((aj|0)!=0){ak=aj+4|0;if(((G=c[ak>>2]|0,c[ak>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[aj>>2]|0)+8>>2]&1023](aj|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246684;c[1311669]=0;c[1311668]=5247784;c[1311670]=5247832;if((c[1313639]|0)!=-1){c[k>>2]=5254556;c[k+4>>2]=24;c[k+8>>2]=0;dn(5254556,k,252)}k=c[1313640]|0;b=k-1|0;G=c[1311669]|0,c[1311669]=G+1,G;aj=c[K>>2]|0;ak=c[J>>2]|0;ai=aj-ak>>2;do{if(ai>>>0>b>>>0){al=ak}else{if(ai>>>0<k>>>0){js(d,k-ai|0);al=c[J>>2]|0;break}if(ai>>>0<=k>>>0){al=ak;break}l=ak+(k<<2)|0;if((l|0)==(aj|0)){al=ak;break}c[K>>2]=aj+((((aj-4|0)+(-l|0)|0)>>>2^-1)<<2)|0;al=ak}}while(0);ak=c[al+(b<<2)>>2]|0;do{if((ak|0)!=0){al=ak+4|0;if(((G=c[al>>2]|0,c[al>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[ak>>2]|0)+8>>2]&1023](ak|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246672;c[1311666]=0;c[1311665]=5248692;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);c[1311667]=c[1311652]|0;c[1311665]=5247756;if((c[1313637]|0)!=-1){c[j>>2]=5254548;c[j+4>>2]=24;c[j+8>>2]=0;dn(5254548,j,252)}j=c[1313638]|0;b=j-1|0;G=c[1311666]|0,c[1311666]=G+1,G;ak=c[K>>2]|0;al=c[J>>2]|0;aj=ak-al>>2;do{if(aj>>>0>b>>>0){am=al}else{if(aj>>>0<j>>>0){js(d,j-aj|0);am=c[J>>2]|0;break}if(aj>>>0<=j>>>0){am=al;break}k=al+(j<<2)|0;if((k|0)==(ak|0)){am=al;break}c[K>>2]=ak+((((ak-4|0)+(-k|0)|0)>>>2^-1)<<2)|0;am=al}}while(0);al=c[am+(b<<2)>>2]|0;do{if((al|0)!=0){am=al+4|0;if(((G=c[am>>2]|0,c[am>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[al>>2]|0)+8>>2]&1023](al|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246660;c[1311663]=0;c[1311662]=5248692;do{if(a[5255524]<<24>>24==0){if((bf(5255524)|0)==0){break}c[1311652]=aU(1,5244068,0)|0}}while(0);c[1311664]=c[1311652]|0;c[1311662]=5247728;if((c[1313635]|0)!=-1){c[h>>2]=5254540;c[h+4>>2]=24;c[h+8>>2]=0;dn(5254540,h,252)}h=c[1313636]|0;b=h-1|0;G=c[1311663]|0,c[1311663]=G+1,G;al=c[K>>2]|0;am=c[J>>2]|0;ak=al-am>>2;do{if(ak>>>0>b>>>0){an=am}else{if(ak>>>0<h>>>0){js(d,h-ak|0);an=c[J>>2]|0;break}if(ak>>>0<=h>>>0){an=am;break}j=am+(h<<2)|0;if((j|0)==(al|0)){an=am;break}c[K>>2]=al+((((al-4|0)+(-j|0)|0)>>>2^-1)<<2)|0;an=am}}while(0);am=c[an+(b<<2)>>2]|0;do{if((am|0)!=0){an=am+4|0;if(((G=c[an>>2]|0,c[an>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[am>>2]|0)+8>>2]&1023](am|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246648;c[1311690]=0;c[1311689]=5248084;if((c[1313649]|0)!=-1){c[g>>2]=5254596;c[g+4>>2]=24;c[g+8>>2]=0;dn(5254596,g,252)}g=c[1313650]|0;b=g-1|0;G=c[1311690]|0,c[1311690]=G+1,G;am=c[K>>2]|0;an=c[J>>2]|0;al=am-an>>2;do{if(al>>>0>b>>>0){ao=an}else{if(al>>>0<g>>>0){js(d,g-al|0);ao=c[J>>2]|0;break}if(al>>>0<=g>>>0){ao=an;break}h=an+(g<<2)|0;if((h|0)==(am|0)){ao=an;break}c[K>>2]=am+((((am-4|0)+(-h|0)|0)>>>2^-1)<<2)|0;ao=an}}while(0);an=c[ao+(b<<2)>>2]|0;do{if((an|0)!=0){ao=an+4|0;if(((G=c[ao>>2]|0,c[ao>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[an>>2]|0)+8>>2]&1023](an|0)}}while(0);c[(c[J>>2]|0)+(b<<2)>>2]=5246756;c[1311688]=0;c[1311687]=5248048;if((c[1313647]|0)!=-1){c[f>>2]=5254588;c[f+4>>2]=24;c[f+8>>2]=0;dn(5254588,f,252)}f=c[1313648]|0;b=f-1|0;G=c[1311688]|0,c[1311688]=G+1,G;an=c[K>>2]|0;ao=c[J>>2]|0;am=an-ao>>2;do{if(am>>>0>b>>>0){ap=ao}else{if(am>>>0<f>>>0){js(d,f-am|0);ap=c[J>>2]|0;break}if(am>>>0<=f>>>0){ap=ao;break}g=ao+(f<<2)|0;if((g|0)==(an|0)){ap=ao;break}c[K>>2]=an+((((an-4|0)+(-g|0)|0)>>>2^-1)<<2)|0;ap=ao}}while(0);ao=c[ap+(b<<2)>>2]|0;if((ao|0)==0){aq=c[J>>2]|0;ar=aq+(b<<2)|0;c[ar>>2]=5246748;i=e;return}ap=ao+4|0;if(((G=c[ap>>2]|0,c[ap>>2]=G+ -1,G)|0)!=0){aq=c[J>>2]|0;ar=aq+(b<<2)|0;c[ar>>2]=5246748;i=e;return}b_[c[(c[ao>>2]|0)+8>>2]&1023](ao|0);aq=c[J>>2]|0;ar=aq+(b<<2)|0;c[ar>>2]=5246748;i=e;return}function hE(a,b){a=a|0;b=b|0;return b|0}function hF(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function hG(a,b,d,e,f,g,h,i){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;c[f>>2]=d;c[i>>2]=g;return 3}function hH(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function hI(a){a=a|0;return 1}function hJ(a){a=a|0;return 1}function hK(a){a=a|0;return 1}function hL(a,b){a=a|0;b=b|0;return b<<24>>24|0}function hM(a,b,c){a=a|0;b=b|0;c=c|0;return(b>>>0<128?b&255:c)|0}function hN(a,b,c){a=a|0;b=b|0;c=c|0;return(b<<24>>24>-1?b:c)|0}function hO(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;b=d-c|0;return(b>>>0<e>>>0?b:e)|0}function hP(a){a=a|0;c[a+4>>2]=(G=c[1313671]|0,c[1313671]=G+1,G)+1|0;return}function hQ(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((d|0)==(e|0)){g=d;return g|0}else{h=d;i=f}while(1){c[i>>2]=a[h]<<24>>24;f=h+1|0;if((f|0)==(e|0)){g=e;break}else{h=f;i=i+4|0}}return g|0}function hR(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0;if((d|0)==(e|0)){h=d;return h|0}b=(((e-4|0)+(-d|0)|0)>>>2)+1|0;i=d;j=g;while(1){g=c[i>>2]|0;a[j]=g>>>0<128?g&255:f;g=i+4|0;if((g|0)==(e|0)){break}else{i=g;j=j+1|0}}h=d+(b<<2)|0;return h|0}function hS(b,c,d,e){b=b|0;c=c|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((c|0)==(d|0)){f=c;return f|0}else{g=c;h=e}while(1){a[h]=a[g]|0;e=g+1|0;if((e|0)==(d|0)){f=d;break}else{g=e;h=h+1|0}}return f|0}function hT(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((c|0)==(d|0)){g=c;return g|0}else{h=c;i=f}while(1){f=a[h]|0;a[i]=f<<24>>24>-1?f:e;f=h+1|0;if((f|0)==(d|0)){g=d;break}else{h=f;i=i+1|0}}return g|0}function hU(a){a=a|0;hV(a);jM(a);return}function hV(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;c[b>>2]=5248716;d=b+12|0;e=c[d>>2]|0;f=b+8|0;g=c[f>>2]|0;L612:do{if((e|0)==(g|0)){h=e}else{i=0;j=g;while(1){k=c[j+(i<<2)>>2]|0;do{if((k|0)!=0){l=k+4|0;if(((G=c[l>>2]|0,c[l>>2]=G+ -1,G)|0)!=0){break}b_[c[(c[k>>2]|0)+8>>2]&1023](k|0)}}while(0);k=i+1|0;l=c[f>>2]|0;if(k>>>0<(c[d>>2]|0)-l>>2>>>0){i=k;j=l}else{h=l;break L612}}}}while(0);if((a[b+136|0]&1)<<24>>24==0){m=h}else{jM(c[b+144>>2]|0);m=c[f>>2]|0}if((m|0)==0){return}f=c[d>>2]|0;if((m|0)!=(f|0)){c[d>>2]=f+((((f-4|0)+(-m|0)|0)>>>2^-1)<<2)|0}if((m|0)==(b+20|0)){a[b+132|0]=0;return}else{jM(m);return}}function hW(){var b=0,d=0,e=0;if(a[5255508]<<24>>24!=0){b=c[1311648]|0;return b|0}if((bf(5255508)|0)==0){b=c[1311648]|0;return b|0}do{if(a[5255516]<<24>>24==0){if((bf(5255516)|0)==0){break}hD(5246848,1);c[1311650]=5246848;c[1311649]=5246600}}while(0);d=c[c[1311649]>>2]|0;c[1311651]=d;e=d+4|0;G=c[e>>2]|0,c[e>>2]=G+1,G;c[1311648]=5246604;b=c[1311648]|0;return b|0}function hX(a){a=a|0;jM(a);return}function hY(a){a=a|0;if((a|0)==0){return}b_[c[(c[a>>2]|0)+4>>2]&1023](a);return}function hZ(a){a=a|0;jM(a);return}function h_(b){b=b|0;var d=0;c[b>>2]=5248812;d=c[b+8>>2]|0;do{if((d|0)!=0){if((a[b+12|0]&1)<<24>>24==0){break}jN(d)}}while(0);jM(b);return}function h$(b){b=b|0;var d=0;c[b>>2]=5248812;d=c[b+8>>2]|0;if((d|0)==0){return}if((a[b+12|0]&1)<<24>>24==0){return}jN(d);return}function h0(a){a=a|0;jM(a);return}function h1(a,d,e){a=a|0;d=d|0;e=e|0;var f=0;if(e>>>0>=128){f=0;return f|0}f=(b[(c[a9()>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0;return f|0}function h2(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0;if((d|0)==(e|0)){g=d;return g|0}else{h=d;i=f}while(1){f=c[h>>2]|0;if(f>>>0<128){j=b[(c[a9()>>2]|0)+(f<<1)>>1]|0}else{j=0}b[i>>1]=j;f=h+4|0;if((f|0)==(e|0)){g=e;break}else{h=f;i=i+2|0}}return g|0}function h3(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0;if((e|0)==(f|0)){g=e;return g|0}else{h=e}while(1){e=c[h>>2]|0;if(e>>>0<128){if((b[(c[a9()>>2]|0)+(e<<1)>>1]&d)<<16>>16!=0){g=h;i=621;break}}e=h+4|0;if((e|0)==(f|0)){g=f;i=622;break}else{h=e}}if((i|0)==621){return g|0}else if((i|0)==622){return g|0}return 0}function h4(a,d,e,f){a=a|0;d=d|0;e=e|0;f=f|0;var g=0,h=0;a=e;while(1){if((a|0)==(f|0)){g=f;h=630;break}e=c[a>>2]|0;if(e>>>0>=128){g=a;h=632;break}if((b[(c[a9()>>2]|0)+(e<<1)>>1]&d)<<16>>16==0){g=a;h=631;break}else{a=a+4|0}}if((h|0)==631){return g|0}else if((h|0)==632){return g|0}else if((h|0)==630){return g|0}return 0}function h5(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>=128){d=b;return d|0}d=c[(c[bR()>>2]|0)+(b<<2)>>2]|0;return d|0}function h6(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((b|0)==(d|0)){e=b;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128){g=c[(c[bR()>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}return e|0}function h7(a,b){a=a|0;b=b|0;var d=0;if(b>>>0>=128){d=b;return d|0}d=c[(c[bS()>>2]|0)+(b<<2)>>2]|0;return d|0}function h8(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;if((b|0)==(d|0)){e=b;return e|0}else{f=b}while(1){b=c[f>>2]|0;if(b>>>0<128){g=c[(c[bS()>>2]|0)+(b<<2)>>2]|0}else{g=b}c[f>>2]=g;b=f+4|0;if((b|0)==(d|0)){e=d;break}else{f=b}}return e|0}function h9(a,b){a=a|0;b=b|0;var d=0;if(b<<24>>24<=-1){d=b;return d|0}d=c[(c[bR()>>2]|0)+(b<<24>>24<<2)>>2]&255;return d|0}function ia(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((d|0)==(e|0)){f=d;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24>-1){h=c[(c[bR()>>2]|0)+(d<<24>>24<<2)>>2]&255}else{h=d}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}return f|0}function ib(a,b){a=a|0;b=b|0;var d=0;if(b<<24>>24<=-1){d=b;return d|0}d=c[(c[bS()>>2]|0)+(b<<24>>24<<2)>>2]&255;return d|0}function ic(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((d|0)==(e|0)){f=d;return f|0}else{g=d}while(1){d=a[g]|0;if(d<<24>>24>-1){h=c[(c[bS()>>2]|0)+(d<<24>>24<<2)>>2]&255}else{h=d}a[g]=h;d=g+1|0;if((d|0)==(e|0)){f=e;break}else{g=d}}return f|0}function id(a){a=a|0;var b=0,d=0;c[a>>2]=5248484;b=c[a+8>>2]|0;if((b|0)==0){d=a;jM(d);return}ba(b|0);d=a;jM(d);return}function ie(a){a=a|0;return 0}function ig(a){a=a|0;jM(a);return}function ih(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+8|0;a=b|0;k=b+4|0;c[a>>2]=d;c[k>>2]=g;l=it(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>1<<1)|0;c[j>>2]=g+((c[k>>2]|0)-g|0)|0;i=b;return l|0}function ii(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0;l=i;i=i+12|0;m=l|0;n=l+8|0;o=e;while(1){if((o|0)==(f|0)){p=f;break}if((c[o>>2]|0)==0){p=o;break}else{o=o+4|0}}c[k>>2]=h;c[g>>2]=e;L783:do{if((e|0)==(f|0)|(h|0)==(j|0)){q=e}else{o=d;r=m;s=j;t=b+8|0;u=n|0;v=h;w=e;x=p;while(1){y=c[o+4>>2]|0;c[r>>2]=c[o>>2]|0;c[r+4>>2]=y;y=bE(c[t>>2]|0)|0;z=aM(v|0,g|0,x-w>>2|0,s-v|0,d|0)|0;if((y|0)!=0){bE(y|0)}if((z|0)==0){A=1;B=756;break}else if((z|0)==(-1|0)){B=720;break}y=(c[k>>2]|0)+z|0;c[k>>2]=y;if((y|0)==(j|0)){B=753;break}if((x|0)==(f|0)){C=f;D=y;E=c[g>>2]|0}else{y=bE(c[t>>2]|0)|0;z=a3(u|0,0,d|0)|0;if((y|0)!=0){bE(y|0)}if((z|0)==-1){A=2;B=758;break}y=c[k>>2]|0;if(z>>>0>(s-y|0)>>>0){A=1;B=759;break}L802:do{if((z|0)!=0){F=z;G=u;H=y;while(1){I=a[G]|0;c[k>>2]=H+1|0;a[H]=I;I=F-1|0;if((I|0)==0){break L802}F=I;G=G+1|0;H=c[k>>2]|0}}}while(0);y=(c[g>>2]|0)+4|0;c[g>>2]=y;z=y;while(1){if((z|0)==(f|0)){J=f;break}if((c[z>>2]|0)==0){J=z;break}else{z=z+4|0}}C=J;D=c[k>>2]|0;E=y}if((E|0)==(f|0)|(D|0)==(j|0)){q=E;break L783}else{v=D;w=E;x=C}}if((B|0)==753){q=c[g>>2]|0;break}else if((B|0)==756){i=l;return A|0}else if((B|0)==758){i=l;return A|0}else if((B|0)==759){i=l;return A|0}else if((B|0)==720){c[k>>2]=v;L818:do{if((w|0)==(c[g>>2]|0)){K=w}else{x=w;u=v;while(1){s=c[x>>2]|0;r=bE(c[t>>2]|0)|0;o=a3(u|0,s|0,m|0)|0;if((r|0)!=0){bE(r|0)}if((o|0)==-1){K=x;break L818}r=(c[k>>2]|0)+o|0;c[k>>2]=r;o=x+4|0;if((o|0)==(c[g>>2]|0)){K=o;break L818}else{x=o;u=r}}}}while(0);c[g>>2]=K;A=2;i=l;return A|0}}}while(0);A=(q|0)!=(f|0)&1;i=l;return A|0}function ij(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;l=i;i=i+8|0;m=l|0;n=e;while(1){if((n|0)==(f|0)){o=f;break}if(a[n]<<24>>24==0){o=n;break}else{n=n+1|0}}c[k>>2]=h;c[g>>2]=e;L835:do{if((e|0)==(f|0)|(h|0)==(j|0)){p=e}else{n=d;q=m;r=j;s=b+8|0;t=h;u=e;v=o;while(1){w=c[n+4>>2]|0;c[q>>2]=c[n>>2]|0;c[q+4>>2]=w;x=v;w=bE(c[s>>2]|0)|0;y=bW(t|0,g|0,x-u|0,r-t>>2|0,d|0)|0;if((w|0)!=0){bE(w|0)}if((y|0)==(-1|0)){z=775;break}else if((y|0)==0){A=2;z=815;break}w=(c[k>>2]|0)+(y<<2)|0;c[k>>2]=w;if((w|0)==(j|0)){z=807;break}y=c[g>>2]|0;if((v|0)==(f|0)){B=f;C=w;D=y}else{E=bE(c[s>>2]|0)|0;F=bH(w|0,y|0,1,d|0)|0;if((E|0)!=0){bE(E|0)}if((F|0)!=0){A=2;z=811;break}c[k>>2]=(c[k>>2]|0)+4|0;F=(c[g>>2]|0)+1|0;c[g>>2]=F;E=F;while(1){if((E|0)==(f|0)){G=f;break}if(a[E]<<24>>24==0){G=E;break}else{E=E+1|0}}B=G;C=c[k>>2]|0;D=F}if((D|0)==(f|0)|(C|0)==(j|0)){p=D;break L835}else{t=C;u=D;v=B}}if((z|0)==807){p=c[g>>2]|0;break}else if((z|0)==775){c[k>>2]=t;L860:do{if((u|0)==(c[g>>2]|0)){H=u}else{v=t;r=u;while(1){q=bE(c[s>>2]|0)|0;n=bH(v|0,r|0,x-r|0,m|0)|0;if((q|0)!=0){bE(q|0)}if((n|0)==0){I=r+1|0}else if((n|0)==(-1|0)){z=786;break}else if((n|0)==(-2|0)){z=787;break}else{I=r+n|0}n=(c[k>>2]|0)+4|0;c[k>>2]=n;if((I|0)==(c[g>>2]|0)){H=I;break L860}else{v=n;r=I}}if((z|0)==786){c[g>>2]=r;A=2;i=l;return A|0}else if((z|0)==787){c[g>>2]=r;A=1;i=l;return A|0}}}while(0);c[g>>2]=H;A=(H|0)!=(f|0)&1;i=l;return A|0}else if((z|0)==811){i=l;return A|0}else if((z|0)==815){i=l;return A|0}}}while(0);A=(p|0)!=(f|0)&1;i=l;return A|0}function ik(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0;h=i;i=i+4|0;c[g>>2]=e;e=h|0;j=bE(c[b+8>>2]|0)|0;b=a3(e|0,0,d|0)|0;if((j|0)!=0){bE(j|0)}L887:do{if((b|0)==(-1|0)|(b|0)==0){k=2}else{j=b-1|0;d=c[g>>2]|0;if(j>>>0>(f-d|0)>>>0){k=1;break}if((j|0)==0){k=0;break}else{l=j;m=e;n=d}while(1){d=a[m]|0;c[g>>2]=n+1|0;a[n]=d;d=l-1|0;if((d|0)==0){k=0;break L887}l=d;m=m+1|0;n=c[g>>2]|0}}}while(0);i=h;return k|0}function il(a){a=a|0;var b=0,d=0,e=0,f=0,g=0;b=a+8|0;a=bE(c[b>>2]|0)|0;d=a_(0,0,1)|0;if((a|0)!=0){bE(a|0)}if((d|0)!=0){e=-1;return e|0}d=c[b>>2]|0;if((d|0)==0){e=1;return e|0}e=bE(d|0)|0;d=bg()|0;if((e|0)==0){f=(d|0)==1;g=f&1;return g|0}bE(e|0);f=(d|0)==1;g=f&1;return g|0}function im(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;if((f|0)==0|(d|0)==(e|0)){g=0;return g|0}h=e;i=a+8|0;a=d;d=0;j=0;while(1){k=bE(c[i>>2]|0)|0;l=aH(a|0,h-a|0,b|0)|0;if((k|0)!=0){bE(k|0)}if((l|0)==(-1|0)|(l|0)==(-2|0)){g=d;m=873;break}else if((l|0)==0){n=1;o=a+1|0}else{n=l;o=a+l|0}l=n+d|0;k=j+1|0;if(k>>>0>=f>>>0|(o|0)==(e|0)){g=l;m=872;break}else{a=o;d=l;j=k}}if((m|0)==872){return g|0}else if((m|0)==873){return g|0}return 0}function io(a){a=a|0;var b=0,d=0,e=0;b=c[a+8>>2]|0;do{if((b|0)==0){d=1}else{a=bE(b|0)|0;e=bg()|0;if((a|0)==0){d=e;break}bE(a|0);d=e}}while(0);return d|0}function ip(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function iq(a){a=a|0;return 0}function ir(a){a=a|0;return 0}function is(a){a=a|0;return 4}function it(d,f,g,h,i,j,k,l){d=d|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0;c[g>>2]=d;c[j>>2]=h;do{if((l&2|0)!=0){if((i-h|0)<3){m=1;return m|0}else{c[j>>2]=h+1|0;a[h]=-17;d=c[j>>2]|0;c[j>>2]=d+1|0;a[d]=-69;d=c[j>>2]|0;c[j>>2]=d+1|0;a[d]=-65;break}}}while(0);h=f;l=c[g>>2]|0;if(l>>>0>=f>>>0){m=0;return m|0}d=i;i=l;L950:while(1){l=b[i>>1]|0;n=l&65535;if(n>>>0>k>>>0){m=2;o=928;break}do{if((l&65535)<128){p=c[j>>2]|0;if((d-p|0)<1){m=1;o=927;break L950}c[j>>2]=p+1|0;a[p]=l&255}else{if((l&65535)<2048){p=c[j>>2]|0;if((d-p|0)<2){m=1;o=918;break L950}c[j>>2]=p+1|0;a[p]=(n>>>6|192)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n&63|128)&255;break}if((l&65535)<55296){p=c[j>>2]|0;if((d-p|0)<3){m=1;o=926;break L950}c[j>>2]=p+1|0;a[p]=(n>>>12|224)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n>>>6&63|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n&63|128)&255;break}if((l&65535)>=56320){if((l&65535)<57344){m=2;o=923;break L950}p=c[j>>2]|0;if((d-p|0)<3){m=1;o=924;break L950}c[j>>2]=p+1|0;a[p]=(n>>>12|224)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n>>>6&63|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n&63|128)&255;break}if((h-i|0)<4){m=1;o=916;break L950}p=i+2|0;q=e[p>>1]|0;if((q&64512|0)!=56320){m=2;o=920;break L950}if((d-(c[j>>2]|0)|0)<4){m=1;o=921;break L950}r=n&960;if(((r<<10)+65536|n<<10&64512|q&1023)>>>0>k>>>0){m=2;o=917;break L950}c[g>>2]=p;p=(r>>>6)+1|0;r=c[j>>2]|0;c[j>>2]=r+1|0;a[r]=(p>>>2|240)&255;r=c[j>>2]|0;c[j>>2]=r+1|0;a[r]=(n>>>2&15|p<<4&48|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(n<<4&48|q>>>6&15|128)&255;p=c[j>>2]|0;c[j>>2]=p+1|0;a[p]=(q&63|128)&255}}while(0);n=(c[g>>2]|0)+2|0;c[g>>2]=n;if(n>>>0<f>>>0){i=n}else{m=0;o=925;break}}if((o|0)==925){return m|0}else if((o|0)==926){return m|0}else if((o|0)==927){return m|0}else if((o|0)==920){return m|0}else if((o|0)==921){return m|0}else if((o|0)==917){return m|0}else if((o|0)==918){return m|0}else if((o|0)==923){return m|0}else if((o|0)==924){return m|0}else if((o|0)==928){return m|0}else if((o|0)==916){return m|0}return 0}function iu(e,f,g,h,i,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;c[g>>2]=e;c[j>>2]=h;h=c[g>>2]|0;do{if((l&4|0)==0){m=h}else{if((f-h|0)<=2){m=h;break}if(a[h]<<24>>24!=-17){m=h;break}if(a[h+1|0]<<24>>24!=-69){m=h;break}if(a[h+2|0]<<24>>24!=-65){m=h;break}e=h+3|0;c[g>>2]=e;m=e}}while(0);L995:do{if(m>>>0<f>>>0){h=f;l=i;e=c[j>>2]|0;n=m;L997:while(1){if(e>>>0>=i>>>0){o=n;break L995}p=a[n]|0;q=p&255;if(q>>>0>k>>>0){r=2;s=982;break}do{if(p<<24>>24>-1){b[e>>1]=p&255;c[g>>2]=(c[g>>2]|0)+1|0}else{if((p&255)<194){r=2;s=970;break L997}if((p&255)<224){if((h-n|0)<2){r=1;s=971;break L997}t=d[n+1|0]|0;if((t&192|0)!=128){r=2;s=972;break L997}u=t&63|q<<6&1984;if(u>>>0>k>>>0){r=2;s=973;break L997}b[e>>1]=u&65535;c[g>>2]=(c[g>>2]|0)+2|0;break}if((p&255)<240){if((h-n|0)<3){r=1;s=974;break L997}u=a[n+1|0]|0;t=a[n+2|0]|0;if((q|0)==224){if((u&-32)<<24>>24!=-96){r=2;s=975;break L997}}else if((q|0)==237){if((u&-32)<<24>>24!=-128){r=2;s=976;break L997}}else{if((u&-64)<<24>>24!=-128){r=2;s=977;break L997}}v=t&255;if((v&192|0)!=128){r=2;s=978;break L997}t=(u&255)<<6&4032|q<<12|v&63;if((t&65535)>>>0>k>>>0){r=2;s=979;break L997}b[e>>1]=t&65535;c[g>>2]=(c[g>>2]|0)+3|0;break}if((p&255)>=245){r=2;s=981;break L997}if((h-n|0)<4){r=1;s=984;break L997}t=a[n+1|0]|0;v=a[n+2|0]|0;u=a[n+3|0]|0;if((q|0)==244){if((t&-16)<<24>>24!=-128){r=2;s=985;break L997}}else if((q|0)==240){if((t+112&255)>=48){r=2;s=990;break L997}}else{if((t&-64)<<24>>24!=-128){r=2;s=980;break L997}}w=v&255;if((w&192|0)!=128){r=2;s=988;break L997}v=u&255;if((v&192|0)!=128){r=2;s=987;break L997}if((l-e|0)<4){r=1;s=989;break L997}u=q&7;x=t&255;t=w<<6;y=v&63;if((x<<12&258048|u<<18|t&4032|y)>>>0>k>>>0){r=2;s=983;break L997}b[e>>1]=(x<<2&60|w>>>4&3|((x>>>4&3|u<<2)<<6)+16320|55296)&65535;u=(c[j>>2]|0)+2|0;c[j>>2]=u;b[u>>1]=(y|t&960|56320)&65535;c[g>>2]=(c[g>>2]|0)+4|0}}while(0);q=(c[j>>2]|0)+2|0;c[j>>2]=q;p=c[g>>2]|0;if(p>>>0<f>>>0){e=q;n=p}else{o=p;break L995}}if((s|0)==987){return r|0}else if((s|0)==988){return r|0}else if((s|0)==989){return r|0}else if((s|0)==990){return r|0}else if((s|0)==982){return r|0}else if((s|0)==983){return r|0}else if((s|0)==984){return r|0}else if((s|0)==985){return r|0}else if((s|0)==970){return r|0}else if((s|0)==971){return r|0}else if((s|0)==972){return r|0}else if((s|0)==973){return r|0}else if((s|0)==974){return r|0}else if((s|0)==975){return r|0}else if((s|0)==976){return r|0}else if((s|0)==977){return r|0}else if((s|0)==978){return r|0}else if((s|0)==979){return r|0}else if((s|0)==980){return r|0}else if((s|0)==981){return r|0}}else{o=m}}while(0);r=o>>>0<f>>>0&1;return r|0}function iv(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;do{if((g&4|0)==0){h=b}else{if((c-b|0)<=2){h=b;break}if(a[b]<<24>>24!=-17){h=b;break}if(a[b+1|0]<<24>>24!=-69){h=b;break}h=a[b+2|0]<<24>>24==-65?b+3|0:b}}while(0);L1064:do{if(h>>>0<c>>>0&(e|0)!=0){g=c;i=0;j=h;L1066:while(1){k=a[j]|0;l=k&255;if(l>>>0>f>>>0){m=j;break L1064}do{if(k<<24>>24>-1){n=j+1|0;o=i}else{if((k&255)<194){m=j;break L1064}if((k&255)<224){if((g-j|0)<2){m=j;break L1064}p=d[j+1|0]|0;if((p&192|0)!=128){m=j;break L1064}if((p&63|l<<6&1984)>>>0>f>>>0){m=j;break L1064}n=j+2|0;o=i;break}if((k&255)<240){q=j;if((g-q|0)<3){m=j;break L1064}p=a[j+1|0]|0;r=a[j+2|0]|0;if((l|0)==224){if((p&-32)<<24>>24!=-96){s=1011;break L1066}}else if((l|0)==237){if((p&-32)<<24>>24!=-128){s=1013;break L1066}}else{if((p&-64)<<24>>24!=-128){s=1015;break L1066}}t=r&255;if((t&192|0)!=128){m=j;break L1064}if(((p&255)<<6&4032|l<<12&61440|t&63)>>>0>f>>>0){m=j;break L1064}n=j+3|0;o=i;break}if((k&255)>=245){m=j;break L1064}u=j;if((g-u|0)<4){m=j;break L1064}if((e-i|0)>>>0<2){m=j;break L1064}t=a[j+1|0]|0;p=a[j+2|0]|0;r=a[j+3|0]|0;if((l|0)==244){if((t&-16)<<24>>24!=-128){s=1026;break L1066}}else if((l|0)==240){if((t+112&255)>=48){s=1024;break L1066}}else{if((t&-64)<<24>>24!=-128){s=1028;break L1066}}v=p&255;if((v&192|0)!=128){m=j;break L1064}p=r&255;if((p&192|0)!=128){m=j;break L1064}if(((t&255)<<12&258048|l<<18&1835008|v<<6&4032|p&63)>>>0>f>>>0){m=j;break L1064}n=j+4|0;o=i+1|0}}while(0);l=o+1|0;if(n>>>0<c>>>0&l>>>0<e>>>0){i=l;j=n}else{m=n;break L1064}}if((s|0)==1011){w=q-b|0;return w|0}else if((s|0)==1013){w=q-b|0;return w|0}else if((s|0)==1015){w=q-b|0;return w|0}else if((s|0)==1026){w=u-b|0;return w|0}else if((s|0)==1024){w=u-b|0;return w|0}else if((s|0)==1028){w=u-b|0;return w|0}}else{m=h}}while(0);w=m-b|0;return w|0}function iw(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+8|0;a=b|0;k=b+4|0;c[a>>2]=d;c[k>>2]=g;l=iu(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d|0)|0;c[j>>2]=g+((c[k>>2]|0)-g>>1<<1)|0;i=b;return l|0}function ix(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return iv(c,d,e,1114111,0)|0}function iy(a){a=a|0;jM(a);return}function iz(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+8|0;a=b|0;k=b+4|0;c[a>>2]=d;c[k>>2]=g;l=iE(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d>>2<<2)|0;c[j>>2]=g+((c[k>>2]|0)-g|0)|0;i=b;return l|0}function iA(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;c[f>>2]=d;return 3}function iB(a){a=a|0;return 0}function iC(a){a=a|0;return 0}function iD(a){a=a|0;return 4}function iE(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0;c[e>>2]=b;c[h>>2]=f;do{if((j&2|0)!=0){if((g-f|0)<3){k=1;return k|0}else{c[h>>2]=f+1|0;a[f]=-17;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=-69;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=-65;break}}}while(0);f=c[e>>2]|0;if(f>>>0>=d>>>0){k=0;return k|0}j=g;g=f;L1135:while(1){f=c[g>>2]|0;if((f&-2048|0)==55296|f>>>0>i>>>0){k=2;l=1072;break}do{if(f>>>0<128){b=c[h>>2]|0;if((j-b|0)<1){k=1;l=1070;break L1135}c[h>>2]=b+1|0;a[b]=f&255}else{if(f>>>0<2048){b=c[h>>2]|0;if((j-b|0)<2){k=1;l=1075;break L1135}c[h>>2]=b+1|0;a[b]=(f>>>6|192)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f&63|128)&255;break}b=c[h>>2]|0;m=j-b|0;if(f>>>0<65536){if((m|0)<3){k=1;l=1073;break L1135}c[h>>2]=b+1|0;a[b]=(f>>>12|224)&255;n=c[h>>2]|0;c[h>>2]=n+1|0;a[n]=(f>>>6&63|128)&255;n=c[h>>2]|0;c[h>>2]=n+1|0;a[n]=(f&63|128)&255;break}else{if((m|0)<4){k=1;l=1071;break L1135}c[h>>2]=b+1|0;a[b]=(f>>>18|240)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f>>>12&63|128)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f>>>6&63|128)&255;b=c[h>>2]|0;c[h>>2]=b+1|0;a[b]=(f&63|128)&255;break}}}while(0);f=(c[e>>2]|0)+4|0;c[e>>2]=f;if(f>>>0<d>>>0){g=f}else{k=0;l=1077;break}}if((l|0)==1077){return k|0}else if((l|0)==1070){return k|0}else if((l|0)==1073){return k|0}else if((l|0)==1071){return k|0}else if((l|0)==1075){return k|0}else if((l|0)==1072){return k|0}return 0}function iF(b,e,f,g,h,i,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;c[f>>2]=b;c[i>>2]=g;g=c[f>>2]|0;do{if((k&4|0)==0){l=g}else{if((e-g|0)<=2){l=g;break}if(a[g]<<24>>24!=-17){l=g;break}if(a[g+1|0]<<24>>24!=-69){l=g;break}if(a[g+2|0]<<24>>24!=-65){l=g;break}b=g+3|0;c[f>>2]=b;l=b}}while(0);L1167:do{if(l>>>0<e>>>0){g=e;k=c[i>>2]|0;b=l;L1169:while(1){if(k>>>0>=h>>>0){m=b;break L1167}n=a[b]|0;o=n&255;do{if(n<<24>>24>-1){if(o>>>0>j>>>0){p=2;q=1133;break L1169}c[k>>2]=o;c[f>>2]=(c[f>>2]|0)+1|0}else{if((n&255)<194){p=2;q=1130;break L1169}if((n&255)<224){if((g-b|0)<2){p=1;q=1124;break L1169}r=d[b+1|0]|0;if((r&192|0)!=128){p=2;q=1125;break L1169}s=r&63|o<<6&1984;if(s>>>0>j>>>0){p=2;q=1129;break L1169}c[k>>2]=s;c[f>>2]=(c[f>>2]|0)+2|0;break}if((n&255)<240){if((g-b|0)<3){p=1;q=1128;break L1169}s=a[b+1|0]|0;r=a[b+2|0]|0;if((o|0)==237){if((s&-32)<<24>>24!=-128){p=2;q=1120;break L1169}}else if((o|0)==224){if((s&-32)<<24>>24!=-96){p=2;q=1135;break L1169}}else{if((s&-64)<<24>>24!=-128){p=2;q=1136;break L1169}}t=r&255;if((t&192|0)!=128){p=2;q=1118;break L1169}r=(s&255)<<6&4032|o<<12&61440|t&63;if(r>>>0>j>>>0){p=2;q=1121;break L1169}c[k>>2]=r;c[f>>2]=(c[f>>2]|0)+3|0;break}if((n&255)>=245){p=2;q=1123;break L1169}if((g-b|0)<4){p=1;q=1132;break L1169}r=a[b+1|0]|0;t=a[b+2|0]|0;s=a[b+3|0]|0;if((o|0)==240){if((r+112&255)>=48){p=2;q=1126;break L1169}}else if((o|0)==244){if((r&-16)<<24>>24!=-128){p=2;q=1137;break L1169}}else{if((r&-64)<<24>>24!=-128){p=2;q=1134;break L1169}}u=t&255;if((u&192|0)!=128){p=2;q=1122;break L1169}t=s&255;if((t&192|0)!=128){p=2;q=1127;break L1169}s=(r&255)<<12&258048|o<<18&1835008|u<<6&4032|t&63;if(s>>>0>j>>>0){p=2;q=1131;break L1169}c[k>>2]=s;c[f>>2]=(c[f>>2]|0)+4|0}}while(0);o=(c[i>>2]|0)+4|0;c[i>>2]=o;n=c[f>>2]|0;if(n>>>0<e>>>0){k=o;b=n}else{m=n;break L1167}}if((q|0)==1118){return p|0}else if((q|0)==1120){return p|0}else if((q|0)==1121){return p|0}else if((q|0)==1128){return p|0}else if((q|0)==1129){return p|0}else if((q|0)==1130){return p|0}else if((q|0)==1131){return p|0}else if((q|0)==1132){return p|0}else if((q|0)==1133){return p|0}else if((q|0)==1134){return p|0}else if((q|0)==1135){return p|0}else if((q|0)==1136){return p|0}else if((q|0)==1137){return p|0}else if((q|0)==1122){return p|0}else if((q|0)==1123){return p|0}else if((q|0)==1124){return p|0}else if((q|0)==1125){return p|0}else if((q|0)==1126){return p|0}else if((q|0)==1127){return p|0}}else{m=l}}while(0);p=m>>>0<e>>>0&1;return p|0}function iG(b,c,e,f,g){b=b|0;c=c|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;do{if((g&4|0)==0){h=b}else{if((c-b|0)<=2){h=b;break}if(a[b]<<24>>24!=-17){h=b;break}if(a[b+1|0]<<24>>24!=-69){h=b;break}h=a[b+2|0]<<24>>24==-65?b+3|0:b}}while(0);L1234:do{if(h>>>0<c>>>0&(e|0)!=0){g=c;i=1;j=h;L1236:while(1){k=a[j]|0;l=k&255;do{if(k<<24>>24>-1){if(l>>>0>f>>>0){m=j;break L1234}n=j+1|0}else{if((k&255)<194){m=j;break L1234}if((k&255)<224){if((g-j|0)<2){m=j;break L1234}o=d[j+1|0]|0;if((o&192|0)!=128){m=j;break L1234}if((o&63|l<<6&1984)>>>0>f>>>0){m=j;break L1234}n=j+2|0;break}if((k&255)<240){p=j;if((g-p|0)<3){m=j;break L1234}o=a[j+1|0]|0;q=a[j+2|0]|0;if((l|0)==224){if((o&-32)<<24>>24!=-96){r=1158;break L1236}}else if((l|0)==237){if((o&-32)<<24>>24!=-128){r=1160;break L1236}}else{if((o&-64)<<24>>24!=-128){r=1162;break L1236}}s=q&255;if((s&192|0)!=128){m=j;break L1234}if(((o&255)<<6&4032|l<<12&61440|s&63)>>>0>f>>>0){m=j;break L1234}n=j+3|0;break}if((k&255)>=245){m=j;break L1234}t=j;if((g-t|0)<4){m=j;break L1234}s=a[j+1|0]|0;o=a[j+2|0]|0;q=a[j+3|0]|0;if((l|0)==240){if((s+112&255)>=48){r=1170;break L1236}}else if((l|0)==244){if((s&-16)<<24>>24!=-128){r=1172;break L1236}}else{if((s&-64)<<24>>24!=-128){r=1174;break L1236}}u=o&255;if((u&192|0)!=128){m=j;break L1234}o=q&255;if((o&192|0)!=128){m=j;break L1234}if(((s&255)<<12&258048|l<<18&1835008|u<<6&4032|o&63)>>>0>f>>>0){m=j;break L1234}n=j+4|0}}while(0);if(!(n>>>0<c>>>0&i>>>0<e>>>0)){m=n;break L1234}i=i+1|0;j=n}if((r|0)==1174){v=t-b|0;return v|0}else if((r|0)==1158){v=p-b|0;return v|0}else if((r|0)==1160){v=p-b|0;return v|0}else if((r|0)==1162){v=p-b|0;return v|0}else if((r|0)==1170){v=t-b|0;return v|0}else if((r|0)==1172){v=t-b|0;return v|0}}else{m=h}}while(0);v=m-b|0;return v|0}function iH(b){b=b|0;return a[b+8|0]|0}function iI(a){a=a|0;return c[a+8>>2]|0}function iJ(b){b=b|0;return a[b+9|0]|0}function iK(a){a=a|0;return c[a+12>>2]|0}function iL(b,c){b=b|0;c=c|0;c=b;a[b]=8;b=c+1|0;A=1702195828;a[b]=A&255;A=A>>8;a[b+1|0]=A&255;A=A>>8;a[b+2|0]=A&255;A=A>>8;a[b+3|0]=A&255;a[c+5|0]=0;return}function iM(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0;b=i;i=i+8|0;a=b|0;k=b+4|0;c[a>>2]=d;c[k>>2]=g;l=iF(d,e,a,g,h,k,1114111,0)|0;c[f>>2]=d+((c[a>>2]|0)-d|0)|0;c[j>>2]=g+((c[k>>2]|0)-g>>2<<2)|0;i=b;return l|0}function iN(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return iG(c,d,e,1114111,0)|0}function iO(a){a=a|0;jM(a);return}function iP(a){a=a|0;jM(a);return}function iQ(b){b=b|0;var d=0;c[b>>2]=5248004;if((a[b+12|0]&1)<<24>>24==0){d=b;jM(d);return}jM(c[b+20>>2]|0);d=b;jM(d);return}function iR(b){b=b|0;c[b>>2]=5248004;if((a[b+12|0]&1)<<24>>24==0){return}jM(c[b+20>>2]|0);return}function iS(b){b=b|0;var d=0;c[b>>2]=5247960;if((a[b+16|0]&1)<<24>>24==0){d=b;jM(d);return}jM(c[b+24>>2]|0);d=b;jM(d);return}function iT(b){b=b|0;c[b>>2]=5247960;if((a[b+16|0]&1)<<24>>24==0){return}jM(c[b+24>>2]|0);return}function iU(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=d+12|0;if((a[e]&1)<<24>>24==0){jT(b|0,e|0,12);return}e=c[d+20>>2]|0;f=c[d+16>>2]|0;if((f|0)==-1){dp(0)}if(f>>>0<11){a[b]=f<<1&255;g=b+1|0}else{d=f+16&-16;h=jJ(d)|0;c[b+8>>2]=h;c[b>>2]=d|1;c[b+4>>2]=f;g=h}jT(g|0,e|0,f|0);a[g+f|0]=0;return}function iV(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=d+16|0;if((a[e]&1)<<24>>24==0){jT(b|0,e|0,12);return}e=c[d+24>>2]|0;f=c[d+20>>2]|0;if((f|0)==-1){dp(0)}if(f>>>0<11){a[b]=f<<1&255;g=b+1|0}else{d=f+16&-16;h=jJ(d)|0;c[b+8>>2]=h;c[b>>2]=d|1;c[b+4>>2]=f;g=h}jT(g|0,e|0,f|0);a[g+f|0]=0;return}function iW(b,c){b=b|0;c=c|0;c=b;a[b]=10;jT(c+1|0,5244020,5);a[c+6|0]=0;return}function iX(b){b=b|0;var d=0;if(a[5255604]<<24>>24!=0){d=c[1311850]|0;return d|0}if((bf(5255604)|0)==0){d=c[1311850]|0;return d|0}do{if(a[5255492]<<24>>24==0){if((bf(5255492)|0)==0){break}jS(5246136,0,168);a1(724,0,u|0)}}while(0);dk(5246136,5244224);dk(5246148,5244216);dk(5246160,5244208);dk(5246172,5244196);dk(5246184,5244184);dk(5246196,5244176);dk(5246208,5244164);dk(5246220,5244160);dk(5246232,5244156);dk(5246244,5244152);dk(5246256,5244148);dk(5246268,5244144);dk(5246280,5244136);dk(5246292,5244132);c[1311850]=5246136;d=c[1311850]|0;return d|0}function iY(b){b=b|0;var d=0;if(a[5255548]<<24>>24!=0){d=c[1311835]|0;return d|0}if((bf(5255548)|0)==0){d=c[1311835]|0;return d|0}do{if(a[5255468]<<24>>24==0){if((bf(5255468)|0)==0){break}jS(5245392,0,168);a1(380,0,u|0)}}while(0);dB(5245392,5244584,bq(5244584)|0);dB(5245404,5244556,bq(5244556)|0);dB(5245416,5244524,bq(5244524)|0);dB(5245428,5244484,bq(5244484)|0);dB(5245440,5244448,bq(5244448)|0);dB(5245452,5244420,bq(5244420)|0);dB(5245464,5244384,bq(5244384)|0);dB(5245476,5244368,bq(5244368)|0);dB(5245488,5244352,bq(5244352)|0);dB(5245500,5244336,bq(5244336)|0);dB(5245512,5244284,bq(5244284)|0);dB(5245524,5244268,bq(5244268)|0);dB(5245536,5244252,bq(5244252)|0);dB(5245548,5244236,bq(5244236)|0);c[1311835]=5245392;d=c[1311835]|0;return d|0}function iZ(b){b=b|0;var d=0;if(a[5255596]<<24>>24!=0){d=c[1311849]|0;return d|0}if((bf(5255596)|0)==0){d=c[1311849]|0;return d|0}do{if(a[5255484]<<24>>24==0){if((bf(5255484)|0)==0){break}jS(5245848,0,288);a1(422,0,u|0)}}while(0);dk(5245848,5243156);dk(5245860,5243128);dk(5245872,5243120);dk(5245884,5243112);dk(5245896,5243108);dk(5245908,5243100);dk(5245920,5243092);dk(5245932,5243084);dk(5245944,5243032);dk(5245956,5243024);dk(5245968,5243012);dk(5245980,5243e3);dk(5245992,5242996);dk(5246004,5242992);dk(5246016,5242988);dk(5246028,5242984);dk(5246040,5243108);dk(5246052,5242980);dk(5246064,5242976);dk(5246076,5244628);dk(5246088,5244624);dk(5246100,5244620);dk(5246112,5244616);dk(5246124,5244612);c[1311849]=5245848;d=c[1311849]|0;return d|0}function i_(b){b=b|0;var d=0;if(a[5255540]<<24>>24!=0){d=c[1311834]|0;return d|0}if((bf(5255540)|0)==0){d=c[1311834]|0;return d|0}do{if(a[5255460]<<24>>24==0){if((bf(5255460)|0)==0){break}jS(5245104,0,288);a1(320,0,u|0)}}while(0);dB(5245104,5243652,bq(5243652)|0);dB(5245116,5243616,bq(5243616)|0);dB(5245128,5243592,bq(5243592)|0);dB(5245140,5243568,bq(5243568)|0);dB(5245152,5243276,bq(5243276)|0);dB(5245164,5243548,bq(5243548)|0);dB(5245176,5243528,bq(5243528)|0);dB(5245188,5243500,bq(5243500)|0);dB(5245200,5243460,bq(5243460)|0);dB(5245212,5243428,bq(5243428)|0);dB(5245224,5243392,bq(5243392)|0);dB(5245236,5243356,bq(5243356)|0);dB(5245248,5243340,bq(5243340)|0);dB(5245260,5243324,bq(5243324)|0);dB(5245272,5243308,bq(5243308)|0);dB(5245284,5243292,bq(5243292)|0);dB(5245296,5243276,bq(5243276)|0);dB(5245308,5243260,bq(5243260)|0);dB(5245320,5243244,bq(5243244)|0);dB(5245332,5243228,bq(5243228)|0);dB(5245344,5243212,bq(5243212)|0);dB(5245356,5243196,bq(5243196)|0);dB(5245368,5243180,bq(5243180)|0);dB(5245380,5243164,bq(5243164)|0);c[1311834]=5245104;d=c[1311834]|0;return d|0}function i$(b){b=b|0;var d=0;if(a[5255612]<<24>>24!=0){d=c[1311851]|0;return d|0}if((bf(5255612)|0)==0){d=c[1311851]|0;return d|0}do{if(a[5255500]<<24>>24==0){if((bf(5255500)|0)==0){break}jS(5246304,0,288);a1(316,0,u|0)}}while(0);dk(5246304,5243688);dk(5246316,5243684);c[1311851]=5246304;d=c[1311851]|0;return d|0}function i0(b){b=b|0;var d=0;if(a[5255556]<<24>>24!=0){d=c[1311836]|0;return d|0}if((bf(5255556)|0)==0){d=c[1311836]|0;return d|0}do{if(a[5255476]<<24>>24==0){if((bf(5255476)|0)==0){break}jS(5245560,0,288);a1(684,0,u|0)}}while(0);dB(5245560,5243704,bq(5243704)|0);dB(5245572,5243692,bq(5243692)|0);c[1311836]=5245560;d=c[1311836]|0;return d|0}function i1(b){b=b|0;var c=0;if(a[5255620]<<24>>24!=0){return 5247408}if((bf(5255620)|0)==0){return 5247408}a[5247408]=16;b=5247409;c=b|0;A=623865125;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;c=b+4|0;A=2032480100;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;a[5247417]=0;a1(716,5247408,u|0);return 5247408}function i2(b){b=b|0;var c=0;if(a[5255644]<<24>>24!=0){return 5247444}if((bf(5255644)|0)==0){return 5247444}a[5247444]=16;b=5247445;c=b|0;A=624576549;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;c=b+4|0;A=1394948685;a[c]=A&255;A=A>>8;a[c+1|0]=A&255;A=A>>8;a[c+2|0]=A&255;A=A>>8;a[c+3|0]=A&255;a[5247453]=0;a1(716,5247444,u|0);return 5247444}function i3(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;d=bq(5244028)|0;if(d>>>0>1073741822){dp(0)}if(d>>>0<2){a[b]=d<<1&255;e=b+4|0}else{f=d+4&-4;g=jJ(f<<2)|0;c[b+8>>2]=g;c[b>>2]=f|1;c[b+4>>2]=d;e=g}bL(e|0,5244028,d|0);c[e+(d<<2)>>2]=0;return}function i4(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;d=bq(5243996)|0;if(d>>>0>1073741822){dp(0)}if(d>>>0<2){a[b]=d<<1&255;e=b+4|0}else{f=d+4&-4;g=jJ(f<<2)|0;c[b+8>>2]=g;c[b>>2]=f|1;c[b+4>>2]=d;e=g}bL(e|0,5243996,d|0);c[e+(d<<2)>>2]=0;return}function i5(b){b=b|0;var d=0,e=0,f=0;if(a[5255564]<<24>>24!=0){return 5247348}if((bf(5255564)|0)==0){return 5247348}b=bq(5243960)|0;if(b>>>0>1073741822){dp(0)}if(b>>>0<2){a[5247348]=b<<1&255;d=5247352}else{e=b+4&-4;f=jJ(e<<2)|0;c[1311839]=f;c[1311837]=e|1;c[1311838]=b;d=f}bL(d|0,5243960,b|0);c[d+(b<<2)>>2]=0;a1(486,5247348,u|0);return 5247348}function i6(a){a=a|0;return 5244116}function i7(a){a=a|0;return}function i8(a){a=a|0;return}function i9(a){a=a|0;return}function ja(b){b=b|0;if(a[5255636]<<24>>24!=0){return 5247432}if((bf(5255636)|0)==0){return 5247432}b=jJ(32)|0;c[1311860]=b;c[1311858]=33;c[1311859]=20;jT(b|0,5243884,20);a[b+20|0]=0;a1(716,5247432,u|0);return 5247432}function jb(b){b=b|0;if(a[5255628]<<24>>24!=0){return 5247420}if((bf(5255628)|0)==0){return 5247420}b=jJ(16)|0;c[1311857]=b;c[1311855]=17;c[1311856]=11;jT(b|0,5243788,11);a[b+11|0]=0;a1(716,5247420,u|0);return 5247420}function jc(a){a=a|0;var b=0,d=0,e=0;b=a+4|0;d=(c[a>>2]|0)+(c[b+4>>2]|0)|0;a=d;e=c[b>>2]|0;if((e&1|0)==0){b=e;b_[b&1023](a);return}else{b=c[(c[d>>2]|0)+(e-1|0)>>2]|0;b_[b&1023](a);return}}function jd(b){b=b|0;var d=0;b=5245848;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jM(c[b-12+8>>2]|0)}if((d|0)==5245560){break}else{b=d}}return}function je(b){b=b|0;var d=0;b=5246592;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jM(c[b-12+8>>2]|0)}if((d|0)==5246304){break}else{b=d}}return}function jf(b){b=b|0;var d=0;b=5245392;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jM(c[b-12+8>>2]|0)}if((d|0)==5245104){break}else{b=d}}return}function jg(b){b=b|0;var d=0;b=5246136;while(1){d=b-12|0;if((a[d]&1)<<24>>24!=0){jM(c[b-12+8>>2]|0)}if((d|0)==5245848){break}else{b=d}}return}function jh(b){b=b|0;if((a[5245548]&1)<<24>>24!=0){jM(c[1311389]|0)}if((a[5245536]&1)<<24>>24!=0){jM(c[1311386]|0)}if((a[5245524]&1)<<24>>24!=0){jM(c[1311383]|0)}if((a[5245512]&1)<<24>>24!=0){jM(c[1311380]|0)}if((a[5245500]&1)<<24>>24!=0){jM(c[1311377]|0)}if((a[5245488]&1)<<24>>24!=0){jM(c[1311374]|0)}if((a[5245476]&1)<<24>>24!=0){jM(c[1311371]|0)}if((a[5245464]&1)<<24>>24!=0){jM(c[1311368]|0)}if((a[5245452]&1)<<24>>24!=0){jM(c[1311365]|0)}if((a[5245440]&1)<<24>>24!=0){jM(c[1311362]|0)}if((a[5245428]&1)<<24>>24!=0){jM(c[1311359]|0)}if((a[5245416]&1)<<24>>24!=0){jM(c[1311356]|0)}if((a[5245404]&1)<<24>>24!=0){jM(c[1311353]|0)}if((a[5245392]&1)<<24>>24==0){return}jM(c[1311350]|0);return}function ji(b){b=b|0;if((a[5246292]&1)<<24>>24!=0){jM(c[1311575]|0)}if((a[5246280]&1)<<24>>24!=0){jM(c[1311572]|0)}if((a[5246268]&1)<<24>>24!=0){jM(c[1311569]|0)}if((a[5246256]&1)<<24>>24!=0){jM(c[1311566]|0)}if((a[5246244]&1)<<24>>24!=0){jM(c[1311563]|0)}if((a[5246232]&1)<<24>>24!=0){jM(c[1311560]|0)}if((a[5246220]&1)<<24>>24!=0){jM(c[1311557]|0)}if((a[5246208]&1)<<24>>24!=0){jM(c[1311554]|0)}if((a[5246196]&1)<<24>>24!=0){jM(c[1311551]|0)}if((a[5246184]&1)<<24>>24!=0){jM(c[1311548]|0)}if((a[5246172]&1)<<24>>24!=0){jM(c[1311545]|0)}if((a[5246160]&1)<<24>>24!=0){jM(c[1311542]|0)}if((a[5246148]&1)<<24>>24!=0){jM(c[1311539]|0)}if((a[5246136]&1)<<24>>24==0){return}jM(c[1311536]|0);return}function jj(a){a=a|0;jM(a);return}function jk(a){a=a|0;return}function jl(a){a=a|0;jM(a);return}function jm(a){a=a|0;jM(a);return}function jn(a){a=a|0;jM(a);return}function jo(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+56|0;f=e|0;do{if((a|0)==(b|0)){g=1}else{if((b|0)==0){g=0;break}h=jx(b,5254144,5254132,-1)|0;j=h;if((h|0)==0){g=0;break}jS(f|0,0,56);c[f>>2]=j;c[f+8>>2]=a;c[f+12>>2]=-1;c[f+48>>2]=1;cc[c[(c[h>>2]|0)+28>>2]&1023](j,f,c[d>>2]|0,1);if((c[f+24>>2]|0)!=1){g=0;break}c[d>>2]=c[f+16>>2]|0;g=1}}while(0);i=e;return g|0}function jp(b){b=b|0;var d=0,e=0,f=0;if(a[5255588]<<24>>24!=0){return 5247384}if((bf(5255588)|0)==0){return 5247384}b=bq(5243908)|0;if(b>>>0>1073741822){dp(0)}if(b>>>0<2){a[5247384]=b<<1&255;d=5247388}else{e=b+4&-4;f=jJ(e<<2)|0;c[1311848]=f;c[1311846]=e|1;c[1311847]=b;d=f}bL(d|0,5243908,b|0);c[d+(b<<2)>>2]=0;a1(486,5247384,u|0);return 5247384}function jq(b){b=b|0;var d=0,e=0,f=0;if(a[5255580]<<24>>24!=0){return 5247372}if((bf(5255580)|0)==0){return 5247372}b=bq(5243800)|0;if(b>>>0>1073741822){dp(0)}if(b>>>0<2){a[5247372]=b<<1&255;d=5247376}else{e=b+4&-4;f=jJ(e<<2)|0;c[1311845]=f;c[1311843]=e|1;c[1311844]=b;d=f}bL(d|0,5243800,b|0);c[d+(b<<2)>>2]=0;a1(486,5247372,u|0);return 5247372}function jr(b){b=b|0;var d=0,e=0,f=0;if(a[5255572]<<24>>24!=0){return 5247360}if((bf(5255572)|0)==0){return 5247360}b=bq(5243740)|0;if(b>>>0>1073741822){dp(0)}if(b>>>0<2){a[5247360]=b<<1&255;d=5247364}else{e=b+4&-4;f=jJ(e<<2)|0;c[1311842]=f;c[1311840]=e|1;c[1311841]=b;d=f}bL(d|0,5243740,b|0);c[d+(b<<2)>>2]=0;a1(486,5247360,u|0);return 5247360}function js(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;e=b+8|0;f=b+4|0;g=c[f>>2]|0;h=c[e>>2]|0;i=g;if(h-i>>2>>>0>=d>>>0){j=d;k=g;while(1){if((k|0)==0){l=0}else{c[k>>2]=0;l=c[f>>2]|0}g=l+4|0;c[f>>2]=g;m=j-1|0;if((m|0)==0){break}else{j=m;k=g}}return}k=b+12|0;j=b|0;l=c[j>>2]|0;g=i-l>>2;i=g+d|0;if(i>>>0>1073741823){hC(0)}m=h-l|0;do{if(m>>2>>>0>536870910){n=1073741823;o=1653}else{l=m>>1;h=l>>>0<i>>>0?i:l;if((h|0)==0){p=0;q=0;break}l=b+124|0;if(!((a[l]&1)<<24>>24==0&h>>>0<29)){n=h;o=1653;break}a[l]=1;p=k;q=h;break}}while(0);if((o|0)==1653){p=jJ(n<<2)|0;q=n}n=d;d=p+(g<<2)|0;while(1){if((d|0)==0){r=0}else{c[d>>2]=0;r=d}s=r+4|0;o=n-1|0;if((o|0)==0){break}else{n=o;d=s}}d=c[j>>2]|0;n=(c[f>>2]|0)-d|0;r=p+(g-(n>>2)<<2)|0;g=d;jT(r|0,g|0,n|0);c[j>>2]=r;c[f>>2]=s;c[e>>2]=p+(q<<2)|0;if((d|0)==0){return}if((d|0)==(k|0)){a[b+124|0]=0;return}else{jM(g);return}}function jt(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((c[d+8>>2]|0)!=(b|0)){return}b=d+16|0;g=c[b>>2]|0;if((g|0)==0){c[b>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((g|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function ju(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;if((c[d+8>>2]|0)==(b|0)){if((c[d+4>>2]|0)!=(e|0)){return}g=d+28|0;if((c[g>>2]|0)==1){return}c[g>>2]=f;return}if((c[d>>2]|0)!=(b|0)){return}do{if((c[d+16>>2]|0)!=(e|0)){b=d+20|0;if((c[b>>2]|0)==(e|0)){break}c[d+32>>2]=f;c[b>>2]=e;b=d+40|0;c[b>>2]=(c[b>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){break}a[d+54|0]=1}}while(0);c[d+44>>2]=4;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function jv(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0;if((b|0)!=(c[d+8>>2]|0)){g=c[b+8>>2]|0;cc[c[(c[g>>2]|0)+28>>2]&1023](g,d,e,f);return}g=d+16|0;b=c[g>>2]|0;if((b|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}e=d+24|0;if((c[e>>2]|0)!=2){return}c[e>>2]=f;return}function jw(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0;if((b|0)==(c[d+8>>2]|0)){g=d+16|0;h=c[g>>2]|0;if((h|0)==0){c[g>>2]=e;c[d+24>>2]=f;c[d+36>>2]=1;return}if((h|0)!=(e|0)){h=d+36|0;c[h>>2]=(c[h>>2]|0)+1|0;c[d+24>>2]=2;a[d+54|0]=1;return}h=d+24|0;if((c[h>>2]|0)!=2){return}c[h>>2]=f;return}h=c[b+12>>2]|0;g=b+16+(h<<3)|0;i=c[b+20>>2]|0;j=i>>8;if((i&1|0)==0){k=j}else{k=c[(c[e>>2]|0)+j>>2]|0}j=c[b+16>>2]|0;cc[c[(c[j>>2]|0)+28>>2]&1023](j,d,e+k|0,(i&2|0)!=0?f:2);if((h|0)<=1){return}h=d+54|0;i=e;k=b+24|0;while(1){b=c[k+4>>2]|0;j=b>>8;if((b&1|0)==0){l=j}else{l=c[(c[i>>2]|0)+j>>2]|0}j=c[k>>2]|0;cc[c[(c[j>>2]|0)+28>>2]&1023](j,d,e+l|0,(b&2|0)!=0?f:2);if((a[h]&1)<<24>>24!=0){m=1733;break}b=k+8|0;if(b>>>0<g>>>0){k=b}else{m=1732;break}}if((m|0)==1733){return}else if((m|0)==1732){return}}function jx(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+56|0;g=f|0;h=c[a>>2]|0;j=a+(c[h-8>>2]|0)|0;k=c[h-4>>2]|0;h=k;c[g>>2]=d;c[g+4>>2]=a;c[g+8>>2]=b;c[g+12>>2]=e;e=g+16|0;b=g+20|0;a=g+24|0;l=g+28|0;m=g+32|0;n=g+40|0;jS(e|0,0,39);if((k|0)==(d|0)){c[g+48>>2]=1;b9[c[(c[k>>2]|0)+20>>2]&1023](h,g,j,j,1,0);i=f;return((c[a>>2]|0)==1?j:0)|0}bZ[c[(c[k>>2]|0)+24>>2]&1023](h,g,j,1,0);j=c[g+36>>2]|0;do{if((j|0)==0){if((c[n>>2]|0)!=1){o=0;break}if((c[l>>2]|0)!=1){o=0;break}o=(c[m>>2]|0)==1?c[b>>2]|0:0}else if((j|0)==1){if((c[a>>2]|0)!=1){if((c[n>>2]|0)!=0){o=0;break}if((c[l>>2]|0)!=1){o=0;break}if((c[m>>2]|0)!=1){o=0;break}}o=c[e>>2]|0}else{o=0}}while(0);i=f;return o|0}function jy(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)==(c[d>>2]|0)){do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=c[b+12>>2]|0;k=b+16+(j<<3)|0;L1957:do{if((j|0)>0){l=d+52|0;m=d+53|0;n=d+54|0;o=b+8|0;p=d+24|0;q=e;r=0;s=b+16|0;t=0;L1959:while(1){a[l]=0;a[m]=0;u=c[s+4>>2]|0;v=u>>8;if((u&1|0)==0){w=v}else{w=c[(c[q>>2]|0)+v>>2]|0}v=c[s>>2]|0;b9[c[(c[v>>2]|0)+20>>2]&1023](v,d,e,e+w|0,2-(u>>>1&1)|0,g);if((a[n]&1)<<24>>24!=0){x=t;y=r;break}do{if((a[m]&1)<<24>>24==0){z=t;A=r}else{if((a[l]&1)<<24>>24==0){if((c[o>>2]&1|0)==0){x=1;y=r;break L1959}else{z=1;A=r;break}}if((c[p>>2]|0)==1){break L1957}if((c[o>>2]&2|0)==0){break L1957}else{z=1;A=1}}}while(0);u=s+8|0;if(u>>>0<k>>>0){r=A;s=u;t=z}else{x=z;y=A;break}}if((y&1)<<24>>24==0){B=x;C=1772;break}else{D=x;C=1775;break}}else{B=0;C=1772}}while(0);do{if((C|0)==1772){c[h>>2]=e;k=d+40|0;c[k>>2]=(c[k>>2]|0)+1|0;if((c[d+36>>2]|0)!=1){D=B;C=1775;break}if((c[d+24>>2]|0)!=2){D=B;C=1775;break}a[d+54|0]=1;D=B;C=1775;break}}while(0);do{if((C|0)==1775){if((D&1)<<24>>24!=0){break}c[i>>2]=4;return}}while(0);c[i>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}D=c[b+12>>2]|0;B=b+16+(D<<3)|0;x=c[b+20>>2]|0;y=x>>8;if((x&1|0)==0){E=y}else{E=c[(c[e>>2]|0)+y>>2]|0}y=c[b+16>>2]|0;bZ[c[(c[y>>2]|0)+24>>2]&1023](y,d,e+E|0,(x&2|0)!=0?f:2,g);x=b+24|0;if((D|0)<=1){return}D=c[b+8>>2]|0;do{if((D&2|0)==0){b=d+36|0;if((c[b>>2]|0)==1){break}if((D&1|0)==0){E=d+54|0;y=e;A=x;while(1){if((a[E]&1)<<24>>24!=0){C=1810;break}if((c[b>>2]|0)==1){C=1815;break}z=c[A+4>>2]|0;w=z>>8;if((z&1|0)==0){F=w}else{F=c[(c[y>>2]|0)+w>>2]|0}w=c[A>>2]|0;bZ[c[(c[w>>2]|0)+24>>2]&1023](w,d,e+F|0,(z&2|0)!=0?f:2,g);z=A+8|0;if(z>>>0<B>>>0){A=z}else{C=1806;break}}if((C|0)==1806){return}else if((C|0)==1810){return}else if((C|0)==1815){return}}A=d+24|0;y=d+54|0;E=e;i=x;while(1){if((a[y]&1)<<24>>24!=0){C=1808;break}if((c[b>>2]|0)==1){if((c[A>>2]|0)==1){C=1819;break}}z=c[i+4>>2]|0;w=z>>8;if((z&1|0)==0){G=w}else{G=c[(c[E>>2]|0)+w>>2]|0}w=c[i>>2]|0;bZ[c[(c[w>>2]|0)+24>>2]&1023](w,d,e+G|0,(z&2|0)!=0?f:2,g);z=i+8|0;if(z>>>0<B>>>0){i=z}else{C=1804;break}}if((C|0)==1819){return}else if((C|0)==1804){return}else if((C|0)==1808){return}}}while(0);G=d+54|0;F=e;D=x;while(1){if((a[G]&1)<<24>>24!=0){C=1814;break}x=c[D+4>>2]|0;i=x>>8;if((x&1|0)==0){H=i}else{H=c[(c[F>>2]|0)+i>>2]|0}i=c[D>>2]|0;bZ[c[(c[i>>2]|0)+24>>2]&1023](i,d,e+H|0,(x&2|0)!=0?f:2,g);x=D+8|0;if(x>>>0<B>>>0){D=x}else{C=1812;break}}if((C|0)==1812){return}else if((C|0)==1814){return}}function jz(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0,m=0,n=0;h=b|0;if((h|0)==(c[d+8>>2]|0)){if((c[d+4>>2]|0)!=(e|0)){return}i=d+28|0;if((c[i>>2]|0)==1){return}c[i>>2]=f;return}if((h|0)!=(c[d>>2]|0)){h=c[b+8>>2]|0;bZ[c[(c[h>>2]|0)+24>>2]&1023](h,d,e,f,g);return}do{if((c[d+16>>2]|0)!=(e|0)){h=d+20|0;if((c[h>>2]|0)==(e|0)){break}c[d+32>>2]=f;i=d+44|0;if((c[i>>2]|0)==4){return}j=d+52|0;a[j]=0;k=d+53|0;a[k]=0;l=c[b+8>>2]|0;b9[c[(c[l>>2]|0)+20>>2]&1023](l,d,e,e,1,g);do{if((a[k]&1)<<24>>24==0){m=0;n=1832}else{if((a[j]&1)<<24>>24==0){m=1;n=1832;break}else{break}}}while(0);L2058:do{if((n|0)==1832){c[h>>2]=e;j=d+40|0;c[j>>2]=(c[j>>2]|0)+1|0;do{if((c[d+36>>2]|0)==1){if((c[d+24>>2]|0)!=2){n=1835;break}a[d+54|0]=1;if(m){break L2058}else{break}}else{n=1835}}while(0);if((n|0)==1835){if(m){break}}c[i>>2]=4;return}}while(0);c[i>>2]=3;return}}while(0);if((f|0)!=1){return}c[d+32>>2]=1;return}function jA(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0;if((c[d+8>>2]|0)!=(b|0)){return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;b=c[f>>2]|0;if((b|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((b|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;b=c[e>>2]|0;if((b|0)==2){c[e>>2]=g;i=g}else{i=b}if(!((c[d+48>>2]|0)==1&(i|0)==1)){return}a[d+54|0]=1;return}function jB(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;if((b|0)!=(c[d+8>>2]|0)){i=d+52|0;j=a[i]&1;k=d+53|0;l=a[k]&1;m=c[b+12>>2]|0;n=b+16+(m<<3)|0;a[i]=0;a[k]=0;o=c[b+20>>2]|0;p=o>>8;if((o&1|0)==0){q=p}else{q=c[(c[f>>2]|0)+p>>2]|0}p=c[b+16>>2]|0;b9[c[(c[p>>2]|0)+20>>2]&1023](p,d,e,f+q|0,(o&2|0)!=0?g:2,h);L2105:do{if((m|0)>1){o=d+24|0;q=b+8|0;p=d+54|0;r=f;s=b+24|0;while(1){if((a[p]&1)<<24>>24!=0){break L2105}do{if((a[i]&1)<<24>>24==0){if((a[k]&1)<<24>>24==0){break}if((c[q>>2]&1|0)==0){break L2105}}else{if((c[o>>2]|0)==1){break L2105}if((c[q>>2]&2|0)==0){break L2105}}}while(0);a[i]=0;a[k]=0;t=c[s+4>>2]|0;u=t>>8;if((t&1|0)==0){v=u}else{v=c[(c[r>>2]|0)+u>>2]|0}u=c[s>>2]|0;b9[c[(c[u>>2]|0)+20>>2]&1023](u,d,e,f+v|0,(t&2|0)!=0?g:2,h);t=s+8|0;if(t>>>0<n>>>0){s=t}else{break L2105}}}}while(0);a[i]=j;a[k]=l;return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;l=c[f>>2]|0;if((l|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((l|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;l=c[e>>2]|0;if((l|0)==2){c[e>>2]=g;w=g}else{w=l}if(!((c[d+48>>2]|0)==1&(w|0)==1)){return}a[d+54|0]=1;return}function jC(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var i=0,j=0;if((b|0)!=(c[d+8>>2]|0)){i=c[b+8>>2]|0;b9[c[(c[i>>2]|0)+20>>2]&1023](i,d,e,f,g,h);return}a[d+53|0]=1;if((c[d+4>>2]|0)!=(f|0)){return}a[d+52|0]=1;f=d+16|0;h=c[f>>2]|0;if((h|0)==0){c[f>>2]=e;c[d+24>>2]=g;c[d+36>>2]=1;if(!((c[d+48>>2]|0)==1&(g|0)==1)){return}a[d+54|0]=1;return}if((h|0)!=(e|0)){e=d+36|0;c[e>>2]=(c[e>>2]|0)+1|0;a[d+54|0]=1;return}e=d+24|0;h=c[e>>2]|0;if((h|0)==2){c[e>>2]=g;j=g}else{j=h}if(!((c[d+48>>2]|0)==1&(j|0)==1)){return}a[d+54|0]=1;return}function jD(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0,au=0,av=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0;do{if(a>>>0<245){if(a>>>0<11){b=16}else{b=a+11&-8}d=b>>>3;e=c[1311158]|0;f=e>>>(d>>>0);if((f&3|0)!=0){g=(f&1^1)+d|0;h=g<<1;i=5244672+(h<<2)|0;j=5244672+(h+2<<2)|0;h=c[j>>2]|0;k=h+8|0;l=c[k>>2]|0;do{if((i|0)==(l|0)){c[1311158]=e&(1<<g^-1)}else{if(l>>>0<(c[1311162]|0)>>>0){bI();return 0}m=l+12|0;if((c[m>>2]|0)==(h|0)){c[m>>2]=i;c[j>>2]=l;break}else{bI();return 0}}}while(0);l=g<<3;c[h+4>>2]=l|3;j=h+(l|4)|0;c[j>>2]=c[j>>2]|1;n=k;return n|0}if(b>>>0<=(c[1311160]|0)>>>0){o=b;break}if((f|0)!=0){j=2<<d;l=f<<d&(j|-j);j=(l&-l)-1|0;l=j>>>12&16;i=j>>>(l>>>0);j=i>>>5&8;m=i>>>(j>>>0);i=m>>>2&4;p=m>>>(i>>>0);m=p>>>1&2;q=p>>>(m>>>0);p=q>>>1&1;r=(j|l|i|m|p)+(q>>>(p>>>0))|0;p=r<<1;q=5244672+(p<<2)|0;m=5244672+(p+2<<2)|0;p=c[m>>2]|0;i=p+8|0;l=c[i>>2]|0;do{if((q|0)==(l|0)){c[1311158]=e&(1<<r^-1)}else{if(l>>>0<(c[1311162]|0)>>>0){bI();return 0}j=l+12|0;if((c[j>>2]|0)==(p|0)){c[j>>2]=q;c[m>>2]=l;break}else{bI();return 0}}}while(0);l=r<<3;m=l-b|0;c[p+4>>2]=b|3;q=p;e=q+b|0;c[q+(b|4)>>2]=m|1;c[q+l>>2]=m;l=c[1311160]|0;if((l|0)!=0){q=c[1311163]|0;d=l>>>3;l=d<<1;f=5244672+(l<<2)|0;k=c[1311158]|0;h=1<<d;do{if((k&h|0)==0){c[1311158]=k|h;s=f;t=5244672+(l+2<<2)|0}else{d=5244672+(l+2<<2)|0;g=c[d>>2]|0;if(g>>>0>=(c[1311162]|0)>>>0){s=g;t=d;break}bI();return 0}}while(0);c[t>>2]=q;c[s+12>>2]=q;c[q+8>>2]=s;c[q+12>>2]=f}c[1311160]=m;c[1311163]=e;n=i;return n|0}l=c[1311159]|0;if((l|0)==0){o=b;break}h=(l&-l)-1|0;l=h>>>12&16;k=h>>>(l>>>0);h=k>>>5&8;p=k>>>(h>>>0);k=p>>>2&4;r=p>>>(k>>>0);p=r>>>1&2;d=r>>>(p>>>0);r=d>>>1&1;g=c[5244936+((h|l|k|p|r)+(d>>>(r>>>0))<<2)>>2]|0;r=g;d=g;p=(c[g+4>>2]&-8)-b|0;while(1){g=c[r+16>>2]|0;if((g|0)==0){k=c[r+20>>2]|0;if((k|0)==0){break}else{u=k}}else{u=g}g=(c[u+4>>2]&-8)-b|0;k=g>>>0<p>>>0;r=u;d=k?u:d;p=k?g:p}r=d;i=c[1311162]|0;if(r>>>0<i>>>0){bI();return 0}e=r+b|0;m=e;if(r>>>0>=e>>>0){bI();return 0}e=c[d+24>>2]|0;f=c[d+12>>2]|0;L2348:do{if((f|0)==(d|0)){q=d+20|0;g=c[q>>2]|0;do{if((g|0)==0){k=d+16|0;l=c[k>>2]|0;if((l|0)==0){v=0;break L2348}else{w=l;x=k;break}}else{w=g;x=q}}while(0);while(1){q=w+20|0;g=c[q>>2]|0;if((g|0)!=0){w=g;x=q;continue}q=w+16|0;g=c[q>>2]|0;if((g|0)==0){break}else{w=g;x=q}}if(x>>>0<i>>>0){bI();return 0}else{c[x>>2]=0;v=w;break}}else{q=c[d+8>>2]|0;if(q>>>0<i>>>0){bI();return 0}g=q+12|0;if((c[g>>2]|0)!=(d|0)){bI();return 0}k=f+8|0;if((c[k>>2]|0)==(d|0)){c[g>>2]=f;c[k>>2]=q;v=f;break}else{bI();return 0}}}while(0);L2370:do{if((e|0)!=0){f=d+28|0;i=5244936+(c[f>>2]<<2)|0;do{if((d|0)==(c[i>>2]|0)){c[i>>2]=v;if((v|0)!=0){break}c[1311159]=c[1311159]&(1<<c[f>>2]^-1);break L2370}else{if(e>>>0<(c[1311162]|0)>>>0){bI();return 0}q=e+16|0;if((c[q>>2]|0)==(d|0)){c[q>>2]=v}else{c[e+20>>2]=v}if((v|0)==0){break L2370}}}while(0);if(v>>>0<(c[1311162]|0)>>>0){bI();return 0}c[v+24>>2]=e;f=c[d+16>>2]|0;do{if((f|0)!=0){if(f>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[v+16>>2]=f;c[f+24>>2]=v;break}}}while(0);f=c[d+20>>2]|0;if((f|0)==0){break}if(f>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[v+20>>2]=f;c[f+24>>2]=v;break}}}while(0);if(p>>>0<16){e=p+b|0;c[d+4>>2]=e|3;f=r+(e+4|0)|0;c[f>>2]=c[f>>2]|1}else{c[d+4>>2]=b|3;c[r+(b|4)>>2]=p|1;c[r+(p+b|0)>>2]=p;f=c[1311160]|0;if((f|0)!=0){e=c[1311163]|0;i=f>>>3;f=i<<1;q=5244672+(f<<2)|0;k=c[1311158]|0;g=1<<i;do{if((k&g|0)==0){c[1311158]=k|g;y=q;z=5244672+(f+2<<2)|0}else{i=5244672+(f+2<<2)|0;l=c[i>>2]|0;if(l>>>0>=(c[1311162]|0)>>>0){y=l;z=i;break}bI();return 0}}while(0);c[z>>2]=e;c[y+12>>2]=e;c[e+8>>2]=y;c[e+12>>2]=q}c[1311160]=p;c[1311163]=m}f=d+8|0;if((f|0)==0){o=b;break}else{n=f}return n|0}else{if(a>>>0>4294967231){o=-1;break}f=a+11|0;g=f&-8;k=c[1311159]|0;if((k|0)==0){o=g;break}r=-g|0;i=f>>>8;do{if((i|0)==0){A=0}else{if(g>>>0>16777215){A=31;break}f=(i+1048320|0)>>>16&8;l=i<<f;h=(l+520192|0)>>>16&4;j=l<<h;l=(j+245760|0)>>>16&2;B=(14-(h|f|l)|0)+(j<<l>>>15)|0;A=g>>>((B+7|0)>>>0)&1|B<<1}}while(0);i=c[5244936+(A<<2)>>2]|0;L2178:do{if((i|0)==0){C=0;D=r;E=0}else{if((A|0)==31){F=0}else{F=25-(A>>>1)|0}d=0;m=r;p=i;q=g<<F;e=0;while(1){B=c[p+4>>2]&-8;l=B-g|0;if(l>>>0<m>>>0){if((B|0)==(g|0)){C=p;D=l;E=p;break L2178}else{G=p;H=l}}else{G=d;H=m}l=c[p+20>>2]|0;B=c[p+16+(q>>>31<<2)>>2]|0;j=(l|0)==0|(l|0)==(B|0)?e:l;if((B|0)==0){C=G;D=H;E=j;break L2178}else{d=G;m=H;p=B;q=q<<1;e=j}}}}while(0);if((E|0)==0&(C|0)==0){i=2<<A;r=k&(i|-i);if((r|0)==0){o=g;break}i=(r&-r)-1|0;r=i>>>12&16;e=i>>>(r>>>0);i=e>>>5&8;q=e>>>(i>>>0);e=q>>>2&4;p=q>>>(e>>>0);q=p>>>1&2;m=p>>>(q>>>0);p=m>>>1&1;I=c[5244936+((i|r|e|q|p)+(m>>>(p>>>0))<<2)>>2]|0}else{I=E}L2193:do{if((I|0)==0){J=D;K=C}else{p=I;m=D;q=C;while(1){e=(c[p+4>>2]&-8)-g|0;r=e>>>0<m>>>0;i=r?e:m;e=r?p:q;r=c[p+16>>2]|0;if((r|0)!=0){p=r;m=i;q=e;continue}r=c[p+20>>2]|0;if((r|0)==0){J=i;K=e;break L2193}else{p=r;m=i;q=e}}}}while(0);if((K|0)==0){o=g;break}if(J>>>0>=((c[1311160]|0)-g|0)>>>0){o=g;break}k=K;q=c[1311162]|0;if(k>>>0<q>>>0){bI();return 0}m=k+g|0;p=m;if(k>>>0>=m>>>0){bI();return 0}e=c[K+24>>2]|0;i=c[K+12>>2]|0;L2206:do{if((i|0)==(K|0)){r=K+20|0;d=c[r>>2]|0;do{if((d|0)==0){j=K+16|0;B=c[j>>2]|0;if((B|0)==0){L=0;break L2206}else{M=B;N=j;break}}else{M=d;N=r}}while(0);while(1){r=M+20|0;d=c[r>>2]|0;if((d|0)!=0){M=d;N=r;continue}r=M+16|0;d=c[r>>2]|0;if((d|0)==0){break}else{M=d;N=r}}if(N>>>0<q>>>0){bI();return 0}else{c[N>>2]=0;L=M;break}}else{r=c[K+8>>2]|0;if(r>>>0<q>>>0){bI();return 0}d=r+12|0;if((c[d>>2]|0)!=(K|0)){bI();return 0}j=i+8|0;if((c[j>>2]|0)==(K|0)){c[d>>2]=i;c[j>>2]=r;L=i;break}else{bI();return 0}}}while(0);L2228:do{if((e|0)!=0){i=K+28|0;q=5244936+(c[i>>2]<<2)|0;do{if((K|0)==(c[q>>2]|0)){c[q>>2]=L;if((L|0)!=0){break}c[1311159]=c[1311159]&(1<<c[i>>2]^-1);break L2228}else{if(e>>>0<(c[1311162]|0)>>>0){bI();return 0}r=e+16|0;if((c[r>>2]|0)==(K|0)){c[r>>2]=L}else{c[e+20>>2]=L}if((L|0)==0){break L2228}}}while(0);if(L>>>0<(c[1311162]|0)>>>0){bI();return 0}c[L+24>>2]=e;i=c[K+16>>2]|0;do{if((i|0)!=0){if(i>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[L+16>>2]=i;c[i+24>>2]=L;break}}}while(0);i=c[K+20>>2]|0;if((i|0)==0){break}if(i>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[L+20>>2]=i;c[i+24>>2]=L;break}}}while(0);do{if(J>>>0<16){e=J+g|0;c[K+4>>2]=e|3;i=k+(e+4|0)|0;c[i>>2]=c[i>>2]|1}else{c[K+4>>2]=g|3;c[k+(g|4)>>2]=J|1;c[k+(J+g|0)>>2]=J;i=J>>>3;if(J>>>0<256){e=i<<1;q=5244672+(e<<2)|0;r=c[1311158]|0;j=1<<i;do{if((r&j|0)==0){c[1311158]=r|j;O=q;P=5244672+(e+2<<2)|0}else{i=5244672+(e+2<<2)|0;d=c[i>>2]|0;if(d>>>0>=(c[1311162]|0)>>>0){O=d;P=i;break}bI();return 0}}while(0);c[P>>2]=p;c[O+12>>2]=p;c[k+(g+8|0)>>2]=O;c[k+(g+12|0)>>2]=q;break}e=m;j=J>>>8;do{if((j|0)==0){Q=0}else{if(J>>>0>16777215){Q=31;break}r=(j+1048320|0)>>>16&8;i=j<<r;d=(i+520192|0)>>>16&4;B=i<<d;i=(B+245760|0)>>>16&2;l=(14-(d|r|i)|0)+(B<<i>>>15)|0;Q=J>>>((l+7|0)>>>0)&1|l<<1}}while(0);j=5244936+(Q<<2)|0;c[k+(g+28|0)>>2]=Q;c[k+(g+20|0)>>2]=0;c[k+(g+16|0)>>2]=0;q=c[1311159]|0;l=1<<Q;if((q&l|0)==0){c[1311159]=q|l;c[j>>2]=e;c[k+(g+24|0)>>2]=j;c[k+(g+12|0)>>2]=e;c[k+(g+8|0)>>2]=e;break}if((Q|0)==31){R=0}else{R=25-(Q>>>1)|0}l=J<<R;q=c[j>>2]|0;while(1){if((c[q+4>>2]&-8|0)==(J|0)){break}S=q+16+(l>>>31<<2)|0;j=c[S>>2]|0;if((j|0)==0){T=2071;break}else{l=l<<1;q=j}}if((T|0)==2071){if(S>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[S>>2]=e;c[k+(g+24|0)>>2]=q;c[k+(g+12|0)>>2]=e;c[k+(g+8|0)>>2]=e;break}}l=q+8|0;j=c[l>>2]|0;i=c[1311162]|0;if(q>>>0<i>>>0){bI();return 0}if(j>>>0<i>>>0){bI();return 0}else{c[j+12>>2]=e;c[l>>2]=e;c[k+(g+8|0)>>2]=j;c[k+(g+12|0)>>2]=q;c[k+(g+24|0)>>2]=0;break}}}while(0);k=K+8|0;if((k|0)==0){o=g;break}else{n=k}return n|0}}while(0);K=c[1311160]|0;if(o>>>0<=K>>>0){S=K-o|0;J=c[1311163]|0;if(S>>>0>15){R=J;c[1311163]=R+o|0;c[1311160]=S;c[R+(o+4|0)>>2]=S|1;c[R+K>>2]=S;c[J+4>>2]=o|3}else{c[1311160]=0;c[1311163]=0;c[J+4>>2]=K|3;S=J+(K+4|0)|0;c[S>>2]=c[S>>2]|1}n=J+8|0;return n|0}J=c[1311161]|0;if(o>>>0<J>>>0){S=J-o|0;c[1311161]=S;J=c[1311164]|0;K=J;c[1311164]=K+o|0;c[K+(o+4|0)>>2]=S|1;c[J+4>>2]=o|3;n=J+8|0;return n|0}do{if((c[1310738]|0)==0){J=bG(8)|0;if((J-1&J|0)==0){c[1310740]=J;c[1310739]=J;c[1310741]=-1;c[1310742]=2097152;c[1310743]=0;c[1311269]=0;c[1310738]=bV(0)&-16^1431655768;break}else{bI();return 0}}}while(0);J=o+48|0;S=c[1310740]|0;K=o+47|0;R=S+K|0;Q=-S|0;S=R&Q;if(S>>>0<=o>>>0){n=0;return n|0}O=c[1311268]|0;do{if((O|0)!=0){P=c[1311266]|0;L=P+S|0;if(L>>>0<=P>>>0|L>>>0>O>>>0){n=0}else{break}return n|0}}while(0);L2437:do{if((c[1311269]&4|0)==0){O=c[1311164]|0;L2439:do{if((O|0)==0){T=2101}else{L=O;P=5245080;while(1){U=P|0;M=c[U>>2]|0;if(M>>>0<=L>>>0){V=P+4|0;if((M+(c[V>>2]|0)|0)>>>0>L>>>0){break}}M=c[P+8>>2]|0;if((M|0)==0){T=2101;break L2439}else{P=M}}if((P|0)==0){T=2101;break}L=R-(c[1311161]|0)&Q;if(L>>>0>=2147483647){W=0;break}q=by(L|0)|0;e=(q|0)==((c[U>>2]|0)+(c[V>>2]|0)|0);X=e?q:-1;Y=e?L:0;Z=q;_=L;T=2110;break}}while(0);do{if((T|0)==2101){O=by(0)|0;if((O|0)==-1){W=0;break}g=O;L=c[1310739]|0;q=L-1|0;if((q&g|0)==0){$=S}else{$=(S-g|0)+(q+g&-L)|0}L=c[1311266]|0;g=L+$|0;if(!($>>>0>o>>>0&$>>>0<2147483647)){W=0;break}q=c[1311268]|0;if((q|0)!=0){if(g>>>0<=L>>>0|g>>>0>q>>>0){W=0;break}}q=by($|0)|0;g=(q|0)==(O|0);X=g?O:-1;Y=g?$:0;Z=q;_=$;T=2110;break}}while(0);L2459:do{if((T|0)==2110){q=-_|0;if((X|0)!=-1){aa=Y;ab=X;T=2121;break L2437}do{if((Z|0)!=-1&_>>>0<2147483647&_>>>0<J>>>0){g=c[1310740]|0;O=(K-_|0)+g&-g;if(O>>>0>=2147483647){ac=_;break}if((by(O|0)|0)==-1){by(q|0);W=Y;break L2459}else{ac=O+_|0;break}}else{ac=_}}while(0);if((Z|0)==-1){W=Y}else{aa=ac;ab=Z;T=2121;break L2437}}}while(0);c[1311269]=c[1311269]|4;ad=W;T=2118;break}else{ad=0;T=2118}}while(0);do{if((T|0)==2118){if(S>>>0>=2147483647){break}W=by(S|0)|0;Z=by(0)|0;if(!((Z|0)!=-1&(W|0)!=-1&W>>>0<Z>>>0)){break}ac=Z-W|0;Z=ac>>>0>(o+40|0)>>>0;Y=Z?W:-1;if((Y|0)==-1){break}else{aa=Z?ac:ad;ab=Y;T=2121;break}}}while(0);do{if((T|0)==2121){ad=(c[1311266]|0)+aa|0;c[1311266]=ad;if(ad>>>0>(c[1311267]|0)>>>0){c[1311267]=ad}ad=c[1311164]|0;L2479:do{if((ad|0)==0){S=c[1311162]|0;if((S|0)==0|ab>>>0<S>>>0){c[1311162]=ab}c[1311270]=ab;c[1311271]=aa;c[1311273]=0;c[1311167]=c[1310738]|0;c[1311166]=-1;S=0;while(1){Y=S<<1;ac=5244672+(Y<<2)|0;c[5244672+(Y+3<<2)>>2]=ac;c[5244672+(Y+2<<2)>>2]=ac;ac=S+1|0;if((ac|0)==32){break}else{S=ac}}S=ab+8|0;if((S&7|0)==0){ae=0}else{ae=-S&7}S=(aa-40|0)-ae|0;c[1311164]=ab+ae|0;c[1311161]=S;c[ab+(ae+4|0)>>2]=S|1;c[ab+(aa-36|0)>>2]=40;c[1311165]=c[1310742]|0}else{S=5245080;while(1){af=c[S>>2]|0;ag=S+4|0;ah=c[ag>>2]|0;if((ab|0)==(af+ah|0)){T=2133;break}ac=c[S+8>>2]|0;if((ac|0)==0){break}else{S=ac}}do{if((T|0)==2133){if((c[S+12>>2]&8|0)!=0){break}ac=ad;if(!(ac>>>0>=af>>>0&ac>>>0<ab>>>0)){break}c[ag>>2]=ah+aa|0;ac=c[1311164]|0;Y=(c[1311161]|0)+aa|0;Z=ac;W=ac+8|0;if((W&7|0)==0){ai=0}else{ai=-W&7}W=Y-ai|0;c[1311164]=Z+ai|0;c[1311161]=W;c[Z+(ai+4|0)>>2]=W|1;c[Z+(Y+4|0)>>2]=40;c[1311165]=c[1310742]|0;break L2479}}while(0);if(ab>>>0<(c[1311162]|0)>>>0){c[1311162]=ab}S=ab+aa|0;Y=5245080;while(1){aj=Y|0;if((c[aj>>2]|0)==(S|0)){T=2143;break}Z=c[Y+8>>2]|0;if((Z|0)==0){break}else{Y=Z}}do{if((T|0)==2143){if((c[Y+12>>2]&8|0)!=0){break}c[aj>>2]=ab;S=Y+4|0;c[S>>2]=(c[S>>2]|0)+aa|0;S=ab+8|0;if((S&7|0)==0){ak=0}else{ak=-S&7}S=ab+(aa+8|0)|0;if((S&7|0)==0){al=0}else{al=-S&7}S=ab+(al+aa|0)|0;Z=S;W=ak+o|0;ac=ab+W|0;_=ac;K=(S-(ab+ak|0)|0)-o|0;c[ab+(ak+4|0)>>2]=o|3;do{if((Z|0)==(c[1311164]|0)){J=(c[1311161]|0)+K|0;c[1311161]=J;c[1311164]=_;c[ab+(W+4|0)>>2]=J|1}else{if((Z|0)==(c[1311163]|0)){J=(c[1311160]|0)+K|0;c[1311160]=J;c[1311163]=_;c[ab+(W+4|0)>>2]=J|1;c[ab+(J+W|0)>>2]=J;break}J=aa+4|0;X=c[ab+(J+al|0)>>2]|0;if((X&3|0)==1){$=X&-8;V=X>>>3;L2524:do{if(X>>>0<256){U=c[ab+((al|8)+aa|0)>>2]|0;Q=c[ab+((aa+12|0)+al|0)>>2]|0;R=5244672+(V<<1<<2)|0;do{if((U|0)!=(R|0)){if(U>>>0<(c[1311162]|0)>>>0){bI();return 0}if((c[U+12>>2]|0)==(Z|0)){break}bI();return 0}}while(0);if((Q|0)==(U|0)){c[1311158]=c[1311158]&(1<<V^-1);break}do{if((Q|0)==(R|0)){am=Q+8|0}else{if(Q>>>0<(c[1311162]|0)>>>0){bI();return 0}q=Q+8|0;if((c[q>>2]|0)==(Z|0)){am=q;break}bI();return 0}}while(0);c[U+12>>2]=Q;c[am>>2]=U}else{R=S;q=c[ab+((al|24)+aa|0)>>2]|0;P=c[ab+((aa+12|0)+al|0)>>2]|0;L2545:do{if((P|0)==(R|0)){O=al|16;g=ab+(J+O|0)|0;L=c[g>>2]|0;do{if((L|0)==0){e=ab+(O+aa|0)|0;M=c[e>>2]|0;if((M|0)==0){an=0;break L2545}else{ao=M;ap=e;break}}else{ao=L;ap=g}}while(0);while(1){g=ao+20|0;L=c[g>>2]|0;if((L|0)!=0){ao=L;ap=g;continue}g=ao+16|0;L=c[g>>2]|0;if((L|0)==0){break}else{ao=L;ap=g}}if(ap>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[ap>>2]=0;an=ao;break}}else{g=c[ab+((al|8)+aa|0)>>2]|0;if(g>>>0<(c[1311162]|0)>>>0){bI();return 0}L=g+12|0;if((c[L>>2]|0)!=(R|0)){bI();return 0}O=P+8|0;if((c[O>>2]|0)==(R|0)){c[L>>2]=P;c[O>>2]=g;an=P;break}else{bI();return 0}}}while(0);if((q|0)==0){break}P=ab+((aa+28|0)+al|0)|0;U=5244936+(c[P>>2]<<2)|0;do{if((R|0)==(c[U>>2]|0)){c[U>>2]=an;if((an|0)!=0){break}c[1311159]=c[1311159]&(1<<c[P>>2]^-1);break L2524}else{if(q>>>0<(c[1311162]|0)>>>0){bI();return 0}Q=q+16|0;if((c[Q>>2]|0)==(R|0)){c[Q>>2]=an}else{c[q+20>>2]=an}if((an|0)==0){break L2524}}}while(0);if(an>>>0<(c[1311162]|0)>>>0){bI();return 0}c[an+24>>2]=q;R=al|16;P=c[ab+(R+aa|0)>>2]|0;do{if((P|0)!=0){if(P>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[an+16>>2]=P;c[P+24>>2]=an;break}}}while(0);P=c[ab+(J+R|0)>>2]|0;if((P|0)==0){break}if(P>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[an+20>>2]=P;c[P+24>>2]=an;break}}}while(0);aq=ab+(($|al)+aa|0)|0;ar=$+K|0}else{aq=Z;ar=K}J=aq+4|0;c[J>>2]=c[J>>2]&-2;c[ab+(W+4|0)>>2]=ar|1;c[ab+(ar+W|0)>>2]=ar;J=ar>>>3;if(ar>>>0<256){V=J<<1;X=5244672+(V<<2)|0;P=c[1311158]|0;q=1<<J;do{if((P&q|0)==0){c[1311158]=P|q;as=X;at=5244672+(V+2<<2)|0}else{J=5244672+(V+2<<2)|0;U=c[J>>2]|0;if(U>>>0>=(c[1311162]|0)>>>0){as=U;at=J;break}bI();return 0}}while(0);c[at>>2]=_;c[as+12>>2]=_;c[ab+(W+8|0)>>2]=as;c[ab+(W+12|0)>>2]=X;break}V=ac;q=ar>>>8;do{if((q|0)==0){au=0}else{if(ar>>>0>16777215){au=31;break}P=(q+1048320|0)>>>16&8;$=q<<P;J=($+520192|0)>>>16&4;U=$<<J;$=(U+245760|0)>>>16&2;Q=(14-(J|P|$)|0)+(U<<$>>>15)|0;au=ar>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);q=5244936+(au<<2)|0;c[ab+(W+28|0)>>2]=au;c[ab+(W+20|0)>>2]=0;c[ab+(W+16|0)>>2]=0;X=c[1311159]|0;Q=1<<au;if((X&Q|0)==0){c[1311159]=X|Q;c[q>>2]=V;c[ab+(W+24|0)>>2]=q;c[ab+(W+12|0)>>2]=V;c[ab+(W+8|0)>>2]=V;break}if((au|0)==31){av=0}else{av=25-(au>>>1)|0}Q=ar<<av;X=c[q>>2]|0;while(1){if((c[X+4>>2]&-8|0)==(ar|0)){break}aw=X+16+(Q>>>31<<2)|0;q=c[aw>>2]|0;if((q|0)==0){T=2216;break}else{Q=Q<<1;X=q}}if((T|0)==2216){if(aw>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[aw>>2]=V;c[ab+(W+24|0)>>2]=X;c[ab+(W+12|0)>>2]=V;c[ab+(W+8|0)>>2]=V;break}}Q=X+8|0;q=c[Q>>2]|0;$=c[1311162]|0;if(X>>>0<$>>>0){bI();return 0}if(q>>>0<$>>>0){bI();return 0}else{c[q+12>>2]=V;c[Q>>2]=V;c[ab+(W+8|0)>>2]=q;c[ab+(W+12|0)>>2]=X;c[ab+(W+24|0)>>2]=0;break}}}while(0);n=ab+(ak|8)|0;return n|0}}while(0);Y=ad;W=5245080;while(1){ax=c[W>>2]|0;if(ax>>>0<=Y>>>0){ay=c[W+4>>2]|0;az=ax+ay|0;if(az>>>0>Y>>>0){break}}W=c[W+8>>2]|0}W=ax+(ay-39|0)|0;if((W&7|0)==0){aA=0}else{aA=-W&7}W=ax+((ay-47|0)+aA|0)|0;ac=W>>>0<(ad+16|0)>>>0?Y:W;W=ac+8|0;_=ab+8|0;if((_&7|0)==0){aB=0}else{aB=-_&7}_=(aa-40|0)-aB|0;c[1311164]=ab+aB|0;c[1311161]=_;c[ab+(aB+4|0)>>2]=_|1;c[ab+(aa-36|0)>>2]=40;c[1311165]=c[1310742]|0;c[ac+4>>2]=27;jT(W|0,5245080,16);c[1311270]=ab;c[1311271]=aa;c[1311273]=0;c[1311272]=W;W=ac+28|0;c[W>>2]=7;L2643:do{if((ac+32|0)>>>0<az>>>0){_=W;while(1){K=_+4|0;c[K>>2]=7;if((_+8|0)>>>0<az>>>0){_=K}else{break L2643}}}}while(0);if((ac|0)==(Y|0)){break}W=ac-ad|0;_=Y+(W+4|0)|0;c[_>>2]=c[_>>2]&-2;c[ad+4>>2]=W|1;c[Y+W>>2]=W;_=W>>>3;if(W>>>0<256){K=_<<1;Z=5244672+(K<<2)|0;S=c[1311158]|0;q=1<<_;do{if((S&q|0)==0){c[1311158]=S|q;aC=Z;aD=5244672+(K+2<<2)|0}else{_=5244672+(K+2<<2)|0;Q=c[_>>2]|0;if(Q>>>0>=(c[1311162]|0)>>>0){aC=Q;aD=_;break}bI();return 0}}while(0);c[aD>>2]=ad;c[aC+12>>2]=ad;c[ad+8>>2]=aC;c[ad+12>>2]=Z;break}K=ad;q=W>>>8;do{if((q|0)==0){aE=0}else{if(W>>>0>16777215){aE=31;break}S=(q+1048320|0)>>>16&8;Y=q<<S;ac=(Y+520192|0)>>>16&4;_=Y<<ac;Y=(_+245760|0)>>>16&2;Q=(14-(ac|S|Y)|0)+(_<<Y>>>15)|0;aE=W>>>((Q+7|0)>>>0)&1|Q<<1}}while(0);q=5244936+(aE<<2)|0;c[ad+28>>2]=aE;c[ad+20>>2]=0;c[ad+16>>2]=0;Z=c[1311159]|0;Q=1<<aE;if((Z&Q|0)==0){c[1311159]=Z|Q;c[q>>2]=K;c[ad+24>>2]=q;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}if((aE|0)==31){aF=0}else{aF=25-(aE>>>1)|0}Q=W<<aF;Z=c[q>>2]|0;while(1){if((c[Z+4>>2]&-8|0)==(W|0)){break}aG=Z+16+(Q>>>31<<2)|0;q=c[aG>>2]|0;if((q|0)==0){T=2251;break}else{Q=Q<<1;Z=q}}if((T|0)==2251){if(aG>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[aG>>2]=K;c[ad+24>>2]=Z;c[ad+12>>2]=ad;c[ad+8>>2]=ad;break}}Q=Z+8|0;W=c[Q>>2]|0;q=c[1311162]|0;if(Z>>>0<q>>>0){bI();return 0}if(W>>>0<q>>>0){bI();return 0}else{c[W+12>>2]=K;c[Q>>2]=K;c[ad+8>>2]=W;c[ad+12>>2]=Z;c[ad+24>>2]=0;break}}}while(0);ad=c[1311161]|0;if(ad>>>0<=o>>>0){break}W=ad-o|0;c[1311161]=W;ad=c[1311164]|0;Q=ad;c[1311164]=Q+o|0;c[Q+(o+4|0)>>2]=W|1;c[ad+4>>2]=o|3;n=ad+8|0;return n|0}}while(0);c[bz()>>2]=12;n=0;return n|0}function jE(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0;if((a|0)==0){return}b=a-8|0;d=b;e=c[1311162]|0;if(b>>>0<e>>>0){bI()}f=c[a-4>>2]|0;g=f&3;if((g|0)==1){bI()}h=f&-8;i=a+(h-8|0)|0;j=i;L2696:do{if((f&1|0)==0){k=c[b>>2]|0;if((g|0)==0){return}l=-8-k|0;m=a+l|0;n=m;o=k+h|0;if(m>>>0<e>>>0){bI()}if((n|0)==(c[1311163]|0)){p=a+(h-4|0)|0;if((c[p>>2]&3|0)!=3){q=n;r=o;break}c[1311160]=o;c[p>>2]=c[p>>2]&-2;c[a+(l+4|0)>>2]=o|1;c[i>>2]=o;return}p=k>>>3;if(k>>>0<256){k=c[a+(l+8|0)>>2]|0;s=c[a+(l+12|0)>>2]|0;t=5244672+(p<<1<<2)|0;do{if((k|0)!=(t|0)){if(k>>>0<e>>>0){bI()}if((c[k+12>>2]|0)==(n|0)){break}bI()}}while(0);if((s|0)==(k|0)){c[1311158]=c[1311158]&(1<<p^-1);q=n;r=o;break}do{if((s|0)==(t|0)){u=s+8|0}else{if(s>>>0<e>>>0){bI()}v=s+8|0;if((c[v>>2]|0)==(n|0)){u=v;break}bI()}}while(0);c[k+12>>2]=s;c[u>>2]=k;q=n;r=o;break}t=m;p=c[a+(l+24|0)>>2]|0;v=c[a+(l+12|0)>>2]|0;L2730:do{if((v|0)==(t|0)){w=a+(l+20|0)|0;x=c[w>>2]|0;do{if((x|0)==0){y=a+(l+16|0)|0;z=c[y>>2]|0;if((z|0)==0){A=0;break L2730}else{B=z;C=y;break}}else{B=x;C=w}}while(0);while(1){w=B+20|0;x=c[w>>2]|0;if((x|0)!=0){B=x;C=w;continue}w=B+16|0;x=c[w>>2]|0;if((x|0)==0){break}else{B=x;C=w}}if(C>>>0<e>>>0){bI()}else{c[C>>2]=0;A=B;break}}else{w=c[a+(l+8|0)>>2]|0;if(w>>>0<e>>>0){bI()}x=w+12|0;if((c[x>>2]|0)!=(t|0)){bI()}y=v+8|0;if((c[y>>2]|0)==(t|0)){c[x>>2]=v;c[y>>2]=w;A=v;break}else{bI()}}}while(0);if((p|0)==0){q=n;r=o;break}v=a+(l+28|0)|0;m=5244936+(c[v>>2]<<2)|0;do{if((t|0)==(c[m>>2]|0)){c[m>>2]=A;if((A|0)!=0){break}c[1311159]=c[1311159]&(1<<c[v>>2]^-1);q=n;r=o;break L2696}else{if(p>>>0<(c[1311162]|0)>>>0){bI()}k=p+16|0;if((c[k>>2]|0)==(t|0)){c[k>>2]=A}else{c[p+20>>2]=A}if((A|0)==0){q=n;r=o;break L2696}}}while(0);if(A>>>0<(c[1311162]|0)>>>0){bI()}c[A+24>>2]=p;t=c[a+(l+16|0)>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[1311162]|0)>>>0){bI()}else{c[A+16>>2]=t;c[t+24>>2]=A;break}}}while(0);t=c[a+(l+20|0)>>2]|0;if((t|0)==0){q=n;r=o;break}if(t>>>0<(c[1311162]|0)>>>0){bI()}else{c[A+20>>2]=t;c[t+24>>2]=A;q=n;r=o;break}}else{q=d;r=h}}while(0);d=q;if(d>>>0>=i>>>0){bI()}A=a+(h-4|0)|0;e=c[A>>2]|0;if((e&1|0)==0){bI()}do{if((e&2|0)==0){if((j|0)==(c[1311164]|0)){B=(c[1311161]|0)+r|0;c[1311161]=B;c[1311164]=q;c[q+4>>2]=B|1;if((q|0)==(c[1311163]|0)){c[1311163]=0;c[1311160]=0}if(B>>>0<=(c[1311165]|0)>>>0){return}jG(0);return}if((j|0)==(c[1311163]|0)){B=(c[1311160]|0)+r|0;c[1311160]=B;c[1311163]=q;c[q+4>>2]=B|1;c[d+B>>2]=B;return}B=(e&-8)+r|0;C=e>>>3;L2801:do{if(e>>>0<256){u=c[a+h>>2]|0;g=c[a+(h|4)>>2]|0;b=5244672+(C<<1<<2)|0;do{if((u|0)!=(b|0)){if(u>>>0<(c[1311162]|0)>>>0){bI()}if((c[u+12>>2]|0)==(j|0)){break}bI()}}while(0);if((g|0)==(u|0)){c[1311158]=c[1311158]&(1<<C^-1);break}do{if((g|0)==(b|0)){D=g+8|0}else{if(g>>>0<(c[1311162]|0)>>>0){bI()}f=g+8|0;if((c[f>>2]|0)==(j|0)){D=f;break}bI()}}while(0);c[u+12>>2]=g;c[D>>2]=u}else{b=i;f=c[a+(h+16|0)>>2]|0;t=c[a+(h|4)>>2]|0;L2822:do{if((t|0)==(b|0)){p=a+(h+12|0)|0;v=c[p>>2]|0;do{if((v|0)==0){m=a+(h+8|0)|0;k=c[m>>2]|0;if((k|0)==0){E=0;break L2822}else{F=k;G=m;break}}else{F=v;G=p}}while(0);while(1){p=F+20|0;v=c[p>>2]|0;if((v|0)!=0){F=v;G=p;continue}p=F+16|0;v=c[p>>2]|0;if((v|0)==0){break}else{F=v;G=p}}if(G>>>0<(c[1311162]|0)>>>0){bI()}else{c[G>>2]=0;E=F;break}}else{p=c[a+h>>2]|0;if(p>>>0<(c[1311162]|0)>>>0){bI()}v=p+12|0;if((c[v>>2]|0)!=(b|0)){bI()}m=t+8|0;if((c[m>>2]|0)==(b|0)){c[v>>2]=t;c[m>>2]=p;E=t;break}else{bI()}}}while(0);if((f|0)==0){break}t=a+(h+20|0)|0;u=5244936+(c[t>>2]<<2)|0;do{if((b|0)==(c[u>>2]|0)){c[u>>2]=E;if((E|0)!=0){break}c[1311159]=c[1311159]&(1<<c[t>>2]^-1);break L2801}else{if(f>>>0<(c[1311162]|0)>>>0){bI()}g=f+16|0;if((c[g>>2]|0)==(b|0)){c[g>>2]=E}else{c[f+20>>2]=E}if((E|0)==0){break L2801}}}while(0);if(E>>>0<(c[1311162]|0)>>>0){bI()}c[E+24>>2]=f;b=c[a+(h+8|0)>>2]|0;do{if((b|0)!=0){if(b>>>0<(c[1311162]|0)>>>0){bI()}else{c[E+16>>2]=b;c[b+24>>2]=E;break}}}while(0);b=c[a+(h+12|0)>>2]|0;if((b|0)==0){break}if(b>>>0<(c[1311162]|0)>>>0){bI()}else{c[E+20>>2]=b;c[b+24>>2]=E;break}}}while(0);c[q+4>>2]=B|1;c[d+B>>2]=B;if((q|0)!=(c[1311163]|0)){H=B;break}c[1311160]=B;return}else{c[A>>2]=e&-2;c[q+4>>2]=r|1;c[d+r>>2]=r;H=r}}while(0);r=H>>>3;if(H>>>0<256){d=r<<1;e=5244672+(d<<2)|0;A=c[1311158]|0;E=1<<r;do{if((A&E|0)==0){c[1311158]=A|E;I=e;J=5244672+(d+2<<2)|0}else{r=5244672+(d+2<<2)|0;h=c[r>>2]|0;if(h>>>0>=(c[1311162]|0)>>>0){I=h;J=r;break}bI()}}while(0);c[J>>2]=q;c[I+12>>2]=q;c[q+8>>2]=I;c[q+12>>2]=e;return}e=q;I=H>>>8;do{if((I|0)==0){K=0}else{if(H>>>0>16777215){K=31;break}J=(I+1048320|0)>>>16&8;d=I<<J;E=(d+520192|0)>>>16&4;A=d<<E;d=(A+245760|0)>>>16&2;r=(14-(E|J|d)|0)+(A<<d>>>15)|0;K=H>>>((r+7|0)>>>0)&1|r<<1}}while(0);I=5244936+(K<<2)|0;c[q+28>>2]=K;c[q+20>>2]=0;c[q+16>>2]=0;r=c[1311159]|0;d=1<<K;do{if((r&d|0)==0){c[1311159]=r|d;c[I>>2]=e;c[q+24>>2]=I;c[q+12>>2]=q;c[q+8>>2]=q}else{if((K|0)==31){L=0}else{L=25-(K>>>1)|0}A=H<<L;J=c[I>>2]|0;while(1){if((c[J+4>>2]&-8|0)==(H|0)){break}M=J+16+(A>>>31<<2)|0;E=c[M>>2]|0;if((E|0)==0){N=2430;break}else{A=A<<1;J=E}}if((N|0)==2430){if(M>>>0<(c[1311162]|0)>>>0){bI()}else{c[M>>2]=e;c[q+24>>2]=J;c[q+12>>2]=q;c[q+8>>2]=q;break}}A=J+8|0;B=c[A>>2]|0;E=c[1311162]|0;if(J>>>0<E>>>0){bI()}if(B>>>0<E>>>0){bI()}else{c[B+12>>2]=e;c[A>>2]=e;c[q+8>>2]=B;c[q+12>>2]=J;c[q+24>>2]=0;break}}}while(0);q=(c[1311166]|0)-1|0;c[1311166]=q;if((q|0)==0){O=5245088}else{return}while(1){q=c[O>>2]|0;if((q|0)==0){break}else{O=q+8|0}}c[1311166]=-1;return}function jF(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0;if((a|0)==0){d=jD(b)|0;return d|0}if(b>>>0>4294967231){c[bz()>>2]=12;d=0;return d|0}if(b>>>0<11){e=16}else{e=b+11&-8}f=jH(a-8|0,e)|0;if((f|0)!=0){d=f+8|0;return d|0}f=jD(b)|0;if((f|0)==0){d=0;return d|0}e=c[a-4>>2]|0;g=(e&-8)-((e&3|0)==0?8:4)|0;jT(f|0,a|0,(g>>>0<b>>>0?g:b)|0);jE(a);d=f;return d|0}function jG(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;do{if((c[1310738]|0)==0){b=bG(8)|0;if((b-1&b|0)==0){c[1310740]=b;c[1310739]=b;c[1310741]=-1;c[1310742]=2097152;c[1310743]=0;c[1311269]=0;c[1310738]=bV(0)&-16^1431655768;break}else{bI();return 0}}}while(0);if(a>>>0>=4294967232){d=0;e=d&1;return e|0}b=c[1311164]|0;if((b|0)==0){d=0;e=d&1;return e|0}f=c[1311161]|0;do{if(f>>>0>(a+40|0)>>>0){g=c[1310740]|0;h=ae(((((((-40-a|0)-1|0)+f|0)+g|0)>>>0)/(g>>>0)>>>0)-1|0,g);i=b;j=5245080;while(1){k=c[j>>2]|0;if(k>>>0<=i>>>0){if((k+(c[j+4>>2]|0)|0)>>>0>i>>>0){l=j;break}}k=c[j+8>>2]|0;if((k|0)==0){l=0;break}else{j=k}}if((c[l+12>>2]&8|0)!=0){break}j=by(0)|0;i=l+4|0;if((j|0)!=((c[l>>2]|0)+(c[i>>2]|0)|0)){break}k=by(-(h>>>0>2147483646?-2147483648-g|0:h)|0)|0;m=by(0)|0;if(!((k|0)!=-1&m>>>0<j>>>0)){break}k=j-m|0;if((j|0)==(m|0)){break}c[i>>2]=(c[i>>2]|0)-k|0;c[1311266]=(c[1311266]|0)-k|0;i=c[1311164]|0;n=(c[1311161]|0)-k|0;k=i;o=i+8|0;if((o&7|0)==0){p=0}else{p=-o&7}o=n-p|0;c[1311164]=k+p|0;c[1311161]=o;c[k+(p+4|0)>>2]=o|1;c[k+(n+4|0)>>2]=40;c[1311165]=c[1310742]|0;d=(j|0)!=(m|0);e=d&1;return e|0}}while(0);if((c[1311161]|0)>>>0<=(c[1311165]|0)>>>0){d=0;e=d&1;return e|0}c[1311165]=-1;d=0;e=d&1;return e|0}function jH(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0;d=a+4|0;e=c[d>>2]|0;f=e&-8;g=a;h=g+f|0;i=h;j=c[1311162]|0;if(g>>>0<j>>>0){bI();return 0}k=e&3;if(!((k|0)!=1&g>>>0<h>>>0)){bI();return 0}l=g+(f|4)|0;m=c[l>>2]|0;if((m&1|0)==0){bI();return 0}if((k|0)==0){if(b>>>0<256){n=0;return n|0}do{if(f>>>0>=(b+4|0)>>>0){if((f-b|0)>>>0>c[1310740]<<1>>>0){break}else{n=a}return n|0}}while(0);n=0;return n|0}if(f>>>0>=b>>>0){k=f-b|0;if(k>>>0<=15){n=a;return n|0}c[d>>2]=e&1|b|2;c[g+(b+4|0)>>2]=k|3;c[l>>2]=c[l>>2]|1;jI(g+b|0,k);n=a;return n|0}if((i|0)==(c[1311164]|0)){k=(c[1311161]|0)+f|0;if(k>>>0<=b>>>0){n=0;return n|0}l=k-b|0;c[d>>2]=e&1|b|2;c[g+(b+4|0)>>2]=l|1;c[1311164]=g+b|0;c[1311161]=l;n=a;return n|0}if((i|0)==(c[1311163]|0)){l=(c[1311160]|0)+f|0;if(l>>>0<b>>>0){n=0;return n|0}k=l-b|0;if(k>>>0>15){c[d>>2]=e&1|b|2;c[g+(b+4|0)>>2]=k|1;c[g+l>>2]=k;o=g+(l+4|0)|0;c[o>>2]=c[o>>2]&-2;p=g+b|0;q=k}else{c[d>>2]=e&1|l|2;e=g+(l+4|0)|0;c[e>>2]=c[e>>2]|1;p=0;q=0}c[1311160]=q;c[1311163]=p;n=a;return n|0}if((m&2|0)!=0){n=0;return n|0}p=(m&-8)+f|0;if(p>>>0<b>>>0){n=0;return n|0}q=p-b|0;e=m>>>3;L3022:do{if(m>>>0<256){l=c[g+(f+8|0)>>2]|0;k=c[g+(f+12|0)>>2]|0;o=5244672+(e<<1<<2)|0;do{if((l|0)!=(o|0)){if(l>>>0<j>>>0){bI();return 0}if((c[l+12>>2]|0)==(i|0)){break}bI();return 0}}while(0);if((k|0)==(l|0)){c[1311158]=c[1311158]&(1<<e^-1);break}do{if((k|0)==(o|0)){r=k+8|0}else{if(k>>>0<j>>>0){bI();return 0}s=k+8|0;if((c[s>>2]|0)==(i|0)){r=s;break}bI();return 0}}while(0);c[l+12>>2]=k;c[r>>2]=l}else{o=h;s=c[g+(f+24|0)>>2]|0;t=c[g+(f+12|0)>>2]|0;L3024:do{if((t|0)==(o|0)){u=g+(f+20|0)|0;v=c[u>>2]|0;do{if((v|0)==0){w=g+(f+16|0)|0;x=c[w>>2]|0;if((x|0)==0){y=0;break L3024}else{z=x;A=w;break}}else{z=v;A=u}}while(0);while(1){u=z+20|0;v=c[u>>2]|0;if((v|0)!=0){z=v;A=u;continue}u=z+16|0;v=c[u>>2]|0;if((v|0)==0){break}else{z=v;A=u}}if(A>>>0<j>>>0){bI();return 0}else{c[A>>2]=0;y=z;break}}else{u=c[g+(f+8|0)>>2]|0;if(u>>>0<j>>>0){bI();return 0}v=u+12|0;if((c[v>>2]|0)!=(o|0)){bI();return 0}w=t+8|0;if((c[w>>2]|0)==(o|0)){c[v>>2]=t;c[w>>2]=u;y=t;break}else{bI();return 0}}}while(0);if((s|0)==0){break}t=g+(f+28|0)|0;l=5244936+(c[t>>2]<<2)|0;do{if((o|0)==(c[l>>2]|0)){c[l>>2]=y;if((y|0)!=0){break}c[1311159]=c[1311159]&(1<<c[t>>2]^-1);break L3022}else{if(s>>>0<(c[1311162]|0)>>>0){bI();return 0}k=s+16|0;if((c[k>>2]|0)==(o|0)){c[k>>2]=y}else{c[s+20>>2]=y}if((y|0)==0){break L3022}}}while(0);if(y>>>0<(c[1311162]|0)>>>0){bI();return 0}c[y+24>>2]=s;o=c[g+(f+16|0)>>2]|0;do{if((o|0)!=0){if(o>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[y+16>>2]=o;c[o+24>>2]=y;break}}}while(0);o=c[g+(f+20|0)>>2]|0;if((o|0)==0){break}if(o>>>0<(c[1311162]|0)>>>0){bI();return 0}else{c[y+20>>2]=o;c[o+24>>2]=y;break}}}while(0);if(q>>>0<16){c[d>>2]=p|c[d>>2]&1|2;y=g+(p|4)|0;c[y>>2]=c[y>>2]|1;n=a;return n|0}else{c[d>>2]=c[d>>2]&1|b|2;c[g+(b+4|0)>>2]=q|3;d=g+(p|4)|0;c[d>>2]=c[d>>2]|1;jI(g+b|0,q);n=a;return n|0}return 0}function jI(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0;d=a;e=d+b|0;f=e;g=c[a+4>>2]|0;L3098:do{if((g&1|0)==0){h=c[a>>2]|0;if((g&3|0)==0){return}i=d+(-h|0)|0;j=i;k=h+b|0;l=c[1311162]|0;if(i>>>0<l>>>0){bI()}if((j|0)==(c[1311163]|0)){m=d+(b+4|0)|0;if((c[m>>2]&3|0)!=3){n=j;o=k;break}c[1311160]=k;c[m>>2]=c[m>>2]&-2;c[d+(4-h|0)>>2]=k|1;c[e>>2]=k;return}m=h>>>3;if(h>>>0<256){p=c[d+(8-h|0)>>2]|0;q=c[d+(12-h|0)>>2]|0;r=5244672+(m<<1<<2)|0;do{if((p|0)!=(r|0)){if(p>>>0<l>>>0){bI()}if((c[p+12>>2]|0)==(j|0)){break}bI()}}while(0);if((q|0)==(p|0)){c[1311158]=c[1311158]&(1<<m^-1);n=j;o=k;break}do{if((q|0)==(r|0)){s=q+8|0}else{if(q>>>0<l>>>0){bI()}t=q+8|0;if((c[t>>2]|0)==(j|0)){s=t;break}bI()}}while(0);c[p+12>>2]=q;c[s>>2]=p;n=j;o=k;break}r=i;m=c[d+(24-h|0)>>2]|0;t=c[d+(12-h|0)>>2]|0;L3132:do{if((t|0)==(r|0)){u=16-h|0;v=d+(u+4|0)|0;w=c[v>>2]|0;do{if((w|0)==0){x=d+u|0;y=c[x>>2]|0;if((y|0)==0){z=0;break L3132}else{A=y;B=x;break}}else{A=w;B=v}}while(0);while(1){v=A+20|0;w=c[v>>2]|0;if((w|0)!=0){A=w;B=v;continue}v=A+16|0;w=c[v>>2]|0;if((w|0)==0){break}else{A=w;B=v}}if(B>>>0<l>>>0){bI()}else{c[B>>2]=0;z=A;break}}else{v=c[d+(8-h|0)>>2]|0;if(v>>>0<l>>>0){bI()}w=v+12|0;if((c[w>>2]|0)!=(r|0)){bI()}u=t+8|0;if((c[u>>2]|0)==(r|0)){c[w>>2]=t;c[u>>2]=v;z=t;break}else{bI()}}}while(0);if((m|0)==0){n=j;o=k;break}t=d+(28-h|0)|0;l=5244936+(c[t>>2]<<2)|0;do{if((r|0)==(c[l>>2]|0)){c[l>>2]=z;if((z|0)!=0){break}c[1311159]=c[1311159]&(1<<c[t>>2]^-1);n=j;o=k;break L3098}else{if(m>>>0<(c[1311162]|0)>>>0){bI()}i=m+16|0;if((c[i>>2]|0)==(r|0)){c[i>>2]=z}else{c[m+20>>2]=z}if((z|0)==0){n=j;o=k;break L3098}}}while(0);if(z>>>0<(c[1311162]|0)>>>0){bI()}c[z+24>>2]=m;r=16-h|0;t=c[d+r>>2]|0;do{if((t|0)!=0){if(t>>>0<(c[1311162]|0)>>>0){bI()}else{c[z+16>>2]=t;c[t+24>>2]=z;break}}}while(0);t=c[d+(r+4|0)>>2]|0;if((t|0)==0){n=j;o=k;break}if(t>>>0<(c[1311162]|0)>>>0){bI()}else{c[z+20>>2]=t;c[t+24>>2]=z;n=j;o=k;break}}else{n=a;o=b}}while(0);a=c[1311162]|0;if(e>>>0<a>>>0){bI()}z=d+(b+4|0)|0;A=c[z>>2]|0;do{if((A&2|0)==0){if((f|0)==(c[1311164]|0)){B=(c[1311161]|0)+o|0;c[1311161]=B;c[1311164]=n;c[n+4>>2]=B|1;if((n|0)!=(c[1311163]|0)){return}c[1311163]=0;c[1311160]=0;return}if((f|0)==(c[1311163]|0)){B=(c[1311160]|0)+o|0;c[1311160]=B;c[1311163]=n;c[n+4>>2]=B|1;c[n+B>>2]=B;return}B=(A&-8)+o|0;s=A>>>3;L3197:do{if(A>>>0<256){g=c[d+(b+8|0)>>2]|0;t=c[d+(b+12|0)>>2]|0;h=5244672+(s<<1<<2)|0;do{if((g|0)!=(h|0)){if(g>>>0<a>>>0){bI()}if((c[g+12>>2]|0)==(f|0)){break}bI()}}while(0);if((t|0)==(g|0)){c[1311158]=c[1311158]&(1<<s^-1);break}do{if((t|0)==(h|0)){C=t+8|0}else{if(t>>>0<a>>>0){bI()}m=t+8|0;if((c[m>>2]|0)==(f|0)){C=m;break}bI()}}while(0);c[g+12>>2]=t;c[C>>2]=g}else{h=e;m=c[d+(b+24|0)>>2]|0;l=c[d+(b+12|0)>>2]|0;L3199:do{if((l|0)==(h|0)){i=d+(b+20|0)|0;p=c[i>>2]|0;do{if((p|0)==0){q=d+(b+16|0)|0;v=c[q>>2]|0;if((v|0)==0){D=0;break L3199}else{E=v;F=q;break}}else{E=p;F=i}}while(0);while(1){i=E+20|0;p=c[i>>2]|0;if((p|0)!=0){E=p;F=i;continue}i=E+16|0;p=c[i>>2]|0;if((p|0)==0){break}else{E=p;F=i}}if(F>>>0<a>>>0){bI()}else{c[F>>2]=0;D=E;break}}else{i=c[d+(b+8|0)>>2]|0;if(i>>>0<a>>>0){bI()}p=i+12|0;if((c[p>>2]|0)!=(h|0)){bI()}q=l+8|0;if((c[q>>2]|0)==(h|0)){c[p>>2]=l;c[q>>2]=i;D=l;break}else{bI()}}}while(0);if((m|0)==0){break}l=d+(b+28|0)|0;g=5244936+(c[l>>2]<<2)|0;do{if((h|0)==(c[g>>2]|0)){c[g>>2]=D;if((D|0)!=0){break}c[1311159]=c[1311159]&(1<<c[l>>2]^-1);break L3197}else{if(m>>>0<(c[1311162]|0)>>>0){bI()}t=m+16|0;if((c[t>>2]|0)==(h|0)){c[t>>2]=D}else{c[m+20>>2]=D}if((D|0)==0){break L3197}}}while(0);if(D>>>0<(c[1311162]|0)>>>0){bI()}c[D+24>>2]=m;h=c[d+(b+16|0)>>2]|0;do{if((h|0)!=0){if(h>>>0<(c[1311162]|0)>>>0){bI()}else{c[D+16>>2]=h;c[h+24>>2]=D;break}}}while(0);h=c[d+(b+20|0)>>2]|0;if((h|0)==0){break}if(h>>>0<(c[1311162]|0)>>>0){bI()}else{c[D+20>>2]=h;c[h+24>>2]=D;break}}}while(0);c[n+4>>2]=B|1;c[n+B>>2]=B;if((n|0)!=(c[1311163]|0)){G=B;break}c[1311160]=B;return}else{c[z>>2]=A&-2;c[n+4>>2]=o|1;c[n+o>>2]=o;G=o}}while(0);o=G>>>3;if(G>>>0<256){A=o<<1;z=5244672+(A<<2)|0;D=c[1311158]|0;b=1<<o;do{if((D&b|0)==0){c[1311158]=D|b;H=z;I=5244672+(A+2<<2)|0}else{o=5244672+(A+2<<2)|0;d=c[o>>2]|0;if(d>>>0>=(c[1311162]|0)>>>0){H=d;I=o;break}bI()}}while(0);c[I>>2]=n;c[H+12>>2]=n;c[n+8>>2]=H;c[n+12>>2]=z;return}z=n;H=G>>>8;do{if((H|0)==0){J=0}else{if(G>>>0>16777215){J=31;break}I=(H+1048320|0)>>>16&8;A=H<<I;b=(A+520192|0)>>>16&4;D=A<<b;A=(D+245760|0)>>>16&2;o=(14-(b|I|A)|0)+(D<<A>>>15)|0;J=G>>>((o+7|0)>>>0)&1|o<<1}}while(0);H=5244936+(J<<2)|0;c[n+28>>2]=J;c[n+20>>2]=0;c[n+16>>2]=0;o=c[1311159]|0;A=1<<J;if((o&A|0)==0){c[1311159]=o|A;c[H>>2]=z;c[n+24>>2]=H;c[n+12>>2]=n;c[n+8>>2]=n;return}if((J|0)==31){K=0}else{K=25-(J>>>1)|0}J=G<<K;K=c[H>>2]|0;while(1){if((c[K+4>>2]&-8|0)==(G|0)){break}L=K+16+(J>>>31<<2)|0;H=c[L>>2]|0;if((H|0)==0){M=2736;break}else{J=J<<1;K=H}}if((M|0)==2736){if(L>>>0<(c[1311162]|0)>>>0){bI()}c[L>>2]=z;c[n+24>>2]=K;c[n+12>>2]=n;c[n+8>>2]=n;return}L=K+8|0;M=c[L>>2]|0;J=c[1311162]|0;if(K>>>0<J>>>0){bI()}if(M>>>0<J>>>0){bI()}c[M+12>>2]=z;c[L>>2]=z;c[n+8>>2]=M;c[n+12>>2]=K;c[n+24>>2]=0;return}function jJ(a){a=a|0;var b=0,d=0,e=0;b=(a|0)==0?1:a;while(1){d=jD(b)|0;if((d|0)!=0){e=2780;break}a=(G=c[1313864]|0,c[1313864]=G+0,G);if((a|0)==0){break}b5[a&1023]()}if((e|0)==2780){return d|0}d=bQ(4)|0;c[d>>2]=5247480;bo(d|0,5252704,66);return 0}function jK(a){a=a|0;return jJ(a)|0}function jL(a){a=a|0;return 5243944}function jM(a){a=a|0;if((a|0)!=0){jE(a)}return}function jN(a){a=a|0;jM(a);return}function jO(a){a=a|0;jM(a);return}function jP(a){a=a|0;return}function jQ(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,i=0,j=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0.0,s=0,t=0,u=0,v=0,w=0.0,x=0,y=0,z=0,A=0.0,B=0.0,C=0,D=0,E=0,F=0.0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0.0,P=0,Q=0,R=0.0,S=0.0,T=0.0;e=b;while(1){f=e+1|0;if((aQ(a[e]<<24>>24|0)|0)==0){break}else{e=f}}g=a[e]|0;if((g<<24>>24|0)==45){i=f;j=1}else if((g<<24>>24|0)==43){i=f;j=0}else{i=e;j=0}e=-1;f=0;g=i;while(1){l=a[g]|0;if(((l<<24>>24)-48|0)>>>0<10){m=e}else{if(l<<24>>24!=46|(e|0)>-1){break}else{m=f}}e=m;f=f+1|0;g=g+1|0}m=g+(-f|0)|0;i=(e|0)<0;n=((i^1)<<31>>31)+f|0;o=(n|0)>18;p=(o?-18:-n|0)+(i?f:e)|0;e=o?18:n;do{if((e|0)==0){q=b;r=0.0}else{do{if((e|0)>9){n=m;o=e;f=0;while(1){i=a[n]|0;s=n+1|0;if(i<<24>>24==46){t=a[s]|0;u=n+2|0}else{t=i;u=s}v=((f*10&-1)-48|0)+(t<<24>>24)|0;s=o-1|0;if((s|0)>9){n=u;o=s;f=v}else{break}}w=+(v|0)*1.0e9;x=9;y=u;z=2808;break}else{if((e|0)>0){w=0.0;x=e;y=m;z=2808;break}else{A=0.0;B=0.0;break}}}while(0);if((z|0)==2808){f=y;o=x;n=0;while(1){s=a[f]|0;i=f+1|0;if(s<<24>>24==46){C=a[i]|0;D=f+2|0}else{C=s;D=i}E=((n*10&-1)-48|0)+(C<<24>>24)|0;i=o-1|0;if((i|0)>0){f=D;o=i;n=E}else{break}}A=+(E|0);B=w}F=B+A;L3360:do{if((l<<24>>24|0)==69|(l<<24>>24|0)==101){n=g+1|0;o=a[n]|0;if((o<<24>>24|0)==43){G=g+2|0;H=0}else if((o<<24>>24|0)==45){G=g+2|0;H=1}else{G=n;H=0}n=a[G]|0;if(((n<<24>>24)-48|0)>>>0<10){I=G;J=0;K=n}else{L=0;M=G;N=H;break}while(1){n=((J*10&-1)-48|0)+(K<<24>>24)|0;o=I+1|0;f=a[o]|0;if(((f<<24>>24)-48|0)>>>0<10){I=o;J=n;K=f}else{L=n;M=o;N=H;break L3360}}}else{L=0;M=g;N=0}}while(0);o=p+((N|0)==0?L:-L|0)|0;n=(o|0)<0?-o|0:o;do{if((n|0)>511){c[bz()>>2]=34;O=1.0;P=5242880;Q=511;z=2825;break}else{if((n|0)==0){R=1.0;break}else{O=1.0;P=5242880;Q=n;z=2825;break}}}while(0);L3372:do{if((z|0)==2825){while(1){z=0;if((Q&1|0)==0){S=O}else{S=O*(c[k>>2]=c[P>>2]|0,c[k+4>>2]=c[P+4>>2]|0,+h[k>>3])}n=Q>>1;if((n|0)==0){R=S;break L3372}else{O=S;P=P+8|0;Q=n;z=2825}}}}while(0);if((o|0)>-1){q=M;r=F*R;break}else{q=M;r=F/R;break}}}while(0);if((d|0)!=0){c[d>>2]=q}if((j|0)==0){T=r;return+T}T=-0.0-r;return+T}function jR(){var a=0;a=bQ(4)|0;c[a>>2]=5247480;bo(a|0,5252704,66)}function jS(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=b+e|0;if((e|0)>=20){d=d&255;e=b&3;g=d|d<<8|d<<16|d<<24;h=f&~3;if(e){e=b+4-e|0;while((b|0)<(e|0)){a[b]=d;b=b+1|0}}while((b|0)<(h|0)){c[b>>2]=g;b=b+4|0}}while((b|0)<(f|0)){a[b]=d;b=b+1|0}}function jT(b,d,e){b=b|0;d=d|0;e=e|0;var f=0;f=b|0;if((b&3)==(d&3)){while(b&3){if((e|0)==0)return f|0;a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}while((e|0)>=4){c[b>>2]=c[d>>2]|0;b=b+4|0;d=d+4|0;e=e-4|0}}while((e|0)>0){a[b]=a[d]|0;b=b+1|0;d=d+1|0;e=e-1|0}return f|0}function jU(b,c,d){b=b|0;c=c|0;d=d|0;if((c|0)<(b|0)&(b|0)<(c+d|0)){c=c+d|0;b=b+d|0;while((d|0)>0){b=b-1|0;c=c-1|0;d=d-1|0;a[b]=a[c]|0}}else{jT(b,c,d)}}function jV(b){b=b|0;var c=0;c=b;while(a[c]|0!=0){c=c+1|0}return c-b|0}function jW(b,c){b=b|0;c=c|0;var d=0;do{a[b+d|0]=a[c+d|0];d=d+1|0}while(a[c+(d-1)|0]|0!=0);return b|0}function jX(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a+c>>>0;c=b+d>>>0;if(e>>>0<a>>>0){c=c+1>>>0}return(I=c,e|0)|0}function jY(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=a-c>>>0;c=b-d>>>0;if(e>>>0>a>>>0){c=c-1>>>0}return(I=c,e|0)|0}function jZ(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){I=b<<c|(a&(1<<c)-1<<32-c)>>>32-c;return a<<c}I=a<<c-32;return 0}function j_(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){I=b>>>c;return a>>>c|(b&(1<<c)-1)<<32-c}I=0;return b>>>c-32|0}function j$(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)<32){I=b>>c;return a>>>c|(b&(1<<c)-1)<<32-c}I=(b|0)<0?-1:0;return b>>c-32|0}function j0(b){b=b|0;var c=0;c=a[n+(b>>>24)|0]|0;if((c|0)<8)return c|0;c=a[n+(b>>16&255)|0]|0;if((c|0)<8)return c+8|0;c=a[n+(b>>8&255)|0]|0;if((c|0)<8)return c+16|0;return(a[n+(b&255)|0]|0)+24|0}function j1(b){b=b|0;var c=0;c=a[m+(b&255)|0]|0;if((c|0)<8)return c|0;c=a[m+(b>>8&255)|0]|0;if((c|0)<8)return c+8|0;c=a[m+(b>>16&255)|0]|0;if((c|0)<8)return c+16|0;return(a[m+(b>>>24)|0]|0)+24|0}function j2(a,b){a=a|0;b=b|0;var c=0,d=0,e=0,f=0;c=a&65535;d=b&65535;e=ae(d,c);f=a>>>16;a=(e>>>16)+ae(d,f)|0;d=b>>>16;b=ae(d,c);return(I=((a>>>16)+ae(d,f)|0)+(((a&65535)+b|0)>>>16)|0,0|(a+b<<16|e&65535))|0}function j3(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0,i=0;e=b>>31|((b|0)<0?-1:0)<<1;f=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;g=d>>31|((d|0)<0?-1:0)<<1;h=((d|0)<0?-1:0)>>31|((d|0)<0?-1:0)<<1;i=jY(e^a,f^b,e,f);b=I;a=g^e;e=h^f;f=jY(j8(i,b,jY(g^c,h^d,g,h),I,0)^a,I^e,a,e);return(I=I,f)|0}function j4(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0;f=i;i=i+8|0;g=f|0;h=b>>31|((b|0)<0?-1:0)<<1;j=((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1;k=e>>31|((e|0)<0?-1:0)<<1;l=((e|0)<0?-1:0)>>31|((e|0)<0?-1:0)<<1;m=jY(h^a,j^b,h,j);b=I;j8(m,b,jY(k^d,l^e,k,l),I,g);l=jY(c[g>>2]^h,c[g+4>>2]^j,h,j);j=I;i=f;return(I=j,l)|0}function j5(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0,f=0;e=a;a=c;c=j2(e,a)|0;f=I;return(I=(ae(b,a)+ae(d,e)|0)+f|f&0,0|c&-1)|0}function j6(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;var e=0;e=j8(a,b,c,d,0)|0;return(I=I,e)|0}function j7(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=i;i=i+8|0;g=f|0;j8(a,b,d,e,g);i=f;return(I=c[g+4>>2]|0,c[g>>2]|0)|0}function j8(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,J=0,K=0,L=0,M=0;g=a;h=b;i=h;j=d;k=e;l=k;if((i|0)==0){m=(f|0)!=0;if((l|0)==0){if(m){c[f>>2]=(g>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(g>>>0)/(j>>>0)>>>0;return(I=n,o)|0}else{if(!m){n=0;o=0;return(I=n,o)|0}c[f>>2]=a&-1;c[f+4>>2]=b&0;n=0;o=0;return(I=n,o)|0}}m=(l|0)==0;do{if((j|0)==0){if(m){if((f|0)!=0){c[f>>2]=(i>>>0)%(j>>>0);c[f+4>>2]=0}n=0;o=(i>>>0)/(j>>>0)>>>0;return(I=n,o)|0}if((g|0)==0){if((f|0)!=0){c[f>>2]=0;c[f+4>>2]=(i>>>0)%(l>>>0)}n=0;o=(i>>>0)/(l>>>0)>>>0;return(I=n,o)|0}p=l-1|0;if((p&l|0)==0){if((f|0)!=0){c[f>>2]=0|a&-1;c[f+4>>2]=p&i|b&0}n=0;o=i>>>((j1(l|0)|0)>>>0);return(I=n,o)|0}p=(j0(l|0)|0)-(j0(i|0)|0)|0;if(p>>>0<=30){q=p+1|0;r=31-p|0;s=q;t=i<<r|g>>>(q>>>0);u=i>>>(q>>>0);v=0;w=g<<r;break}if((f|0)==0){n=0;o=0;return(I=n,o)|0}c[f>>2]=0|a&-1;c[f+4>>2]=h|b&0;n=0;o=0;return(I=n,o)|0}else{if(!m){r=(j0(l|0)|0)-(j0(i|0)|0)|0;if(r>>>0<=31){q=r+1|0;p=31-r|0;x=r-31>>31;s=q;t=g>>>(q>>>0)&x|i<<p;u=i>>>(q>>>0)&x;v=0;w=g<<p;break}if((f|0)==0){n=0;o=0;return(I=n,o)|0}c[f>>2]=0|a&-1;c[f+4>>2]=h|b&0;n=0;o=0;return(I=n,o)|0}p=j-1|0;if((p&j|0)!=0){x=((j0(j|0)|0)+33|0)-(j0(i|0)|0)|0;q=64-x|0;r=32-x|0;y=r>>31;z=x-32|0;A=z>>31;s=x;t=r-1>>31&i>>>(z>>>0)|(i<<r|g>>>(x>>>0))&A;u=A&i>>>(x>>>0);v=g<<q&y;w=(i<<q|g>>>(z>>>0))&y|g<<r&x-33>>31;break}if((f|0)!=0){c[f>>2]=p&g;c[f+4>>2]=0}if((j|0)==1){n=h|b&0;o=0|a&-1;return(I=n,o)|0}else{p=j1(j|0)|0;n=0|i>>>(p>>>0);o=i<<32-p|g>>>(p>>>0)|0;return(I=n,o)|0}}}while(0);if((s|0)==0){B=w;C=v;D=u;E=t;F=0;G=0}else{g=0|d&-1;d=k|e&0;e=jX(g,d,-1,-1);k=I;i=w;w=v;v=u;u=t;t=s;s=0;while(1){H=w>>>31|i<<1;J=s|w<<1;j=0|(u<<1|i>>>31);a=u>>>31|v<<1|0;jY(e,k,j,a);b=I;h=b>>31|((b|0)<0?-1:0)<<1;K=h&1;L=jY(j,a,h&g,(((b|0)<0?-1:0)>>31|((b|0)<0?-1:0)<<1)&d);M=I;b=t-1|0;if((b|0)==0){break}else{i=H;w=J;v=M;u=L;t=b;s=K}}B=H;C=J;D=M;E=L;F=0;G=K}K=C;C=0;if((f|0)!=0){c[f>>2]=0|E;c[f+4>>2]=D|0}n=(0|K)>>>31|(B|C)<<1|(C<<1|K>>>31)&0|F;o=(K<<1|0>>>31)&-2|G;return(I=n,o)|0}function j9(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return bX[a&1023](b|0,c|0,d|0)|0}function ka(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;bY[a&1023](b|0,c|0,d|0)}function kb(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;bZ[a&1023](b|0,c|0,d|0,e|0,f|0)}function kc(a,b){a=a|0;b=b|0;b_[a&1023](b|0)}function kd(a,b,c){a=a|0;b=b|0;c=c|0;b$[a&1023](b|0,c|0)}function ke(a,b,c,d,e,f,g,h,i,j){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;b0[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0,j|0)}function kf(a,b){a=a|0;b=b|0;return b1[a&1023](b|0)|0}function kg(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;b2[a&1023](b|0,c|0,d|0,e|0,f|0,+g)}function kh(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;b3[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0)}function ki(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;b4[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)}function kj(a){a=a|0;b5[a&1023]()}function kk(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;return b6[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,h|0,i|0)|0}function kl(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;return b7[a&1023](b|0,c|0,d|0,e|0)|0}function km(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=+h;b8[a&1023](b|0,c|0,d|0,e|0,f|0,g|0,+h)}function kn(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;b9[a&1023](b|0,c|0,d|0,e|0,f|0,g|0)}function ko(a,b,c){a=a|0;b=b|0;c=c|0;return ca[a&1023](b|0,c|0)|0}function kp(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;return cb[a&1023](b|0,c|0,d|0,e|0,f|0)|0}function kq(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;cc[a&1023](b|0,c|0,d|0,e|0)}function kr(a,b,c){a=a|0;b=b|0;c=c|0;af(0);return 0}function ks(a,b,c){a=a|0;b=b|0;c=c|0;af(1)}function kt(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;af(2)}function ku(a){a=a|0;af(3)}function kv(a,b){a=a|0;b=b|0;af(4)}function kw(a,b,c,d,e,f,g,h,i){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;af(5)}function kx(a){a=a|0;af(6);return 0}function ky(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=+f;af(7)}function kz(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;af(8)}function kA(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;af(9)}function kB(){af(10)}function kC(a,b,c,d,e,f,g,h){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;af(11);return 0}function kD(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;af(12);return 0}function kE(a,b,c,d,e,f,g){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;g=+g;af(13)}function kF(a,b,c,d,e,f){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;af(14)}function kG(a,b){a=a|0;b=b|0;af(15);return 0}function kH(a,b,c,d,e){a=a|0;b=b|0;c=c|0;d=d|0;e=e|0;af(16);return 0}function kI(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;af(17)}
// EMSCRIPTEN_END_FUNCS
var bX=[kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,ex,kr,kr,kr,kr,kr,kr,kr,ia,kr,kr,kr,kr,kr,h8,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,jo,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,hM,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,ez,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,df,kr,kr,kr,dG,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,dE,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,h1,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,dQ,kr,hw,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,hN,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,h6,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,d2,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,db,kr,kr,kr,kr,kr,ic,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,ht,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,ds,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,d4,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr,kr];var bY=[ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,da,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,eu,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks,ks];var bZ=[kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,jz,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,ju,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,jy,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt,kt];var b_=[ku,ku,hv,ku,eB,ku,ku,ku,ku,ku,ku,ku,fx,ku,ku,ku,de,ku,dD,ku,ku,ku,ku,ku,hP,ku,cY,ku,ku,ku,ku,ku,ku,ku,ku,ku,g_,ku,fi,ku,c3,ku,ku,ku,ku,ku,e$,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dY,ku,em,ku,ku,ku,jP,ku,ku,ku,hX,ku,ku,ku,ku,ku,ku,ku,h_,ku,ku,ku,ku,ku,fZ,ku,e_,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ei,ku,ku,ku,ku,ku,ku,ku,hq,ku,ku,ku,ku,ku,hY,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,d7,ku,ew,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,gP,ku,ku,ku,hV,ku,ku,ku,ku,ku,iR,ku,ku,ku,h0,ku,ku,ku,i8,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iQ,ku,ku,ku,dX,ku,ku,ku,cJ,ku,ku,ku,ku,ku,dd,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ev,ku,ku,ku,ku,ku,ku,ku,gd,ku,ku,ku,iT,ku,ku,ku,hZ,ku,ku,ku,jE,ku,hl,ku,iP,ku,ku,ku,ku,ku,ea,ku,cI,ku,ku,ku,ku,ku,ku,ku,ku,ku,eA,ku,ku,ku,ku,ku,ku,ku,c4,ku,ku,ku,jc,ku,fh,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,gl,ku,ku,ku,d6,ku,ku,ku,eg,ku,gb,ku,f$,ku,ku,ku,ku,ku,ku,ku,ku,ku,en,ku,gL,ku,jO,ku,dC,ku,ku,ku,ku,ku,ku,ku,je,ku,ku,ku,jf,ku,ku,ku,ku,ku,ku,ku,ku,ku,ej,ku,d1,ku,jm,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,id,ku,ku,ku,ig,ku,ku,ku,ku,ku,d8,ku,ku,ku,el,ku,gZ,ku,cO,ku,ku,ku,gU,ku,ek,ku,ku,ku,ku,ku,ku,ku,jh,ku,ku,ku,i9,ku,ku,ku,ku,ku,iy,ku,cU,ku,ku,ku,hU,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,gc,ku,g6,ku,jj,ku,ku,ku,ku,ku,gu,ku,hj,ku,jg,ku,gH,ku,fy,ku,ku,ku,ku,ku,ep,ku,ku,ku,ku,ku,cV,ku,dZ,ku,ec,ku,dh,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,hf,ku,ku,ku,g7,ku,ku,ku,ku,ku,iS,ku,ku,ku,ku,ku,ku,ku,ku,ku,dA,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,jk,ku,jn,ku,ku,ku,ku,ku,ku,ku,ku,ku,ef,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,di,ku,ku,ku,ku,ku,ku,ku,ku,ku,d5,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,eh,ku,ku,ku,ku,ku,ku,ku,ku,ku,hs,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,dO,ku,ee,ku,cZ,ku,ku,ku,ku,ku,eo,ku,gp,ku,ku,ku,ku,ku,fN,ku,gh,ku,cF,ku,ku,ku,ku,ku,hB,ku,ku,ku,ku,ku,ku,ku,he,ku,ku,ku,ku,ku,eb,ku,dH,ku,ku,ku,ed,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,iO,ku,ku,ku,jd,ku,fL,ku,jl,ku,hr,ku,cE,ku,ku,ku,i7,ku,ku,ku,ku,ku,g$,ku,ku,ku,ku,ku,ku,ku,ku,ku,gt,ku,ku,ku,dj,ku,h$,ku,dc,ku,d9,ku,ji,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku,ku];var b$=[kv,kv,kv,kv,kv,kv,iW,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,cQ,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gX,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,cS,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,iV,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gA,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,iU,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,hu,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,dP,kv,gD,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gB,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gT,kv,kv,kv,kv,kv,kv,kv,gK,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gI,kv,kv,kv,kv,kv,gY,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gy,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,c6,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gC,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,i3,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gV,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gN,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gM,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,i4,kv,kv,kv,gz,kv,gE,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,iL,kv,gx,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,dr,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,c8,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,hz,kv,kv,kv,kv,kv,gQ,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gw,kv,kv,kv,kv,kv,gv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gJ,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gR,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gS,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,gW,kv,kv,kv,kv,kv,kv,kv,kv,kv,gO,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv,kv];var b0=[kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,f6,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,fU,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw,kw];var b1=[kx,kx,kx,kx,kx,kx,kx,kx,jr,kx,gn,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,dv,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,i_,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,dF,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,jq,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gi,kx,il,kx,kx,kx,kx,kx,kx,kx,kx,kx,is,kx,kx,kx,fM,kx,kx,kx,iY,kx,kx,kx,kx,kx,kx,kx,kx,kx,c$,kx,kx,kx,kx,kx,kx,kx,kx,kx,d3,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,dT,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,i5,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,i0,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,iB,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,i6,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,c9,kx,kx,kx,kx,kx,kx,kx,iK,kx,kx,kx,kx,kx,kx,kx,iH,kx,kx,kx,kx,kx,i1,kx,kx,kx,kx,kx,ir,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,iI,kx,dt,kx,kx,kx,kx,kx,kx,kx,gs,kx,kx,kx,kx,kx,i2,kx,kx,kx,c_,kx,cG,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gj,kx,kx,kx,kx,kx,kx,kx,kx,kx,ie,kx,jb,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,iD,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gq,kx,kx,kx,iX,kx,kx,kx,kx,kx,cK,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,iC,kx,kx,kx,io,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,dW,kx,gg,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,cL,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,iJ,kx,kx,kx,du,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,dR,kx,cW,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,gk,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,hK,kx,kx,kx,hJ,kx,kx,kx,kx,kx,jL,kx,kx,kx,dS,kx,ge,kx,kx,kx,kx,kx,kx,kx,iZ,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,hI,kx,gf,kx,kx,kx,kx,kx,cT,kx,kx,kx,kx,kx,kx,kx,gm,kx,kx,kx,kx,kx,go,kx,kx,kx,kx,kx,kx,kx,i$,kx,kx,kx,kx,kx,gr,kx,kx,kx,kx,kx,kx,kx,kx,kx,f_,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,ja,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,jp,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,iq,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx,kx];var b2=[ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,fJ,ky,fH,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,fw,ky,fs,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky,ky];var b3=[kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fT,kz,kz,kz,kz,kz,f0,kz,kz,kz,kz,kz,kz,kz,f3,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,hx,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fG,kz,fC,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,hm,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fO,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fS,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,f4,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fk,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fR,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,eW,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,e9,kz,kz,kz,kz,kz,kz,kz,kz,kz,f1,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fr,kz,fo,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,fb,kz,e6,kz,kz,kz,e8,kz,e0,kz,fa,kz,e3,kz,e2,kz,fg,kz,ff,kz,fd,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,f5,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,eP,kz,kz,kz,kz,kz,fP,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,eT,kz,eK,kz,eN,kz,eR,kz,eF,kz,kz,kz,eZ,kz,eY,kz,kz,kz,eE,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz,kz];var b4=[kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,gG,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,gF,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,g1,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,g9,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,g5,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,hc,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA,kA];var b5=[kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB,kB];var b6=[kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,hF,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,ij,kC,iw,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,hG,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,iz,kC,kC,kC,iM,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,ii,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,ih,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC,kC];var b7=[kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,h2,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,h3,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,hS,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,hQ,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,h4,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD,kD];var b8=[kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,hn,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,hh,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE,kE];var b9=[kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,jB,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,fD,kF,fz,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,jC,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,fK,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,hy,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,d_,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,fA,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,fl,kF,fp,kF,fj,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,fB,kF,kF,kF,kF,kF,jA,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,dy,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,hA,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF,kF];var ca=[kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,h9,kG,kG,kG,kG,kG,kG,kG,c0,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,hL,kG,kG,kG,kG,kG,dU,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,hE,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,dx,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,cM,kG,kG,kG,kG,kG,cX,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,h5,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,ib,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,dV,kG,kG,kG,kG,kG,h7,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,dw,kG,kG,kG,cH,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG,kG];var cb=[kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,ip,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,im,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,iN,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,hH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,hR,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,ix,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,ey,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,hT,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,hO,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,ik,kH,d0,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,iA,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH,kH];var cc=[kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,jv,kI,kI,kI,kI,kI,jw,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,dz,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,jt,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,d$,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,eD,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,eC,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI,kI];return{_strlen:jV,_free:jE,_realloc:jF,_setup_pathfinding:cs,__GLOBAL__I_a:c2,_memset:jS,_malloc:jD,_memcpy:jT,_clear_pathfinding:cu,_memmove:jU,_pathfind:cv,_free_path:cw,_strcpy:jW,stackAlloc:cd,stackSave:ce,stackRestore:cf,setThrew:cg,setTempRet0:ch,setTempRet1:ci,setTempRet2:cj,setTempRet3:ck,setTempRet4:cl,setTempRet5:cm,setTempRet6:cn,setTempRet7:co,setTempRet8:cp,setTempRet9:cq,dynCall_iiii:j9,dynCall_viii:ka,dynCall_viiiii:kb,dynCall_vi:kc,dynCall_vii:kd,dynCall_viiiiiiiii:ke,dynCall_ii:kf,dynCall_viiiiif:kg,dynCall_viiiiiii:kh,dynCall_viiiiiiii:ki,dynCall_v:kj,dynCall_iiiiiiiii:kk,dynCall_iiiii:kl,dynCall_viiiiiif:km,dynCall_viiiiii:kn,dynCall_iii:ko,dynCall_iiiiii:kp,dynCall_viiii:kq}})
// EMSCRIPTEN_END_ASM
({ Math: Math, Int8Array: Int8Array, Int16Array: Int16Array, Int32Array: Int32Array, Uint8Array: Uint8Array, Uint16Array: Uint16Array, Uint32Array: Uint32Array, Float32Array: Float32Array, Float64Array: Float64Array }, { abort: abort, assert: assert, asmPrintInt: asmPrintInt, asmPrintFloat: asmPrintFloat, copyTempDouble: copyTempDouble, copyTempFloat: copyTempFloat, min: Math_min, invoke_iiii: invoke_iiii, invoke_viii: invoke_viii, invoke_viiiii: invoke_viiiii, invoke_vi: invoke_vi, invoke_vii: invoke_vii, invoke_viiiiiiiii: invoke_viiiiiiiii, invoke_ii: invoke_ii, invoke_viiiiif: invoke_viiiiif, invoke_viiiiiii: invoke_viiiiiii, invoke_viiiiiiii: invoke_viiiiiiii, invoke_v: invoke_v, invoke_iiiiiiiii: invoke_iiiiiiiii, invoke_iiiii: invoke_iiiii, invoke_viiiiiif: invoke_viiiiiif, invoke_viiiiii: invoke_viiiiii, invoke_iii: invoke_iii, invoke_iiiiii: invoke_iiiiii, invoke_viiii: invoke_viiii, _llvm_lifetime_end: _llvm_lifetime_end, __scanString: __scanString, _pthread_mutex_lock: _pthread_mutex_lock, _mbrlen: _mbrlen, ___cxa_end_catch: ___cxa_end_catch, _strtoull: _strtoull, __isFloat: __isFloat, _fflush: _fflush, _wcsnrtombs: _wcsnrtombs, _fwrite: _fwrite, _llvm_eh_exception: _llvm_eh_exception, _llvm_umul_with_overflow_i32: _llvm_umul_with_overflow_i32, _isspace: _isspace, _wmemset: _wmemset, _read: _read, ___cxa_guard_abort: ___cxa_guard_abort, _newlocale: _newlocale, ___gxx_personality_v0: ___gxx_personality_v0, _pthread_cond_wait: _pthread_cond_wait, ___cxa_rethrow: ___cxa_rethrow, ___resumeException: ___resumeException, _llvm_va_end: _llvm_va_end, _mbtowc: _mbtowc, _snprintf: _snprintf, _fgetc: _fgetc, _atexit: _atexit, ___cxa_free_exception: ___cxa_free_exception, _wcrtomb: _wcrtomb, __Z8catcloseP8_nl_catd: __Z8catcloseP8_nl_catd, ___setErrNo: ___setErrNo, _isxdigit: _isxdigit, _exit: _exit, _sprintf: _sprintf, ___ctype_b_loc: ___ctype_b_loc, _freelocale: _freelocale, __Z7catopenPKci: __Z7catopenPKci, _asprintf: _asprintf, ___cxa_is_number_type: ___cxa_is_number_type, ___cxa_does_inherit: ___cxa_does_inherit, ___cxa_guard_acquire: ___cxa_guard_acquire, ___locale_mb_cur_max: ___locale_mb_cur_max, ___cxa_begin_catch: ___cxa_begin_catch, __parseInt64: __parseInt64, __ZSt18uncaught_exceptionv: __ZSt18uncaught_exceptionv, __ZNSt9exceptionD2Ev: __ZNSt9exceptionD2Ev, __exit: __exit, _strftime: _strftime, _wmemmove: _wmemmove, ___cxa_throw: ___cxa_throw, _pread: _pread, _wcslen: _wcslen, ___cxa_find_matching_catch: ___cxa_find_matching_catch, __formatString: __formatString, _pthread_cond_broadcast: _pthread_cond_broadcast, __ZSt9terminatev: __ZSt9terminatev, _mbsrtowcs: _mbsrtowcs, _pthread_mutex_unlock: _pthread_mutex_unlock, ___cxa_call_unexpected: ___cxa_call_unexpected, _sbrk: _sbrk, ___errno_location: ___errno_location, _strerror: _strerror, _llvm_lifetime_start: _llvm_lifetime_start, ___cxa_guard_release: ___cxa_guard_release, _ungetc: _ungetc, _uselocale: _uselocale, _sscanf: _sscanf, _sysconf: _sysconf, _mbrtowc: _mbrtowc, _abort: _abort, _isdigit: _isdigit, _strtoll: _strtoll, _wmemcpy: _wmemcpy, __reallyNegative: __reallyNegative, __Z7catgetsP8_nl_catdiiPKc: __Z7catgetsP8_nl_catdiiPKc, _sqrt: _sqrt, _write: _write, ___cxa_allocate_exception: ___cxa_allocate_exception, ___ctype_toupper_loc: ___ctype_toupper_loc, ___ctype_tolower_loc: ___ctype_tolower_loc, _pwrite: _pwrite, _strerror_r: _strerror_r, _time: _time, _mbsnrtowcs: _mbsnrtowcs, STACKTOP: STACKTOP, STACK_MAX: STACK_MAX, tempDoublePtr: tempDoublePtr, ABORT: ABORT, cttz_i8: cttz_i8, ctlz_i8: ctlz_i8, NaN: NaN, Infinity: Infinity, _stdin: _stdin, __ZTVN10__cxxabiv117__class_type_infoE: __ZTVN10__cxxabiv117__class_type_infoE, __ZTVN10__cxxabiv120__si_class_type_infoE: __ZTVN10__cxxabiv120__si_class_type_infoE, _stderr: _stderr, _stdout: _stdout, __ZTISt9exception: __ZTISt9exception, ___dso_handle: ___dso_handle }, buffer);
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
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_STATIC) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_STATIC));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_STATIC);
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

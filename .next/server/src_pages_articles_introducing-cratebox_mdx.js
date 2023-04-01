"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_pages_articles_introducing-cratebox_mdx";
exports.ids = ["src_pages_articles_introducing-cratebox_mdx"];
exports.modules = {

/***/ "./src/components/ArticleLayout.jsx":
/*!******************************************!*\
  !*** ./src/components/ArticleLayout.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ArticleLayout\": () => (/* binding */ ArticleLayout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Container */ \"./src/components/Container.jsx\");\n/* harmony import */ var _components_Prose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/Prose */ \"./src/components/Prose.jsx\");\n/* harmony import */ var _lib_formatDate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/formatDate */ \"./src/lib/formatDate.js\");\n\n\n\n\n\n\nfunction ArrowLeftIcon(props) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n        viewBox: \"0 0 16 16\",\n        fill: \"none\",\n        \"aria-hidden\": \"true\",\n        ...props,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n            d: \"M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5\",\n            strokeWidth: \"1.5\",\n            strokeLinecap: \"round\",\n            strokeLinejoin: \"round\"\n        }, void 0, false, {\n            fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n            lineNumber: 11,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\nfunction ArticleLayout({ children , meta , isRssFeed =false , previousPathname  }) {\n    let router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    if (isRssFeed) {\n        return children;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                        children: `${meta.title} - Spencer Sharp`\n                    }, void 0, false, {\n                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                        name: \"description\",\n                        content: meta.description\n                    }, void 0, false, {\n                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                        lineNumber: 37,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Container__WEBPACK_IMPORTED_MODULE_3__.Container, {\n                className: \"mt-16 lg:mt-32\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"xl:relative\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mx-auto max-w-2xl\",\n                        children: [\n                            previousPathname && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                type: \"button\",\n                                onClick: ()=>router.back(),\n                                \"aria-label\": \"Go back to articles\",\n                                className: \"group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ArrowLeftIcon, {\n                                    className: \"h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                    lineNumber: 49,\n                                    columnNumber: 17\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                lineNumber: 43,\n                                columnNumber: 15\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"article\", {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n                                        className: \"flex flex-col\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                                className: \"mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl\",\n                                                children: meta.title\n                                            }, void 0, false, {\n                                                fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                                lineNumber: 54,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"time\", {\n                                                dateTime: meta.date,\n                                                className: \"order-first flex items-center text-base text-zinc-400 dark:text-zinc-500\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                        className: \"h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                                        lineNumber: 61,\n                                                        columnNumber: 19\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                        className: \"ml-3\",\n                                                        children: (0,_lib_formatDate__WEBPACK_IMPORTED_MODULE_5__.formatDate)(meta.date)\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                                        lineNumber: 62,\n                                                        columnNumber: 19\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                                lineNumber: 57,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                        lineNumber: 53,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Prose__WEBPACK_IMPORTED_MODULE_4__.Prose, {\n                                        className: \"mt-8\",\n                                        children: children\n                                    }, void 0, false, {\n                                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                        lineNumber: 65,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                                lineNumber: 52,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                        lineNumber: 41,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                    lineNumber: 40,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/ArticleLayout.jsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9BcnRpY2xlTGF5b3V0LmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFBNEI7QUFDVztBQUVXO0FBQ1I7QUFDRztBQUU3QyxTQUFTSyxjQUFjQyxLQUFLLEVBQUU7SUFDNUIscUJBQ0UsOERBQUNDO1FBQUlDLFNBQVE7UUFBWUMsTUFBSztRQUFPQyxlQUFZO1FBQVEsR0FBR0osS0FBSztrQkFDL0QsNEVBQUNLO1lBQ0NDLEdBQUU7WUFDRkMsYUFBWTtZQUNaQyxlQUFjO1lBQ2RDLGdCQUFlOzs7Ozs7Ozs7OztBQUl2QjtBQUVPLFNBQVNDLGNBQWMsRUFDNUJDLFNBQVEsRUFDUkMsS0FBSSxFQUNKQyxXQUFZLEtBQUssR0FDakJDLGlCQUFnQixFQUNqQixFQUFFO0lBQ0QsSUFBSUMsU0FBU3BCLHNEQUFTQTtJQUV0QixJQUFJa0IsV0FBVztRQUNiLE9BQU9GO0lBQ1QsQ0FBQztJQUVELHFCQUNFOzswQkFDRSw4REFBQ2pCLGtEQUFJQTs7a0NBQ0gsOERBQUNzQjtrQ0FBTyxDQUFDLEVBQUVKLEtBQUtJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7O2tDQUN2Qyw4REFBQ0o7d0JBQUtLLE1BQUs7d0JBQWNDLFNBQVNOLEtBQUtPLFdBQVc7Ozs7Ozs7Ozs7OzswQkFFcEQsOERBQUN2Qiw0REFBU0E7Z0JBQUN3QixXQUFVOzBCQUNuQiw0RUFBQ0M7b0JBQUlELFdBQVU7OEJBQ2IsNEVBQUNDO3dCQUFJRCxXQUFVOzs0QkFDWk4sa0NBQ0MsOERBQUNRO2dDQUNDQyxNQUFLO2dDQUNMQyxTQUFTLElBQU1ULE9BQU9VLElBQUk7Z0NBQzFCQyxjQUFXO2dDQUNYTixXQUFVOzBDQUVWLDRFQUFDckI7b0NBQWNxQixXQUFVOzs7Ozs7Ozs7OzswQ0FHN0IsOERBQUNPOztrREFDQyw4REFBQ0M7d0NBQU9SLFdBQVU7OzBEQUNoQiw4REFBQ1M7Z0RBQUdULFdBQVU7MERBQ1hSLEtBQUtJLEtBQUs7Ozs7OzswREFFYiw4REFBQ2M7Z0RBQ0NDLFVBQVVuQixLQUFLb0IsSUFBSTtnREFDbkJaLFdBQVU7O2tFQUVWLDhEQUFDYTt3REFBS2IsV0FBVTs7Ozs7O2tFQUNoQiw4REFBQ2E7d0RBQUtiLFdBQVU7a0VBQVF0QiwyREFBVUEsQ0FBQ2MsS0FBS29CLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7OztrREFHaEQsOERBQUNuQyxvREFBS0E7d0NBQUN1QixXQUFVO2tEQUFRVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT3ZDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbGV4dmNhc2lsbGFzLy4vc3JjL2NvbXBvbmVudHMvQXJ0aWNsZUxheW91dC5qc3g/NTFhYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcblxuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnQC9jb21wb25lbnRzL0NvbnRhaW5lcidcbmltcG9ydCB7IFByb3NlIH0gZnJvbSAnQC9jb21wb25lbnRzL1Byb3NlJ1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSB9IGZyb20gJ0AvbGliL2Zvcm1hdERhdGUnXG5cbmZ1bmN0aW9uIEFycm93TGVmdEljb24ocHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHsuLi5wcm9wc30+XG4gICAgICA8cGF0aFxuICAgICAgICBkPVwiTTcuMjUgMTEuMjUgMy43NSA4bTAgMCAzLjUtMy4yNU0zLjc1IDhoOC41XCJcbiAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxuICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgIC8+XG4gICAgPC9zdmc+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFydGljbGVMYXlvdXQoe1xuICBjaGlsZHJlbixcbiAgbWV0YSxcbiAgaXNSc3NGZWVkID0gZmFsc2UsXG4gIHByZXZpb3VzUGF0aG5hbWUsXG59KSB7XG4gIGxldCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG4gIGlmIChpc1Jzc0ZlZWQpIHtcbiAgICByZXR1cm4gY2hpbGRyZW5cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+e2Ake21ldGEudGl0bGV9IC0gU3BlbmNlciBTaGFycGB9PC90aXRsZT5cbiAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD17bWV0YS5kZXNjcmlwdGlvbn0gLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxDb250YWluZXIgY2xhc3NOYW1lPVwibXQtMTYgbGc6bXQtMzJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ4bDpyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtYXV0byBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgIHtwcmV2aW91c1BhdGhuYW1lICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5iYWNrKCl9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkdvIGJhY2sgdG8gYXJ0aWNsZXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyb3VwIG1iLTggZmxleCBoLTEwIHctMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LXppbmMtODAwLzUgcmluZy0xIHJpbmctemluYy05MDAvNSB0cmFuc2l0aW9uIGRhcms6Ym9yZGVyIGRhcms6Ym9yZGVyLXppbmMtNzAwLzUwIGRhcms6YmctemluYy04MDAgZGFyazpyaW5nLTAgZGFyazpyaW5nLXdoaXRlLzEwIGRhcms6aG92ZXI6Ym9yZGVyLXppbmMtNzAwIGRhcms6aG92ZXI6cmluZy13aGl0ZS8yMCBsZzphYnNvbHV0ZSBsZzotbGVmdC01IGxnOi1tdC0yIGxnOm1iLTAgeGw6LXRvcC0xLjUgeGw6bGVmdC0wIHhsOm10LTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEFycm93TGVmdEljb24gY2xhc3NOYW1lPVwiaC00IHctNCBzdHJva2UtemluYy01MDAgdHJhbnNpdGlvbiBncm91cC1ob3ZlcjpzdHJva2UtemluYy03MDAgZGFyazpzdHJva2UtemluYy01MDAgZGFyazpncm91cC1ob3ZlcjpzdHJva2UtemluYy00MDBcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8YXJ0aWNsZT5cbiAgICAgICAgICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cIm10LTYgdGV4dC00eGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IHRleHQtemluYy04MDAgZGFyazp0ZXh0LXppbmMtMTAwIHNtOnRleHQtNXhsXCI+XG4gICAgICAgICAgICAgICAgICB7bWV0YS50aXRsZX1cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgIDx0aW1lXG4gICAgICAgICAgICAgICAgICBkYXRlVGltZT17bWV0YS5kYXRlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwib3JkZXItZmlyc3QgZmxleCBpdGVtcy1jZW50ZXIgdGV4dC1iYXNlIHRleHQtemluYy00MDAgZGFyazp0ZXh0LXppbmMtNTAwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoLTQgdy0wLjUgcm91bmRlZC1mdWxsIGJnLXppbmMtMjAwIGRhcms6YmctemluYy01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWwtM1wiPntmb3JtYXREYXRlKG1ldGEuZGF0ZSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGltZT5cbiAgICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICAgIDxQcm9zZSBjbGFzc05hbWU9XCJtdC04XCI+e2NoaWxkcmVufTwvUHJvc2U+XG4gICAgICAgICAgICA8L2FydGljbGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9Db250YWluZXI+XG4gICAgPC8+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJIZWFkIiwidXNlUm91dGVyIiwiQ29udGFpbmVyIiwiUHJvc2UiLCJmb3JtYXREYXRlIiwiQXJyb3dMZWZ0SWNvbiIsInByb3BzIiwic3ZnIiwidmlld0JveCIsImZpbGwiLCJhcmlhLWhpZGRlbiIsInBhdGgiLCJkIiwic3Ryb2tlV2lkdGgiLCJzdHJva2VMaW5lY2FwIiwic3Ryb2tlTGluZWpvaW4iLCJBcnRpY2xlTGF5b3V0IiwiY2hpbGRyZW4iLCJtZXRhIiwiaXNSc3NGZWVkIiwicHJldmlvdXNQYXRobmFtZSIsInJvdXRlciIsInRpdGxlIiwibmFtZSIsImNvbnRlbnQiLCJkZXNjcmlwdGlvbiIsImNsYXNzTmFtZSIsImRpdiIsImJ1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwiYmFjayIsImFyaWEtbGFiZWwiLCJhcnRpY2xlIiwiaGVhZGVyIiwiaDEiLCJ0aW1lIiwiZGF0ZVRpbWUiLCJkYXRlIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/ArticleLayout.jsx\n");

/***/ }),

/***/ "./src/components/Prose.jsx":
/*!**********************************!*\
  !*** ./src/components/Prose.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Prose\": () => (/* binding */ Prose)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ \"clsx\");\n/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(clsx__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Prose({ children , className  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: clsx__WEBPACK_IMPORTED_MODULE_1___default()(className, \"prose dark:prose-invert\"),\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/alexvcasillas/alexvcasillas.com/src/components/Prose.jsx\",\n        lineNumber: 5,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9Qcm9zZS5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUF1QjtBQUVoQixTQUFTQyxNQUFNLEVBQUVDLFNBQVEsRUFBRUMsVUFBUyxFQUFFLEVBQUU7SUFDN0MscUJBQ0UsOERBQUNDO1FBQUlELFdBQVdILDJDQUFJQSxDQUFDRyxXQUFXO2tCQUE2QkQ7Ozs7OztBQUVqRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWxleHZjYXNpbGxhcy8uL3NyYy9jb21wb25lbnRzL1Byb3NlLmpzeD9lMTZjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbHN4IGZyb20gJ2Nsc3gnXG5cbmV4cG9ydCBmdW5jdGlvbiBQcm9zZSh7IGNoaWxkcmVuLCBjbGFzc05hbWUgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbHN4KGNsYXNzTmFtZSwgJ3Byb3NlIGRhcms6cHJvc2UtaW52ZXJ0Jyl9PntjaGlsZHJlbn08L2Rpdj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbImNsc3giLCJQcm9zZSIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwiZGl2Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Prose.jsx\n");

/***/ }),

/***/ "./src/pages/articles/introducing-cratebox.mdx":
/*!*****************************************************!*\
  !*** ./src/pages/articles/introducing-cratebox.mdx ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"meta\": () => (/* binding */ meta)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mdx_js_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mdx-js/react */ \"@mdx-js/react\");\n/* harmony import */ var _components_ArticleLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ArticleLayout */ \"./src/components/ArticleLayout.jsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__]);\n_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n/*@jsxRuntime automatic @jsxImportSource react*/ \n\n\nconst meta = {\n    author: \"Alex Casillas\",\n    date: \"2023-03-30\",\n    title: \"Introducing Cratebox.io: A global, fast content delivery network for NPM\",\n    description: \"When you’re building a website for a company as ambitious as Planetaria, you need to make an impression. I wanted people to visit our website and see animations that looked more realistic than reality itself.\"\n};\nconst MDXLayout = (props)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ArticleLayout__WEBPACK_IMPORTED_MODULE_2__.ArticleLayout, Object.assign({\n        meta: meta\n    }, props));\nfunction _createMdxContent(props) {\n    const _components = Object.assign({\n        p: \"p\",\n        a: \"a\"\n    }, (0,_mdx_js_react__WEBPACK_IMPORTED_MODULE_1__.useMDXComponents)(), props.components);\n    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {\n                children: [\n                    \"For the past couple of days, I've been working on a side project and now it's ready to be shared with you all \\uD83E\\uDD41 \",\n                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.a, {\n                        href: \"https://cratebox.io\",\n                        children: \"https://cratebox.io\"\n                    }),\n                    \" - Cratebox.io - A global, fast content delivery network for NPM\"\n                ]\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.p, {\n                children: \"Cratebox is a rapid and widespread content delivery network that caters to all of NPM's offerings. It enables you to promptly and effortlessly retrieve any file from any package by employing a URL.\"\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {\n                children: [\n                    \"If you are working on something and there's a dependency that you would like to give a try, and don't want to bother installing into your project, you can use the help \",\n                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.a, {\n                        href: \"https://cratebox.io\",\n                        children: \"https://cratebox.io\"\n                    }),\n                    \" to serve that packed dependency from a simple URL just for you!\"\n                ]\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {\n                children: [\n                    \"For instance, if you would like to use the latest version of the React package, you would only need to use the following URL \\uD83D\\uDC49 \",\n                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.a, {\n                        href: \"https://cratebox.io/react@18.2.0/umd/react.production.min.js\",\n                        children: \"https://cratebox.io/react@18.2.0/umd/react.production.min.js\"\n                    })\n                ]\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.p, {\n                children: \"This file will be served from our widespread Cloudflare cache that is spread across 285 cities and 100 countries, so it will be delivered in approximately between 50ms~200ms!\"\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components.p, {\n                children: [\n                    \"And the most important thing that I would like to mention is that Cratebox.io is 100% open source and it's publicly hosted on GitHub \\uD83D\\uDC49 \",\n                    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.a, {\n                        href: \"https://github.com/alexvcasillas/cratebox\",\n                        children: \"https://github.com/alexvcasillas/cratebox\"\n                    }),\n                    \" so you can help improve it, give it a shiny ⭐ and spread the ❤️ or even learn something new \\uD83D\\uDCD8\"\n                ]\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.p, {\n                children: \"I hope that you find this project interesting and if you get to use it, any feedback would be really appreciated as well as sharing it with your friends and co-workers, or even collaborating with code improvements or some GitHub sponsorships as some monthly costs are around $40 USD related to Vercel and Cloudflare fees \\uD83D\\uDCB5\"\n            }),\n            \"\\n\",\n            (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components.p, {\n                children: \"Once again, thank you so much for reading, sharing, and helping ❤️\"\n            })\n        ]\n    });\n}\nfunction MDXContent(props = {}) {\n    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MDXLayout, Object.assign({}, props, {\n        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_createMdxContent, props)\n    }));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MDXContent);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvYXJ0aWNsZXMvaW50cm9kdWNpbmctY3JhdGVib3gubWR4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDhDQUE4QyxHQUNzQztBQUR0RDtBQUVqQjtBQUNYLE1BQVFTLE9BQUE7SUFDUkMsUUFBTTtJQUNOQyxNQUFBO0lBRUFDLE9BQUE7SUFDRUMsYUFBQTtBQUFBO0FBR3VCLE1BQWNDLFlBQU1DLENBQUFBLFFBQUFaLHNEQUFBQSxDQUFBSyxvRUFBQUEsRUFBQVEsT0FBQUMsTUFBQTtRQUFBUixNQUFVQTtJQUFBLEdBQUFNO0FBQUEsU0FBQUcsa0JBQUFILEtBQUE7SUFBQSxNQUFBSSxjQUFBSCxPQUFBQyxNQUFBO1FBQUFHLEdBQUE7UUFBQUMsR0FBQTtJQUFBLEdBQUFkLCtEQUFBQSxJQUFBUSxNQUFBTyxVQUFBO0lBQUEsT0FBQWpCLHVEQUFBQSxDQUFBSix1REFBQUEsRUFBQTtRQUFBc0IsVUFBQTtZQUFBbEIsdURBQUFBLENBRXpEYyxZQUFBQyxDQUFBO2dCQUFBRyxVQUFBO29CQUFBO29CQUFBcEIsc0RBQUFBLENBQUFnQixZQUFBRSxDQUFBO3dCQUFBRyxNQUFBO3dCQUFpSEQsVUFBbUI7b0JBQUE7b0JBQUE7aUJBQUE7WUFBQTtZQUFBO1lBQUFwQixzREFBQUEsQ0FFcElnQixZQUFBQyxDQUFBO2dCQUFBRyxVQUFBO1lBQUE7WUFBQTtZQUFBbEIsdURBQUFBLENBRUFjLFlBQUFDLENBQUE7Z0JBQUFHLFVBQUE7b0JBQUE7b0JBQUFwQixzREFBQUEsQ0FBQWdCLFlBQUFFLENBQUE7d0JBQUFHLE1BQUE7d0JBQXdLRCxVQUFtQjtvQkFBQTtvQkFBQTtpQkFBQTtZQUFBO1lBQUE7WUFBQWxCLHVEQUFBQSxDQUUzTGMsWUFBQUMsQ0FBQTtnQkFBQUcsVUFBQTtvQkFBQTtvQkFBQXBCLHNEQUFBQSxDQUFBZ0IsWUFBQUUsQ0FBQTt3QkFBQUcsTUFBQTt3QkFBZ0lELFVBQUE7b0JBQUE7aUJBQUE7WUFBQTtZQUFBO1lBQUFwQixzREFBQUEsQ0FFaElnQixZQUFBQyxDQUFBO2dCQUFBRyxVQUFBO1lBQUE7WUFBQTtZQUFBbEIsdURBQUFBLENBRUFjLFlBQUFDLENBQUE7Z0JBQUFHLFVBQUE7b0JBQUE7b0JBQUFwQixzREFBQUEsQ0FBQWdCLFlBQUFFLENBQUE7d0JBQUFHLE1BQUE7d0JBQXdJRCxVQUF5QztvQkFBQTtvQkFBQTtpQkFBQTtZQUFBO1lBQUE7WUFBQXBCLHNEQUFBQSxDQUVqTGdCLFlBQUFDLENBQUE7Z0JBQUFHLFVBQUE7WUFBQTtZQUFBO1lBQUFwQixzREFBQUEsQ0FFQWdCLFlBQUFDLENBQUE7Z0JBQUFHLFVBQUE7WUFBQTtTQUFBO0lBQUE7QUFBQTtBQUFBLFNBQUFFLFdBQUFWLFFBQUE7SUFBQSxPQUFBWixzREFBQUEsQ0FBQVcsV0FBQUUsT0FBQUMsTUFBQSxLQUFBRixPQUFBO1FBQUFRLFVBQUFwQixzREFBQUEsQ0FBQWUsbUJBQUFIO0lBQUE7QUFBQTtBQUFBLGlFQUFBVSxVQUFBQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWxleHZjYXNpbGxhcy8uL3NyYy9wYWdlcy9hcnRpY2xlcy9pbnRyb2R1Y2luZy1jcmF0ZWJveC5tZHg/ZTg2YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKkBqc3hSdW50aW1lIGF1dG9tYXRpYyBAanN4SW1wb3J0U291cmNlIHJlYWN0Ki9cbmltcG9ydCB7RnJhZ21lbnQgYXMgX0ZyYWdtZW50LCBqc3ggYXMgX2pzeCwganN4cyBhcyBfanN4c30gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQge3VzZU1EWENvbXBvbmVudHMgYXMgX3Byb3ZpZGVDb21wb25lbnRzfSBmcm9tIFwiQG1keC1qcy9yZWFjdFwiO1xuaW1wb3J0IHtBcnRpY2xlTGF5b3V0fSBmcm9tICdAL2NvbXBvbmVudHMvQXJ0aWNsZUxheW91dCc7XG5leHBvcnQgY29uc3QgbWV0YSA9IHtcbiAgYXV0aG9yOiAnQWxleCBDYXNpbGxhcycsXG4gIGRhdGU6ICcyMDIzLTAzLTMwJyxcbiAgdGl0bGU6ICdJbnRyb2R1Y2luZyBDcmF0ZWJveC5pbzogQSBnbG9iYWwsIGZhc3QgY29udGVudCBkZWxpdmVyeSBuZXR3b3JrIGZvciBOUE0nLFxuICBkZXNjcmlwdGlvbjogJ1doZW4geW914oCZcmUgYnVpbGRpbmcgYSB3ZWJzaXRlIGZvciBhIGNvbXBhbnkgYXMgYW1iaXRpb3VzIGFzIFBsYW5ldGFyaWEsIHlvdSBuZWVkIHRvIG1ha2UgYW4gaW1wcmVzc2lvbi4gSSB3YW50ZWQgcGVvcGxlIHRvIHZpc2l0IG91ciB3ZWJzaXRlIGFuZCBzZWUgYW5pbWF0aW9ucyB0aGF0IGxvb2tlZCBtb3JlIHJlYWxpc3RpYyB0aGFuIHJlYWxpdHkgaXRzZWxmLidcbn07XG5jb25zdCBNRFhMYXlvdXQgPSBwcm9wcyA9PiBfanN4KEFydGljbGVMYXlvdXQsIE9iamVjdC5hc3NpZ24oe1xuICBtZXRhOiBtZXRhXG59LCBwcm9wcykpO1xuZnVuY3Rpb24gX2NyZWF0ZU1keENvbnRlbnQocHJvcHMpIHtcbiAgY29uc3QgX2NvbXBvbmVudHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICBwOiBcInBcIixcbiAgICBhOiBcImFcIlxuICB9LCBfcHJvdmlkZUNvbXBvbmVudHMoKSwgcHJvcHMuY29tcG9uZW50cyk7XG4gIHJldHVybiBfanN4cyhfRnJhZ21lbnQsIHtcbiAgICBjaGlsZHJlbjogW19qc3hzKF9jb21wb25lbnRzLnAsIHtcbiAgICAgIGNoaWxkcmVuOiBbXCJGb3IgdGhlIHBhc3QgY291cGxlIG9mIGRheXMsIEkndmUgYmVlbiB3b3JraW5nIG9uIGEgc2lkZSBwcm9qZWN0IGFuZCBub3cgaXQncyByZWFkeSB0byBiZSBzaGFyZWQgd2l0aCB5b3UgYWxsIPCfpYEgXCIsIF9qc3goX2NvbXBvbmVudHMuYSwge1xuICAgICAgICBocmVmOiBcImh0dHBzOi8vY3JhdGVib3guaW9cIixcbiAgICAgICAgY2hpbGRyZW46IFwiaHR0cHM6Ly9jcmF0ZWJveC5pb1wiXG4gICAgICB9KSwgXCIgLSBDcmF0ZWJveC5pbyAtIEEgZ2xvYmFsLCBmYXN0IGNvbnRlbnQgZGVsaXZlcnkgbmV0d29yayBmb3IgTlBNXCJdXG4gICAgfSksIFwiXFxuXCIsIF9qc3goX2NvbXBvbmVudHMucCwge1xuICAgICAgY2hpbGRyZW46IFwiQ3JhdGVib3ggaXMgYSByYXBpZCBhbmQgd2lkZXNwcmVhZCBjb250ZW50IGRlbGl2ZXJ5IG5ldHdvcmsgdGhhdCBjYXRlcnMgdG8gYWxsIG9mIE5QTSdzIG9mZmVyaW5ncy4gSXQgZW5hYmxlcyB5b3UgdG8gcHJvbXB0bHkgYW5kIGVmZm9ydGxlc3NseSByZXRyaWV2ZSBhbnkgZmlsZSBmcm9tIGFueSBwYWNrYWdlIGJ5IGVtcGxveWluZyBhIFVSTC5cIlxuICAgIH0pLCBcIlxcblwiLCBfanN4cyhfY29tcG9uZW50cy5wLCB7XG4gICAgICBjaGlsZHJlbjogW1wiSWYgeW91IGFyZSB3b3JraW5nIG9uIHNvbWV0aGluZyBhbmQgdGhlcmUncyBhIGRlcGVuZGVuY3kgdGhhdCB5b3Ugd291bGQgbGlrZSB0byBnaXZlIGEgdHJ5LCBhbmQgZG9uJ3Qgd2FudCB0byBib3RoZXIgaW5zdGFsbGluZyBpbnRvIHlvdXIgcHJvamVjdCwgeW91IGNhbiB1c2UgdGhlIGhlbHAgXCIsIF9qc3goX2NvbXBvbmVudHMuYSwge1xuICAgICAgICBocmVmOiBcImh0dHBzOi8vY3JhdGVib3guaW9cIixcbiAgICAgICAgY2hpbGRyZW46IFwiaHR0cHM6Ly9jcmF0ZWJveC5pb1wiXG4gICAgICB9KSwgXCIgdG8gc2VydmUgdGhhdCBwYWNrZWQgZGVwZW5kZW5jeSBmcm9tIGEgc2ltcGxlIFVSTCBqdXN0IGZvciB5b3UhXCJdXG4gICAgfSksIFwiXFxuXCIsIF9qc3hzKF9jb21wb25lbnRzLnAsIHtcbiAgICAgIGNoaWxkcmVuOiBbXCJGb3IgaW5zdGFuY2UsIGlmIHlvdSB3b3VsZCBsaWtlIHRvIHVzZSB0aGUgbGF0ZXN0IHZlcnNpb24gb2YgdGhlIFJlYWN0IHBhY2thZ2UsIHlvdSB3b3VsZCBvbmx5IG5lZWQgdG8gdXNlIHRoZSBmb2xsb3dpbmcgVVJMIPCfkYkgXCIsIF9qc3goX2NvbXBvbmVudHMuYSwge1xuICAgICAgICBocmVmOiBcImh0dHBzOi8vY3JhdGVib3guaW8vcmVhY3RAMTguMi4wL3VtZC9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qc1wiLFxuICAgICAgICBjaGlsZHJlbjogXCJodHRwczovL2NyYXRlYm94LmlvL3JlYWN0QDE4LjIuMC91bWQvcmVhY3QucHJvZHVjdGlvbi5taW4uanNcIlxuICAgICAgfSldXG4gICAgfSksIFwiXFxuXCIsIF9qc3goX2NvbXBvbmVudHMucCwge1xuICAgICAgY2hpbGRyZW46IFwiVGhpcyBmaWxlIHdpbGwgYmUgc2VydmVkIGZyb20gb3VyIHdpZGVzcHJlYWQgQ2xvdWRmbGFyZSBjYWNoZSB0aGF0IGlzIHNwcmVhZCBhY3Jvc3MgMjg1IGNpdGllcyBhbmQgMTAwIGNvdW50cmllcywgc28gaXQgd2lsbCBiZSBkZWxpdmVyZWQgaW4gYXBwcm94aW1hdGVseSBiZXR3ZWVuIDUwbXN+MjAwbXMhXCJcbiAgICB9KSwgXCJcXG5cIiwgX2pzeHMoX2NvbXBvbmVudHMucCwge1xuICAgICAgY2hpbGRyZW46IFtcIkFuZCB0aGUgbW9zdCBpbXBvcnRhbnQgdGhpbmcgdGhhdCBJIHdvdWxkIGxpa2UgdG8gbWVudGlvbiBpcyB0aGF0IENyYXRlYm94LmlvIGlzIDEwMCUgb3BlbiBzb3VyY2UgYW5kIGl0J3MgcHVibGljbHkgaG9zdGVkIG9uIEdpdEh1YiDwn5GJIFwiLCBfanN4KF9jb21wb25lbnRzLmEsIHtcbiAgICAgICAgaHJlZjogXCJodHRwczovL2dpdGh1Yi5jb20vYWxleHZjYXNpbGxhcy9jcmF0ZWJveFwiLFxuICAgICAgICBjaGlsZHJlbjogXCJodHRwczovL2dpdGh1Yi5jb20vYWxleHZjYXNpbGxhcy9jcmF0ZWJveFwiXG4gICAgICB9KSwgXCIgc28geW91IGNhbiBoZWxwIGltcHJvdmUgaXQsIGdpdmUgaXQgYSBzaGlueSDirZAgYW5kIHNwcmVhZCB0aGUg4p2k77iPIG9yIGV2ZW4gbGVhcm4gc29tZXRoaW5nIG5ldyDwn5OYXCJdXG4gICAgfSksIFwiXFxuXCIsIF9qc3goX2NvbXBvbmVudHMucCwge1xuICAgICAgY2hpbGRyZW46IFwiSSBob3BlIHRoYXQgeW91IGZpbmQgdGhpcyBwcm9qZWN0IGludGVyZXN0aW5nIGFuZCBpZiB5b3UgZ2V0IHRvIHVzZSBpdCwgYW55IGZlZWRiYWNrIHdvdWxkIGJlIHJlYWxseSBhcHByZWNpYXRlZCBhcyB3ZWxsIGFzIHNoYXJpbmcgaXQgd2l0aCB5b3VyIGZyaWVuZHMgYW5kIGNvLXdvcmtlcnMsIG9yIGV2ZW4gY29sbGFib3JhdGluZyB3aXRoIGNvZGUgaW1wcm92ZW1lbnRzIG9yIHNvbWUgR2l0SHViIHNwb25zb3JzaGlwcyBhcyBzb21lIG1vbnRobHkgY29zdHMgYXJlIGFyb3VuZCAkNDAgVVNEIHJlbGF0ZWQgdG8gVmVyY2VsIGFuZCBDbG91ZGZsYXJlIGZlZXMg8J+StVwiXG4gICAgfSksIFwiXFxuXCIsIF9qc3goX2NvbXBvbmVudHMucCwge1xuICAgICAgY2hpbGRyZW46IFwiT25jZSBhZ2FpbiwgdGhhbmsgeW91IHNvIG11Y2ggZm9yIHJlYWRpbmcsIHNoYXJpbmcsIGFuZCBoZWxwaW5nIOKdpO+4j1wiXG4gICAgfSldXG4gIH0pO1xufVxuZnVuY3Rpb24gTURYQ29udGVudChwcm9wcyA9IHt9KSB7XG4gIHJldHVybiBfanN4KE1EWExheW91dCwgT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICBjaGlsZHJlbjogX2pzeChfY3JlYXRlTWR4Q29udGVudCwgcHJvcHMpXG4gIH0pKTtcbn1cbmV4cG9ydCBkZWZhdWx0IE1EWENvbnRlbnQ7XG4iXSwibmFtZXMiOlsiRnJhZ21lbnQiLCJfRnJhZ21lbnQiLCJqc3giLCJfanN4IiwianN4cyIsIl9qc3hzIiwidXNlTURYQ29tcG9uZW50cyIsIl9wcm92aWRlQ29tcG9uZW50cyIsIkFydGljbGVMYXlvdXQiLCJtZXRhIiwiYXV0aG9yIiwiZGF0ZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJNRFhMYXlvdXQiLCJwcm9wcyIsIk9iamVjdCIsImFzc2lnbiIsIl9jcmVhdGVNZHhDb250ZW50IiwiX2NvbXBvbmVudHMiLCJwIiwiYSIsImNvbXBvbmVudHMiLCJjaGlsZHJlbiIsImhyZWYiLCJNRFhDb250ZW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/articles/introducing-cratebox.mdx\n");

/***/ })

};
;
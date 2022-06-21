"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const APIFeature = reqQuery => {
  const queryObjFilter = _objectSpread({}, reqQuery);

  const excludedQuery = ['page', 'sort', 'limit', 'fields'];
  excludedQuery.forEach(el => delete queryObjFilter[el]);
  let queryWhere = {};
  let querySort = reqQuery.sort || 'createdAt';
  let queryLimit = Number(reqQuery.limit) || 30;
  let queryPage = reqQuery.page || 1;
  let offset = (Number(queryPage) - 1) * Number(queryLimit);
  Object.keys(queryObjFilter).map(e => {
    if (queryObjFilter[e]['gte']) {
      queryWhere = _objectSpread(_objectSpread({}, queryWhere), {}, {
        [e]: {
          [_sequelize.Op.gte]: Number(queryObjFilter[e]['gte'])
        }
      });
    }

    if (queryObjFilter[e]['gt']) {
      queryWhere = _objectSpread(_objectSpread({}, queryWhere), {}, {
        [e]: {
          [_sequelize.Op.gt]: Number(queryObjFilter[e]['gt'])
        }
      });
    }

    if (queryObjFilter[e]['lt']) {
      queryWhere = _objectSpread(_objectSpread({}, queryWhere), {}, {
        [e]: {
          [_sequelize.Op.lt]: Number(queryObjFilter[e]['lt'])
        }
      });
    }

    if (queryObjFilter[e]['lte']) {
      queryWhere = _objectSpread(_objectSpread({}, queryWhere), {}, {
        [e]: {
          [_sequelize.Op.lte]: Number(queryObjFilter[e]['lte'])
        }
      });
    }

    if (typeof queryObjFilter[e] === 'string') {
      queryWhere = _objectSpread(_objectSpread({}, queryWhere), {}, {
        [e]: {
          [_sequelize.Op.eq]: Number(queryObjFilter[e])
        }
      });
    }

    if (queryObjFilter[e] === queryObjFilter['name']) {
      // Tìm kiếm
      queryWhere = _objectSpread(_objectSpread({}, queryWhere), {}, {
        [e]: {
          [_sequelize.Op.substring]: queryObjFilter['name']
        }
      });
    }

    return e;
  });

  if (querySort) {
    querySort = querySort.split(',').map(e => {
      if (e.startsWith('-')) {
        // loại dấu -
        return [e.slice(1), 'ASC'];
      }

      return [e, 'DESC'];
    });
  }

  return {
    queryWhere,
    querySort,
    queryLimit,
    queryPage,
    offset
  };
};

var _default = APIFeature;
exports.default = _default;
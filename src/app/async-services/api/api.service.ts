import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs/Observable';

let API_TREE: Object = {};

@Injectable()
export class ApiService {
  private apiTree = API_TREE;

  constructor(private httpService: HttpService) { }

  makeRequest(config, params?) {
    return this.httpService.post(config, params);
  }

  doRequest(config, apiParams?) {
    const action = this.findAction(config);

    if (action) {
      const method = action['method'];
      const cleanAction = this.getCleanAction(action);
      const params = this.buildParams(method, apiParams);

      console.log('Action for config:', config, '-', cleanAction);

      if (method === 'POST') {
        return this.httpService.post(action['url'], params);
      }

      if (method === 'GET') {
        return this.httpService.get(action['url'] + '?' + params);
      }
    } else {
      return Observable['empty']();
    }
  }

  private findAction(config) {
    const tree = this.apiTree;
    let obj;

    try {
      obj = tree[config.chapter][config.object][config.action];
    } catch (error) {
      console.log('No API for config:', config);
    }

    return obj;
  }

  private buildParams(method, oldParams) {
    let params;

    if (oldParams && Object['keys'](oldParams).length) {
      if (method === 'POST') {
        params = this.copy(oldParams);
      } else {
        params = this.paramsToString(oldParams);
      }
    } else {
      params = (method === 'POST') ? {} : '';
    }

    return params;
  }

  private paramsToString(obj) {
    let str = '';
    Object.keys(obj)
    .forEach(key => {
      if (obj[key] instanceof Array) {
        str += `${key}=${this.arrToString(obj[key])}&`;
      } else {
        str += `${key}=${obj[key]}&`;
      }
    });
    return str.slice(0, -1);
  }

  private arrToString(arr) {
    return `[${arr.map(el => `"${el}"`)}]`;
  }

  private getCleanAction(action) {
    const cleanAction = this.copy(action);

    delete cleanAction['url'];
    delete cleanAction['method'];

    return cleanAction;
  }

  private copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}

API_TREE = {
  mapList: {
    assetsList: {
      getAssetsList: {
        url: 'IO_Asset/getList',
        module: 'IO_Asset',
        action: 'getList',
        method: 'POST',

        // portfolio selection
        portfolioID: '2',
        year:	'2012',
        month: '11',
        date: '2012-11',

        // paging + sorting
        start: '0',
        limit: '1000',
        sort: 'id',
        dir: 'ASC',
      }
    }
  }
};

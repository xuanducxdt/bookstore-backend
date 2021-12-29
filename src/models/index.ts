/* eslint-disable linebreak-style */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';

const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const totalModels: any = fs
  .readdirSync(__dirname)
  .filter((filename) => /model.ts$/.test(filename))
  .reduce((total, filename) => {
    const model = require(path.resolve(__dirname, filename)).default;
    const { modelName } = model;
    const formattedModelName = (modelName.split('_') || [])
      .reduce((newModelName: any, curElementName: any) => newModelName + capitalize(curElementName), '');
    return {
      ...total,
      [formattedModelName]: model,
    };
  }, {});

export default totalModels;

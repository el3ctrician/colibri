// Copyright 2020 Teros Technology
//
// Ismael Perez Rojo
// Carlos Alberto Ruiz Naranjo
// Alfredo Saez
//
// This file is part of Colibri.
//
// Colibri is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Colibri is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Colibri.  If not, see <https://www.gnu.org/licenses/>.

const os = require('os');
const temp = require('temp');
const fs = require('fs');
const path_lib = require('path');

class Base_formatter {
  _get_command(file, synt, synt_windows, options){
    let command = "";
    if (options !== undefined && options.custom_bin !== undefined){
      command += options.custom_bin + " ";
    }
    else if(os.platform() === "win32"){
      if (options !== undefined && options.custom_path !== undefined){
        command += options.custom_path + path_lib.sep + synt_windows + " ";
      }
      else{
        command += synt_windows + " ";
      }
    }
    else{
      if (options !== undefined && options.custom_path !== undefined){
        command += options.custom_path + path_lib.sep + synt + " ";
      }
      else{
        command += synt + " ";
      }
    }

    if (options !== undefined && options.custom_arguments !== undefined){
      command += options.custom_arguments + " ";
    }

    command += file;
    return command;
  }

  async _create_temp_file_of_code(content) {
    const temp_file = temp.openSync();
    if (temp_file === undefined) {
      // eslint-disable-next-line no-throw-literal
      throw "Unable to create temporary file";
    }
    fs.writeSync(temp_file.fd, content);
    fs.closeSync(temp_file.fd);
    return temp_file.path;
  }

  async _exec_formatter(file, synt, synt_windows, options) {  
    var command = this._get_command(file,synt,synt_windows,options);  
    const exec = require('child_process').exec;
      return new Promise((resolve) => {
        exec(command, (error, stdout, stderr) => {
          let result = {'stdout':stdout,'stderr':stderr};
          resolve(result);
      });
    });
  }
}

module.exports = Base_formatter;

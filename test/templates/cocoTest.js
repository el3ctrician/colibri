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

const colors = require('colors');
const path = require('path');
const fs = require('fs');
const Colibri = require('../../src/main');
const Codes = require('../../src/templates/codes')

let path_example_vhdl = 'examples'+path.sep+'vhdl'+path.sep
let path_example_verilog = 'examples'+path.sep+'verilog'+path.sep
var structure_vhdl = fs.readFileSync(path_example_vhdl+'example_1.vhd','utf8');
var structure_v = fs.readFileSync(path_example_verilog+'uart.v','utf8');

let options = {
  "type": "cocotb",
  "language": "vhdl"
};
var cocotbpyVhdl = new Colibri.Templates.TemplatesFactory();
let cocotb_vhdl_expected = fs.readFileSync(path_example_vhdl+'cocotbVhdl.py', 'utf8');
var template = cocotbpyVhdl.getTemplate(Codes.TYPES.COCOTB,options)
template.generate(structure_vhdl,options).then(cocotb_vhdl => {
  console.log('****************************************************************');
  if(cocotb_vhdl_expected.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g,'') === cocotb_vhdl.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g,'')){
    console.log("---> Tested: cocotb vhdl --> ok!".green);
  }
  else{
    console.log("---> Tested: cocotb vhdl --> fail!".red);
    throw new Error('Test error.');
  }
});

let options_verilog = {
    "type": "cocotb",
    "language": "verilog"
  };
var cocotbpyV = new Colibri.Templates.TemplatesFactory();
let cocotb_verilog_expected = fs.readFileSync(path_example_verilog+'cocotbV.py', 'utf8');
var templateV = cocotbpyV.getTemplate(Codes.TYPES.COCOTB,options_verilog)
templateV.generate(structure_v,options_verilog).then(cocotb_verilog => {
  console.log('****************************************************************');
  if(cocotb_verilog_expected.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g,'') === cocotb_verilog.replace(/\n/g,'').replace(/ /g,'').replace(/\r/g,'')){
    console.log("---> Tested: cocotb verilog --> ok!".green);
  }
  else{
    console.log("---> Tested: cocotb verilog --> fail!".red);
    throw new Error('Test error.');
  }
});


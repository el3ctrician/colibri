// Copyright 2020 Teros Tech
//
// Ismael Perez Rojo
// Carlos Alberto Ruiz Naranjo
// Alfredo Enrique Sáez
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

const fs = require('fs');
const Simulators = require('../simulators/simulators')

class Manager extends Simulators.Simulators{
  constructor(configurator){
    super();
    this.source = [];
    this.testbench = [];
    if (typeof configurator === 'undefined')
      this.configurator = new Configurator();
    else
      this.configurator = configurator;
  }
  loadProject(file){
    var jsonF = fs.readFileSync(file,'utf8');
    this.source = JSON.parse(jsonF)['src'];
    this.testbench = JSON.parse(jsonF)['tb'];
    this.configurator.setAll(JSON.parse(jsonF)['config']);
  }
  saveProject(file){
    var prj = {
      src : this.source,
      tb : this.testbench,
      config : this.configurator.getAll()
    };
    var data = JSON.stringify(prj);
    fs.writeFileSync(file,data);
  }
  getConfig(){
    return this.configurator.getAll();
  }
  clear(){
    this.source = [];
    this.testbench = [];
    // this.configurator = new Configurator();
  }
  addSource(newSource){
    console.log("Added source...");
    for (var i=0;i<newSource.length;++i) {
      var f = {
        name: newSource[i],
        file_type: this.getFileType(newSource[i])
      }
      this.source = this.source.concat(f);
    }
  }
  deleteSource(source){
    for(var i=0;i<source.length;++i)
      this.source = this.source.filter(function( obj ) {
          return obj.name !== source[i];
      });
  }
  addTestbench(newTestbench){
    console.log("Added testbench...");
    for (var i=0;i<newTestbench.length;++i) {
      var f = {
        name: newTestbench[i],
        file_type: this.getFileType(newTestbench[i])
      }
      this.testbench = this.testbench.concat(f);
    }
  }
  deleteTestbench(testbench){
    for(var i=0;i<testbench.length;++i)
      this.testbench = this.testbench.filter(function( obj ) {
          return obj.name !== testbench[i];
      });
  }
  setConfiguration(configurator){
    this.configurator = configurator;
  }
  getSourceName(){
    var names = [];
    for(var i=0; i<this.source.length;++i)
      names = names.concat(this.source[i]['name']);
    return names;
  }
  getTestbenchName(){
    var names = [];
    for(var i=0; i<this.testbench.length;++i)
      names = names.concat(this.testbench[i]['name']);
    return names;
  }
  getFileType(f){
    if (typeof f != "string")
      return "none";
    var ext = f.split('.').pop();
    var file_type = "";
    if (ext == "py")
      file_type = "py"
    else if(ext == "v")
      file_type = "verilogSource-2005"
    else if(ext == "vhd")
      file_type = "vhdlSource-2008"
    return file_type;
  }
  getEdamFormat(){
    var edam = {
      'name': this.configurator.getName(),
      'suite': this.configurator.getSuite(),
      'tool' : this.configurator.getTool(),
      'working_dir' : this.configurator.getWorkingDir(),
      'top_level' : this.configurator.getTopLevel(),
      'files'  : this.source.concat(this.testbench),
      'gtkwave' : ''
    }
    return edam;
  }
  getSuites(server,port){
    return super.getSuites(server,port);
  }
  simulate(ip,port){
    var edam = this.getEdamFormat();
    return super.simulate(ip,port,edam);
  }
}

class Configurator{
  constructor(){
    this.configuration = this.setDefaults();
  }
  setDefaults(){
    var configuration = {
      'suite':'',
      'tool':'',
      'language':'',
      'name':'',
      'top_level':'',
      'working_dir':'',
      'gtkwave':''
    }
    return configuration;
  }
  setSuite(suite){
    if (typeof suite != 'string') {
        throw new Error('You must pass requiredParam to function setSuite!');
    }
    this.configuration["suite"] = suite;
  }
  setTool(tool){
    if (typeof tool != 'string') {
        throw new Error('You must pass requiredParam to function settool!');
    }
    this.configuration["tool"] = tool;
  }
  setLanguage(language){
    if (typeof language != 'string') {
        throw new Error('You must pass requiredParam to function setLanguage!');
    }
    this.configuration["language"] = language;
  }
  setName(name){
    if (typeof name != 'string') {
        throw new Error('You must pass requiredParam to function setName!');
    }
    this.configuration["name"] = name;
  }
  setTopLevel(topLevel){
    if (typeof topLevel != 'string') {
        throw new Error('You must pass requiredParam to function setTopLevel!');
    }
    this.configuration["top_level"] = topLevel;
  }
  setWorkingDir(workingDir){
    if (typeof workingDir != 'string') {
        throw new Error('You must pass requiredParam to function setWorkingDir!');
    }
    this.configuration["working_dir"] = workingDir;
  }
  getSuite(){
    return this.configuration['suite'];
  }
  getTool(){
    return this.configuration['tool'];
  }
  getLanguage(){
    return this.configuration['language'];
  }
  getName(){
    return this.configuration['name'];
  }
  getTopLevel(){
    return this.configuration['top_level'];
  }
  getWorkingDir(){
    return this.configuration['working_dir'];
  }
  getAll(){
    return this.configuration;
  }
  setAll(config){
    this.configuration = {
      'suite':config['suite'],
      'tool':config['tool'],
      'language':config['language'],
      'name':config['name'],
      'top_level':config['top_level'],
      'working_dir':config['working_dir'],
      'gtkwave':config['gtkwave']
    }
  }
}

module.exports = {
  Configurator   : Configurator,
  Manager : Manager
}

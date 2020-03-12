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

const BaseLinter = require('./linter')

class Modelsim extends BaseLinter {
  constructor() {
    super();
    this.PARAMETERS = {
      'SYNT': "vcom -2008 ",
      'ERROR': /\** *(Error|Warning)*[ ()a-zA-Z]*: *([/\t:=$&%#@?¿'¡! A-Za-z._0-9]+)*[(]{1}[\t]*([0-9]+)*[)]{1}[\t]*:*[\t ]*(.+)/ig,
      'TYPEPOSITION': 1,
      'ROWPOSITION': 3,
      'COLUMNPOSITION': 6,
      'DESCRIPTIONPOSITION': 4,
      'OUTPUT': this.OUTPUT.OUT,
    }
  }
}

module.exports = {
  Modelsim: Modelsim
}

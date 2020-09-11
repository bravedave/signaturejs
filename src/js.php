<?php
/*
 * David Bray
 * BrayWorth Pty Ltd
 * e. david@brayworth.com.au
 *
 * MIT License
 *
 * styleguide : https://codeguide.co/
*/

namespace signaturejs;

abstract class js {
  static function serve() {
    \sys::serve(implode( DIRECTORY_SEPARATOR, [
      __DIR__,
      'signature.js'

    ]));

  }

}

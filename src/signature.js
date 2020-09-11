/**
 * David Bray
 * BrayWorth Pty Ltd
 * e. david@brayworth.com.au
 *
 * MIT License
 *
 * */

( $ => {
  $.fn.signature = function () {
    // https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse

    let _canvas = this;
    let canvas = _canvas[0];	// action, not jQuery, element
    // console.log( canvas);

    let data = _canvas.data();

    if (!!data.init) return;

    _canvas.data('init', true);
    _canvas.data('signed', false);
    _canvas.data('signing', true);
    _canvas.data('signatureCount', 0);

    canvas.isSigned = function () {
      let data = $(this).data();
      return data.signatureCount >= 30;

    }

    _canvas.on( 'write', function( e, i) {
      let _canvas = $(this);
      let data = _canvas.data();

      let count = Number(data.signatureCount) + i;
      _canvas.data('signatureCount', count);

      // console.log(_canvas.data('signatureCount'), i);
      if (count >= 30 && 'yes' != data.signed) {
        _canvas.data( 'signed', 'yes');
        _canvas.trigger( 'signed');

      };

    })

    let ctx = canvas.getContext("2d");

    let lineWidth = 2;
    let fillStyle = 'black';

    let prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0;

    let flag = false,
      dot_flag = false;

    _canvas.parent().css({
      'position' : 'relative'
    });

    $('<i class="fa fa-2x fa-times-circle text-muted"></i>')
    .on('click', function (e) {
      let data = _canvas.data();

      if (!data.signing) return;
      e.stopPropagation(); e.preventDefault();
      let h = canvas.height;
      let w = canvas.width;
      ctx.clearRect(0, 0, w, h);

      _canvas.data('signatureCount', 0);
      _canvas.data('signed', false);
      _canvas.trigger('clear');

    })
    .css({
      'position':'absolute',
      'top': '-2px',
      'left': ( Number( _canvas.attr('width')) - 28) + 'px',

    })
    .prependTo( _canvas.parent());

    let draw = () => {
      //~ ctx.beginPath();ctx.moveTo(69, 158);ctx.lineTo(71, 160);ctx.strokeStyle = 'black';ctx.lineWidth = 2;ctx.stroke();ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = fillStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      ctx.closePath();
      //~ console.log( 'draw', fillStyle, lineWidth, prevX, prevY, currX, currY);

      _canvas.trigger( 'write', 1);

    };

    let getMousePos = (canvas, evt) => {
      let rect = canvas.getBoundingClientRect();
      //~ console.log( evt);
      if (!!evt.touches && evt.touches.length > 0) {
        return {
          x: evt.touches[0].clientX - rect.left,
          y: evt.touches[0].clientY - rect.top
        };

      }
      else {
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };

      };

    };

    let findxy = (res, e) => {
      let data = _canvas.data();
      if (!data.signing) return;	// disable

      if (res == 'down') {
        prevX = currX;
        prevY = currY;

        e.preventDefault();
        let mouse = getMousePos(canvas, e);
        currX = mouse.x;
        currY = mouse.y;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
          ctx.beginPath();
          ctx.fillStyle = fillStyle;
          ctx.fillRect(currX, currY, lineWidth, lineWidth);
          ctx.closePath();
          dot_flag = false;

          _canvas.trigger('write', 1);

        }

      }
      else if (res == 'up' || res == "out") {
        //~ e.preventDefault();
        flag = false;

      }
      else if (res == 'move') {
        if (flag) {
          e.preventDefault();

          prevX = currX;
          prevY = currY;

          let mouse = getMousePos(canvas, e);
          currX = mouse.x;
          currY = mouse.y;

          draw();

        }

      }

    };

    canvas.addEventListener("touchmove", e => findxy('move', e), false);
    canvas.addEventListener("touchstart", e => findxy('down', e), false);
    canvas.addEventListener("touchend", e => findxy('up', e), false);

    canvas.addEventListener("mousemove", e => findxy('move', e), false);
    canvas.addEventListener("mousedown", e => findxy('down', e), false);
    canvas.addEventListener("mouseup", e => findxy('up', e), false);
    canvas.addEventListener("mouseout", e => findxy('out', e), false);

  };

})(jQuery);

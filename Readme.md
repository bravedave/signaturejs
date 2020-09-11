# Canvas Signing utility

### Usage from PHP
```html
<canvas class="border" height="200" width="320"
  id="<?= $_uidCanvas = strings::rand() ?>"></canvas>

<!-- canvas warnings -->
<div class="alert alert-danger d-none" role="alert" id="<?= $_uidCanvas ?>warning">
  please sign

</div>

<script>
$(document).ready( () => {
	let _canvas = $('#<?= $_uidCanvas ?>');
	_canvas
	.on( 'clear', function( e) {
		$('input[name="signed"]', '#<?= $_form ?>').val( 'no');

	})
	.on( 'signed', function( e) {
		let frm = '#<?= $_form ?>';
		$('input[name="signed"]', frm).val( 'yes');

		let d = new Date();
		let mm = d.getMonth() + 1; // getMonth() is zero-based
		let dd = d.getDate();

		let yyyymmdd = [
			d.getFullYear(),
			(mm>9 ? '' : '0') + mm,
			(dd>9 ? '' : '0') + dd
		].join('-');

		$('input[name="signature_date"]', frm).val( yyyymmdd);
		$('#<?= $_uidCanvas ?>warning').addClass('d-none');

	});

	_canvas.signature();

});
</script>
```
### Usage from PHP
This will server the file the same as if you read the file directly
```php
  public function signaturejs() {
    signaturejs\js::serve();

  }
```

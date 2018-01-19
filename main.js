jQuery(document).ready(function($) {


  jQuery(".tooltip-trigger").hover(function(){
      jQuery(".tooltip-right").toggleClass('active');
  });

  // set cover image
  (function(){
      jQuery(".post-toolbar button.enable-cover-image").hide();

      jQuery(".cover-image__toolbar .action").on("click", function(){
          jQuery(this).parent().parent().find(".action").removeClass("active");
          jQuery(this).addClass('active');

          if (jQuery(this).hasClass('contain')) {
              jQuery(".cover-image__drop").css('background-size', 'contain');
          } else if (jQuery(this).hasClass('trash')) {
              jQuery(".cover-image__drop").css('background-image', 'none');
              jQuery(".cover-image").removeClass('cover-image--has-image');
              jQuery('.cover-image__label').show();
              jQuery(this).removeClass('active');
          } else {
              jQuery(".cover-image__drop").css('background-size', 'cover');
          }
      });

      jQuery(document).on('click','.cover-image__file-input', function(e) {
          // e.preventDefault();
          $thisItem = jQuery(this);
          jQuery('#cover-image__file-input').change(function () {
              var file = this.files[0];
              var reader = new FileReader();
              reader.onloadend = function () {
                  $thisItem.parent().parent().addClass('cover-image--has-image');
                  $thisItem.parent().css('background-image', 'url("' + reader.result + '")');
                  jQuery('.cover-image__label').hide();
              }
              if (file) {
                  reader.readAsDataURL(file);
              } else {
              }
          });
      });

      // disable cover image
      jQuery(".cover-image__disable").on("click", function(){
          jQuery(".cover-image.ember-view").addClass("cover-image--disabled");
          jQuery(".post-toolbar button.enable-cover-image").show();
      });
      // enable cover image
      jQuery(".post-toolbar button.enable-cover-image").on('click', function(){
          jQuery(this).hide();
          jQuery(".cover-image.ember-view").removeClass("cover-image--disabled");
          jQuery('.cover-image__label').show();
      });

      jQuery('.embed-insertion-control').on('click', function() {
        jQuery(this).toggleClass('embed-insertion-control-active');
      });
  })(jQuery());

  // create dinamycall divs for post images, links or videos in article editor
  (function () {
    var clicks = 0;

    jQuery('.embed-insertion-control').on('click', function() {
      jQuery(".slate-embed-toolbar-wrapper").toggleClass('active');
    });
    jQuery(document).on('click', '.btn-add-img', function(e) {
      clicks++;
      $('#target-blk').append('<div id="image-blk" class="added-blk">'
        + '<span class="remove-blk"> X </span>'
        + '<label class="file-url" id="image-url">'
        + 'Upload image'
        + '<input type="file" name="file" id="file" class="file-url"/>'
        + '</label>'+
      '</div>');
    });
    jQuery(document).on("click", ".remove-blk", function() {
      jQuery(this).parent().remove();
    });

    if (window.File && window.FileList && window.FileReader) {
      jQuery(document).on("change", "#file", function(e) {
        var files = e.target.files,
          filesLength = files.length;
        for (var i = 0; i < filesLength; i++) {
          var f = files[i]
          var fileReader = new FileReader();
          fileReader.onload = (function(e) {
            var file = e.target;
            jQuery("<span class=\"image-preview\">" +
              "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
              "</span>").appendTo("#image-blk");

              jQuery('.embed-insertion-control').removeClass('embed-insertion-control-active');
              jQuery('.slate-embed-toolbar-wrapper').removeClass('active');
              jQuery('.image-preview').addClass('animated');
          });
          fileReader.readAsDataURL(f);
        }
      });
    } else {
      alert("Your browser doesn't support to File API")
    }

  })(jQuery());

});
// end document ready

(function ($) {
    $.fn.handleAttachmentInput = function(){
        var $inputBox = $(this);
        var $clearBtn = $inputBox.find('.clear-btn');
        var $browsBtn = $inputBox.find('.brows-btn');
        var $inputElement = $($inputBox.attr('data-default'));
        var handle_clear_btn = function (value) {
            if(value!=''){
                $clearBtn.removeClass('hidden');
            }else{
                $clearBtn.addClass('hidden');
            }
        };
        handle_clear_btn($inputElement.val());
        $inputElement.change(function () {
            handle_clear_btn($inputElement.val());
        });
        $.fn.inputAttachmentBrowse = function (url, value_divider) {
            var defaultValue = $inputElement.val()!=''?$inputElement.val().split(value_divider):[];
            $.loadInModal(url,'modal-lg', function (myModal) {
                myModal.find('.attachment-item').each(function () {
                    var $thisItem = $(this), $itemInput = $thisItem.find('input[type="checkbox"]');
                    if(defaultValue.indexOf($itemInput.attr('data-value'))>-1){
                        $itemInput.prop('checked', true);
                    }
                });
                myModal.find('.attach-btn').click(function () {
                    var value_return = '', display_return = '';
                    myModal.find('.attachment-item input[type="checkbox"]:checked').each(function () {
                        var $itemInput = $(this);
                        value_return += value_return!=''?value_divider:'';
                        value_return += $itemInput.attr('data-value');
                        // display_return += $($itemInput.attr('data-display')).val();
                    });
                    $inputElement.val(value_return);
                    // $inputBox.find('.attachment-display').html(display_return);
                    myModal.modal('hide');
                    handle_clear_btn(value_return);
                });
            });
        };
        $.fn.inputAttachmentClear = function () {
            var $inputBox = $(this);
            $($inputBox.attr('data-default')).val('');
            $inputBox.find('.attachment-display').html('');
            $inputBox.find('.clear-btn').addClass('hidden');
        };
        $browsBtn.click(function () {
            $(this).inputAttachmentBrowse($(this).data('url'), ',');
        });
        $clearBtn.inputAttachmentClear();
    };
}(jQuery));
$(function () {
    $('.attachment-box').handleAttachmentInput();
});
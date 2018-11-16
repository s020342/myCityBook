define([

], function() {
    return {
        table: [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'
        ],

        decode: function(str) {
            if (!str) {
                return '';
            }

            var len = str.length;
            var i = 0;
            var res = [];

            while (i < len) {
                code1 = this.table.indexOf(str.charAt(i++));
                code2 = this.table.indexOf(str.charAt(i++));
                code3 = this.table.indexOf(str.charAt(i++));
                code4 = this.table.indexOf(str.charAt(i++));

                c1 = (code1 << 2) | (code2 >> 4);
                c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
                c3 = ((code3 & 0x3) << 6) | code4;

                res.push(String.fromCharCode(c1));

                if (code3 != 64) {
                    res.push(String.fromCharCode(c2));
                }
                if (code4 != 64) {
                    res.push(String.fromCharCode(c3));
                }

            }

            return this.UTF8ToUTF16(res.join(''));
        },
        UTF8ToUTF16: function(str) {
            var res = [],
                len = str.length;
            var i = 0;
            for (var i = 0; i < len; i++) {
                var code = str.charCodeAt(i);
                // 对第一个字节进行判断
                if (((code >> 7) & 0xFF) == 0x0) {
                    // 单字节
                    // 0xxxxxxx
                    res.push(str.charAt(i));
                } else if (((code >> 5) & 0xFF) == 0x6) {
                    // 双字节
                    // 110xxxxx 10xxxxxx
                    var code2 = str.charCodeAt(++i);
                    var byte1 = (code & 0x1F) << 6;
                    var byte2 = code2 & 0x3F;
                    var utf16 = byte1 | byte2;
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 4) & 0xFF) == 0xE) {
                    // 三字节
                    // 1110xxxx 10xxxxxx 10xxxxxx
                    var code2 = str.charCodeAt(++i);
                    var code3 = str.charCodeAt(++i);
                    var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                    var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                    utf16 = ((byte1 & 0x00FF) << 8) | byte2
                    res.push(String.fromCharCode(utf16));
                } else if (((code >> 3) & 0xFF) == 0x1E) {
                    // 四字节
                    // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else if (((code >> 2) & 0xFF) == 0x3E) {
                    // 五字节
                    // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                    // 六字节
                    // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
                }
            }

            return res.join('');
        }

    }


});
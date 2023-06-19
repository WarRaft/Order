printc('--- start')

local s = '';

function generateStrings(prefix, length)
    if length == 0 then
        if OrderId(prefix) > 0 then
            printc(prefix);
            s = s .. prefix .. ',';
        end
        return
    end
    do
        local charCode = 48
        while charCode <= 122 do
            if charCode >= 48 and charCode <= 57 or charCode >= 97 and charCode <= 122 then
                local character = string.char(charCode)
                generateStrings(
                        nil,
                        tostring(prefix) .. character,
                        length - 1
                )
            end
            charCode = charCode + 1
        end
    end
end
generateStrings("", 31)

Preload(s);
PreloadGenEnd("_test\\\\order.txt");

printc('--- end')
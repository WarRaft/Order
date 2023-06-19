local list = { 'aa', 'holybolt', 'dd', 'earthquake', 'a1', '11' }
local s = '';

for _, v in pairs(list) do
    if OrderId(v) > 0 then
        print(v);
        s = s + v + ',';
    end
end

Preload(s);
PreloadGenEnd("_test\\order.txt");
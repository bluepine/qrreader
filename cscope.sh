rm cscope.files
find  . -name '*.js' -exec echo \"{}\" >> cscope.files \;
cscope -b

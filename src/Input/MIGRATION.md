# `<Input/>` Migration Guide

## 4.x.x -> WSR 5.x.x
### noRightBorderRadius / noLeftBorderRadius
These props used to accept a string and pass it onto the className of the Input's root element. Now the accept boolean, and apply the propper classes that affect the border radius.
In some cases these were used as a hack to pass className to the Input. Either  in order to set the border-radius (since passing boolean didn't work), or to do some other styling.
If you used to pass a class in order to set the border radius, then please use the now-working noRight(LeftBorderRadius), if you used it as a hack for somehting else, then you can now use the new className prop, but please first verify wether your requiremenet is not met by other solution in WSR.
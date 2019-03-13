# dependant-selects
Snippet for one-level dependant selects in html.

Requirements:
JQuery
Select2



1. Put the reference to this script or the raw code after load JQuery and select2 scripts.
2. Init JQuery with $(document).ready(function() { ... }); as recomended in the select2 
documentation
2. Declare the option list for the parent element as recomended in the select2 docs
3. Declare the option list for the child element as recomended in point 2, but each element
must have a field named parentID (it must be an integer field) that references to the parent
element that this entry belongs to.
4. Call the function initDependentSelects to initialize your dependant selects.  You have to
send the CSS selector of the parent and child selects, the parent options list, the full options
list for the child select, and not required parent and child select placeholder text (default 
is '--')


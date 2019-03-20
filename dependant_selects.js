/**
 * @author Ludwing Pérez
 * march 2019
 * https://github.com/ludwingperezt/dependant-selects
 */
function initDependentSelects(parentSelector, 
    childSelector, 
    parentData,
    childData,
    childPlaceholder) {

    var parentElement = $(parentSelector);
    var childElement = $(childSelector);
    var parentSelectedValue = parentElement.val();
    var childSelectedValue = childElement.val();

    childElement.empty();
    parentElement.select2({
        data: parentData
    });
    childElement.select2({
        placeholder: childPlaceholder
    });
    parentElement.on('select2:select', function(e) {
        var parentKey = e.params.data.id;
        filterChild(childSelector, parentKey, childData);
    });

    setInitialSelectedValues(parentSelector, childSelector, parentSelectedValue, childSelectedValue, childData);
}

function initSelects(parentSelector, 
    childSelector, 
    parentConfig,
    childConfig) {

    var parentElement = $(parentSelector);
    var childElement = $(childSelector);
    var parentSelectedValue = parentElement.val();
    var childSelectedValue = childElement.val();

    childElement.empty();
    parentElement.select2(parentConfig);
    childElement.select2(childConfig);

    parentElement.on('select2:select', function(e) {
        var parentKey = e.params.data.id;
        filterChild(childSelector, parentKey, childConfig.data);
    });

    setInitialSelectedValues(parentSelector, childSelector, parentSelectedValue, childSelectedValue, childConfig.data);
}

function searchChildElements(parentKey, list) {
    var found_elements = list.filter(function(val){
        return val.parentID === parseInt(parentKey);
    });
    return found_elements;
}

function populateChild(childSelector, data) {
    $(childSelector).empty();
    $(childSelector).select2({
        data: data
    })
    ;
}

function filterChild(childSelector, parentKey, list, placeholder='--') {
    var filtered = searchChildElements(parentKey, list);
    filtered.splice(0,0,{id:'', text: placeholder});
    populateChild(childSelector, filtered);
}

function searchElement(key, list) {
    var found_elements = list.filter(function(val){
        return val.id === parseInt(key);
    });
    return found_elements;
}

function setChildElements(childSelector, childElements, parentSelectedValue, childSelectedValue) {
    var childElement = $(childSelector);
    filterChild(childSelector, parentSelectedValue, childElements);

    if (childSelectedValue) {
        childElement.val(childSelectedValue).trigger('change.select2');
    }
}

function setInitialSelectedValues(parentSelector, childSelector, parentSelectedValue, childSelectedValue, childData) {
    var parentElement = $(parentSelector);
    if (!parentSelectedValue && childSelectedValue) {
        // Pre-select parent and child value if child value exists

        // Find the (list) child selected element
        var elements_found = searchElement(childSelectedValue, childData);

        if (elements_found.length > 0) {
            // Get the parent ID of the first (only) selected element
            var parent_id = elements_found[0].parentID;

            // Set the selected parent element
            parentElement.val(parent_id).trigger('change.select2');

            // Re-set the child element
            setChildElements(childSelector, childData, parent_id, childSelectedValue);
        }
    }
    else {
        // Pre-select child value if parent has a selected value
        setChildElements(childSelector, childData, parentSelectedValue, childSelectedValue);
    }
}
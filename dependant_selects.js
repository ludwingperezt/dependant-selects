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

    // Pre-select child value if parent has a selected value
    if (parentSelectedValue) {
        filterChild(childSelector, parentSelectedValue, childData);

        if (childSelectedValue) {
            childElement.val(childSelectedValue).trigger('change.select2');
        }
    }
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

    // Pre-select child value if parent has a selected value
    if (parentSelectedValue) {
        filterChild(childSelector, parentSelectedValue, childConfig.data);

        if (childSelectedValue) {
            childElement.val(childSelectedValue).trigger('change.select2');
        }
    }
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
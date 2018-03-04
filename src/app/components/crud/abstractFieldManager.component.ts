export abstract class AbstractFieldManagerComponent {
  public getFieldName = (field) => {
    let fieldName = field;
    if (typeof field === 'object') {
      fieldName = field.name
        ? field.name
        : field.property;
    }

    return fieldName.replace(/\b\w/g, l => l.toUpperCase());
  }

  public getFieldProperty = (field) => typeof field === 'object'
    ? field.property
    : field

  public getValue = (model, field) => {
    if (field.valueGetter) {
      return field.valueGetter(model);
    }
    return model[this.getFieldProperty(field)];
  }

  public fieldIsInput = (field) => !field.options;

  public fieldIsSelect = (field) => field.options;
}

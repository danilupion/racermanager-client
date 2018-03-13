import {Input} from '@angular/core';
interface OptionType {
  value: string|number;
  text: string|number;
}

interface FieldDefinitionType {
  property: string;
  name?: string;
  listValueGetter?: (model: object) => string;
  editValueGetter?: (model: object) => string;
  onListClick?: (event: object, field: object) => void;
  options?: OptionType[];
  multiple?: boolean;
}

export abstract class AbstractFieldManagerComponent {
  @Input()
  public fields: [string|FieldDefinitionType];

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

  public getListValue = (model, field) => {
    if (field.listValueGetter) {
      return field.listValueGetter(model);
    }
    return model[this.getFieldProperty(field)];
  }

  public getEditValue = (model, field) => {
    if (field.editValueGetter) {
      return field.editValueGetter(model);
    }
    return model[this.getFieldProperty(field)];
  }

  public isEditable = (field) => {
    return field.editable === undefined || field.editable;
  }

  public getEditableFields() {
    return this.fields
      .filter(field => this.isEditable(field));
  }

  public onFieldValueListClick(event, field, model) {
    if (field.onListClick) {
      field.onListClick(model);
    }
  }

  public fieldIsInput = (field) => !field.options;

  public fieldIsSelect = (field) => field.options;
}

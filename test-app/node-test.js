class ClassBuilder {
  constructor(block, customDefaults) {
    this.block = `mdc-${block}`;
    this.customDefaults = customDefaults; //will be ignored when building custom classes
  }

  // classParams: {modifiers:[] (mdc), custom:[] (bbmd), extra:[] (any)}
  blocks(classParams) {
    let base = this.block;
    if (classParams == undefined) return base;
    return this.buildClass(base, classParams);
  }

  //elementName: string, classParams: {}
  elements(elementName, classParams) {
    let base = `${this.block}__${elementName}`;
    if (classParams == undefined) return base;
    return this.buildClass(base, classParams);
  }

  buildClass(base, classParams) {
    let cls = base;
    const { modifiers, customs, extras } = classParams;
    if (!!modifiers) cls += modifiers.map(m => ` ${base}--${m}`).join(" ");
    if (!!customs)
      cls += Object.entries(customs)
        .map(([property, value]) => {
          //disregard falsy and values set by defaults set in constructor
          if (!!value && !this.customDefaults.includes(value)) {
            //custom scss name convention = bbmd-[block | element]--[property]-[value]
            return ` bbmd-${base}--${property}-${value}`;
          }
        })
        .join("");
    if (!!extras) cls += ` ${extras.join(" ")}`;
    return cls.trim();
  }
}

let size = "bla";
let colour = "large";
let variant = "raised";

let obj = { size, colour, variant };

const cb = new ClassBuilder("button", ["medium", "primary"]);
const block = cb.blocks({ customs: obj });
console.log(block);

// const cb = new ClassBuilder("button");
// console.log(cb.blocks({ customs: ["secondary", "medium"] }));

import { Input } from "../ui/input";


function CommonFormElement({ currentItem, value, onChange }) {
    let content = null

    switch (currentItem.componentType) {
        case 'input':
            content = (
              <Input
                name={currentItem.name}
                id={currentItem.name}
                placeholder={currentItem.placeholder}
                value={value}
                onChange={onChange}
                type={currentItem.type}
                className="focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0"
              />
            );

            break;

        default: 
            content = (
              <Input
                name={currentItem.name}
                id={currentItem.name}
                placeholder={currentItem.placeholder}
                value={value}
                onChange={onChange}
                className="focus:ring-0 focus-visible:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0"
              />
            );
            break;
    }
    return content;
}

export default CommonFormElement;
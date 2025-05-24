import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

/**
 * CommonForm is a reusable React component that dynamically renders
 * form fields like inputs, selects, and textareas based on a configuration
 * array (formControls). It manages form state via formData and setFormData,
 * handles input changes, and supports a customizable submit button.
 * This allows flexible and consistent form creation across the app without
 * duplicating form code.
 */
function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  // Render the correct form input based on componentType (input, select, textarea)
  function renderInputsByComponentType(control) {
    // Get current value from formData or default to empty string
    const value = formData[control.name] || "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            id={control.name}
            type={control.type}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) =>
              setFormData({ ...formData, [control.name]: val })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={control.name}
            id={control.name}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );

      // Default to input type text if no componentType matches
      default:
        return (
          <Input
            name={control.name}
            id={control.name}
            type={control.type || "text"}
            placeholder={control.placeholder}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
    }
  }

  return (
    // Form element triggers onSubmit function on submit
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {/* Loop over each control and render label + corresponding input */}
        {formControls.map((control) => (
          <div className="grid w-full gap-1.5" key={control.name}>
            <Label className="mb-1">{control.label}</Label>
            {renderInputsByComponentType(control)}
          </div>
        ))}
      </div>

      {/* Submit button, disabled if isBtnDisabled is true */}
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;

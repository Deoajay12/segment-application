import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const schemaOptions = [
    { label: "First name", value: "first_name" },
    { label: "Last name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
];

const SegmentModal = ({ onClose }) => {
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            segment_name: "",
            schema: [],
            newSchema: "",
        },
    });

    const { fields, append, update } = useFieldArray({
        control,
        name: "schema",
    });

    const selectedValues = watch("schema").map((item) => item.value);
    const availableOptions = schemaOptions.filter(
        (opt) => !selectedValues.includes(opt.value)
    );

    const handleAddSchema = () => {
        const newSchema = watch("newSchema");
        if (!newSchema) return;

        const selected = schemaOptions.find((opt) => opt.value === newSchema);
        append(selected);
        setValue("newSchema", "");
    };

    const onSubmit = (data) => {
        debugger;
        const payload = {
            segment_name: data.segment_name,
            schema: data.schema.map((item) => ({
                [item.value]: item.label,
            })),
        };
        debugger;
        console.log("Final JSON:", payload);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl shadow-xl w-[420px] p-6"
            >
                <h2 className="text-xl font-semibold mb-4">Save Segment</h2>

                <label className="block text-sm font-medium mb-1">
                    Segment Name *
                </label>
                <Controller
                    name="segment_name"
                    control={control}
                    rules={{ required: "Please fill the segment name" }}
                    render={({ field }) => (
                        <input
                            {...field}
                            placeholder="Enter segment name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-1"
                        />
                    )}
                />
                {errors.segment_name && (
                    <p className="text-red-500 text-sm mb-3">
                        {errors.segment_name.message}
                    </p>
                )}

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    {fields.map((field, index) => {
                        const remainingOptions = [
                            field,
                            ...schemaOptions.filter(
                                (opt) =>
                                    !fields.some(
                                        (val, i) => i !== index && val.value === opt.value
                                    )
                            ),
                        ];

                        return (
                            <Controller
                                key={field.id}
                                name={`schema.${index}.value`}
                                control={control}
                                defaultValue={field.value}
                                render={({ field: schemaField }) => (
                                    <select
                                        {...schemaField}
                                        onChange={(e) => {
                                            const selected = schemaOptions.find(
                                                (s) => s.value === e.target.value
                                            );
                                            update(index, selected);
                                        }}
                                        className="w-full border border-gray-300 rounded-lg px-2 py-2 mb-2"
                                    >
                                        {remainingOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        );
                    })}
                </div>
                <label className="block text-sm font-medium mb-1">
                    Add schema to segment
                </label>
                <Controller
                    name="newSchema"
                    control={control}
                    render={({ field }) => (
                        <select
                            {...field}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                        >
                            <option value="">Select Schema</option>
                            {availableOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    )}
                />

                <button
                    type="button"
                    onClick={handleAddSchema}
                    className="text-blue-600 text-sm mb-4"
                >
                    + Add new schema
                </button>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border text-red-500 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Save the segment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SegmentModal;

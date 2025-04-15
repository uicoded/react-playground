const mockSubmitResponseWithDelay = async (formData: FormData, delay: number = 1000): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, delay));

  // Convert FormData to a regular object for logging/processing
  const formDataObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Log the result instead of returning it
  console.log({
    status: 201,
    ok: true,
    message: 'Form submitted successfully',
    data: formDataObject
  });

  // No return value (void)
};

export { mockSubmitResponseWithDelay };

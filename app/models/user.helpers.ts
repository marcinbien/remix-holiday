export const getUserFromFormData = ({ formData }: { formData: FormData }) => {
  const id = formData.get("id")?.toString() || null;
  const firstName = formData.get("firstName")?.toString() || null;
  const lastName = formData.get("lastName")?.toString() || null;
  const email = formData.get("email")?.toString() || "";
  const title = formData.get("title")?.toString() || null;

  const user = { firstName, lastName, email, title };

  return user;
};

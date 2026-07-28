export const EDIT_FIELDS = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "your@email.com",
  },
  {
    name: "password",
    label: "New password",
    type: "password",
    placeholder: "Leave blank to keep current password",
    autoComplete: "new-password",
  },
  {
    name: "avatar_url",
    label: "Avatar URL",
    type: "url",
    placeholder: "https://example.com/avatars/you.jpg",
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "e.g. +358 40 123 4567",
  },
  {
    name: "bio",
    label: "About (bio)",
    type: "textarea",
    placeholder: "Tell us about yourself",
    rows: 4,
  },
  {
    name: "languages",
    label: "Languages",
    type: "text",
    placeholder: "e.g. en, fi, fa",
  },
];

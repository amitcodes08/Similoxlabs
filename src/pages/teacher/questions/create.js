import React from "react";
import TeacherLayout from "@/components/teacher/Layout";
import QuestionForm from "@/components/teacher/QuestionForm";

export default function CreateQuestionPage() {
  return (
    <TeacherLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/teacher" },
        { label: "Create Question" }
      ]}
    >
      <QuestionForm mode="create" />
    </TeacherLayout>
  );
}

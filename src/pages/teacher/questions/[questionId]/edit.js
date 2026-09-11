import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import TeacherLayout from "@/components/teacher/Layout";
import QuestionForm from "@/components/teacher/QuestionForm";
import { useTeacher } from "@/context/TeacherContext";

export default function EditQuestionPage() {
  const router = useRouter();
  const { questionId } = router.query;
  const { getQuestionById } = useTeacher();

  const question = useMemo(() => {
    if (!questionId) return null;
    return getQuestionById(questionId);
  }, [questionId, getQuestionById]);

  if (!question && router.isReady) {
    return (
      <TeacherLayout
        breadcrumbs={[
          { label: "Dashboard", href: "/teacher" },
          { label: "Question Not Found" }
        ]}
      >
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-md mx-auto shadow-xs">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">Question Not Found</h2>
          <p className="text-xs text-gray-500 mt-1 mb-5">
            The question you are attempting to edit does not exist or was removed.
          </p>
          <Link
            href="/teacher"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout
      breadcrumbs={[
        { label: "Dashboard", href: "/teacher" },
        {
          label: question?.title || "Question",
          href: `/teacher/questions/${questionId}/submissions`
        },
        { label: "Edit Question" }
      ]}
    >
      {question && <QuestionForm mode="edit" initialData={question} />}
    </TeacherLayout>
  );
}

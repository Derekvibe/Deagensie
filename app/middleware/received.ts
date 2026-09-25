/**
 * Middleware to protect the request received page
 * Ensures users can only access it after successful form submission
 */

export default defineNuxtRouteMiddleware((to) => {
  const { isSubmitted, clearSubmission } = useFormSubmissionState();

  // If coming from the form submission (submitted state is true)
  if (isSubmitted()) {
    // Clear the state so it can't be accessed again without resubmitting
    clearSubmission();
    // Allow access to the received page
    return;
  }

  // If not coming from form submission, redirect back to the form
  const code = to.params.code as string;
  const planCode = to.params.planCode as string;
  return navigateTo(`/subscription/${code}/${planCode}/request`);
});

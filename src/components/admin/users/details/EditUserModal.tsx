"use client";

interface EditUserModalProps {
  isOpen: boolean;
  isSubmitting: boolean;
  role: "admin" | "user" | "plant-doctor";
  firstName: string;
  lastName: string;
  specialties: string;
  yearsOfExperience: string;
  consultationFee: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onSpecialtiesChange: (value: string) => void;
  onYearsOfExperienceChange: (value: string) => void;
  onConsultationFeeChange: (value: string) => void;
}

export default function EditUserModal({
  isOpen,
  isSubmitting,
  role,
  firstName,
  lastName,
  specialties,
  yearsOfExperience,
  consultationFee,
  onClose,
  onSubmit,
  onFirstNameChange,
  onLastNameChange,
  onSpecialtiesChange,
  onYearsOfExperienceChange,
  onConsultationFeeChange,
}: EditUserModalProps) {
  if (!isOpen) return null;

  const isDoctor = role === "plant-doctor";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-shade3 p-6 shadow-2xl">
        <h3 className="mb-4 text-xl font-bold">ویرایش اطلاعات کاربر</h3>
        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-neutral9 dark:text-text-dark text-sm font-medium">نام</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
                className="border-neutral3 dark:border-neutral8 focus:border-primary dark:focus:border-primary-dark mt-1 w-full rounded-xl border px-4 py-2 outline-0"
                required
              />
            </div>
            <div>
              <label className="text-neutral9 dark:text-text-dark text-sm font-medium">
                نام خانوادگی
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => onLastNameChange(e.target.value)}
                className="border-neutral3 dark:border-neutral8 focus:border-primary dark:focus:border-primary-dark mt-1 w-full rounded-xl border px-4 py-2 outline-0"
                required
              />
            </div>

            {isDoctor && (
              <>
                <div>
                  <label className="text-neutral9 dark:text-text-dark text-sm font-medium">
                    تخصص
                  </label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={(e) => onSpecialtiesChange(e.target.value)}
                    className="border-neutral3 dark:border-neutral8 focus:border-primary dark:focus:border-primary-dark mt-1 w-full rounded-xl border px-4 py-2 outline-0"
                  />
                </div>
                <div>
                  <label className="text-neutral9 dark:text-text-dark text-sm font-medium">
                    سال‌های تجربه
                  </label>
                  <input
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => onYearsOfExperienceChange(e.target.value)}
                    className="border-neutral3 dark:border-neutral8 focus:border-primary dark:focus:border-primary-dark mt-1 w-full rounded-xl border px-4 py-2 outline-0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="text-neutral9 dark:text-text-dark text-sm font-medium">
                    هزینه مشاوره (تومان)
                  </label>
                  <input
                    type="number"
                    value={consultationFee}
                    onChange={(e) => onConsultationFeeChange(e.target.value)}
                    className="border-neutral3 dark:border-neutral8 focus:border-primary dark:focus:border-primary-dark mt-1 w-full rounded-xl border px-4 py-2 outline-0"
                    min="0"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border-neutral3 text-neutral9 dark:text-text-dark dark:hover:bg-shade4 hover:bg-neutral3 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-shade2 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50"
            >
              {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
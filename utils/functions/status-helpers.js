export const getLeaveStatusIcon = (status) => getStatusMapValue(status, {
  approved: "check-circle-solid",
  pending: "eye-open",
  rejected: "close",
});

export const getStatusIconVariant = (status) => getStatusMapValue(status, {
  approved: "success",
  pending: "warning",
  rejected: "danger",
});

export const getTextVariant = (status) => getStatusMapValue(status, {
  approved: "text-success",
  pending: "text-warning",
  rejected: "text-danger",
});

export const getStatusLabel = (status) => getStatusMapValue(status, {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
});

export const getLeaveTypeIconVariant = (status) => getStatusMapValue(status, {
  approved: "success",
  pending: "gray3",
  rejected: "white",
});

export const getLeaveTypeClassName = (status) => getStatusMapValue(status, {
  approved: "text-success bg-success-sub6",
  pending: "text-warning bg-warning",
  rejected: "text-danger bg-danger",
  other: "text-warning bg-warning"
});

export const getLeaveStatusIconVariant = (type) => getTypeMapValue(type, {
  medical: "medical-clinic-solid",
  leave: "accessibility-cognitive-disability-Solid",
  // vacation: "sun-solid",
  vacation:'airplane-solid',
  other: 'add'
});
export const getLeaveStatusClass = (type) => getTypeMapValue(type, {
  approved: "chip-wrapper-bg__bgsucess",
  pending: "chip-wrapper-bg__bgabsent",
  rejected:'chip-wrapper-bg__bgdanger',
});

export const getFileExtension = (icon) => {
  const lowercaseIcon = icon.toLowerCase(); 

  return getTypeMapValue(lowercaseIcon, {
    pdf: "pdf",
    jpg: "jpg",
    jpeg: "jpg",
    webp: "jpg",
    png: "png",
    docx: "docx",
    doc: "docx",
    csv: 'excel',
    xls: 'excel',
    xlsx: 'excel',
    ppt: 'powerpoint',
  });
}

function getStatusMapValue(status, statusMap) {
  return statusMap[status] || '';
}

function getTypeMapValue(type, typeMap) {
  return typeMap[type] || '';
}

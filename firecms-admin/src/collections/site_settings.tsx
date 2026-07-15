import { buildCollection } from "@firecms/core";

export type SiteSetting = {
  key: string;
  name: string;
  
  // Hotline Quick Contact Section
  hotline_title: string;
  hotline_subtitle: string;
  hotline_phone: string;
  hotline_secondary_phone?: string;
  
  // Footer Section
  footer_brand_description: string;
  footer_address: string;
  
  // Social Links
  facebook_url: string;
  tiktok_url: string;
  youtube_url: string;
  
  active: boolean;
  updated_at: Date;
};

export const siteSettingsCollection = buildCollection<SiteSetting>({
  name: "Cấu hình Website",
  singularName: "Bản ghi cấu hình",
  id: "site_settings",
  path: "site_settings",

  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),

  properties: {
    key: {
      name: "Mã cấu hình",
      dataType: "string",
      validation: { required: true },
      description: "Ví dụ: main_settings",
      columnWidth: 160,
    },

    name: {
      name: "Tên cấu hình",
      dataType: "string",
      validation: { required: true },
      description: "Ví dụ: Cấu hình chung",
      columnWidth: 200,
    },

    hotline_title: {
      name: "Hotline - Tiêu đề",
      dataType: "string",
      validation: { required: true },
      columnWidth: 280,
    },

    hotline_subtitle: {
      name: "Hotline - Mô tả phụ",
      dataType: "string",
      multiline: true,
      validation: { required: true },
      columnWidth: 350,
    },

    hotline_phone: {
      name: "Hotline - Số điện thoại chính",
      dataType: "string",
      validation: { required: true },
      columnWidth: 180,
    },

    hotline_secondary_phone: {
      name: "Hotline - Số điện thoại phụ",
      dataType: "string",
      columnWidth: 180,
    },

    footer_brand_description: {
      name: "Footer - Mô tả thương hiệu",
      dataType: "string",
      multiline: true,
      validation: { required: true },
      columnWidth: 350,
    },

    footer_address: {
      name: "Footer - Địa chỉ / Liên hệ",
      dataType: "string",
      multiline: true,
      validation: { required: true },
      columnWidth: 350,
    },

    facebook_url: {
      name: "Facebook Link",
      dataType: "string",
      validation: { required: true },
      columnWidth: 240,
    },

    tiktok_url: {
      name: "TikTok Link",
      dataType: "string",
      validation: { required: true },
      columnWidth: 240,
    },

    youtube_url: {
      name: "YouTube Link",
      dataType: "string",
      validation: { required: true },
      columnWidth: 240,
    },

    active: {
      name: "Kích hoạt sử dụng bản ghi này",
      dataType: "boolean",
      defaultValue: true,
    },

    updated_at: {
      name: "Cập nhật lần cuối",
      dataType: "date",
      autoValue: "on_update",
    },
  },
});

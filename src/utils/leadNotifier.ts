import { InquiryLead } from '../types';

const WEBHOOK_STORAGE_KEY = 'admission_suggestion_webhook_url';
const FORMSPREE_STORAGE_KEY = 'admission_suggestion_formspree_id';

// Default counsellor helpline WhatsApp number (with country code, no + or spaces)
export const COUNSELLOR_PHONE = '919860777069';

/**
 * Get current configured Webhook URL from localStorage
 */
export const getWebhookUrl = (): string => {
  return localStorage.getItem(WEBHOOK_STORAGE_KEY) || '';
};

/**
 * Save custom Webhook URL (Zapier, Make, Slack, Discord, Google Sheets, etc.)
 */
export const setWebhookUrl = (url: string): void => {
  if (url) {
    localStorage.setItem(WEBHOOK_STORAGE_KEY, url);
  } else {
    localStorage.removeItem(WEBHOOK_STORAGE_KEY);
  }
};

/**
 * Get configured Formspree Endpoint ID
 */
export const getFormspreeId = (): string => {
  return localStorage.getItem(FORMSPREE_STORAGE_KEY) || '';
};

/**
 * Set Formspree Endpoint ID
 */
export const setFormspreeId = (id: string): void => {
  if (id) {
    localStorage.setItem(FORMSPREE_STORAGE_KEY, id);
  } else {
    localStorage.removeItem(FORMSPREE_STORAGE_KEY);
  }
};

/**
 * Format a clean, human-readable WhatsApp lead alert message
 */
export const formatWhatsAppLeadMessage = (lead: InquiryLead): string => {
  return encodeURIComponent(
    `🎓 *NEW ADMISSION INQUIRY — ADMISSION SUGGESTION*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Student Name:* ${lead.name}\n` +
    `📱 *Phone:* ${lead.phone}\n` +
    (lead.email && lead.email !== 'N/A' ? `📧 *Email:* ${lead.email}\n` : '') +
    `📝 *Exam:* ${lead.exam} (${lead.scorePercentile || 'Awaiting Result'})\n` +
    `🏛️ *Target Branch:* ${lead.preferredBranch || 'Not Specified'}\n` +
    `📍 *Target Location:* ${lead.targetLocation || 'Pune'}\n` +
    (lead.message ? `💬 *Notes:* ${lead.message}\n` : '') +
    `⏰ *Timestamp:* ${lead.createdAt}\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📍 *Center:* Sohrab Hall, Pune Head Office`
  );
};

/**
 * Generate Direct WhatsApp Link for Counsellor Desk
 */
export const getCounsellorWhatsAppUrl = (lead: InquiryLead): string => {
  const text = formatWhatsAppLeadMessage(lead);
  return `https://wa.me/${COUNSELLOR_PHONE}?text=${text}`;
};

/**
 * Dispatches the lead data to external webhooks and email notification endpoints asynchronously
 */
export const dispatchLeadNotification = async (lead: InquiryLead): Promise<{ success: boolean; channel?: string }> => {
  const webhookUrl = getWebhookUrl();
  const formspreeId = getFormspreeId();

  const payload = {
    event: 'new_admission_inquiry',
    source: 'admissionsuggestion.com',
    leadId: lead.id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    exam: lead.exam,
    scorePercentile: lead.scorePercentile,
    preferredBranch: lead.preferredBranch,
    targetLocation: lead.targetLocation,
    message: lead.message,
    status: lead.status,
    submittedAt: lead.createdAt
  };

  // 1. If Formspree ID is configured
  if (formspreeId) {
    try {
      await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...payload,
          _subject: `New Lead: ${lead.name} (${lead.exam} - ${lead.scorePercentile})`
        })
      });
      return { success: true, channel: 'Formspree Email' };
    } catch (err) {
      console.warn('Formspree dispatch failed, attempting webhook fallback:', err);
    }
  }

  // 2. If Custom Webhook URL is configured (Zapier, Make, Telegram bot webhook, Discord, etc.)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return { success: true, channel: 'Custom Webhook' };
    } catch (err) {
      console.warn('Webhook dispatch failed:', err);
    }
  }

  return { success: true, channel: 'Local Dashboard & WhatsApp' };
};

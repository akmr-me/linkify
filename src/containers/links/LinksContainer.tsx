"use client";
import { useState, useEffect } from "react";
import Shortner from "@/components/shortner";
import { DataTable as Table } from "@/components/table";
import { linksApi } from "@/services/api/links";
import { URLData, URLFormState } from "@/types";
import { createColumns } from "@/components/table/columns";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { usePagination } from "@/hooks/usePagination";
import { createShortUrl, getErrorMessage, stripProtocol } from "@/lib/utils";

export default function LinksContainer() {
  const [links, setLinks] = useState<URLData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState<URLFormState>({
    url: "",
    alias: "",
  });
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const { page, limit, handleNextPage, handlePreviousPage } = usePagination();
  const [currentPage, setCurrentPage] = useState(page ? Number(page) : 1);
  const user = useStore((state) => state.user);

  useEffect(() => {
    console.log("Trigger fetch:", triggerFetch, user);
    fetchLinks(Number(page), Number(limit));
  }, [page, limit, triggerFetch, user]);

  const fetchLinks = async (page: number, limit: number) => {
    try {
      const { data: response = { data: [] } } = await linksApi.getLinks(
        page,
        limit
      );
      console.log("Fetched links:", response);
      setHasNextPage(response.hasMore);
      setHasPreviousPage(page > 1);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setLinks(
        (response.data || []).map((link: URLData) => ({
          id: link.id,
          fullUrl: stripProtocol(link.fullUrl),
          short: createShortUrl(link.short),
          clicks: link.clicks,
          createdAt: new Date(link.createdAt),
          lastClicked: link.lastClicked,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShortenLink = async () => {
    const { url, alias } = formState;
    try {
      await linksApi.shortenLink(url, alias);
      setFormState({ url: "", alias: "" }); // Reset form state
      handleTriggerFetch();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error) || "Failed to shorten link");
      console.error("Failed to shorten link:", error);
    }
  };

  const handleDeleteLink = async (id: string) => {
    console.log("Deleting link with ID:", id);
    try {
      await linksApi.deleteLink(id);
      handleTriggerFetch(); // Trigger re-fetch
      toast.success("Link deleted successfully");
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to delete link");
      console.error("Failed to delete link:", error);
    }
  };

  const handleTriggerFetch = () => setTriggerFetch((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-[32px] py-8">
      <Shortner
        handleInputChange={handleInputChange}
        formState={formState}
        handleShortenLink={handleShortenLink}
      />
      <Table
        data={links}
        isLoading={isLoading}
        columns={createColumns(handleDeleteLink)}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        pageSize={10}
        pageCount={totalPages}
        pageIndex={currentPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleTriggerFetch={handleTriggerFetch}
      />
    </div>
  );
}

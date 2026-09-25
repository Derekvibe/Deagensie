import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue';

type Direction = 'horizontal' | 'vertical' | 'both';

interface UseOverflowOptions {
  direction?: Direction;
  containerRef?: Ref<HTMLElement | null>;
  immediate?: boolean;
}

export function useOverflow(contentRef: Ref<HTMLElement | null>, options: UseOverflowOptions = {}) {
  const { direction = 'horizontal', containerRef, immediate = true } = options;

  const isOverflowing = ref(false);

  const checkOverflow = () => {
    const content = contentRef.value;
    const container = containerRef?.value || content;

    if (!content || !container) return;

    const overflowX = content.scrollWidth > container.clientWidth;
    const overflowY = content.scrollHeight > container.clientHeight;

    if (direction === 'horizontal') {
      isOverflowing.value = overflowX;
    } else if (direction === 'vertical') {
      isOverflowing.value = overflowY;
    } else {
      isOverflowing.value = overflowX || overflowY;
    }
  };

  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    const content = contentRef.value;
    const container = containerRef?.value || content;

    if (!content || !container) return;

    resizeObserver = new ResizeObserver(checkOverflow);

    resizeObserver.observe(content);

    // observe container too if it's different
    if (container !== content) {
      resizeObserver.observe(container);
    }

    if (immediate) {
      checkOverflow();
    }
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
  });

  // handle ref changes
  watch(
    [contentRef, containerRef || ref(null)],
    ([newContent, newContainer], [oldContent, oldContainer]) => {
      if (!resizeObserver) return;

      if (oldContent) resizeObserver.unobserve(oldContent);
      if (oldContainer && oldContainer !== oldContent) resizeObserver.unobserve(oldContainer);

      if (newContent) resizeObserver.observe(newContent);
      if (newContainer && newContainer !== newContent) resizeObserver.observe(newContainer);

      checkOverflow();
    }
  );

  return {
    isOverflowing,
    checkOverflow,
  };
}
